'use client';

import { useState, useRef, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Page = () => {
  // Managing hydration
  const [isClient, setIsClient] = useState(false);
  
  // Auth states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Content states
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tab, setTab] = useState('live-stream-alerts');
  const [tier, setTier] = useState('free');
  const [mediaUrl, setMediaUrl] = useState('');
  const [sendNotification, setSendNotification] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notification states
  const [notifications, setNotifications] = useState({
    liveStreamAlerts: false,
    cryptoMarket: false,
    videos: false,
    posts: false,
    walletAlerts: false
  });

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      setIsAuthenticated(true);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed');
    }
  };

  const handleAdminLogin = async () => {
    if (adminPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: process.env.NEXT_PUBLIC_ADMIN_EMAIL!,
          password: adminPassword
        });
        
        if (error) throw error;
        setIsAuthenticated(true);
        setIsAdmin(true);
      } catch (error) {
        console.error('Error:', error);
        alert('Admin login failed');
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // Show loading state during hydration
  if (!isClient) {
    return null;
  }

  // Login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-md mx-auto p-6">
          <h2 className="text-xl mb-6">User Login</h2>
          
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
              className="w-full p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8">
            <h3 className="text-sm text-gray-400 mb-2">Admin Access</h3>
            <div className="flex gap-2">
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Admin password"
                className="flex-1 p-2 bg-[#1a1a1a] border border-gray-700 rounded"
              />
              <button 
                onClick={handleAdminLogin}
                className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded"
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User notification settings view
  if (isAuthenticated && !isAdmin) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-md mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Notification Settings</h2>
            <span className="text-sm bg-[#2a2a2a] px-3 py-1 rounded">
              {tier.toUpperCase()}
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div 
                key={key}
                className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded"
              >
                <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <button
                  onClick={() => setNotifications(prev => ({
                    ...prev,
                    [key]: !prev[key]
                  }))}
                  className={`w-12 h-6 rounded-full relative ${
                    value ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                      value ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-8 p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Admin dashboard view
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-xl mb-6">Admin Dashboard</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Select Tab</label>
            <select 
              value={tab}
              onChange={(e) => setTab(e.target.value)}
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded"
            >
              <option value="live-stream-alerts">Live Stream Alerts</option>
              <option value="crypto-market">Crypto Market</option>
              <option value="videos">Videos</option>
              <option value="posts">Posts</option>
              <option value="wallet-alerts">Wallet Alerts</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Access Tier</label>
            <select 
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded"
            >
              <option value="free">Free</option>
              <option value="pro">Pro</option>
              <option value="elite">Elite</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Content</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded h-32"
            />
          </div>

          <div>
            <label className="block mb-2">Media</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="URL or upload/paste an image"
                className="flex-1 p-2 bg-[#1a1a1a] border border-gray-700 rounded"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded"
              >
                Browse
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  // Add file upload logic here
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sendNotification}
              onChange={(e) => setSendNotification(e.target.checked)}
              className="rounded"
            />
            <label>Send notification</label>
          </div>

          <button 
            className="w-full p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded"
          >
            Post Content
          </button>

          <button
            onClick={handleLogout}
            className="w-full p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
