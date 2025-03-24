'use client';

import { useState } from 'react';
import NotificationDropdown from './NotificationDropdown';

export default function HeaderWithClient() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  
  return (
    <header className="flex justify-between p-4 bg-black text-white">
      <div className="flex items-center gap-2">
        <img 
          src="/goat.png" 
          alt="Crypto Bellwether" 
          width={32} 
          height={32} 
          className="rounded-full"
        />
        <span className="font-bold text-xl text-white">Crypto Bellwether</span>
      </div>
      <div className="flex items-center gap-4 relative">
        <span>Free Tier</span>
        <a href="/login" className="text-xs hover:opacity-100">Sign In</a>
        <button 
          onClick={() => setNotificationOpen(!notificationOpen)}
          className="relative"
          aria-label="Notifications"
        >
          <span className="text-xl">🔔</span>
        </button>
        
        <NotificationDropdown 
          isOpen={notificationOpen} 
          onClose={() => setNotificationOpen(false)} 
        />
      </div>
    </header>
  );
}
