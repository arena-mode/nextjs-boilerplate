'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(3); // Example notification count
  
  const tabs = [
    { name: 'Live Stream Alerts', path: '/live-stream-alerts' },
    { name: 'Crypto Market', path: '/crypto-market' },
    { name: 'Videos', path: '/videos' },
    { name: 'Posts', path: '/posts' },
    { name: 'Wallet Alerts', path: '/wallet-alerts' },
    { name: 'Shorting', path: '/shorting' },
    { name: 'CB Course', path: '/cb-course' }
  ];

  return (
    <div className="w-full">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center">
          {/* Logo */}
          <div className="mr-4">
            <span className="text-white font-bold text-xl">Crypto Bellwether</span>
          </div>
        </div>
        
        {/* User Tier */}
        <div className="text-gray-300 mr-4">
          Free Tier
        </div>
        
        {/* Notification Bell */}
        <div className="relative">
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto bg-gray-900 border-b border-gray-800">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                isActive 
                  ? 'text-white border-b-2 border-blue-500' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
