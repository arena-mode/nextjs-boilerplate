"use client"; // Ensures it runs on the client-side

export const dynamic = 'force-dynamic'; // Avoid server-side pre-rendering issues

import { useEffect, useState } from 'react';

import { createGel } from '@gel/vercel-ai-provider'; // Replace with correct export name if needed

const ai = createGel({
    apiKey: process.env.YOUR_API_KEY, // Replace with your environment variable
    model: 'anthropic',
});

export default function TestSDK() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const testSDK = async () => {
            setLoading(true);
            const prompt = "What is the capital of France?";
            try {
                const sdkResponse = await ai.generateText({ prompt });
                setResponse(sdkResponse);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        testSDK();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>SDK Test</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {response && <p>Response: {JSON.stringify(response)}</p>}
        </div>
    );
}
