import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import axios from 'axios';

const uri = process.env.MONGODB_URI || ''; // Ensure this environment variable is set
if (!uri) {
  throw new Error('Missing environment variable MONGODB_URI');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Step 1: Send the file to an external API for processing (if applicable)
    const externalApiResponse = await axios.post(
      process.env.IMAGE_PROCESSING_API_URL || '',
      buffer,
      {
        headers: {
          'Content-Type': file.type,
        },
      }
    );

    const processedImageUrl = externalApiResponse.data.url;
    if (!processedImageUrl) {
      return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
    }

    // Step 2: Connect to MongoDB and store the processed image URL
    const db = (await clientPromise).db('images'); // Replace with your database name

    await db.collection('uploads').insertOne({
      filename: file.name,
      url: processedImageUrl,
      uploadedAt: new Date(),
    });

    // Step 3: Return the processed image URL as a response
    return NextResponse.json({ url: processedImageUrl });

  } catch (error) {
    console.error("Error occurred in API route:", error);
    return NextResponse.json({ error: 'An error occurred during processing', details: error.message }, { status: 500 });
  }
  
}
