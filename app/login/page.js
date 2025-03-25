'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    alert('Login functionality coming soon');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black border border-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Sign In</h2>
      
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2"
          />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 p-2 text-white rounded">
          Sign In
        </button>
      </form>
    </div>
  );
