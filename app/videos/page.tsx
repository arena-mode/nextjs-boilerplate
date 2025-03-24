'use client';

import { useState, useEffect } from 'react';
import contentService from '../utils/contentService';

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userTier] = useState('free'); // Replace with actual user tier from auth context

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        // Use the contentService to fetch videos for the current user's tier
        const { data, error } = await contentService.getContentByTabAndTier('videos', userTier);
        
        console.log('Videos data:', data);
        
        if (error) {
          throw new Error(error.message);
        }
        
        setVideos(data || []);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
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
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-black min-h-screen">
      <h1 className="text-2xl font-bold p-4">Videos</h1>
      
      {videos.length === 0 ? (
        <p className="p-4">No videos available yet.</p>
      ) : (
        <div>
          {videos.map((video) => (
            <div key={video.id} className="border-b border-gray-800 p-4">
              <div className="text-gray-400 mb-1">
                {formatTime(video.created_at)}
              </div>
              
              <h2 className="text-xl font-bold mb-1">{video.title}</h2>
              
              <p className="mb-3">{video.body}</p>
              
              {video.media_url && getYoutubeId(video.media_url) ? (
                <div className="mb-3">
                  <div className="rounded-xl overflow-hidden">
                    <iframe 
                      width="100%" 
                      height="400"
                      src={`https://www.youtube.com/embed/${getYoutubeId(video.media_url)}`}
                      title={video.title}
                      allowFullScreen
                      className="w-full"
                    ></iframe>
                  </div>
                </div>
              ) : video.media_url ? (
                <div className="mb-3">
                  <img 
                    src={video.media_url} 
                    alt={video.title} 
                    className="rounded-xl w-full"
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
