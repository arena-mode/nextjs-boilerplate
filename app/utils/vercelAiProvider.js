// utils/vercelAiProvider.js

import { createAI } from '@gel/vercel-ai-provider'; // Import the SDK function

// Initialize the AI with your API key
const ai = createAI({
    apiKey: process.env.YOUR_API_KEY, // Correctly reference your environment variable
    model: 'anthropic' // Specify the model you want to use
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
