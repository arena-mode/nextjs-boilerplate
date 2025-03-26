"use client";  // Add this as the first line

import { useEffect, useState } from 'react';
import { createGel } from '@gel/vercel-ai-provider';
app/test-sdk.js

import { useEffect, useState } from 'react';
import { createGel } from '@gel/vercel-ai-provider'; // Import the SDK function

const ai = createGel({
    apiKey: process.env.YOUR_API_KEY, // Replace with your actual API key
    model: 'anthropic' // Specify the model for testing
});

export default function TestSDK() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const testSDK = async () => {
            setLoading(true);
            const prompt = "What is the capital of France?"; // A simple prompt for testing
            try {
                const sdkResponse = await ai.generateText({ prompt }); // Call the SDK directly
                setResponse(sdkResponse); // Set the response from the SDK
            } catch (err) {
                setError(err.message); // Capture any errors
            } finally {
                setLoading(false); // Update loading state
            }
        };

        testSDK(); // Call the test function
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>SDK Test</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {response && <p>Response: {JSON.stringify(response)}</p>} {/* Display the API response */}
        </div>
    );
}
