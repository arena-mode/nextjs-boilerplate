'use client';
import { useState, useRef, useEffect } from 'react';
import supabaseClient from '../utils/supabaseClient';
import ContentManagement from './content-management';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'manage'
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [tab, setTab] = useState('live-stream-alerts');
  const [notified, setNotified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  // Check if user is already authenticated on page load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabaseClient.auth.getSession();
        
        if (data.session) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const handleLogin = async () => {
    if (password !== 'CryptoBellwether') {
      alert('Incorrect password');
      return;
    }
    
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: 'admin@cryptobellwether.com',
        password: 'CryptoBellwether',
      });
      
      if (error) {
        throw error;
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
      try {
        await supabaseClient.auth.signOut();
        setIsAuthenticated(false);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabaseClient.storage
        .from('images')
        .upload(filePath, file);
