import { StreamingTextResponse, AnthropicStream } from 'ai';

// IMPORTANT: Set the runtime to edge
export const runtime = 'edge';

export async function POST(req) {
  const { messages } = await req.json();

  // Call Anthropic API
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20240307',
      messages,
      stream: true,
      max_tokens: 4000
    }),
  });

  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response);
  
  // Respond with the stream
  return new StreamingTextResponse(stream);
}import { Configuration, OpenAIApi } from 'openai';
import { StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's compatible with the Vercel AI SDK)
const config = new Configuration({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req) {
  const { messages } = await req.json();

  // Ask Claude for a streaming chat completion
  const response = await openai.createChatCompletion({
    model: 'claude-3-5-sonnet',
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
