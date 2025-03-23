// At the top of your admin/page.tsx file, right after the imports
useEffect(() => {
  // Debug the supabase client directly
  console.log('Direct supabase import in admin page:', supabaseClient);
  console.log('Auth available in admin page:', supabaseClient.auth ? 'Yes' : 'No');
  
  const checkSession = async () => {
    try {
      console.log('About to check session with:', supabaseClient);
      if (!supabaseClient.auth) {
        console.error('Auth is not available on the client');
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabaseClient.auth.getSession();
      console.log('Session check result:', { data, error });
      
      if (data?.session) {
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
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabaseClient.storage
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabaseClient
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

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          placeholder="Enter password"
        />
        <button 
          onClick={handleLogin}
          className="ml-2 p-2 bg-gray-800 text-white rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-700">
        <button
          className={`px-4 py-2 mr-2 ${
            activeTab === 'add'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('add')}
        >
          Add Content
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 'manage'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('manage')}
        >
          Manage Content
        </button>
      </div>
      
      {activeTab === 'add' ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Select Tab</label>
            <select 
              value={tab} 
              onChange={(e) => setTab(e.target.value)}
              className="p-2 border rounded w-full bg-gray-800 text-white"
              style={{ fontSize: '16px' }}
            >
              <option value="live-stream-alerts" className="text-base py-2">Live Stream Alerts</option>
              <option value="crypto-market" className="text-base py-2">Crypto Market</option>
              <option value="videos" className="text-base py-2">Videos</option>
              <option value="posts" className="text-base py-2">Posts</option>
              <option value="wallet-alerts" className="text-base py-2">Wallet Alerts</option>
              <option value="shorting" className="text-base py-2">Shorting</option>
              <option value="cb-course" className="text-base py-2">CB Course</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block">Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block">Content</label>
            <textarea 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="p-2 border rounded w-full h-32"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block">Media</label>
            <div className="flex space-x-2">
              <input 
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="URL or upload/paste an image"
                className="p-2 border rounded flex-grow"
              />
              <button 
                type="button" 
                onClick={() => fileInputRef.current.click()}
                className="p-2 bg-gray-700 text-white rounded"
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
            {mediaUrl && (
              <div className="mt-2">
                <img src={mediaUrl} alt="Preview" className="h-20 object-contain" />
              </div>
            )}
            <p className="text-sm mt-1 text-gray-500">Enter a URL or upload an image</p>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input 
                type="checkbox"
                checked={notified}
                onChange={(e) => setNotified(e.target.checked)}
                className="mr-2"
              />
              Send notification
            </label>
          </div>
          
          <button 
            type="submit" 
            className="p-2 bg-gray-800 text-white rounded w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Content'}
          </button>
          
          {message && (
            <div className="mt-4 p-2 bg-gray-700 text-white rounded">
              {message}
            </div>
          )}
          
          <button 
            type="button"
            onClick={handleLogout}
            className="mt-8 p-2 bg-gray-700 text-white rounded w-full"
          >
            Logout
          </button>
        </form>
      ) : (
        <ContentManagement />
      )}
    </div>
  );
}
