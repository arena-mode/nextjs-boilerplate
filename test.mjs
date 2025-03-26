// Import the createGel function from the GEL SDK
import { createGel } from "@gel/vercel-ai-provider";

// Configure the GEL client
const client = createGel({
  apiKey: "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", // Replace with your actual API key
  model: "anthropic", // Specify the AI model
});

// Asynchronous function to test the GEL client
async function testGelClient() {
  console.log("⚡ Running GEL SDK test...");

  try {
    // Define a test prompt
    const prompt = "What is the capital of France?";

    // Generate text using the AI client
    const response = await client.generateText({ prompt });

    // Log the AI's response
    console.log("✅ Success! AI Response:", response);
  } catch (error) {
    // Log any error that occurs
    console.error("❌ Error during SDK test:", error.message);
  }
}

// Run the test function
testGelClient();
