import supabaseClient from '../utils/supabaseClient.js';

export default async function LiveStreamAlerts() {
  // Fetch all content to see if any data is returned
  const { data: allData, error: allError } = await supabaseClient
    .from('content')
    .select('*');
  
  console.log('All content:', allData, 'All error:', allError);

  // Fetch specific tab with exact value
  const { data, error } = await supabaseClient
    .from('content')
    .select('*')
    .eq('tab', 'live-stream-alerts');

  console.log('Filtered content for live-stream-alerts:', data, 'Error:', error);

  return (
    <div>
      <h1>Live Stream Alerts</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
