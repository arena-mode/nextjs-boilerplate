'use client';

import { useState, useEffect } from 'react';
import contentService from '../utils/contentService';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userTier] = useState('free'); // Replace with actual user tier from auth context

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        // Use the contentService to fetch posts for the current user's tier
        const { data, error } = await contentService.getContentByTabAndTier('posts', userTier);
        
        console.log('Posts data:', data);
        
        if (error) {
          throw new Error(error.message);
        }
        
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
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
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-black min-h-screen">
      <h1 className="text-2xl font-bold p-4">Posts</h1>
      
      {posts.length === 0 ? (
        <p className="p-4">No posts available yet.</p>
      ) : (
        <div>
          {posts.map((post) => (
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
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
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
