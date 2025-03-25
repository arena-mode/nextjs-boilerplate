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
}'use client';
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
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple admin authentication
    if (email === 'admin@crypto-bellwether.com' && password === 'CryptoBellwether') {
      // Store authentication in localStorage (temporary approach)
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/admin');
    } else {
      alert('Invalid credentials');
    }
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
<<<<<<< HEAD
           className="w-full p-2"
=======
            className="w-full p-2
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
}
>>>>>>> b7c776c (Fix login page)
