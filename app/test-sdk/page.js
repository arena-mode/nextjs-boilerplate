"use client"; // Ensures this runs only on the client-side

export const dynamic = "force-dynamic"; // Prevent server-side pre-rendering for this page

import { useEffect, useState } from "react";
import { createHttpClient } from "@gel/vercel-ai-provider"; // Correct client-side API

// Initialize the client
const ai = createHttpClient({
    apiKey: process.env.YOUR_API_KEY, // Reference API key from .env
    model: "anthropic",
});

export default function TestSDK() {
    const [response, setResponse] = useState(null); // Store AI response
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const testSDK = async () => {
            setLoading(true);
            const prompt = "What is the capital of France?";

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
