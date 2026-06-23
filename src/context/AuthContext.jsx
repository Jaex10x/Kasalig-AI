import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import { apiSyncUser } from '../Services/api';

const AuthContext = createContext(null);

const defaultNotifications = [
  {
    id: 1,
    title: 'National ID Ready for Pickup',
    message: 'Your PhilSys National ID is now available at SM Megamall Service Center.',
    time: '2 hours ago',
    read: false,
    type: 'ready',
  },
  {
    id: 2,
    title: 'Business Registration Update',
    message: 'Your DTI registration has moved to "Under Review" status.',
    time: '1 day ago',
    read: false,
    type: 'update',
  },
  {
    id: 3,
    title: 'Welcome to Kasalig AI!',
    message: 'Thank you for joining. Explore our 50+ government services.',
    time: '3 days ago',
    read: true,
    type: 'info',
  },
];

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0][0].toUpperCase();
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('kasalig_notifications');
    return saved ? JSON.parse(saved) : defaultNotifications;
  });

  const mapSupabaseUser = (supabaseUser, dbId = null) => {
    if (!supabaseUser) return null;
    const name = supabaseUser.user_metadata?.full_name || supabaseUser.email.split('@')[0];
    return {
      id: supabaseUser.id,
      dbId, // Database ID from the users table (for chat, applications, etc.)
      name,
      email: supabaseUser.email,
      contactNumber: supabaseUser.user_metadata?.contact_number || '',
      address: supabaseUser.user_metadata?.address || '',
      govIdType: supabaseUser.user_metadata?.gov_id_type || 'None',
      govIdNumber: supabaseUser.user_metadata?.gov_id_number || '',
      initials: getInitials(name),
    };
  };

  // Sync Supabase Auth user to the backend users table
  const syncToBackend = async (supabaseUser) => {
    if (!supabaseUser) return null;
    try {
      const name = supabaseUser.user_metadata?.full_name || supabaseUser.email.split('@')[0];
      const result = await apiSyncUser(supabaseUser.id, name, supabaseUser.email);
      return result.id; // Returns the database user ID
    } catch (err) {
      console.warn('Backend sync failed (backend may be offline):', err.message);
      return null;
    }
  };

  useEffect(() => {
    localStorage.setItem('kasalig_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    // 1. Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const dbId = await syncToBackend(session.user);
          setUser(mapSupabaseUser(session.user, dbId));
        }
      } catch (err) {
        console.error('Error fetching initial auth session:', err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // 2. Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const dbId = await syncToBackend(session.user);
        setUser(mapSupabaseUser(session.user, dbId));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (userData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });
    if (error) throw error;
    if (data?.user) {
      const dbId = await syncToBackend(data.user);
      setUser(mapSupabaseUser(data.user, dbId));
    }
  };

  const register = async (userData) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.fullName,
        },
      },
    });
    if (error) throw error;
    if (data?.user) {
      const dbId = await syncToBackend(data.user);
      setUser(mapSupabaseUser(data.user, dbId));
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setNotifications(defaultNotifications);
  };

  const updateUser = async (updatedData) => {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: updatedData.name,
        contact_number: updatedData.contactNumber,
        address: updatedData.address,
        gov_id_type: updatedData.govIdType,
        gov_id_number: updatedData.govIdNumber,
      },
    });
    if (error) throw error;
    if (data?.user) {
      setUser(mapSupabaseUser(data.user));
    }
  };

  const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
        updatePassword,
        notifications,
        unreadCount,
        markNotificationRead,
        markAllRead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

