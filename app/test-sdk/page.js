// app/test-sdk/page.js
'use client';

import { useState, useEffect } from 'react';
import { createGel } from '@gel/vercel-ai-provider'; // Changed from createHttpClient to createGel

export default function TestSDKPage() {
  const [result, setResult] = useState('Testing SDK...');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function testSDK() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
        
        if (!apiKey) {
          throw new Error('API key is not set in environment variables');
        }
        
        // Use createGel instead of createHttpClient
        const client = createGel({
          apiKey
        });
        
        // Test simple generation
        const response = await client.generate({
          model: 'claude-3-opus-20240229',
          prompt: 'Hello, world!',
          maxTokens: 100,
        });
        
        setResult(JSON.stringify(response, null, 2));
      } catch (err) {
        console.error('Error testing SDK:', err);
        setError(err.message || String(err));
      }
    }

    testSDK();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">SDK Test Page</h1>
      
      {error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          <h2 className="font-bold">Error:</h2>
          <p>{error}</p>
        </div>
      ) : (
        <pre className="p-4 bg-gray-100 rounded overflow-auto">
          {result}
        </pre>
      )}
    </div>
  );
}
