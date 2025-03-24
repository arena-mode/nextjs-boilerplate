'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';
import Link from 'next/link';

export default function HeaderWithBell() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  
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
        <span>{user?.tier || 'Free Tier'}</span>
        <Link href="/login" className="text-xs opacity-50 hover:opacity-100">
          {isAuthenticated ? (user?.isAdmin ? 'Admin' : 'Account') : 'Sign In'}
        </Link>
        <button 
          onClick={() => setNotificationOpen(!notificationOpen)}
          className="text-xl cursor-pointer"
          aria-label="Notifications"
        >
          🔔
        </button>
        
        <NotificationDropdown 
          isOpen={notificationOpen} 
          onClose={() => setNotificationOpen(false)} 
        />
      </div>
    </header>
  );
}
