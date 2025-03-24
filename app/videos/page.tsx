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

  if (loading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Videos</h1>
      
      {videos.length === 0 ? (
        <p>No videos available yet.</p>
      ) : (
        <div>
          {videos.map((video) => (
            <div key={video.id} className="border border-gray-700 mb-4">
              <div className="p-4">
                <h2 className="text-xl font-bold">{video.title}</h2>
                <p>{video.body}</p>
              </div>
              
              {video.media_url && getYoutubeId(video.media_url) && (
                <iframe 
                  width="100%" 
                  height="500"
                  src={`https://www.youtube.com/embed/${getYoutubeId(video.media_url)}`}
                  title={video.title}
                  allowFullScreen
                ></iframe>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
