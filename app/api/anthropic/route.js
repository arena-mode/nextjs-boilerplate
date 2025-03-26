// app/api/anthropic/route.js
import { StreamingTextResponse, Message } from 'ai';
import { createGel } from '@gel/vercel-ai-provider';

// Initialize the Anthropic client
const anthropicClient = createGel({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function POST(req) {
  try {
    // Extract the messages from the request body
    const { messages } = await req.json();

    // Create a response stream from Anthropic
    const response = await anthropicClient.messages.create({
      model: 'claude-3-opus-20240229',
      messages: messages,
      max_tokens: 1500,
      temperature: 0.7,
      stream: true
    });

    // Return a streaming response
    return new StreamingTextResponse(response.data.stream);
  } catch (error) {
    console.error('Error calling Anthropic:', error);
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
