'use client';

import CryptoPrice from '../components/CryptoPrice';

export default function CryptoDemoPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Crypto Price Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CryptoPrice symbol="BTC" />
        <CryptoPrice symbol="ETH" />
        <CryptoPrice symbol="SOL" />
        <CryptoPrice symbol="BNB" />
        <CryptoPrice symbol="DOGE" />
        <CryptoPrice symbol="ADA" />
      </div>
    </div>
  );
}