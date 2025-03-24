// components/NotificationDropdown.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import supabaseClient from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function NotificationDropdown({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const dropdownRef = useRef(null);

  // Fetch notifications when component mounts or when isOpen changes
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      fetchNotifications();
    }
  }, [isAuthenticated, isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Fetch user's notifications
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // Get current user
      const { data: userData } = await supabaseClient.auth.getUser();
      
      if (!userData?.user?.id) {
        setNotifications([]);
        return;
      }

      // Get notifications for user with content details
      const { data, error } = await supabaseClient
        .from('notifications')
        .select(`
          id, 
          is_read, 
          created_at,
          content:content_id (
            id, 
            title, 
            tab, 
            created_at
          )
        `)
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      setNotifications(data || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read and navigate to content
  const handleNotificationClick = async (notification) => {
    try {
      // Only update if not already read
      if (!notification.is_read) {
        await supabaseClient
          .from('notifications')
          .update({ is_read: true })
          .eq('id', notification.id);
      }
      
      // Navigate to the tab with the content
      if (notification.content?.tab) {
        router.push(`/${notification.content.tab}`);
      }
      
      onClose();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Format date like Twitter/X
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    // Less than a minute
    if (diff < 60000) {
      return 'just now';
    }
    
    // Less than an hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes}m`;
    }
    
    // Less than a day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours}h`;
    }
    
    // Less than a week
    if (diff < 604800000) {
      const days = Math.floor(diff / 86400000);
      return `${days}d`;
    }
    
    // Format as date
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-12 right-4 bg-black border border-gray-800 rounded-lg shadow-lg w-80 max-h-96 overflow-y-auto z-50"
    >
      <div className="p-3 border-b border-gray-800">
        <h3 className="text-lg font-bold">Notifications</h3>
      </div>
      
      {loading ? (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          No notifications yet
        </div>
      ) : (
        <div>
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`p-3 border-b border-gray-800 hover:bg-gray-900 cursor-pointer ${
                !notification.is_read ? 'bg-gray-800/30' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{notification.content?.title || 'Deleted content'}</p>
                  <p className="text-sm text-gray-400">
                    {notification.content?.tab?.replace(/-/g, ' ')}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(notification.created_at)}
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
      )}
    </div>
  );
}
