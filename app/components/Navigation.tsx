import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
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
    <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      <nav className="flex items-center space-x-1 py-2 border-b border-gray-800">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`px-4 py-2 whitespace-nowrap rounded-md text-sm transition-colors ${
                isActive
                  ? 'text-white bg-gray-800'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;
