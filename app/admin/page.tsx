'use client';

import { useState, useRef } from 'react';
import supabaseClient from '../utils/supabaseClient';

export default function Admin() {
  // Admin states
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tab, setTab] = useState('live-stream-alerts');
  const [accessTier, setAccessTier] = useState('free');
  const [mediaUrl, setMediaUrl] = useState('');
  const [sendNotification, setSendNotification] = useState(false);
  const fileInputRef = useRef(null);

  // User states
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [notifications, setNotifications] = useState({
    liveStreamAlerts: false,
    cryptoMarket: false,
    videos: false,
    posts: false,
    walletAlerts: false
  });

  const handleAdminLogin = async () => {
    if (password === 'your-admin-password') {
      setIsAdmin(true);
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    // Add your user authentication logic here
    setIsUser(true);
  };

  const handleToggle = (feature) => {
    setNotifications(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setIsUser(false);
  };

  // Show login screen if not authenticated
  if (!isAdmin && !isUser) {
    return (
      <div className="p-6">
        <h2 className="text-2xl mb-6">User Login</h2>
        
        <form onSubmit={handleUserLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded"
            />
          </div>
          
          <div>
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full p-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-gray-400 mb-2">Admin Access</h3>
          <div className="flex gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="flex-1 p-2 bg-[#1a1a1a] border border-gray-700 rounded"
            />
            <button 
              onClick={handleAdminLogin}
              className="px-4 py-2 bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show user notification settings
  if (isUser) {
    return (
      <div className="p-6">
        <h2 className="text-2xl mb-6">Notification Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded">
            <span>Live Stream Alerts</span>
            <button
              onClick={() => handleToggle('liveStreamAlerts')}
              className={`w-12 h-6 rounded-full relative ${
                notifications.liveStreamAlerts ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                notifications.liveStreamAlerts ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded">
            <span>Crypto Market</span>
            <button
              onClick={() => handleToggle('cryptoMarket')}
              className={`w-12 h-6 rounded-full relative ${
                notifications.cryptoMarket ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                notifications.cryptoMarket ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded">
            <span>Videos</span>
            <button
              onClick={() => handleToggle('videos')}
              className={`w-12 h-6 rounded-full relative ${
                notifications.videos ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                notifications.videos ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded">
            <span>Posts</span>
            <button
              onClick={() => handleToggle('posts')}
              className={`w-12 h-6 rounded-full relative ${
                notifications.posts ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                notifications.posts ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded">
            <span>Wallet Alerts</span>
            <button
              onClick={() => handleToggle('walletAlerts')}
              className={`w-12 h-6 rounded-full relative ${
                notifications.walletAlerts ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                notifications.walletAlerts ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 p-2 bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  // Show admin dashboard
  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6">Admin Dashboard</h2>
      
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
            value={accessTier}
            onChange={(e) => setAccessTier(e.target.value)}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
              className="px-4 py-2 bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded"
            >
              Browse
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                // Add your file upload logic here
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
          className="w-full p-2 bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded"
        >
          Post Content
        </button>

        <button
          onClick={handleLogout}
          className="w-full p-2 bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
