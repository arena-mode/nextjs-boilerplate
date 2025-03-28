'use client';

import ContentManagement from './content-management';

export default function Admin() {
  // Directly return the ContentManagement component without auth checks
  return <ContentManagement />;
}

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
          if (session.user.email === ADMIN_EMAIL) {
            setIsAdmin(true);
          }
          
          const { data: prefs } = await supabase
            .from('user_preferences')
            .select('notifications')
            .eq('user_id', session.user.id)
            .single();
            
          if (prefs?.notifications) {
            setNotifications(prefs.notifications);
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

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      setIsAuthenticated(true);
      setIsAdmin(false);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

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

  const handleNotificationToggle = async (key: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
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

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-md mx-auto p-6">
          <h2 className="text-xl mb-6">User Login</h2>
          
          <form onSubmit={handleUserLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded"
            />
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded"
            />
            
            <button 
              type="submit"
              className="w-full p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded"
            >
              Sign In
            </button>
          </form>

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

  if (isAuthenticated && !isAdmin) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-md mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Notification Settings</h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded"
            >
              Logout
            </button>
          </div>

          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div 
                key={key}
                className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded"
              >
                <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <button
                  onClick={() => handleNotificationToggle(key)}
                  className={`w-12 h-6 rounded-full relative ${
                    value ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                      value ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Admin is authenticated, return ContentManagement component
  return <ContentManagement />;
}
