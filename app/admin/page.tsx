'use client';

import { useState, useRef, useEffect } from 'react';
import supabaseClient from '../utils/supabaseClient.js';
import contentService from '../utils/contentService';
import ContentManagement from './content-management';

export default function Admin() {
  // Existing Admin States
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('add');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [tab, setTab] = useState('live-stream-alerts');
  const [tier, setTier] = useState('free');
  const [notified, setNotified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  // New User States
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [userTier, setUserTier] = useState('free');
  const [notifications, setNotifications] = useState({
    liveStreamAlerts: false,
    cryptoMarket: false,
    videos: false,
    posts: false,
    walletAlerts: false
  });

  // Existing Admin useEffect
  useEffect(() => {
    const checkSession = async () => {
      try {
        if (!supabaseClient.auth) {
          console.error('Auth is not available on the client');
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabaseClient.auth.getSession();
        
        if (data?.session) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  // Existing Admin Functions
  const handleLogin = async () => {
    if (password !== 'CryptoBellwether') {
      alert('Incorrect password');
      return;
    }
    
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: 'admin@cryptobellwether.com',
        password: 'CryptoBellwether',
      });
      
      if (error) {
        throw error;
      }
      
      setIsAuthenticated(true);
      setIsUser(false);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
    }
  };

  // New User Login Function
  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: userEmail,
        password: userPassword
      });
      
      if (error) throw error;
      
      setIsAuthenticated(true);
      setIsUser(true);
      
      // Get user tier and preferences
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('tier')
        .eq('id', data.user.id)
        .single();
      
      if (profile) {
        setUserTier(profile.tier);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
    }
  };

  // Existing Admin Logout
  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
      try {
        await supabaseClient.auth.signOut();
        setIsAuthenticated(false);
        setIsUser(false);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  };

  // Existing File Upload Function
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabaseClient.storage
        .from('images')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabaseClient.storage
        .from('images')
        .getPublicUrl(filePath);
        
      setMediaUrl(data.publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  // Existing Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await contentService.addContent({ 
        title, 
        body, 
        media_url: mediaUrl,
        tab,
        tier,
        notified: notified,
        send_notification: notified
      }, notified);
        
      if (error) throw error;
      
      setMessage('Content posted successfully!');
      setTitle('');
      setBody('');
      setMediaUrl('');
      setTab('live-stream-alerts');
      setTier('free');
      setNotified(false);
    } catch (error) {
      setMessage('Error posting content');
      console.error('Error adding content:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // New Notification Toggle Function
  const handleNotificationToggle = async (feature) => {
    if (feature === 'walletAlerts' && userTier === 'free') {
      alert('Upgrade required for Wallet Alerts');
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
      setNotifications(notifications);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4">
        {/* User Login Section */}
        <div className="mb-8 space-y-4">
          <h2 className="text-xl font-bold mb-4">User Login</h2>
          <form onSubmit={handleUserLogin} className="space-y-4">
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded"
              placeholder="Email"
            />
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded"
              placeholder="Password"
            />
            <button 
              type="submit"
              className="w-full p-2 bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Admin Login - Small at bottom */}
        <div className="mt-8 text-sm">
          <h3 className="text-gray-400 mb-2">Admin Access</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded mr-2"
            placeholder="Admin password"
          />
          <button 
            onClick={handleLogin}
            className="p-2 bg-gray-800 text-white rounded"
          >
            Admin Login
          </button>
        </div>
      </div>
    );
  }

  // Show User Dashboard if user is logged in
  if (isUser) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Notification Settings</h2>
          <span className="bg-[#2c2c2c] px-3 py-1 rounded">
            {userTier.toUpperCase()}
          </span>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div 
              key={key}
              className={`p-4 rounded ${
                key === 'walletAlerts' && userTier === 'free'
                  ? 'bg-[#1a1a1a] opacity-75'
                  : 'bg-[#1a1a1a]'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  {key === 'walletAlerts' && userTier === 'free' && (
                    <p className="text-sm text-gray-400">
                      Upgrade required
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleNotificationToggle(key)}
                  disabled={key === 'walletAlerts' && userTier === 'free'}
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
            </div>
          ))}
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

  // Show Admin Dashboard (Your existing admin content)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="flex mb-6 border-b border-gray-700">
        <button
          className={`px-4 py-2 mr-2 ${
            activeTab === 'add'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('add')}
        >
          Add Content
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 'manage'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('manage')}
        >
          Manage Content
        </button>
      </div>
      
      {activeTab === 'add' ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Select Tab</label>
            <select 
              value={tab} 
              onChange={(e) => setTab(e.target.value)}
              className="p-2 border rounded w-full bg-gray-800 text-white"
              style={{ fontSize: '16px' }}
            >
              <option value="live-stream-alerts">Live Stream Alerts</option>
              <option value="crypto-market">Crypto Market</option>
              <option value="videos">Videos</option>
              <option value="posts">Posts</option>
              <option value="wallet-alerts">Wallet Alerts</option>
              <option value="shorting">Shorting</option>
              <option value="cb-course">CB Course</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block">Access Tier</label>
            <select 
              value={tier} 
              onChange={(e) => setTier(e.target.value)}
              className="p-2 border rounded w-full bg-gray-800 text-white"
              style={{ fontSize: '16px' }}
            >
              <option value="free">Free</option>
              <option value="inner-circle">Inner Circle</option>
              <option value="shorting">Shorting</option>
              <option value="cb-course">CB Course</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block">Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block">Content</label>
            <textarea 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="p-2 border rounded w-full h-32"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block">Media</label>
            <div className="flex space-x-2">
              <input 
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="URL or upload/paste an image"
                className="p-2 border rounded flex-grow"
              />
              <button 
                type="button" 
                onClick={() => fileInputRef.current.click()}
                className="p-2 bg-gray-700 text-white rounded"
                disabled={uploadingImage}
              >
                {uploadingImage ? "Uploading..." : "Browse"}
              </button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
            {mediaUrl && (
              <div className="mt-2">
                <img src={mediaUrl} alt="Preview" className="h-20 object-contain" />
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input 
                type="checkbox"
                checked={notified}
                onChange={(e) => setNotified(e.target.checked)}
                className="mr-2"
              />
              Send notification
            </label>
          </div>
          
          <button 
            type="submit" 
            className="p-2 bg-gray-800 text-white rounded w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Content'}
          </button>
          
          {message && (
            <div className="mt-4 p-2 bg-gray-700 text-white rounded">
              {message}
            </div>
          )}
          
          <button 
            type="button"
            onClick={handleLogout}
            className="mt-8 p-2 bg-gray-700 text-white rounded w-full"
          >
            Logout
          </button>
        </form>
      ) : (
        <ContentManagement />
      )}
    </div>
  );
}
