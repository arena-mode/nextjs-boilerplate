// vercel-dev.js
const { createVercelClient } = require('@vercel/client');

async function main() {
  const client = createVercelClient({
    token: process.env.VERCEL_TOKEN
  });

  // Example: Get project details
  try {
    const projects = await client.getProjects();
    console.log('Your Vercel projects:', projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}

main().catch(console.error);
