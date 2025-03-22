'use client';
import { useState } from 'react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = () => {
    if (password === 'CryptoBellwether') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
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
          <div className="mt-2">
            <label className="block">Select Tab</label>
            <select className="p-2 border rounded">
              <option>Live Stream Alerts</option>
              <option>Crypto Market</option>
              <option>Videos</option>
              <option>Posts</option>
              <option>Wallet Alerts</option>
              <option>Shorting</option>
              <option>CB Course</option>
            </select>
          </div>
          <div className="mt-2">
            <input type="text" placeholder="Title" className="p-2 border rounded w-full" />
            <textarea placeholder="Content" className="p-2 border rounded w-full mt-2" />
            <input type="text" placeholder="YouTube URL (for Videos/Shorting/CB Course)" className="p-2 border rounded w-full mt-2" />
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="mr-2" />
                Trigger Alert
              </label>
            </div>
            <button className="mt-2 p-2 bg-green-500 text-white rounded">Post</button>
          </div>
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
