"use client"; // Enforces the client-side environment

import { useState, useEffect } from "react";
import { createHttpClient } from "@gel/vercel-ai-provider"; // Use createHttpClient for browser-friendly SDK calls

export default function TestSDKPage() {
  const [response, setResponse] = useState(null); // Stores AI response
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For capturing errors

  // Runs when the component first mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Initialize createHttpClient
      const client = createHttpClient({
        apiKey: process.env.NEXT_PUBLIC_GEL_API_KEY, // Client-safe API key
        model: "anthropic",
      });

      try {
        // Call the AI API
        const result = await client.generateText({ prompt: "What is the capital of France?" });
        console.log("AI Response:", result);
        setResponse(result); // Set the response
      } catch (error) {
        console.error("Error:", error);
        setError(error.message || "An unknown error occurred.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Test SDK</h1>
      {loading && <p>Loading...</p>} {/* Show loading state */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>} {/* Show error message */}
      {response && <p>Response: {JSON.stringify(response)}</p>} {/* Show AI's response */}
    </div>
  );
}
