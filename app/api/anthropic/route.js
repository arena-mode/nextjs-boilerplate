// app/api/anthropic/route.js
import { createGel } from '@gel/vercel-ai-provider';
import { NextResponse } from 'next/server';

// Initialize the SDK with your API key
// This keeps your API key secure on the server side
const anthropicClient = createGel({
  apiKey: process.env.ANTHROPIC_API_KEY // Note: No NEXT_PUBLIC_ prefix needed for server-side
});

export async function POST(request) {
  try {
    // Parse the incoming request
    const body = await request.json();
    const { messages, maxTokens = 1000, temperature = 0.7 } = body;
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }
    
    // Format messages for Anthropic API
    const formattedMessages = messages.map(msg => ({
      role: msg.role, // 'user' or 'assistant'
      content: msg.content
    }));
    
    // Call Anthropic API with conversation history
    const response = await anthropicClient.messages.create({
      model: 'claude-3-opus-20240229',
      messages: formattedMessages,
      max_tokens: maxTokens,
      temperature,
    });
    
    return NextResponse.json({
      success: true,
      result: response.content?.[0]?.text || '',
      usage: response.usage || null,
    });
    
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Something went wrong' 
      },
      { status: 500 }
    );
  }
}
