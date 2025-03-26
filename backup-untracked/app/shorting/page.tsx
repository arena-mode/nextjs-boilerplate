'use client';

import { useState, useEffect } from 'react';
import contentService from '../utils/contentService';

export default function Shorting() {
  const [shortingContent, setShortingContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userTier] = useState('free'); // Replace with actual user tier from auth context

  useEffect(() => {
    async function fetchShortingContent() {
      try {
        setLoading(true);
        // Use the contentService to fetch shorting content for the current user's tier
        const { data, error } = await contentService.getContentByTabAndTier('shorting', userTier);
        
        console.log('Shorting content data:', data);
        
        if (error) {
          throw new Error(error.message);
        }
        
        setShortingContent(data || []);
      } catch (err) {
        console.error('Error fetching shorting content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchShortingContent();
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
    return <div>Loading shorting strategies...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-black min-h-screen">
      <h1 className="text-2xl font-bold p-4">Shorting</h1>
      
      {shortingContent.length === 0 ? (
        <div className="p-4">
          <div className="border-b border-gray-800 pb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Shorting Strategy Video</h2>
            </div>
            <p className="mb-3">Sample shorting strategy</p>
            <div className="overflow-hidden rounded-2xl mb-4" style={{ borderRadius: '16px' }}>
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <iframe 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Shorting Video" 
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ borderRadius: '16px' }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {shortingContent.map((item) => (
            <div key={item.id} className="border-b border-gray-800">
              <div className="p-4">
                {/* Title and timestamp in same row */}
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <span className="text-gray-400 text-sm">
                    {formatTime(item.created_at)}
                  </span>
                </div>
                
                <p className="mb-3">{item.body}</p>
              </div>
              
              {item.media_url && getYoutubeId(item.media_url) ? (
                <div className="overflow-hidden rounded-2xl mx-4 mb-4" style={{ borderRadius: '16px' }}>
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <iframe 
                      src={`https://www.youtube.com/embed/${getYoutubeId(item.media_url)}`}
                      title={item.title}
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ borderRadius: '16px' }}
                    ></iframe>
                  </div>
                </div>
              ) : item.media_url ? (
                <div className="mx-4 mb-4">
                  <img 
                    src={item.media_url} 
                    alt={item.title} 
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
