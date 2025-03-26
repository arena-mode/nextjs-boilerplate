import { createGel } from '@gel/vercel-ai-provider';

const client = createGel({
  apiKey: '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',
  model: 'anthropic',
});

async function runTest() {
  try {
    console.log('Creating connection...');
    // Check client resolved configuration
    console.log('Client:', client);

    // Check available methods
    for (const key in client) {
      console.log(`${key}: ${typeof client[key]}`);
    }

    // Generate text
    const response = await client.generateText
      ? client.generateText({ prompt: 'What is the capital of France?' })
      : '⚠ No generateText() method found.';
    console.log('Response:', response);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
  }
}

runTest();
