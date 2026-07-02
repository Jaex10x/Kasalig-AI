import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import { apiSyncUser } from '../Services/api';

const AuthContext = createContext(null);

/* ---- Input sanitization utility ---- */
const sanitizeInput = (str) => {
  if (!str) return '';
  return str
    .replace(/[<>]/g, '') // strip angle brackets to prevent XSS
    .trim();
};

const defaultNotifications = [
  {
    id: 1,
    title: 'Business Permit Update',
    message: 'Your business permit application has moved to "Under Review" status.',
    time: '2 hours ago',
    read: false,
    type: 'update',
  },
  {
    id: 2,
    title: 'Welcome to Kasalig AI!',
    message: 'Thank you for joining. Apply for your business permit today.',
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
    const name = sanitizeInput(
      supabaseUser.user_metadata?.full_name || supabaseUser.email.split('@')[0]
    );
    return {
      id: supabaseUser.id,
      dbId,
      name,
      email: supabaseUser.email,
      contactNumber: supabaseUser.user_metadata?.contact_number || '',
      address: supabaseUser.user_metadata?.address || '',
      initials: getInitials(name),
      /* Sensitive fields like gov IDs are not stored in user state */
    };
  };

  const syncToBackend = async (supabaseUser) => {
    if (!supabaseUser) return null;
    try {
      const name = sanitizeInput(
        supabaseUser.user_metadata?.full_name || supabaseUser.email.split('@')[0]
      );
      /* Only syncs id, name, email — never passwords or sensitive data */
      const result = await apiSyncUser(supabaseUser.id, name, supabaseUser.email);
      return result.id;
    } catch (err) {
      console.warn('Backend sync failed (backend may be offline):', err.message);
      return null;
    }
  };

  useEffect(() => {
    localStorage.setItem('kasalig_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {

    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const dbId = await syncToBackend(session.user);
          setUser(mapSupabaseUser(session.user, dbId));
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Error fetching initial auth session, trying local storage check:', err.message);
      }

      // Check for local storage mock user fallback
      const savedMockUser = localStorage.getItem('kasalig_mock_user');
      if (savedMockUser) {
        setUser(JSON.parse(savedMockUser));
      }
      setLoading(false);
    };

    getInitialSession();


    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const dbId = await syncToBackend(session.user);
        setUser(mapSupabaseUser(session.user, dbId));
      } else {
        // Only clear if we don't have a mock user logged in
        const savedMockUser = localStorage.getItem('kasalig_mock_user');
        if (!savedMockUser) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLocalMockRegister = (sanitizedName, sanitizedEmail) => {
    const mockUser = {
      id: `mock-user-${Date.now()}`,
      dbId: `mock-db-${Date.now()}`,
      name: sanitizedName,
      email: sanitizedEmail,
      contactNumber: '09123456789',
      address: 'Cebu City, Province of Cebu',
      initials: getInitials(sanitizedName),
    };
    localStorage.setItem('kasalig_mock_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const login = async (userData) => {
    const sanitizedEmail = sanitizeInput(userData.email).toLowerCase();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password: userData.password,
      });
      if (error) throw error;
      if (data?.user) {
        const dbId = await syncToBackend(data.user);
        setUser(mapSupabaseUser(data.user, dbId));
      }
    } catch (err) {
      console.warn('Supabase signin failed, trying local fallback:', err.message);
      if (err.message?.toLowerCase().includes('fetch') || err.message?.toLowerCase().includes('network') || err.status === 0 || err.message?.includes(' ENOTFOUND ')) {
        const savedMockUser = localStorage.getItem('kasalig_mock_user');
        if (savedMockUser) {
          const parsed = JSON.parse(savedMockUser);
          if (parsed.email === sanitizedEmail) {
            setUser(parsed);
            return;
          }
        }
        const mockName = sanitizedEmail.split('@')[0];
        handleLocalMockRegister(mockName, sanitizedEmail);
      } else {
        throw err;
      }
    }
  };

  const register = async (userData) => {
    const sanitizedName = sanitizeInput(userData.fullName);
    const sanitizedEmail = sanitizeInput(userData.email).toLowerCase();

    if (!sanitizedName || sanitizedName.length < 2) {
      throw new Error('Please enter a valid full name');
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password: userData.password,
        options: {
          data: {
            full_name: sanitizedName,
          },
        },
      });
      if (error) throw error;
      if (data?.user) {
        const dbId = await syncToBackend(data.user);
        setUser(mapSupabaseUser(data.user, dbId));
      }
    } catch (err) {
      console.warn('Supabase signup failed, trying local fallback:', err.message);
      if (err.message?.toLowerCase().includes('fetch') || err.message?.toLowerCase().includes('network') || err.status === 0 || err.message?.includes(' ENOTFOUND ')) {
        handleLocalMockRegister(sanitizedName, sanitizedEmail);
      } else {
        throw err;
      }
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase logout failed:', e.message);
    }
    localStorage.removeItem('kasalig_mock_user');
    setUser(null);
    setNotifications(defaultNotifications);
  };

  const updateUser = async (updatedData) => {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: sanitizeInput(updatedData.name),
        contact_number: sanitizeInput(updatedData.contactNumber),
        address: sanitizeInput(updatedData.address),
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
