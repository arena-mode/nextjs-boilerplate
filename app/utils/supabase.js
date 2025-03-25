'use client';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sosrdqwwmyzvnspfmyjd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ';

let supabase;

try {
  // Log version info to help diagnose issues
  console.log('Creating Supabase client...');
  
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true
    }
  });
  
  console.log('Supabase client created:', supabase);
  
  // Check if auth is available
  if (supabase.auth) {
    console.log('Auth module is available');
  } else {
    console.log('Auth module is NOT available');
  }
} catch (error) {
  console.error('Error creating Supabase client:', error);
  // Provide a fallback to prevent app crashes
  supabase = { auth: { getSession: () => ({ data: null, error: new Error('Auth not available') }) } };
}

export { supabase };
