'use client';

import { useState, useEffect } from 'react';
import { getCoinPrice, getIdFromSymbol, CoinPrice } from '../services/coinGeckoApi';

interface CryptoPriceProps {
  symbol: string;
  currency?: string;
  refreshInterval?: number;
  className?: string;
}

export default function CryptoPrice({
  symbol,
  currency = 'usd',
  refreshInterval = 60000, // 1 minute
  className = '',
}: CryptoPriceProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceData, setPriceData] = useState<CoinPrice | null>(null);

  useEffect(() => {
    // Function to fetch crypto price data
    const fetchPriceData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Convert symbol to CoinGecko ID
        const coinId = getIdFromSymbol(symbol);
        
        // Fetch real price data from CoinGecko
        const data = await getCoinPrice(coinId, currency.toLowerCase());
        setPriceData(data);
      } catch (err) {
        console.error('Error fetching crypto price:', err);
        setError('Failed to fetch price data');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchPriceData();

    // Set up interval for refreshing data
    const intervalId = setInterval(fetchPriceData, refreshInterval);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [symbol, currency, refreshInterval]);

  // Format price according to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  // Format the timestamp to a user-friendly format
  const formatLastUpdated = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={`rounded-lg bg-gray-800 border border-gray-700 p-4 ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium">{symbol.toUpperCase()}/{currency.toUpperCase()}</h3>
        
        {loading && !priceData && (
          <div className="h-6 w-24 bg-gray-700 animate-pulse rounded"></div>
        )}
        
        {!loading && error && (
          <div className="text-red-500 text-sm">Error loading data</div>
        )}
        
        {priceData && !loading && (
          <div className="flex flex-col items-end">
            <span className="text-xl font-semibold">
              {formatPrice(priceData.price)}
            </span>
            <span 
              className={`text-sm ${
                priceData.change24h >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {priceData.change24h >= 0 ? '↑' : '↓'} 
              {Math.abs(priceData.change24h * 100).toFixed(2)}%
            </span>
          </div>
        )}
      </div>
      
      {priceData && (
        <div className="text-xs text-gray-400 mt-2">
          Last updated: {formatLastUpdated(priceData.lastUpdated)}
        </div>
      )}
    </div>
  );
}