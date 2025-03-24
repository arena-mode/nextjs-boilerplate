import { Client, GatewayIntentBits } from 'discord.js';

let alerts = []; // Temporary in-memory storage

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ alerts });
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  const token = process.env.DISCORD_BOT_TOKEN;

  client.once('ready', () => {
    console.log('Bot is online!');
  });

  client.on('messageCreate', (message) => {
    if (message.channel.id === 'YOUR_CHANNEL_ID' && !message.author.bot) {
      alerts.push({
        content: message.content,
        timestamp: new Date().toISOString(),
      });
      console.log('New alert:', message.content);
    }
  });

  await client.login(token);

  res.status(200).json({ message: 'Bot started' });
}
