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
        
        // Fetching videos logic here
        const { data, error } = await contentService.getContentByTabAndTier('videos', userTier);
        
        // Log the fetched data
        console.log('Fetching videos', data); 

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
            <div key={video.id} className="border-b border-gray-800">
              <div className="p-4">
                {/* Title and timestamp in same row */}
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">{video.title}</h2>
                  <span className="text-gray-400 text-sm">
                    {formatTime(video.created_at)}
                  </span>
                </div>

                <p className="mb-3">{video.body}</p>
              </div>

              {video.media_url && getYoutubeId(video.media_url) ? (
                <div className="overflow-hidden rounded-2xl mx-4 mb-4" style={{ borderRadius: '16px' }}>
                  <div className="relative" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
                    <iframe 
                      src={`https://www.youtube.com/embed/${getYoutubeId(video.media_url)}`}
                      title={video.title}
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ borderRadius: '16px' }}
                    ></iframe>
                  </div>
                </div>
              ) : video.media_url ? (
                <div className="mx-4 mb-4">
                  <img 
                    src={video.media_url} 
                    alt={video.title} 
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
