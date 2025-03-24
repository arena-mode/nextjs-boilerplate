import axios from 'axios';

export default async function handler(req, res) {
  const apiKey = process.env.CIELO_API_KEY;
  const wallet = req.query.wallet || '0xDefaultWalletAddress'; // Replace with your wallet

  try {
    const response = await axios.get(`https://api.cielo.finance/v1/feed?wallet=${wallet}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wallet data' });
  }
}
