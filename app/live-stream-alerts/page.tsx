import supabaseClient from '../utils/supabaseClient.js';

export default async function LiveStreamAlerts() {
  const { data, error } = await supabaseClient
    .from('content')
    .select('*')
    .eq('tab', 'live-stream-alerts');

  console.log('Data:', data, 'Error:', error);

  return (
    <div>
      <h1>Live Stream Alerts</h1>
      {/* Add rendering logic later */}
    </div>
  );
}
