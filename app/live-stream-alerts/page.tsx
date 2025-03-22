'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function LiveStreamAlerts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create a single Supabase client for interacting with your database
    const supabaseUrl = 'https://sosrdqwwmyzvnspfmyjd.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ';
    const supabase = createClient(supabaseUrl, supabaseKey);

    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('content')
          .select('*');
        
        if (error) throw error;
        
        console.log('Data fetched:', data);
        setPosts(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live Stream Alerts</h1>
      
      {posts.length === 0 ? (
        <p>No content available</p>
      ) : (
        <div>
          <p>Found {posts.length} posts</p>
          <div className="mt-4 space-y-4">
            {posts.map(post => (
              <div key={post.id} className="border p-4 rounded">
                <h2 className="font-bold">{post.title}</h2>
                <p>{post.body}</p>
                <p className="text-sm mt-2">Tab: {post.tab}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
