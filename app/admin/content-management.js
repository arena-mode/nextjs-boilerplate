import supabaseClient from '../utils/supabaseClient.js';

export default async function ContentManagement() {
  const { data, error } = await supabaseClient
    .from('content')
    .select('*')
    .eq('tab', 'live-stream-alerts');

  console.log('Admin content:', data, 'Error:', error);

  return (
    <div>
      <h2>Content Management</h2>
      {error && <p>Error: {error.message}</p>}
      {data && data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>: {item.body}
            </li>
          ))}
        </ul>
      ) : (
        <p>No content available for Live Stream Alerts</p>
      )}
    </div>
  );
}
