// test-ai.js
import { generateText } from 'ai'; 
import { openai } from '@ai-sdk/openai';

async function testAI() {
    const { text } = await generateText({
        model: openai('gpt-4o'),
        system: 'You are a helpful assistant.',
        prompt: 'What insights can you provide on using AI for development?',
    });

    console.log(text);
}

testAI();
