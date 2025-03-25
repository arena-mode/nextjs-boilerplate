// app/test/page.js

'use client'; // This line tells Next.js that this is a client component

import { useEffect, useState } from 'react';
import { generateCode } from '../../utils/vercelAiProvider'; // Adjust the path as necessary

export default function TestPage() {
    const [codeSnippet, setCodeSnippet] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCode = async () => {
            setLoading(true); // Set loading state to true
            try {
                // Prompting the AI to generate a simple React component code
                const prompt = "Create a simple React component that displays 'Hello, World!'";
                const generatedText = await generateCode(prompt); // Call the SDK function
                if (typeof generatedText === 'string') {
                    setCodeSnippet(generatedText); // Update the state with the generated text
                } else {
                    setError("Unexpected response format");
                }
            } catch (err) {
                setError(err.message); // Capture and display error messages
            } finally {
                setLoading(false); // Reset loading state
            }
        };

        fetchCode(); // Invoke the function to fetch code
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>SDK Code Generation Test</h1>
            {loading && <p>Loading...</p>} {/* Loading message */}
            {error && <p className="text-red-500">Error: {error}</p>} {/* Error message */}
            <h2>Generated Code:</h2>
            <pre style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "5px" }}>
                <code>{codeSnippet}</code> {/* Display the generated code */}
            </pre>
        </div>
    );
}
