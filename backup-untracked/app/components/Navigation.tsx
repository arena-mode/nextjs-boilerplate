import React from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <div className="border-b border-gray-800">
      <nav className="flex overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white">
        <a href="/" className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
          Home
        </a>
        <a href="/live-stream-alerts" className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/live-stream-alerts' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
          Live Stream Alerts
        </a>
        <a href="/crypto-market" className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/crypto-market' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
          Crypto Market
        </a>
        <a href="/videos" className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/videos' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
          Videos
        </a>
        <a href="/posts" className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/posts' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
          Posts
        </a>
        <a href="/wallet-alerts" className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/wallet-alerts' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
          Wallet Alerts
        </a>
        <a href="/shorting" className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/shorting' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
          Shorting
        </a>
        <a href="/cb-course" className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/cb-course' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
          CB Course
        </a>
      </nav>
    </div>
  );
}
