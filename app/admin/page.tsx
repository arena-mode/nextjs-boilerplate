'use client';
import { useState, useRef } from 'react';
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
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const handleLogin = () => {
    if (password === 'CryptoBellwether') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabase.storage
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

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        handleImageUpload(file);
        break;
      }
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
      console.error(error);
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
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6" onPaste={handlePaste}>
        <div>
          <label className="block mb-2 text-lg font-medium">Select Tab</label>
          <select 
            value={tab} 
            onChange={(e) => setTab(e.target.value)}
            className="p-3 border rounded w-full text-lg bg-gray-800 text-white"
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
        
        <div>
          <label className="block mb-2 text-lg font-medium">Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border rounded w-full text-lg"
            required
          />
        </div>
        
        <div>
          <label className="block mb-2 text-lg font-medium">Content</label>
          <textarea 
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="p-3 border rounded w-full text-lg h-32"
            required
          />
        </div>
        
        <div>
          <label className="block mb-2 text-lg font-medium">Media</label>
          <div className="flex space-x-2 items-center">
            <input 
              type="text"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="URL or upload/paste an image"
              className="p-3 border rounded flex-grow text-lg"
            />
            <button 
              type="button" 
              onClick={() => fileInputRef.current.click()}
              className="p-3 bg-gray-700 text-white rounded"
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
          {mediaUrl && mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) && (
            <div className="mt-2">
              <img src={mediaUrl} alt="Preview" className="h-20 object-contain" />
            </div>
          )}
          <p className="text-sm mt-1 text-gray-500">Paste an image or enter a URL</p>
        </div>
        
        <div>
          <label className="flex items-center">
            <input 
              type="checkbox"
              checked={notified}
              onChange={(e) => setNotified(e.target.checked)}
              className="mr-2 h-5 w-5"
            />
            <span className="text-lg">Send notification</span>
          </label>
        </div>
        
        <button 
          type="submit" 
          className="p-3 bg-green-500 text-white rounded text-lg w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Content'}
        </button>
        
        {message && (
          <div className="p-3 bg-gray-100 rounded text-lg">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
