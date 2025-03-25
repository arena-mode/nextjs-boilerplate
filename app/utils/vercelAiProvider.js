// utils/vercelAiProvider.js

import { createGel } from '@gel/vercel-ai-provider'; // Import the correct function

// Initialize the AI with your API key
const ai = createGel({
    apiKey: process.env.YOUR_API_KEY, // Your API key
    model: 'anthropic' // Specify the model
});

// Function to generate code
export async function generateCode(prompt) {
    try {
        const response = await ai.generateText({ prompt }); // Call the AI to generate text
        return response; // Return the generated code response
    } catch (error) {
        console.error("Error using Vercel AI Provider:", error); // Log any errors
        throw error; // Rethrow the error for further handling
    }
}
