'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Create a fresh Supabase client for this component
const supabaseUrl = 'https://sosrdqwwmyzvnspfmyjd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function LiveStreamAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('content')
          .select('*')
          .eq('tab', 'live-stream-alerts')
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        console.log("Fetched data:", data);
        setAlerts(data || []);
      } catch (err) {
        console.error('Error fetching alerts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAlerts();
  }, []);

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Live Stream Alerts</h1>
        <div className="text-red-500">Error loading content: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live Stream Alerts</h1>
      
      {loading ? (
        <p>Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p>No upcoming streams yet.</p>
      ) : (
        <div className="space-y-6">
          {alerts.map((alert) => (
            <div key={alert.id} className="border border-gray-700 rounded-lg p-4">
              <h2 className="text-xl font-bold">{alert.title}</h2>
              <p className="mt-2">{alert.body}</p>
              
              {alert.media_url && (
                <div className="mt-4">
                  {alert.media_url.includes('youtube.com') || alert.media_url.includes('youtu.be') ? (
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe 
                        src={alert.media_url.replace('watch?v=', 'embed/')} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-64"
                      ></iframe>
                    </div>
                  ) : (
                    <img 
                      src={alert.media_url} 
                      alt={alert.title} 
                      className="max-h-64 rounded"
                    />
                  )}
                </div>
              )}
              
              <div className="mt-2 text-gray-500 text-sm">
                {new Date(alert.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
