// app/login/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPrefs, setShowPrefs] = useState(false);
  const [notificationPrefs, setNotificationPrefs] = useState({
    'live-stream-alerts': true,
    'crypto-market': true,
    'videos': true,
    'posts': true,
    'wallet-alerts': true,
    'shorting': true,
    'cb-course': true
  });
  const [notificationStyle, setNotificationStyle] = useState('alerting');
  
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Handle admin login
      if (email === 'crypto-bellwether.com' && password === 'CryptoBellwether') {
        // Admin login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isAdmin', 'true');
        router.push('/admin');
        return;
      }
      
      // For demo, show notification prefs after login
      // In production, this would verify credentials with Supabase
      setShowPrefs(true);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = () => {
    // Save preferences to localStorage for demo
    // In production, this would save to Supabase
    localStorage.setItem('notificationPrefs', JSON.stringify(notificationPrefs));
    localStorage.setItem('notificationStyle', notificationStyle);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isAdmin', 'false');
    
    router.push('/');
  };

  const toggleNotification = (tab) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [tab]: !prev[tab]
    }));
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-black border border-gray-800 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">
        {showPrefs ? 'Notification Preferences' : 'Sign In'}
      </h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-800 text-red-200 rounded">
          {error}
        </div>
      )}
      
      {!showPrefs ? (
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Email</label>
            <input 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      ) : (
        <div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Notification Style</h2>
            <div className="flex border border-gray-700 rounded overflow-hidden">
              <button
                onClick={() => setNotificationStyle('silent')}
                className={`flex-1 py-2 ${notificationStyle === 'silent' ? 'bg-blue-600' : 'bg-gray-800'}`}
              >
                Silent
              </button>
              <button
                onClick={() => setNotificationStyle('alerting')}
                className={`flex-1 py-2 ${notificationStyle === 'alerting' ? 'bg-blue-600' : 'bg-gray-800'}`}
              >
                Sound Alerts
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Choose how you want to be notified</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Notify Me About</h2>
            <div className="space-y-3 border border-gray-700 rounded p-4">
              {Object.keys(notificationPrefs).map(tab => (
                <div key={tab} className="flex items-center justify-between">
                  <span className="capitalize">{tab.replace(/-/g, ' ')}</span>
                  <button
                    onClick={() => toggleNotification(tab)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${
                      notificationPrefs[tab] ? 'bg-blue-600' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${
                      notificationPrefs[tab] ? 'translate-x-6' : ''
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSavePreferences}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Save Preferences
            </button>
            <button
              onClick={() => setShowPrefs(false)}
              className="w-full py-2 px-4 bg-transparent hover:bg-gray-800 border border-gray-700 text-white rounded"
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
      
      {showPrefs && (
        <div className="mt-6 pt-6 border-t border-gray-800">
          <button
            onClick={() => router.push('/')}
            className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
