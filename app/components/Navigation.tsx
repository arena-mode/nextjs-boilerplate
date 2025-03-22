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
    <div className="w-full overflow-x-auto no-scrollbar border-b border-gray-800">
      <nav className="flex space-x-1 py-2 px-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className="relative flex-shrink-0"
            >
              <div className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}>
                {tab.name}
              </div>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;
