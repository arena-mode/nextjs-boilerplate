// CoinGecko API service

export interface CoinPrice {
  price: number;
  change24h: number;
  lastUpdated: string;
}

/**
 * Fetches cryptocurrency price data from CoinGecko API
 * @param id CoinGecko coin id (e.g., 'bitcoin', 'ethereum')
 * @param currency Currency to get price in (e.g., 'usd', 'eur')
 * @returns Price data including current price, 24h change, and last updated timestamp
 */
export async function getCoinPrice(id: string, currency: string = 'usd'): Promise<CoinPrice> {
  try {
    // Free tier API endpoint for CoinGecko
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      {
        headers: {
          'Accept': 'application/json',
        },
        // Ensure cache is revalidated periodically
        next: { revalidate: 60 } // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      price: data.market_data.current_price[currency],
      change24h: data.market_data.price_change_percentage_24h / 100, // Convert to decimal
      lastUpdated: data.market_data.last_updated
    };
  } catch (error) {
    console.error('Error fetching coin price:', error);
    throw error;
  }
}

/**
 * Map common cryptocurrency symbols to CoinGecko IDs
 */
export const symbolToId: Record<string, string> = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'SOL': 'solana',
  'BNB': 'binancecoin',
  'XRP': 'ripple',
  'DOGE': 'dogecoin',
  'ADA': 'cardano',
  'DOT': 'polkadot',
  'AVAX': 'avalanche-2',
  'LINK': 'chainlink',
  'MATIC': 'matic-network',
  'UNI': 'uniswap',
  'LTC': 'litecoin',
  'SHIB': 'shiba-inu',
  'ATOM': 'cosmos',
};

/**
 * Converts a cryptocurrency symbol to its CoinGecko ID
 * @param symbol Cryptocurrency symbol (e.g., 'BTC', 'ETH')
 * @returns CoinGecko ID or the symbol in lowercase if no mapping exists
 */
export function getIdFromSymbol(symbol: string): string {
  return symbolToId[symbol] || symbol.toLowerCase();
}