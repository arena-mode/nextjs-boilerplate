import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "your-openai-key", // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

async function runTest() {
  try {
    console.log("Querying OpenAI GPT-4...");
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "What is the capital of France?",
      max_tokens: 10,
    });
    console.log("Response:", response.data.choices[0].text.trim());
  } catch (error) {
    console.error("❌ Error querying OpenAI:", error.message);
  }
}

runTest();
