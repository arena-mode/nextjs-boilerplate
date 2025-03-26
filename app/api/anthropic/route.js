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
    const { prompt, maxTokens = 500 } = body;
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
    
    // Call Anthropic API
    const response = await anthropicClient.generate({
      model: 'claude-3-opus-20240229', // You can change the model as needed
      prompt,
      maxTokens,
    });
    
    // Return the response
    return NextResponse.json({
      success: true,
      result: response.text || response,
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
