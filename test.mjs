import { createGel } from "@gel/vercel-ai-provider";

const client = createGel({
  apiKey: "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", // Replace with your actual API key
  model: "anthropic", // Specify the model
});

async function runTest() {
  try {
    console.log("Starting test...");
    const response = await client.generateText({
      prompt: "What is the capital of France?",
    });
    console.log("Response:", response);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

runTest();
