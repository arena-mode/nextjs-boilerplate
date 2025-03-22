import React from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <div className="border-b border-gray-800">
      <nav className="flex overflow-x-auto py-2">
        <a href="/" className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'} relative`}>
          Home
          {pathname === '/' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
        </a>
        <a href="/live-stream-alerts" className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${pathname === '/live-stream-alerts' ? 'text-white' : 'text-gray-400 hover:text-white'} relative`}>
          Live Stream Alerts
          {pathname === '/live-stream-alerts' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
        </a>
        <a href="/crypto-market" className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${pathname === '/crypto-market' ? 'text-white' : 'text-gray-400 hover:text-white'} relative`}>
          Crypto Market
          {pathname === '/crypto-market' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
        </a>
        <a href="/videos" className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${pathname === '/videos' ? 'text-white' : 'text-gray-400 hover:text-white'} relative`}>
          Videos
          {pathname === '/videos' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
        </a>
        <a href="/posts" className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${pathname === '/posts' ? 'text-white' : 'text-gray-400 hover:text-white'} relative`}>
          Posts
          {pathname === '/posts' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
        </a>
        <a href="/wallet-alerts" className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${pathname === '/wallet-alerts' ? 'text-white' : 'text-gray-400 hover:text-white'} relative`}>
          Wallet Alerts
          {pathname === '/wallet-alerts' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
        </a>
        <a href="/shorting" className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${pathname === '/shorting' ? 'text-white' : 'text-gray-400 hover:text-white'} relative`}>
          Shorting
          {pathname === '/shorting' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
        </a>
        <a href="/cb-course" className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${pathname === '/cb-course' ? 'text-white' : 'text-gray-400 hover:text-white'} relative`}>
          CB Course
          {pathname === '/cb-course' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
        </a>
      </nav>
    </div>
  );
}
