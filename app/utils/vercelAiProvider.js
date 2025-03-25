// utils/vercelAiProvider.js

import * as VercelAI from '@gel/vercel-ai-provider'; // Import everything to see available exports

// Initialize the AI with your API key
const ai = VercelAI.createAI({  // Use VercelAI to access the function
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
