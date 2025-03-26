'use client';

import { useState } from 'react';
import contentService from '../utils/contentService';

export default function ContentForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [selectedTab, setSelectedTab] = useState('live-stream-alerts');
  const [selectedTier, setSelectedTier] = useState('free');
  const [sendNotification, setSendNotification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Get available tiers from the content service
  const tiers = contentService.getTiers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      // Create content object
      const contentData = {
        title: title,
        body: content,
        media_url: mediaUrl,
        tab: selectedTab,
        tier: selectedTier
      };

      // Call the content service to add content
      const { data, error } = await contentService.addContent(contentData, sendNotification);

      if (error) {
        throw new Error(error.message);
      }

      // Reset form after successful submission
      setTitle('');
      setContent('');
      setMediaUrl('');
      setSendNotification(false);
      setMessage({ 
        text: 'Content added successfully!', 
        type: 'success' 
      });
      
      console.log('Content added:', data);
    } catch (error) {
      console.error('Error adding content:', error);
      setMessage({ 
        text: `Error: ${error.message}`, 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add Content</h2>
      
      {message.text && (
        <div className={`p-3 mb-4 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="tab" className="block mb-1">Select Tab</label>
          <select
            id="tab"
            value={selectedTab}
            onChange={(e) => setSelectedTab(e.target.value)}
            className="w-full p-2 border rounded"
            required
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
          <label htmlFor="tier" className="block mb-1">Access Tier</label>
          <select
            id="tier"
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            {tiers.map(tier => (
              <option key={tier} value={tier}>{tier}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block mb-1">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="mediaUrl" className="block mb-1">Media URL (optional)</label>
          <input
            id="mediaUrl"
            type="text"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="URL or upload/paste an image"
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={sendNotification}
              onChange={(e) => setSendNotification(e.target.checked)}
              className="mr-2"
            />
            Send notification
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Adding...' : 'Post Content'}
        </button>
      </form>
    </div>
  );
}
