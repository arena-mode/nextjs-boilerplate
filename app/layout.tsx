import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-8 mt-12">
        <img 
          src="/goat.png" 
          alt="Crypto Bellwether" 
          width={80} 
          height={80} 
          className="rounded-full mx-auto"
        />
      </div>
      
      <h1 className="text-4xl font-bold mb-4">Welcome to Crypto Bellwether</h1>
      <p className="mb-8 max-w-xl">
        Your comprehensive cryptocurrency platform for alerts, market updates, and exclusive content.
      </p>
      
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/live-stream-alerts" className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded">
          Live Stream Alerts
        </Link>
        <Link href="/videos" className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded">
          Videos
        </Link>
        <Link href="/posts" className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded">
          Posts
        </Link>
      </div>
    </div>
  );
}
}
