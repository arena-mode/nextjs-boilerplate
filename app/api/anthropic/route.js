// app/api/anthropic/route.js
import { StreamingTextResponse } from 'ai';
import { createGel } from '@gel/vercel-ai-provider';

const anthropicClient = createGel({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages } = body;
    
    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Format messages for Anthropic API
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Call Anthropic API with streaming enabled
    const response = await anthropicClient.messages.create({
      model: 'claude-3-opus-20240229',
      messages: formattedMessages,
      max_tokens: 1000,
      temperature: 0.7,
      stream: true,
    });

    // Return a streaming response
    return new StreamingTextResponse(response);
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    return Response.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
