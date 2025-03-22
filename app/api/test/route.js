import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabase = createClient(
    'https://sosrdqwwmyzvnspfmyjd.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ'
  );
  
  try {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .limit(10);
      
    return new Response(JSON.stringify({
      contentData: data || [],
      contentError: error ? error.message : null
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: err.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
