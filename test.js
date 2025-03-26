// Use the `createGel` function from the SDK
const { createGel } = require("@gel/vercel-ai-provider");

// Set relevant environment variables or configuration
const apiKey = "sk-ant-api03-mxK..."; // Replace with your actual API key
// Optional: If your environment uses DSN information
process.env.GEL_DSN = "gel://dummy:dummy@localhost:5432/dummy";

// Initialize the Gel client
const client = createGel({
  apiKey, // Your API key
  model: "anthropic", // AI model
});

// Test an AI request
async function testGelClient() {
  console.log("⚡ Running GEL SDK test...");

  try {
    // Define a simple test prompt
    const prompt = "What is the capital of France?";
    
    // Ensure you use the correct method provided by the SDK for generating text
    const response = await client.generateText({ prompt });
    
    // Log the response from the AI
    console.log("✅ Success! AI Response:", response);
  } catch (error) {
    // Catch and log any errors during the test
    console.error("❌ Error during GEL SDK test:", error.message);
  }
}

testGelClient();
