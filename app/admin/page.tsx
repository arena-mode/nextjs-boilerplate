'use client';

import { useState, useEffect } from 'react';
import supabaseClient from '../utils/supabaseClient.js';

export default function Auth() {
  // User Auth States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userTier, setUserTier] = useState('free');
  const [loading, setLoading] = useState(true);

  // Notification Toggle States
  const [notifications, setNotifications] = useState({
    liveStreamAlerts: false,
    cryptoMarket: false,
    videos: false,
    posts: false,
    walletAlerts: false
  });

  // Admin States
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabaseClient.auth.getSession();
      if (session) {
        const { user } = session;
        setIsAuthenticated(true);
        // Check if user is admin
        if (user.email === 'admin@cryptobellwether.com') {
          setIsAdmin(true);
        }
        // Get user tier from metadata or profile
        const { data: profile } = await supabaseClient
          .from('profiles')
          .select('tier')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setUserTier(profile.tier);
        }
        // Get saved notification preferences
        const { data: prefs } = await supabaseClient
          .from('notification_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (prefs) {
          setNotifications(prefs.preferences);
        }
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      setIsAuthenticated(true);
      if (data.user.email === 'admin@cryptobellwether.com') {
        setIsAdmin(true);
      }
      checkSession(); // Get user tier and preferences
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
    }
  };

  const handleAdminLogin = async () => {
    if (adminPassword !== 'CryptoBellwether') {
      alert('Incorrect admin password');
      return;
    }
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: 'admin@cryptobellwether.com',
        password: 'CryptoBellwether',
      });
      
      if (error) throw error;
      
      setIsAdmin(true);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Admin login error:', error);
      alert('Admin login failed: ' + error.message);
    }
  };

  const handleToggle = async (feature) => {
    // Check if feature is available for user's tier
    if (feature === 'walletAlerts' && userTier === 'free') {
      alert('Upgrade to access Wallet Alerts');
      return;
    }

    const updatedNotifications = {
      ...notifications,
      [feature]: !notifications[feature]
    };

    setNotifications(updatedNotifications);

    try {
      const { error } = await supabaseClient
        .from('notification_preferences')
        .upsert({
          user_id: (await supabaseClient.auth.getUser()).data.user.id,
          preferences: updatedNotifications
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving preferences:', error);
      // Revert toggle if save failed
      setNotifications(notifications);
    }
  };

  const handleLogout = async () => {
    try {
      await supabaseClient.auth.signOut();
      setIsAuthenticated(false);
      setIsAdmin(false);
      setNotifications({
        liveStreamAlerts: false,
        cryptoMarket: false,
        videos: false,
        posts: false,
        walletAlerts: false
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      {!isAuthenticated ? (
        // User Login Form
        <div className="space-y-4">
          <form onSubmit={handleUserLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded"
            />
            <button 
              type="submit"
              className="w-full p-2 bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded"
            >
              Sign In
            </button>
          </form>
        </div>
      ) : isAdmin ? (
        // Admin Dashboard (your existing admin content)
        <div>
          {/* Keep your existing admin dashboard code here */}
        </div>
      ) : (
        // User Notification Settings
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Notification Settings</h2>
            <span className="text-sm bg-[#2c2c2c] px-3 py-1 rounded">
              {userTier.toUpperCase()}
            </span>
          </div>

          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} 
              className={`flex items-center justify-between p-3 ${
                key === 'walletAlerts' && userTier === 'free'
                  ? 'bg-[#1a1a1a] opacity-75'
                  : 'bg-[#1a1a1a]'
              } rounded`}
            >
              <div>
                <h3 className="font-medium">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                {key === 'walletAlerts' && userTier === 'free' && (
                  <span className="text-sm text-gray-400">
                    Upgrade to enable
                  </span>
                )}
              </div>
              <button
                className={`w-12 h-6 rounded-full transition-colors ${
                  value && (key !== 'walletAlerts' || userTier !== 'free')
                    ? 'bg-blue-600' 
                    : 'bg-gray-600'
                }`}
                disabled={key === 'walletAlerts' && userTier === 'free'}
                onClick={() => handleToggle(key)}
              >
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                  value ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}

          <button 
            className="w-full p-2 mt-8 bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {/* Admin Login (small and subtle) */}
      {!isAuthenticated && (
        <div className="mt-8 text-left">
          <button
            onClick={() => {
              const pwd = prompt('Enter admin password');
              if (pwd) {
                setAdminPassword(pwd);
                handleAdminLogin();
              }
            }}
            className="text-sm text-gray-400 hover:text-gray-300"
          >
            Admin
          </button>
        </div>
      )}
    </div>
  );
}
