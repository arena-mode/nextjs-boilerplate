'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NotificationDropdown from './NotificationDropdown';
import { useAuth } from '../context/AuthContext';

export default function HeaderWithBell() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  
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
        
        {!isAuthenticated ? (
          <Link href="/login" className="text-xs opacity-50 hover:opacity-100">
            Sign In
          </Link>
        ) : user?.isAdmin ? (
          <Link href="/admin" className="text-xs opacity-50 hover:opacity-100">
            Admin
          </Link>
        ) : (
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="text-xs opacity-50 hover:opacity-100"
          >
            ↓
          </button>
        )}
        
        <button 
          onClick={() => setNotificationOpen(!notificationOpen)}
          className="text-xl"
          aria-label="Notifications"
        >
          🔔
        </button>
        
        <NotificationDropdown 
          isOpen={notificationOpen} 
          onClose={() => setNotificationOpen(false)} 
        />
        
        {userMenuOpen && isAuthenticated && !user?.isAdmin && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-gray-800">
              <h3 className="font-medium text-white">Account</h3>
            </div>
            <div className="p-3">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Notification Settings</h4>
                {['live-stream-alerts', 'crypto-market', 'videos', 'posts', 'wallet-alerts', 'shorting', 'cb-course'].map(tab => (
                  <div key={tab} className="flex items-center mb-2">
                    <label className="flex items-center cursor-pointer w-full">
                      <div className="relative mr-2">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={user?.notification_preferences?.[tab] || false}
                          onChange={() => updateNotificationPrefs(tab)}
                        />
                        <div className={`block w-8 h-5 rounded-full ${user?.notification_preferences?.[tab] ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition ${user?.notification_preferences?.[tab] ? 'transform translate-x-3' : ''}`}></div>
                      </div>
                      <div className="text-xs text-gray-300 capitalize">
                        {tab.replace(/-/g, ' ')}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              <button
                onClick={logout}
                className="w-full py-2 px-3 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
