'use client';

import { useState, useEffect } from 'react';
import contentService from '../utils/contentService';

export default function WalletAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userTier] = useState('free'); // Replace with actual user tier from auth context

  useEffect(() => {
    async function fetchAlerts() {
      try {
        setLoading(true);
        // Use the contentService to fetch wallet alerts for the current user's tier
        const { data, error } = await contentService.getContentByTabAndTier('wallet-alerts', userTier);
        
        console.log('Wallet alerts data:', data);
        
        if (error) {
          throw new Error(error.message);
        }
        
        setAlerts(data || []);
      } catch (err) {
        console.error('Error fetching wallet alerts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAlerts();
  }, [userTier]);

  // Helper to extract YouTube video ID
  const getYoutubeId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Format time like X (Twitter)
  const formatTime = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      // Format as time for today's posts (e.g., "9:54pm")
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      // Format as "Mar 22" for older posts
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  if (loading) {
    return <div>Loading wallet alerts...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-black min-h-screen">
      <h1 className="text-2xl font-bold p-4">Wallet Alerts</h1>
      
      {alerts.length === 0 ? (
        <p className="p-4">No wallet alerts yet.</p>
      ) : (
        <div>
          {alerts.map((alert) => (
            <div key={alert.id} className="border-b border-gray-800">
              <div className="p-4">
                {/* Title and timestamp in same row */}
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">{alert.title}</h2>
                  <span className="text-gray-400 text-sm">
                    {formatTime(alert.created_at)}
                  </span>
                </div>
                
                <p className="mb-3">{alert.body}</p>
              </div>
              
              {alert.media_url && getYoutubeId(alert.media_url) ? (
                <div className="overflow-hidden rounded-2xl mx-4 mb-4" style={{ borderRadius: '16px' }}>
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <iframe 
                      src={`https://www.youtube.com/embed/${getYoutubeId(alert.media_url)}`}
                      title={alert.title}
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ borderRadius: '16px' }}
                    ></iframe>
                  </div>
                </div>
              ) : alert.media_url ? (
                <div className="mx-4 mb-4">
                  <img 
                    src={alert.media_url} 
                    alt={alert.title} 
                    className="rounded-2xl w-full"
                    style={{ borderRadius: '16px' }}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
