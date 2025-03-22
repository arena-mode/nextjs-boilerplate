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
          </select>
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
