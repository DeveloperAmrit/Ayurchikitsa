import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export const config = {
  runtime: 'edge',
};

export async function POST(request: NextRequest) {
  console.log('Received request');

  try {
    // Parse the multipart form data
    console.log(request)
    const formData = await request.formData();
    console.log('FormData parsed successfully');

    // Get the file from the form data
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Create new FormData for the prediction service
    const predictionFormData = new FormData();
    predictionFormData.append('file', file, file.name);

    // Call prediction service
    const predictionResponse = await fetch('http://127.0.0.1:8000/predict/combined/img', {
      method: 'POST',
      body: predictionFormData,
    });

    if (!predictionResponse.ok) {
      throw new Error(`Prediction service returned ${predictionResponse.status}`);
    }

    const predictionData = await predictionResponse.json();
    console.log('Prediction data:', predictionData);


    // Connect to MongoDB (Note: This part might not work in Edge runtime)
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db('images');
    
    // Save to database
    const result = await db.collection('image').insertOne({
      imageUrl: predictionData.annotated_image,
      uploadedAt: new Date(),
      predictions: predictionData
    });

    await client.close();

    // Return success response
    return NextResponse.json({
      success: true,
      imageUrl: predictionData.annotated_image,
      imageId: result.insertedId
    });

  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: 'Upload failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
