import { useState } from 'react';
import { Home, FileText, HelpCircle, Bell, ChevronDown, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'help', label: 'Help & FAQ', icon: HelpCircle },
  ];

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar__brand">
        <div className="navbar__logo">
          <MessageCircle size={18} />
        </div>
        <div className="navbar__brand-info">
          <span className="navbar__brand-name">
            Kasalig
            <span className="navbar__badge">BETA</span>
          </span>
          <span className="navbar__brand-subtitle">Government Services AI</span>
        </div>
      </div>

      <div className="navbar__nav">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`navbar__link ${activeLink === link.id ? 'navbar__link--active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveLink(link.id);
              }}
              id={`nav-link-${link.id}`}
            >
              <Icon size={16} className="navbar__link-icon" />
              {link.label}
            </a>
          );
        })}
      </div>

      <div className="navbar__actions">
        <button className="navbar__notification" id="notification-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="navbar__notification-badge">2</span>
        </button>

        <div className="navbar__user" id="user-menu">
          <div className="navbar__avatar">MS</div>
          <span className="navbar__user-name">Maria S.</span>
          <ChevronDown size={14} className="navbar__user-chevron" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
