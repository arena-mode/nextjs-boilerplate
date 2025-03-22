import React from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const tabs = [
    { name: 'Home', path: '/' },
    { name: 'Live Stream Alerts', path: '/live-stream-alerts' },
    { name: 'Crypto Market', path: '/crypto-market' },
    { name: 'Videos', path: '/videos' },
    { name: 'Posts', path: '/posts' },
    { name: 'Wallet Alerts', path: '/wallet-alerts' },
    { name: 'Shorting', path: '/shorting' },
    { name: 'CB Course', path: '/cb-course' },
  ];

  return (
    <div className="border-b border-gray-800">
      <nav className="flex overflow-x-auto py-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            
              key={tab.path}
              href={tab.path}
              className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-white'
              } relative`}
            >
              {tab.name}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
