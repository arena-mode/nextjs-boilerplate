'use client';
import { useState, useEffect } from 'react';
import supabaseClient from '../utils/supabaseClient.js';

// Update these to match exactly what's in the database (from your screenshots)
const tabs = [
  "live-stream-alerts",
  "crypto-market", 
  "videos",
  "posts",
  "wallet-alerts",
  "shorting",
  "cb-course"
];

const tabLabels = {
  "live-stream-alerts": "Live Stream Alerts",
  "crypto-market": "Crypto Market",
  "videos": "Videos",
  "posts": "Posts",
  "wallet-alerts": "Wallet Alerts",
  "shorting": "Shorting",
  "cb-course": "CB Course"
};

export default function ContentManagement() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionStatus, setActionStatus] = useState({ message: '', isError: false });

  // Fetch content for the selected tab
  useEffect(() => {
    const fetchContent = async () => {
  setLoading(true);
  try {
    console.log("Fetching content for tab:", selectedTab); // Debug log
    console.log("Supabase client available:", !!supabaseClient);
    
    // Try to fetch all content without filtering by tab
    const allContentResult = await supabaseClient
      .from('content')
      .select('*')
      .order('created_at', { ascending: false });
    
    console.log("All content query result:", allContentResult);
    
    // Original query with tab filter
    const { data, error } = await supabaseClient
      .from('content')
      .select('*')
      .eq('tab', selectedTab)
      .order('created_at', { ascending: false });
    
    console.log("Filtered content result:", { data, error });
    
    if (error) throw error;
    setContent(data || []);
  } catch (err) {
    console.error('Error fetching content:', err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

    fetchContent();
  }, [selectedTab]);

  // Handle delete content
  const handleDelete = async (id) => {
    try {
      setActionStatus({ message: 'Deleting...', isError: false });
      
      const { error } = await supabaseClient
        .from('content')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Remove the deleted item from the content state
      setContent(content.filter(item => item.id !== id));
      setActionStatus({ message: 'Content deleted successfully!', isError: false });
      
      // Clear status message after 3 seconds
      setTimeout(() => {
        setActionStatus({ message: '', isError: false });
      }, 3000);
    } catch (err) {
      console.error('Error deleting content:', err);
      setActionStatus({ message: `Error deleting content: ${err.message}`, isError: true });
    }
  };

  // Handle notify for content
  const handleNotify = async (id) => {
    try {
      setActionStatus({ message: 'Setting notification...', isError: false });
      
      const { error } = await supabaseClient
        .from('content')
        .update({ notified: true })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update the notified status in the content state
      setContent(content.map(item => 
        item.id === id ? { ...item, notified: true } : item
      ));
      
      setActionStatus({ message: 'Notification set successfully!', isError: false });
      
      // Clear status message after 3 seconds
      setTimeout(() => {
        setActionStatus({ message: '', isError: false });
      }, 3000);
    } catch (err) {
      console.error('Error setting notification:', err);
      setActionStatus({ message: `Error setting notification: ${err.message}`, isError: true });
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    if (!url || !url.includes('youtube.com')) return null;
    
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    
    return match && match[1] ? match[1] : null;
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Content Management</h1>
      
      {/* Status message */}
      {actionStatus.message && (
        <div className={`p-3 mb-4 rounded ${actionStatus.isError ? 'bg-red-800' : 'bg-green-800'}`}>
          {actionStatus.message}
        </div>
      )}
      
      {/* Tab selector */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded whitespace-nowrap ${
                selectedTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* Content list */}
      {loading ? (
        <p>Loading content...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : content.length === 0 ? (
        <p>No content available for {tabLabels[selectedTab]}.</p>
      ) : (
        <div className="space-y-6">
          {content.map((item) => (
            <div key={item.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleNotify(item.id)}
                    className={`p-2 rounded ${
                      item.notified ? 'bg-green-700 text-white' : 'bg-gray-700 hover:bg-blue-700'
                    }`}
                    disabled={item.notified}
                    title={item.notified ? 'Already notified' : 'Set notification'}
                  >
                    🔔
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded bg-gray-700 hover:bg-red-700"
                    title="Delete content"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mb-3">
                Posted: {formatDate(item.created_at)}
              </p>
              
              {/* Display media preview */}
              {item.media_url && getYouTubeVideoId(item.media_url) && (
                <div className="mb-3 aspect-video max-h-60 overflow-hidden">
                  <img 
                    src={`https://img.youtube.com/vi/${getYouTubeVideoId(item.media_url)}/0.jpg`}
                    alt="YouTube thumbnail"
                    className="w-full object-cover"
                  />
                </div>
              )}
              
              <p className="text-gray-300">{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
