'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import ContentManagement from './content-management';

// Supabase Initialization
const supabaseUrl = 'https://sosrdqwwmyzvnspfmyjd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Admin() {
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState({
    liveStreamAlerts: false,
    cryptoMarket: false,
    videos: false,
    posts: false,
    walletAlerts: false
  });
  const [loading, setLoading] = useState(true);

  // States for the Admin Panel (Code 3)
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'manage'
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [tab, setTab] = useState('live-stream-alerts');
  const [tier, setTier] = useState('free');
  const [notified, setNotified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  // Session Check on Load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
          if (session.user.email === 'admin@cryptobellwether.com') {
            setIsAdmin(true);
          } else {
            // Fetch user preferences
            const { data: prefs } = await supabase
              .from('user_preferences')
              .select('notifications')
              .eq('user_id', session.user.id)
              .single();
            if (prefs?.notifications) {
              setNotifications(prefs.notifications);
            }
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

  // User Login
  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  // Admin Login
  const handleAdminLogin = async () => {
    if (adminPassword === 'Crypt0B3llw3th3r') {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'admin@cryptobellwether.com',
          password: adminPassword
        });
        if (error) throw error;
        setIsAuthenticated(true);
        setIsAdmin(true);
      } catch (error) {
        console.error('Admin login error:', error);
        alert('Admin login failed');
      }
    } else {
      alert('Incorrect admin password');
    }
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // User Notification Toggle
  const handleNotificationToggle = async (key: string) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user) return;
      const newNotifications = {
        ...notifications,
        [key]: !notifications[key as keyof typeof notifications]
      };
      setNotifications(newNotifications);
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          notifications: newNotifications
        });
      if (error) throw error;
    } catch (error) {
      console.error('Error saving notification preferences:', error);
      alert('Failed to save preference');
    }
  };

  // Admin Panel - File Upload
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);
      if (uploadError) throw uploadError;

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

  // Admin Panel - Submit Content
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Replace with actual backend logic for posting content
      const { error } = await supabase
        .from('content')
        .insert([
          {
            title,
            body,
            media_url: mediaUrl,
            tab,
            tier,
            notified,
            send_notification: notified
          }
        ]);
      if (error) throw error;
      setMessage('Content posted successfully!');
      setTitle('');
      setBody('');
      setMediaUrl('');
      setTab('live-stream-alerts');
      setTier('free');
      setNotified(false);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error posting content');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading State
  if (loading) {
    return <div>Loading...</div>;
  }

  // Admin Login Page
  if (!isAuthenticated) {
    return (
      <div>
        <h1>Admin/User Login</h1>
        <form onSubmit={handleUserLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="User Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="User Password"
          />
          <button type="submit">Sign In</button>
        </form>
        <div>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Admin Password"
          />
          <button onClick={handleAdminLogin}>Admin Login</button>
        </div>
      </div>
    );
  }

  // User's Notification Settings Page
  if (isAuthenticated && !isAdmin) {
    return (
      <div>
        <h1>Notification Settings</h1>
        {Object.keys(notifications).map((key) => (
          <div key={key}>
            <span>{key}</span>
            <button onClick={() => handleNotificationToggle(key)}>{notifications[key] ? 'ON' : 'OFF'}</button>
          </div>
        ))}
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  // Admin Panel
  return (
    <div>
      <ContentManagement
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        title={title}
        setTitle={setTitle}
        handleFileSelect={handleFileSelect}
        handleSubmit={handleSubmit}
        // Other props
      />
    </div>
  );
}
