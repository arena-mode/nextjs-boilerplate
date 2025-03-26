// app/api/chat/route.js
import { StreamingTextResponse } from 'ai';
import { supabaseClient } from '@/utils/supabase-client';

export const runtime = 'edge';

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    const apiMessages = messages.map(message => ({
      role: message.role,
      content: message.content
    }));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        messages: apiMessages,
        max_tokens: 2000,
        temperature: 0.7,
        stream: true
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API error: ${error.error?.message || response.statusText}`);
    }

    const stream = AnthropicStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
