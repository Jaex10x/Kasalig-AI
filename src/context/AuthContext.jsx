import { createContext, useContext, useState, useEffect } from 'react';

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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kasalig_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('kasalig_notifications');
    return saved ? JSON.parse(saved) : defaultNotifications;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('kasalig_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kasalig_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('kasalig_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const login = (userData) => {
    const fullUser = {
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      contactNumber: userData.contactNumber || '',
      address: userData.address || '',
      govIdType: userData.govIdType || 'None',
      govIdNumber: userData.govIdNumber || '',
      initials: getInitials(userData.name || userData.email.split('@')[0]),
    };
    setUser(fullUser);
  };

  const register = (userData) => {
    const fullUser = {
      name: userData.fullName,
      email: userData.email,
      contactNumber: '',
      address: '',
      govIdType: 'None',
      govIdNumber: '',
      initials: getInitials(userData.fullName),
    };
    setUser(fullUser);
  };

  const logout = () => {
    setUser(null);
    setNotifications(defaultNotifications);
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      if (!prev) return null;
      const nextUser = {
        ...prev,
        ...updatedData,
        initials: updatedData.name ? getInitials(updatedData.name) : prev.initials,
      };
      return nextUser;
    });
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

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
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
