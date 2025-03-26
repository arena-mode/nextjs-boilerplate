"use client"; // Ensures the component is client-side only

import { useEffect, useState } from "react";
import { createHttpClient } from "@gel/vercel-ai-provider"; // Use HTTP Client for browsers

export default function TestSDK() {
  const [response, setResponse] = useState(null); // To store API responses
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // To capture errors

  useEffect(() => {
    const runTest = async () => {
      setLoading(true);
      const httpClient = createHttpClient({
        apiKey: process.env.NEXT_PUBLIC_GEL_API_KEY, // Use NEXT_PUBLIC for browser compatibility
        model: "anthropic",
      });

      try {
        const result = await httpClient.generateText({
          prompt: "What is the capital of France?",
        });
        setResponse(result); // Set the response data
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    runTest(); // Trigger the test on load
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
