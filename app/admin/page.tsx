import supabaseClient from '../utils/supabaseClient.js';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  // Check if user is authenticated
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session) {
    redirect('/admin/login'); // Redirect to login page if not authenticated
  }

  // Fetch content for Live Stream Alerts
  const { data, error } = await supabaseClient
    .from('content')
    .select('*')
    .eq('tab', 'live-stream-alerts');

  console.log('Admin content:', data, 'Error:', error);

  return (
    <div style={{ display: 'flex', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Side Panel */}
      <div style={{ width: '200px', marginRight: '20px' }}>
        <h2 style={{ color: '#fff' }}>Admin Dashboard</h2>
        <button
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            background: '#1e90ff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Content
        </button>
        <button
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            background: '#1e90ff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Manage Content
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <h2 style={{ color: '#ddd' }}>Content Management</h2>
        {error ? (
          <p style={{ color: 'red' }}>Error: {error.message}</p>
        ) : data && data.length > 0 ? (
          <div>
            {data.map((item) => (
              <div
                key={item.id}
                style={{
                  background: '#333',
                  padding: '10px',
                  margin: '10px 0',
                  borderRadius: '5px',
                  color: '#fff',
                }}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.media_url && (
                  <div>
                    {item.media_url.includes('youtube.com') ? (
                      <iframe
                        width="100%"
                        height="315"
                        src={item.media_url.replace('watch?v=', 'embed/')}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img
                        src={item.media_url}
                        alt={item.title}
                        style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#ddd' }}>No content available for Live Stream Alerts</p>
        )}
      </div>
    </div>
  );
}
