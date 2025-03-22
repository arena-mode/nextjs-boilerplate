'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function LiveStreamAlerts() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient(
          'https://sosrdqwwmyzvnspfmyjd.supabase.co',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ'
        );

        const { data, error } = await supabase
          .from('content')
          .select('*')
          .eq('tab', 'live-stream-alerts');

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
