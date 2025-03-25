'use client';
import { createClient } from '@supabase/supabase-js';

// Create a single instance of the Supabase client to use throughout the app
const supabaseUrl = 'https://sosrdqwwmyzvnspfmyjd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ';

// Simple query to test connection on client initialization
const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'crypto-bellwether-auth'
  }
});

// Test query on initialization 
if (typeof window !== 'undefined') {
  supabaseClient
    .from('content')
    .select('*')
    .limit(1)
    .then(result => {
      console.log('Initialization test query result:', result);
    })
    .catch(error => {
      console.error('Initialization test query error:', error);
    });
}

export default supabaseClient;
