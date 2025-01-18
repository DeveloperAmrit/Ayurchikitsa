import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export const config = {
  runtime: 'edge',
};

export async function POST(request: NextRequest) {
  console.log('Received request');

  try {
    const { imageUrl, userId } = await request.json();

    if (!imageUrl || !userId) {
      return NextResponse.json({ error: 'imageUrl and userId are required' }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db('images');

    // Save to database
    const result = await db.collection('image').insertOne({
      imageUrl,
      userId,
      uploadedAt: new Date(),
    });

    await client.close();

    // Return success response
    return NextResponse.json({
      success: true,
      imageId: result.insertedId,
    });

  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: 'Upload failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


export async function GET(request: NextRequest) {
  console.log('GET request received');

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db('images');

    // Retrieve images for the specified userId
    const images = await db.collection('image').find({ userId }).toArray();

    await client.close();

    // Return success response with images
    return NextResponse.json({
      success: true,
      images,
    });

  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: 'Fetch failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
