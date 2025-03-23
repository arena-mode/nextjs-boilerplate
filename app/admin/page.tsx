'use client';
import { useEffect, useState } from 'react';
import supabaseClient from '../utils/supabaseClient.js';

export default function LiveStreamAlerts() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
   const fetchData = async () => {
  try {
    console.log("Fetching live stream alerts data...");
    
    // Add this line to check the Supabase client
    console.log("Supabase client:", supabaseClient);
    
    // Order by created_at descending to show newest first
    console.log("About to execute query with parameters:", { tab: 'live-stream-alerts' });
    
    const { data, error } = await supabaseClient
      .from('content')
      .select('*')
      .eq('tab', 'live-stream-alerts')
      .order('created_at', { ascending: false });
    
    // Add more detailed logging
    console.log("Query completed");
    console.log("Data returned:", data); // Log the actual data array
    console.log("Error returned:", error); // Log any errors
    console.log("Data type:", typeof data);
   console.log("Data length:", data ? data.length : 'N/A');
    
    if (error) throw error;
    setContent(data || []);
  } catch (err) {
    console.error('Error fetching data:', err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
    
    fetchData();
  }, []);

  function getYouTubeEmbedUrl(url) {
    if (!url) return '';
    
    // Extract video ID using regex to handle different YouTube URL formats
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    // If we couldn't extract the ID, return the original URL
    return url;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Live Stream Alerts</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div>
          <p className="text-red-500">Error: {error}</p>
        </div>
      ) : content.length === 0 ? (
        <div>
          <p>No upcoming streams yet.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-8">
          {content.map((item) => (
            <div key={item.id} className="mb-6">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-2">{item.body}</p>
              
              {item.media_url && item.media_url.includes('youtube.com') && (
                <div className="mt-4 aspect-video">
                  <iframe 
                    src={getYouTubeEmbedUrl(item.media_url)}
                    className="w-full h-full"
                    allowFullScreen
                    title={item.title}
                  />
                </div>
              )}
              
              {/* Display regular images if not YouTube */}
              {item.media_url && !item.media_url.includes('youtube.com') && (
                <div className="mt-4">
                  <img 
                    src={item.media_url} 
                    alt={item.title}
                    className="max-w-full rounded"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
