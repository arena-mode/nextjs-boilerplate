'use client';
import { useEffect, useState } from 'react';

export default function LiveStreamAlerts() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/test');
        const result = await response.json();
        
        if (result.contentData) {
          // Filter for live-stream-alerts tab content only
          const liveStreamContent = result.contentData.filter(item => 
            item.tab === 'live-stream-alerts'
          );
          setContent(liveStreamContent);
        } else {
          setError('No content returned');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Live Stream Alerts</h1>
      
      {content.length === 0 ? (
        <p>No upcoming streams yet.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {content.map((item) => (
            <div key={item.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-2">{item.body}</p>
              
              {item.media_url && item.media_url.includes('youtube.com') && (
                <div className="mt-4 aspect-video">
                  <iframe 
                    src={item.media_url.replace('watch?v=', 'embed/')} 
                    className="w-full h-full"
                    allowFullScreen
                    title={item.title}
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
