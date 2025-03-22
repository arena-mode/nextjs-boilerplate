'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function LiveStreamAlerts() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        setDebug(prev => ({...prev, step1: "Started fetch"}));
        
        const supabase = createClient(
          'https://sosrdqwwmyzvnspfmyjd.supabase.co',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ'
        );
        
        setDebug(prev => ({...prev, step2: "Created Supabase client"}));

        const { data, error } = await supabase
          .from('content')
          .select('*')
          .eq('tab', 'live-stream-alerts');
        
        setDebug(prev => ({...prev, step3: "Query completed", dataLength: data?.length, error: error?.message}));

        console.log("Query result:", { data, error });
        
        if (error) throw error;
        setContent(data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setDebug(prev => ({...prev, error: err.message}));
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Live Stream Alerts</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div>
          <p className="text-red-500">Error: {error}</p>
          <pre className="mt-4 bg-gray-800 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(debug, null, 2)}
          </pre>
        </div>
      ) : content.length === 0 ? (
        <div>
          <p>No upcoming streams yet.</p>
          <pre className="mt-4 bg-gray-800 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(debug, null, 2)}
          </pre>
        </div>
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
