'use client';

import { useState, useEffect } from 'react';
import contentService from '../utils/contentService';
import Link from 'next/link';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userTier] = useState('free'); // Replace with actual user tier from auth context

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        // Use the new contentService to fetch posts for the current user's tier
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

  if (loading) {
    return <div className="container mx-auto p-4">Loading posts...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Posts</h1>
      
      {posts.length === 0 ? (
        <p>No posts available yet.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div key={post.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="mb-4">{post.body}</p>
              
              {post.media_url && (
                <div className="mb-4">
                  {post.media_url.includes('youtube.com') || post.media_url.includes('youtu.be') ? (
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe 
                        src={`https://www.youtube.com/embed/${getYoutubeId(post.media_url)}`}
                        title={post.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-64"
                      ></iframe>
                    </div>
                  ) : (
                    <img 
                      src={post.media_url} 
                      alt={post.title} 
                      className="max-w-full h-auto rounded"
                    />
                  )}
                </div>
              )}
              
              <div className="text-sm text-gray-500">
                Posted: {formatDate(post.created_at)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function to extract YouTube video ID
function getYoutubeId(url) {
  if (!url) return null;
  
  // Handle various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
}

// Helper function to format dates
function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
