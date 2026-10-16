import { useState, useRef, useEffect } from 'react';
import {
  Bell,
  ChevronDown,
  MessageCircle,
  User,
  Settings,
  LogOut,
  CheckCheck,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, notifications, unreadCount, markNotificationRead, markAllRead } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifRef = useRef(null);
  const userRef = useRef(null);

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/#about', isAnchor: true },
    { id: 'services', label: 'Services', path: '/#services-section', isAnchor: true },
    { id: 'applications', label: 'My Applications', path: '/track' },
    { id: 'help', label: 'Help & FAQ', path: '/help' },
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
      case 'renewal': return 'navbar-notif__dot--orange';
      case 'expired': return 'navbar-notif__dot--red';
      default: return 'navbar-notif__dot--blue';
    }
  };

  const displayName = isAuthenticated ? user.name : 'Guest';
  const displayInitials = isAuthenticated ? user.initials : 'G';

  return (
    <header className="header-wrapper" id="main-header">
      {/* Top Bar matching NoterX */}
      <div className="top-bar">
        <div className="top-bar__container">
          <div className="top-bar__left">
            <a href="tel:0328882328" className="top-bar__link">
              <Phone size={13} className="top-bar__icon" />
              <span>(032) 888-2328</span>
            </a>
            <span className="top-bar__divider"></span>
            <span className="top-bar__text">
              <MapPin size={13} className="top-bar__icon" />
              <span>Cebu Provincial Capitol, Escario St., Cebu City</span>
            </span>
          </div>
          <div className="top-bar__right">
            <span className="top-bar__text">
              <Clock size={13} className="top-bar__icon" />
              <span>Monday – Friday: 8:00 AM – 5:00 PM</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar" id="main-navbar">
        <div className="navbar__container">
          {/* Logo / Brand */}
          <div className="navbar__brand">
            <Link to="/" className="navbar__logo">
              <span className="brand-title">Kasalig</span>
              <span className="brand-tag">AI</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="navbar__nav">
            {navLinks.map((link) => {
              if (link.isAnchor && location.pathname === '/') {
                return (
                  <a
                    key={link.id}
                    href={link.path.replace('/', '')}
                    className="navbar__link"
                    id={`nav-link-${link.id}`}
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`navbar__link ${activeLink === link.id ? 'navbar__link--active' : ''}`}
                  id={`nav-link-${link.id}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Actions: Notifications, User, and Pill CTA */}
          <div className="navbar__actions">
            {/* Notification Dropdown Anchor */}
            <div className="navbar-dropdown-anchor" ref={notifRef}>
              <button
                className="navbar__notification"
                id="notification-btn"
                aria-label="Notifications"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
              >
                <Bell size={18} />
                {isAuthenticated && unreadCount > 0 && (
                  <span className="navbar__notification-badge">{unreadCount}</span>
                )}
              </button>

              {showNotifications && (
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
                          {!notif.read && <div className="navbar-notif-item__unread-dot" />}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Dropdown Anchor */}
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
                <div className="navbar__auth-links">
                  <Link to="/login" className="navbar__login-link" id="nav-login-btn">
                    Sign In
                  </Link>
                  <Link to="/register" className="navbar__register-link" id="nav-register-btn">
                    Register
                  </Link>
                </div>
              )}

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

            {/* NoterX Signature Pill CTA Button */}
            <Link to="/chat" className="btn-noterx-primary btn-noterx-nav" id="nav-chat-cta">
              <MessageCircle size={15} />
              <span>Chat with Kasalig</span>
              <ArrowRight size={14} className="btn-arrow" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className="navbar__mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="navbar__mobile-menu">
            <div className="navbar__mobile-links">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`navbar__mobile-link ${activeLink === link.id ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="navbar__mobile-cta-wrap">
                <Link
                  to="/chat"
                  className="btn-noterx-primary full-width"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MessageCircle size={16} />
                  <span>Chat with Kasalig AI</span>
                  <ArrowRight size={15} />
                </Link>

                {!isAuthenticated && (
                  <div className="navbar__mobile-auth-row">
                    <Link
                      to="/login"
                      className="navbar__mobile-auth-btn"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="navbar__mobile-auth-btn navbar__mobile-auth-btn--primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
