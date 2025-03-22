'use client';
import { useState } from 'react';
import { supabase } from '../utils/supabase';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [tab, setTab] = useState('live-stream-alerts');
  const [notified, setNotified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (password === 'CryptoBellwether') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('content')
        .insert([{ 
          title, 
          body, 
          media_url: mediaUrl,
          tab,
          notified
        }]);
        
      if (error) throw error;
      
      setMessage('Content posted successfully!');
      setTitle('');
      setBody('');
      setMediaUrl('');
      setTab('live-stream-alerts');
      setNotified(false);
    } catch (error) {
      setMessage('Error posting content');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button 
          onClick={handleLogin}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block mb-2">Select Tab</label>
          <select 
            value={tab} 
            onChange={(e) => setTab(e.target.value)}
            className="p-2 border rounded w-full"
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
          <label className="block mb-2">Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Content</label>
          <textarea 
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="p-2 border rounded w-full h-32"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Media URL</label>
          <input 
            type="text"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            className="p-2 border rounded w-full"
          />
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
          className="p-2 bg-green-500 text-white rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Content'}
        </button>
        
        {message && (
          <div className="mt-4 p-2 bg-gray-100 rounded">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
