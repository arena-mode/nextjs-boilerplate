'use client';
import { useState } from 'react';
import { supabase } from '../../utils/supabase';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    media_url: '',
    tab: 'live-stream-alerts',
    notified: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = () => {
    if (password === 'CryptoBellwether') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const { data, error } = await supabase
        .from('content')
        .insert([
          { 
            title: formData.title,
            body: formData.body,
            media_url: formData.media_url,
            tab: formData.tab,
            notified: formData.notified
          }
        ]);
        
      if (error) throw error;
      
      setSubmitMessage('Content posted successfully!');
      // Reset form
      setFormData({
        title: '',
        body: '',
        media_url: '',
        tab: 'live-stream-alerts',
        notified: false
      });
    } catch (error) {
      setSubmitMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="mt-4">
          <label className="block">User Tier View</label>
          <select className="p-2 border rounded">
            <option>Free Tier</option>
            <option>Inner Circle</option>
            <option>Shorting</option>
            <option>CB Course</option>
            <option>Free + Shorting</option>
            <option>Inner Circle + CB Course</option>
            <option>All Tiers</option>
          </select>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Manage Content</h2>
          <form onSubmit={handleContentSubmit}>
            <div className="mt-2">
              <label className="block">Select Tab</label>
              <select 
                name="tab"
                value={formData.tab}
                onChange={handleInputChange}
                className="p-2 border rounded"
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
            <div className="mt-2">
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title" 
                className="p-2 border rounded w-full" 
                required
              />
              <textarea 
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                placeholder="Content" 
                className="p-2 border rounded w-full mt-2"
                required
              />
              <input 
                type="text" 
                name="media_url"
                value={formData.media_url}
                onChange={handleInputChange}
                placeholder="YouTube URL (for Videos/Shorting/CB Course)" 
                className="p-2 border rounded w-full mt-2" 
              />
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input 
                    type="checkbox" 
                    name="notified"
                    checked={formData.notified}
                    onChange={handleInputChange}
                    className="mr-2" 
                  />
                  Trigger Alert
                </label>
              </div>
              <button 
                type="submit" 
                className="mt-2 p-2 bg-green-500 text-white rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
              
              {submitMessage && (
                <div className={`mt-2 p-2 rounded ${submitMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {submitMessage}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <input
        type="password"
        placeholder="Enter password"
        className="p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit} className="ml-2 p-2 bg-blue-500 text-white rounded">Submit</button>
      <p>Password: CryptoBellwether</p>
    </div>
  );
}
