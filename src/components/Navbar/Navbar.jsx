import { useState, useRef, useEffect } from 'react';
import {
  Home,
  FileText,
  HelpCircle,
  Bell,
  ChevronDown,
  MessageCircle,
  User,
  Settings,
  LogOut,
  Check,
  CheckCheck,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, notifications, unreadCount, markNotificationRead, markAllRead } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifRef = useRef(null);
  const userRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'applications', label: 'My Applications', icon: FileText, path: '/track' },
    { id: 'help', label: 'Help & FAQ', icon: HelpCircle, path: '/help' },
  ];

  const getActiveLink = () => {
    if (location.pathname === '/track') return 'applications';
    if (location.pathname === '/help') return 'help';
    if (location.pathname === '/') return 'home';
    return 'home';
  };

  const activeLink = getActiveLink();

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
    navigate('/login');
  };

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
  };

  const getNotifTypeDot = (type) => {
    switch (type) {
      case 'ready': return 'navbar-notif__dot--green';
      case 'update': return 'navbar-notif__dot--blue';
      case 'info': return 'navbar-notif__dot--gold';
      default: return 'navbar-notif__dot--blue';
    }
  };

  const displayName = isAuthenticated ? user.name : 'Guest';
  const displayInitials = isAuthenticated ? user.initials : 'G';

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__logo">
          <img src="/logo.png" alt="Kasalig AI" width={40} />
        </Link>
        <div className="navbar__brand-info">
          <Link to="/" className="navbar__brand-name">
            Kasalig
            <span className="navbar__badge">BETA</span>
          </Link>
          <span className="navbar__brand-subtitle">Government Services AI</span>
        </div>
      </div>

      <div className="navbar__nav">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.id}
              to={link.path}
              className={`navbar__link ${activeLink === link.id ? 'navbar__link--active' : ''}`}
              id={`nav-link-${link.id}`}
            >
              <Icon size={16} className="navbar__link-icon" />
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="navbar__actions">
        {/* Notification Bell */}
        <div className="navbar-dropdown-anchor" ref={notifRef}>
          <button
            className="navbar__notification"
            id="notification-btn"
            aria-label="Notifications"
            onClick={() => {
              if (!isAuthenticated) {
                navigate('/login');
                return;
              }
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
          >
            <Bell size={18} />
            {isAuthenticated && unreadCount > 0 && (
              <span className="navbar__notification-badge">{unreadCount}</span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && isAuthenticated && (
            <div className="navbar-notif-dropdown" id="notification-dropdown">
              <div className="navbar-notif-dropdown__header">
                <h4 className="navbar-notif-dropdown__title">Notifications</h4>
                {unreadCount > 0 && (
                  <button
                    className="navbar-notif-dropdown__mark-all"
                    onClick={markAllRead}
                    id="mark-all-read-btn"
                  >
                    <CheckCheck size={14} />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="navbar-notif-dropdown__list">
                {notifications.length === 0 ? (
                  <div className="navbar-notif-dropdown__empty">
                    <Bell size={24} />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <button
                      key={notif.id}
                      className={`navbar-notif-item ${!notif.read ? 'navbar-notif-item--unread' : ''}`}
                      onClick={() => handleNotificationClick(notif)}
                      id={`notif-${notif.id}`}
                    >
                      <div className={`navbar-notif__dot ${getNotifTypeDot(notif.type)}`} />
                      <div className="navbar-notif-item__content">
                        <span className="navbar-notif-item__title">{notif.title}</span>
                        <span className="navbar-notif-item__message">{notif.message}</span>
                        <span className="navbar-notif-item__time">{notif.time}</span>
                      </div>
                      {!notif.read && (
                        <div className="navbar-notif-item__unread-dot" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="navbar-dropdown-anchor" ref={userRef}>
          {isAuthenticated ? (
            <div
              className="navbar__user"
              id="user-menu"
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
            >
              <div className="navbar__avatar">{displayInitials}</div>
              <span className="navbar__user-name">{displayName}</span>
              <ChevronDown
                size={14}
                className={`navbar__user-chevron ${showUserMenu ? 'navbar__user-chevron--open' : ''}`}
              />
            </div>
          ) : (
            <Link to="/login" className="navbar__login-btn" id="nav-login-btn">
              Sign In
            </Link>
          )}

          {/* User Dropdown */}
          {showUserMenu && isAuthenticated && (
            <div className="navbar-user-dropdown" id="user-dropdown">
              <div className="navbar-user-dropdown__header">
                <div className="navbar-user-dropdown__avatar">{displayInitials}</div>
                <div className="navbar-user-dropdown__info">
                  <span className="navbar-user-dropdown__name">{user.name}</span>
                  <span className="navbar-user-dropdown__email">{user.email}</span>
                </div>
              </div>

              <div className="navbar-user-dropdown__divider" />

              <div className="navbar-user-dropdown__menu">
                <button
                  className="navbar-user-dropdown__item"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                  id="user-menu-profile"
                >
                  <User size={16} />
                  Profile
                </button>
                <button
                  className="navbar-user-dropdown__item"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                  id="user-menu-settings"
                >
                  <Settings size={16} />
                  Settings
                </button>
              </div>

              <div className="navbar-user-dropdown__divider" />

              <button
                className="navbar-user-dropdown__item navbar-user-dropdown__item--danger"
                onClick={handleLogout}
                id="user-menu-logout"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
