'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function LiveStreamAlerts() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debug, setDebug] = useState('No debug info yet');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create client directly
        const supabase = createClient(
          'https://sosrdqwwmyzvnspfmyjd.supabase.co',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ'
        );

        setDebug('Supabase client created');
        
        // Fetch all data from the content table
        const { data, error } = await supabase
          .from('content')
          .select('*')
          .eq('tab', 'live-stream-alerts');
        
        if (error) {
          setDebug(`Error: ${error.message}`);
          throw error;
        }
        
        setDebug(`Data fetched: ${JSON.stringify(data)}`);
        setContent(data || []);
      } catch (error) {
        setDebug(`Caught error: ${error.message}`);
        console.error('Error:', error);
      } finally {
