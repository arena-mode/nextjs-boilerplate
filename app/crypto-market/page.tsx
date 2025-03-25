'use client';

import { useState, useEffect } from 'react';
import contentService from '../utils/contentService';

export default function CryptoMarket() {
  const [marketContent, setMarketContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userTier] = useState('free'); // Replace with actual user tier from auth context

  useEffect(() => {
    async function fetchMarketContent() {
      try {
        setLoading(true);
        // Use the contentService to fetch crypto market content for the current user's tier
        const { data, error } = await contentService.getContentByTabAndTier('crypto-market', userTier);
        
        console.log('Crypto market data:', data);
        
        if (error) {
          throw new Error(error.message);
        }
        
        setMarketContent(data || []);
      } catch (err) {
        console.error('Error fetching crypto market content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMarketContent();
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

  return (
    <div className="bg-black min-h-screen">
      <h1 className="text-2xl font-bold p-4">Crypto Market</h1>
      
      {/* CryptoBubbles iframe - always present at the top */}
      <div className="mb-4">
        <iframe src="https://cryptobubbles.net" className="w-full h-[calc(100vh-80px)]" />
      </div>
      
      {loading ? (
        <div className="p-4">Loading market content...</div>
      ) : error ? (
        <div className="p-4 text-red-500">Error: {error}</div>
      ) : marketContent.length === 0 ? (
        <div className="p-4">No market posts yet.</div>
      ) : (
        <div>
          {marketContent.map((post) => (
            <div key={post.id} className="border-b border-gray-800">
              <div className="p-4">
                {/* Title and timestamp in same row */}
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <span className="text-gray-400 text-sm">
                    {formatTime(post.created_at)}
                  </span>
                </div>
                
                <p className="mb-3">{post.body}</p>
              </div>
              
              {post.media_url && getYoutubeId(post.media_url) ? (
                <div className="overflow-hidden rounded-2xl mx-4 mb-4" style={{ borderRadius: '16px' }}>
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>  {/* 16:9 aspect ratio */}
                    <iframe 
                      src={`https://www.youtube.com/embed/${getYoutubeId(post.media_url)}`}
                      title={post.title}
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ borderRadius: '16px' }}
                    ></iframe>
                  </div>
                </div>
              ) : post.media_url ? (
                <div className="mx-4 mb-4">
                  <img 
                    src={post.media_url} 
                    alt={post.title} 
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
