import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sosrdqwwmyzvnspfmyjd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ';

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'crypto-bellwether-auth'
  }
});

export default supabaseClient;
