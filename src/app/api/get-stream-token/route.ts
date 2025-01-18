"use server";
import { StreamChat } from 'stream-chat';

export async function POST(request: { json: () => PromiseLike<{ userId: any; }> | { userId: any; }; }) {
    // Parse the incoming JSON request body
    const { userId } = await request.json();

    if (!userId) {
        return new Response(JSON.stringify({ error: 'User ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Initialize the Stream client with API key and secret
    const apiKey = process.env.CHAT_API_KEY as string;
    const apiSecret = process.env.CHAT_API_SECRET as string;
    console.log('apiKey:', process.env.CHAT_API_SECRET as string);

    if (!apiKey || !apiSecret) {
        return new Response(JSON.stringify({ error: 'API key and secret are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const client = StreamChat.getInstance(apiKey, apiSecret);

    try {
        // Generate a user token for the specified user ID
        const userToken = client.createToken(userId);

        // Return the generated token in the response
        return new Response(JSON.stringify({ token: userToken }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error generating token:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
