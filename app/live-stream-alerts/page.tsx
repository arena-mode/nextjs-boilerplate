'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function LiveStreamAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient(
          'https://sosrdqwwmyzvnspfmyjd.supabase.co',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ'
        );
        
        const { data, error } = await supabase
          .from('content')
          .select('*')
          .eq('tab', 'live-stream-alerts');
          
        if (error) {
          console.error('Error:', error);
        } else {
          setAlerts(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live Stream Alerts</h1>
      
      {loading ? (
        <p>Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p>No upcoming streams yet.</p>
      ) : (
        <div>
          {alerts.map((alert) => (
            <div key={alert.id} className="border border-gray-700 rounded-lg p-4 mb-4">
              <h2 className="text-xl font-bold">{alert.title}</h2>
              <p>{alert.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
