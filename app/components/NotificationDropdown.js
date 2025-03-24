// components/NotificationDropdown.js
'use client';

import { useState } from 'react';

export default function NotificationDropdown({ isOpen, onClose }) {
  // Mock data for testing UI first
  const mockNotifications = [
    {
      id: '1',
      title: 'New live stream scheduled',
      tab: 'live-stream-alerts',
      created_at: new Date(Date.now() - 30*60000).toISOString(),
      is_read: false
    },
    {
      id: '2',
      title: 'Price alert: BTC',
      tab: 'crypto-market',
      created_at: new Date(Date.now() - 24*60*60000).toISOString(),
      is_read: true
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute top-12 right-4 bg-black border border-gray-800 rounded-lg shadow-lg w-80 max-h-96 overflow-y-auto z-50">
      <div className="p-3 border-b border-gray-800">
        <h3 className="text-lg font-bold">Notifications</h3>
      </div>
      
      <div>
        {mockNotifications.map((notification) => (
          <div 
            key={notification.id}
            className={`p-3 border-b border-gray-800 hover:bg-gray-900 cursor-pointer ${
              !notification.is_read ? 'bg-gray-800/30' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm text-gray-400">
                  {notification.tab.replace(/-/g, ' ')}
                </p>
              </div>
              <span className="text-xs text-gray-500">
                {formatTime(notification.created_at)}
              </span>
            </div>
            {!notification.is_read && (
              <div className="mt-1">
                <span className="bg-blue-500 rounded-full h-2 w-2 inline-block"></span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Format time like X (Twitter)
function formatTime(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
