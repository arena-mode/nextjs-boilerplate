import React, { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const scrollRef = useRef(null);
  
  useEffect(() => {
    // Find the active tab element
    if (scrollRef.current) {
      const activeTabElement = scrollRef.current.querySelector('[data-active="true"]');
      if (activeTabElement) {
        // Scroll the active tab into view when the component mounts
        activeTabElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [pathname]);
  
  return (
    <div className="border-b border-gray-800">
      <div className="relative">
        <nav 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'white transparent' }}
        >
          <a href="/" data-active={pathname === '/'} className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            Home
          </a>
          <a href="/live-stream-alerts" data-active={pathname === '/live-stream-alerts'} className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/live-stream-alerts' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            Live Stream Alerts
          </a>
          <a href="/crypto-market" data-active={pathname === '/crypto-market'} className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/crypto-market' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            Crypto Market
          </a>
          <a href="/videos" data-active={pathname === '/videos'} className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/videos' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            Videos
          </a>
          <a href="/posts" data-active={pathname === '/posts'} className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/posts' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            Posts
          </a>
          <a href="/wallet-alerts" data-active={pathname === '/wallet-alerts'} className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/wallet-alerts' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            Wallet Alerts
          </a>
          <a href="/shorting" data-active={pathname === '/shorting'} className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/shorting' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            Shorting
          </a>
          <a href="/cb-course" data-active={pathname === '/cb-course'} className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${pathname === '/cb-course' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            CB Course
          </a>
        </nav>
      </div>
    </div>
  );
}
