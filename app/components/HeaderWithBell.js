// components/HeaderWithBell.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NotificationDropdown from './NotificationDropdown';

export default function HeaderWithBell() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    
    setIsAuthenticated(authStatus);
    setIsAdmin(adminStatus);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setIsAdmin(false);
    router.push('/');
  };
  
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
        
        {isAuthenticated ? (
          <>
            {isAdmin && (
              <a href="/admin" className="text-xs opacity-80 hover:opacity-100">
                Admin
              </a>
            )}
            <button 
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="text-xl"
              aria-label="Notifications"
            >
              🔔
            </button>
            <button
              onClick={handleLogout}
              className="text-xs opacity-80 hover:opacity-100"
            >
              Logout
            </button>
            
            <NotificationDropdown 
              isOpen={notificationOpen} 
              onClose={() => setNotificationOpen(false)} 
            />
          </>
        ) : (
          <a href="/login" className="text-xs opacity-80 hover:opacity-100">
            Sign In
          </a>
        )}
      </div>
    </header>
  );
}
