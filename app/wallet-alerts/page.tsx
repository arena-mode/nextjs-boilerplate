'use client';

import { useState, useEffect } from 'react';
import contentService from '../utils/contentService';

export default function WalletAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userTier] = useState('free'); // Replace with actual user tier from auth context

  useEffect(() => {
    async function fetchAlerts() {
      try {
        setLoading(true);
        // Use the contentService to fetch wallet alerts for the current user's tier
        const { data, error } = await contentService.getContentByTabAndTier('wallet-alerts', userTier);
        
        console.log('Wallet alerts data:', data);
        
        if (error) {
          throw new Error(error.message);
        }
        
        setAlerts(data || []);
      } catch (err) {
        console.error('Error fetching wallet alerts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAlerts();
  }, [userTier]);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="p-4">Loading wallet alerts...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Wallet Alerts</h1>
      
      {alerts.length === 0 ? (
        <p>No wallet alerts yet.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="border p-4 rounded bg-gray-800">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{alert.title}</h2>
                <span className="text-sm text-gray-400">{formatDate(alert.created_at)}</span>
              </div>
              
              <p className="mb-4">{alert.body}</p>
              
              {alert.media_url && (
                <div className="mb-4">
                  <img 
                    src={alert.media_url} 
                    alt={alert.title} 
                    className="max-w-full h-auto rounded"
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
