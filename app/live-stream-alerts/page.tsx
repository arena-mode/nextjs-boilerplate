'use client';
import { useEffect, useState } from 'react';

export default function LiveStreamAlerts() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Direct fetch to Supabase REST API
    fetch('https://sosrdqwwmyzvnspfmyjd.supabase.co/rest/v1/content?select=*&tab=eq.live-stream-alerts', {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Data received:', data);
      setContent(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
    });
  }, []);
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live Stream Alerts</h1>
      
      {loading ? (
        <p>Loading alerts...</p>
      ) : content.length === 0 ? (
        <p>No upcoming streams yet.</p>
      ) : (
        <div className="space-y-6">
          {content.map(item => (
            <div key={item.id} className="border border-gray-700 rounded-lg p-4">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="mt-2">{item.body}</p>
              
              {item.media_url && (
                <div className="mt-4">
                  {item.media_url.includes('youtube.com') ? (
                    <iframe 
                      src={item.media_url.replace('watch?v=', 'embed/')} 
                      frameBorder="0" 
                      allowFullScreen
                      className="w-full h-64"
                    ></iframe>
                  ) : (
                    <img 
                      src={item.media_url} 
                      alt={item.title} 
                      className="max-h-64 rounded"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
