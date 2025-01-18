import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import https from 'https';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable');
}

// Configure MongoDB client with SSL options
const clientPromise = (async () => {
  const client = new MongoClient(uri, {
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: process.env.NODE_ENV === 'development',
  });

  return client.connect();
})();

export async function POST(request: Request) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400, headers }
      );
    }

    // Configure custom agent for local development
    const agent = new https.Agent({
      rejectUnauthorized: process.env.NODE_ENV === 'development' ? false : true
    });

    // Send to prediction endpoint
    const predictionResponse = await fetch('http://127.0.0.1:8000/predict/combined/img', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
      // @ts-ignore
      agent: process.env.NODE_ENV === 'development' ? agent : undefined
    });

    if (!predictionResponse.ok) {
      throw new Error(`Prediction service returned ${predictionResponse.status}`);
    }

    const predictionData = await predictionResponse.json();

    // Extract image URL from prediction response
    const imageUrl = predictionData.annotated_image;
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image URL in prediction response' },
        { status: 500, headers }
      );
    }

    // Save to MongoDB
    try {
      const client = await clientPromise;
      const db = client.db('images');
      
      const result = await db.collection('image').insertOne({
        imageUrl,
        uploadedAt: new Date(),
        predictions: {
          acne: predictionData.acne_detections,
          eyecircle: predictionData.eyecircle_detections
        }
      });

      return NextResponse.json({
        success: true,
        imageUrl,
        imageId: result.insertedId,
        predictions: predictionData
      }, { headers });

    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { 
          error: 'Database operation failed', 
          details: dbError instanceof Error ? dbError.message : 'Unknown database error' 
        },
        { status: 500, headers }
      );
    }

  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500, headers }
    );
  }
}

export async function GET(request: Request) {
  // Add CORS headers
  return NextResponse.json({
    message: 'Hello from the API!',
  });
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '50mb',
  },
};
