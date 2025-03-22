'use client';
import { useEffect, useState } from 'react';

export default function LiveStreamAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/live-stream')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        setAlerts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live Stream Alerts</h1>
      
      {loading ? (
        <p>Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p>No upcoming streams yet.</p>
      ) : (
        <div className="space-y-6">
          {alerts.map(alert => (
            <div key={alert.id} className="border border-gray-700 rounded-lg p-4">
              <h2 className="text-xl font-bold">{alert.title}</h2>
              <p className="mt-2">{alert.body}</p>
              
              {alert.media_url && (
                <div className="mt-4">
                  {alert.media_url.includes('youtube.com') ? (
                    <iframe 
                      src={alert.media_url.replace('watch?v=', 'embed/')} 
                      frameBorder="0" 
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
