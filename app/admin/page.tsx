'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import ContentManagement from './content-management';

const supabaseUrl = 'https://sosrdqwwmyzvnspfmyjd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ';

const supabase = createClient(supabaseUrl, supabaseKey);

const ADMIN_EMAIL = 'cryptobellwether@protonmail.com';
const ADMIN_PASSWORD = 'Crypt0B3llw3th3r';

export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
          if (session.user.email === ADMIN_EMAIL) {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleAdminLogin = async () => {
    if (adminPassword !== ADMIN_PASSWORD) {
      alert('Incorrect admin password');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: adminPassword
      });
      
      if (error) throw error;
      
      setIsAuthenticated(true);
      setIsAdmin(true);
    } catch (error: any) {
      console.error('Admin login error:', error);
      if (error?.message) {
        alert(error.message);
      } else {
        alert('Admin login failed');
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-md mx-auto p-6">
          <div className="mt-8">
            <h3 className="text-sm text-gray-400 mb-2">Admin Access</h3>
            <div className="flex gap-2">
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Admin password"
                className="flex-1 p-2 bg-[#1a1a1a] border border-gray-700 rounded"
              />
              <button 
                onClick={handleAdminLogin}
                className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded"
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ContentManagement />;
}
