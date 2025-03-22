'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function LiveStreamAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create Supabase client directly in the component
    const supabaseUrl = 'https://sosrdqwwmyzvnspfmyjd.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ';
    const supabase = createClient(supabaseUrl, supabaseKey);

    async function fetchAlerts() {
      try {
        const { data, error } = await supabase
          .from('content')
          .select('*')
          .eq('tab', 'live-stream-alerts')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        console.log("Data received:", data);
        setAlerts(data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    }

    fetchAlerts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live Stream Alerts</h1>
      
      {error && (
        <div className="bg-red-100 p-3 mb-4 rounded text-red-700">
          Error: {error}
        </div>
      )}
      
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
                    <iframe 
                      src={alert.media_url.replace('watch?v=', 'embed/')} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="w-full h-64"
                    ></iframe>
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
