'use client';

import { useState, useEffect } from 'react';
import contentService from '../utils/contentService';
import supabaseClient from '../utils/supabaseClient';

// Define interfaces for type safety
interface Stream {
  id: string;
  title: string;
  body: string;
  media_url?: string;
  created_at: string;
}

interface ContentResponse {
  data: Stream[] | null;
  error: Error | null;
}

export default function LiveStreamAlerts() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userTier] = useState<string>('free');

  useEffect(() => {
    async function fetchStreams() {
      try {
        setLoading(true);
        const { data, error }: ContentResponse = await contentService.getContentByTabAndTier('live-stream-alerts', userTier);
        
        console.log('Live stream alerts data:', data);
        
        if (error) {
          throw new Error(error.message);
        }
        
        setStreams(data || []);
      } catch (err: any) {
        console.error('Error fetching live stream alerts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStreams();
  }, [userTier]);

  const getYoutubeId = (url: string): string | null => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const formatTime = (dateString: string): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  if (loading) {
    return <div>Loading live stream alerts...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-black min-h-screen">
      <h1 className="text-2xl font-bold p-4">Live Stream Alerts</h1>
      
      {streams.length === 0 ? (
        <p className="p-4">No upcoming streams yet.</p>
      ) : (
        <div>
          {streams.map((stream: Stream) => (
            <div key={stream.id} className="border-b border-gray-800">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">{stream.title}</h2>
                  <span className="text-gray-400 text-sm">
                    {formatTime(stream.created_at)}
                  </span>
                </div>
                
                <p className="mb-3">{stream.body}</p>
              </div>
              
              {stream.media_url && getYoutubeId(stream.media_url) ? (
                <div className="overflow-hidden rounded-2xl mx-4 mb-4" style={{ borderRadius: '16px' }}>
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <iframe 
                      src={`https://www.youtube.com/embed/${getYoutubeId(stream.media_url)}`}
                      title={stream.title}
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ borderRadius: '16px' }}
                    ></iframe>
                  </div>
                </div>
              ) : stream.media_url ? (
                <div className="mx-4 mb-4">
                  <img 
                    src={stream.media_url} 
                    alt={stream.title} 
                    className="rounded-2xl w-full"
                    style={{ borderRadius: '16px' }}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
