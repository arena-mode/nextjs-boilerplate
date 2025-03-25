'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function Troubleshoot() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testSupabase = async () => {
      try {
        // Create a fresh Supabase client directly in this component
        const supabaseUrl = 'https://sosrdqwwmyzvnspfmyjd.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ';
        
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Try a simple query
        const { data, error } = await supabase
          .from('content')
          .select('*')
          .eq('tab', 'live-stream-alerts')
          .limit(5);
        
        if (error) throw error;
        
        setResults(data);
      } catch (err) {
        console.error('Error testing Supabase:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    testSupabase();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Troubleshooting</h1>
      
      {loading ? (
        <p>Testing Supabase connection...</p>
      ) : error ? (
        <div className="text-red-500">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div>
          <p className="mb-2">Results: {results ? results.length : 0} items found</p>
          
          <pre className="bg-gray-800 p-4 rounded overflow-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
