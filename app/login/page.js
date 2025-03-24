'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notificationPrefs, setNotificationPrefs] = useState({
    'live-stream-alerts': true,
    'crypto-market': true,
    'videos': true,
    'posts': true,
    'wallet-alerts': true,
    'shorting': true,
    'cb-course': true
  });
  
  const { login, loginWithEmail, register } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email && !password) {
      setError('Please enter email and password');
      return;
    }
    
    // Try admin login
    if (email === 'admin@crypto-bellwether.com' && password === 'CryptoBellwether') {
      const success = login(password);
      if (success) {
        router.push('/admin');
        return;
      }
    }
    
    // Try regular user login
    if (email && password) {
      const { success, error } = await loginWithEmail(email, password);
      if (success) {
        router.push('/');
      } else {
        setError(error || 'Login failed');
      }
    }
  };
  
  const handleRegister = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    const { success, error } = await register(email, password, notificationPrefs);
    if (success) {
      // Auto login after registration
      await loginWithEmail(email, password);
      router.push('/');
    } else {
      setError(error || 'Registration failed');
    }
  };
  
  const toggleNotification = (tab) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [tab]: !prev[tab]
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black border border-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Sign In</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-white"
            placeholder="your@email.com"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-white"
            placeholder="••••••••"
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            Notification Preferences
          </h3>
          
          <div className="space-y-2">
            {['live-stream-alerts', 'crypto-market', 'videos', 'posts', 'wallet-alerts', 'shorting', 'cb-course'].map(tab => (
              <div key={tab} className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={notificationPrefs[tab]}
                      onChange={() => toggleNotification(tab)}
                    />
                    <div className={`block w-10 h-6 rounded-full ${notificationPrefs[tab] ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${notificationPrefs[tab] ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                  <div className="ml-3 text-gray-300 capitalize">
                    {tab.replace(/-/g, ' ')}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={handleRegister}
            className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-md"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
