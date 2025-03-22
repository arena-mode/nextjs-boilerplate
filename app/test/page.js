'use client';
import React, { useEffect, useState } from 'react';

export default function TestPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDirectly() {
      try {
        // Try with fetch directly
        const response = await fetch('/api/test');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    }
    
    fetchDirectly();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Test</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      <pre className="bg-gray-100 p-4 rounded mt-4 overflow-auto">
        {data ? JSON.stringify(data, null, 2) : 'No data'}
      </pre>
    </div>
  );
}
