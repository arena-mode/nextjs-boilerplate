"use client"; // Ensures this runs only on the client side

export const dynamic = "force-dynamic"; // Prevents server-side pre-rendering for this page

import { useEffect, useState } from "react";
import { createGel } from "@gel/vercel-ai-provider"; // Correct import

// Initialize the Gel client
const ai = createGel({
  apiKey: process.env.YOUR_API_KEY, // Reference your API key from .env
  model: "anthropic", // Specify the model
});

export default function TestSDK() {
  const [response, setResponse] = useState(null); // Store AI response
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const testSDK = async () => {
      setLoading(true);
      const prompt = "What is the capital of France?"; // Example prompt
      try {
        const sdkResponse = await ai.generateText({ prompt }); // Call SDK
        setResponse(sdkResponse); // Update response state
      } catch (err) {
        setError(err.message); // Capture and set error
      } finally {
        setLoading(false); // End loading state
      }
    };
    testSDK();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>SDK Test</h1>
      {loading && <p>Loading...</p>} {/* Show loading */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>} {/* Show errors */}
      {response && <p>Response: {JSON.stringify(response)}</p>} {/* Show AI response */}
    </div>
  );
}
