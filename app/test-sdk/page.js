"use client"; // Ensures this runs only on the client-side

import { useEffect, useState } from "react";
import { createHttpClient } from "@gel/vercel-ai-provider"; // Correctly using `createHttpClient`

export default function TestSDK() {
  const [response, setResponse] = useState(null); // Stores API response
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Captures errors

  useEffect(() => {
    const runTest = async () => {
      setLoading(true);

      // Use `createHttpClient` with proper API key
      const client = createHttpClient({
        apiKey: process.env.NEXT_PUBLIC_GEL_API_KEY, // Ensure it's in the environment variables
        model: "anthropic",
      });

      try {
        const result = await client.generateText({
          prompt: "What is the capital of France?",
        });
        setResponse(result); // Store the AI's response
        console.log("AI Response:", result);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    runTest(); // Run the test when the component mounts
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test SDK</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {response && <p>Response: {JSON.stringify(response)}</p>}
    </div>
  );
}
