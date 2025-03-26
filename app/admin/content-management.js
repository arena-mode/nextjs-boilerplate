'use client';

import { useState, useEffect } from 'react';
import contentService from '../utils/contentService';
import supabaseClient from '../../utils/supabaseClient'; // Fixed import


export default function ContentManagement() {
  const [selectedTab, setSelectedTab] = useState('live-stream-alerts');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContent();
  }, [selectedTab]);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Use contentService to fetch content for the selected tab
      const { data, error } = await contentService.getAllContentByTab(selectedTab);
      
      if (error) {
        throw error;
      }
      
      setContent(data || []);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleDeleteContent = async (id) => {
    if (!confirm('Are you sure you want to delete this content?')) {
      return;
    }
    
    try {
      // Use contentService to delete content
      const { error } = await contentService.deleteContent(id);
      
      if (error) {
        throw error;
      }
      
      // Refresh content list
      fetchContent();
    } catch (err) {
      console.error('Error deleting content:', err);
      alert(`Error deleting content: ${err.message}`);
    }
  };

  const handleToggleNotification = async (id, currentStatus) => {
    try {
      // Use contentService to toggle notification status
      const { error } = await contentService.updateNotificationStatus(id, !currentStatus);
      
      if (error) {
        throw error;
      }
      
      // Refresh content list
      fetchContent();
    } catch (err) {
      console.error('Error updating notification status:', err);
      alert(`Error updating notification: ${err.message}`);
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Helper to extract YouTube video ID
  const getYoutubeId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Content Management</h2>
      
      {/* Tab selector */}
      <div className="flex flex-wrap mb-4">
        <button
          className={`mr-2 mb-2 p-2 ${selectedTab === 'live-stream-alerts' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}
          onClick={() => handleTabChange('live-stream-alerts')}
        >
          Live Stream Alerts
        </button>
        <button
          className={`mr-2 mb-2 p-2 ${selectedTab === 'crypto-market' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}
          onClick={() => handleTabChange('crypto-market')}
        >
          Crypto Market
        </button>
        <button
          className={`mr-2 mb-2 p-2 ${selectedTab === 'videos' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}
          onClick={() => handleTabChange('videos')}
        >
          Videos
        </button>
        <button
          className={`mr-2 mb-2 p-2 ${selectedTab === 'posts' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}
          onClick={() => handleTabChange('posts')}
        >
          Posts
        </button>
        <button
          className={`mr-2 mb-2 p-2 ${selectedTab === 'wallet-alerts' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}
          onClick={() => handleTabChange('wallet-alerts')}
        >
          Wallet Alerts
        </button>
        <button
          className={`mr-2 mb-2 p-2 ${selectedTab === 'shorting' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}
          onClick={() => handleTabChange('shorting')}
        >
          Shorting
        </button>
        <button
          className={`mr-2 mb-2 p-2 ${selectedTab === 'cb-course' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}
          onClick={() => handleTabChange('cb-course')}
        >
          CB Course
        </button>
      </div>
      
      {loading ? (
        <p>Loading content...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : content.length === 0 ? (
        <p>No content available for {selectedTab}.</p>
      ) : (
        <div className="space-y-4">
          {content.map(item => (
            <div key={item.id} className="border border-gray-700 p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <span className="bg-blue-900 text-white text-xs px-2 py-1 rounded">
                  {item.tier || 'free'}
                </span>
              </div>
              
              <p className="mb-3">{item.body}</p>
              
              {item.media_url && getYoutubeId(item.media_url) && (
                <div className="mb-3">
                  <iframe 
                    width="200" 
                    height="113" 
                    src={`https://www.youtube.com/embed/${getYoutubeId(item.media_url)}`}
                    title={item.title}
                    allowFullScreen
                    className="rounded"
                  ></iframe>
                </div>
              )}
              
              {item.media_url && !getYoutubeId(item.media_url) && (
                <div className="mb-3">
                  <img 
                    src={item.media_url} 
                    alt={item.title} 
                    className="h-32 object-contain rounded"
                  />
                </div>
              )}
              
              <div className="text-sm text-gray-500 mb-3">
                Created: {formatDate(item.created_at)}
              </div>
              
              <div className="flex space-x-2">
                {/* Delete Button with Trash Icon */}
                <button
                  onClick={() => handleDeleteContent(item.id)}
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                
                {/* Notification Button with Bell Icon */}
                <button
                  onClick={() => handleToggleNotification(item.id, item.notified || item.send_notification)}
                  className={`p-2 rounded hover:opacity-80 ${
                    (item.notified || item.send_notification) 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-600 text-white'
                  }`}
                  title={
                    (item.notified || item.send_notification) 
                      ? 'Notification Enabled' 
                      : 'Enable Notification'
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
