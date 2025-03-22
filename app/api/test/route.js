import { createClient } from '@supabase/supabase-js';

export async function GET() {
  // Initialize Supabase client
  const supabase = createClient(
    'https://sosrdqwwmyzvnspfmyjd.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ'
  );
  
  try {
    // First try to get the database system time to confirm connection
    const { data: timeData, error: timeError } = await supabase.rpc('now');
    
    if (timeError) {
      return new Response(JSON.stringify({ 
        error: timeError.message,
        connectionTest: 'Failed' 
      }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }
    
    // If connection works, get content
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .limit(10);
      
    // Return everything for debugging
    return new Response(JSON.stringify({
      connectionTest: 'Success',
      time: timeData,
      contentData: data || [],
      contentError: error ? error.message : null,
      contentCount: data ? data.length : 0
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: err.message,
      stack: err.stack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
