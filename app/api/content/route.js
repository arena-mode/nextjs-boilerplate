import { createClient } from '@supabase/supabase-js';

export async function GET(request) {
  // URL parameters
  const url = new URL(request.url);
  const tab = url.searchParams.get('tab');
  
  // Initialize Supabase client
  const supabase = createClient(
    'https://sosrdqwwmyzvnspfmyjd.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ'
  );
  
  let query = supabase.from('content').select('*');
  
  // If tab is specified, filter by tab
  if (tab) {
    query = query.eq('tab', tab);
  }
  
  // Order by created_at
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
