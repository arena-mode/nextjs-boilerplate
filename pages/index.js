import { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('wallet-alerts');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (activeTab === 'wallet-alerts') {
      fetch('/api/discord-bot')
        .then((res) => res.json())
        .then((data) => setAlerts(data.alerts || []))
        .catch((err) => console.error(err));
    }
  }, [activeTab]);

  return (
    <div>
      <button onClick={() => setActiveTab('home')}>Home</button>
      <button onClick={() => setActiveTab('wallet-alerts')}>Wallet Alerts</button>

      {activeTab === 'home' && <h1>Home Tab</h1>}
      {activeTab === 'wallet-alerts' && (
        <div>
          <h1>Wallet Alerts</h1>
          {alerts.length > 0 ? (
            <ul>
              {alerts.map((alert, index) => (
                <li key={index}>
                  {alert.timestamp}: {alert.content}
                </li>
              ))}
            </ul>
          ) : (
            <p>No alerts yet...</p>
          )}
        </div>
      )}
    </div>
  );
}
