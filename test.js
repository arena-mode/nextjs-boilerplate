// Set a dummy DSN so that createGel resolves the connection parameters.
// Replace the dummy DSN with your project's actual DSN if needed.
process.env.GEL_DSN = "gel://dummy:dummy@localhost:5432/dummy";

const { createGel } = require("@gel/vercel-ai-provider");

// Initialize the Gel client with your API key and choose the model.
// Note: We use a new variable name ("gelClientInstance") to avoid redeclaration errors.
const gelClientInstance = createGel({
  apiKey: "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",
  model: "anthropic"
});

// Log the client to verify configuration.
console.log(gelClientInstance);

// Optionally, define an async function to test client functionality.
// (Please consult the documentation to ensure that generateText is the correct method.)
async function testGelClient() {
  try {
    const prompt = "What is the capital of France?";
    // Uncomment the following line if the client is expected to have a generateText method.
    // const response = await gelClientInstance.generateText({ prompt });
    // console.log("AI Response:", response);
  } catch (error) {
    console.error("Error using the Gel client:", error.message);
  }
}

testGelClient();
