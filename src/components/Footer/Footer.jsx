import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="noterx-footer" id="footer">
      <div className="section-container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-col footer-col--brand">
            <Link to="/" className="footer-brand-logo">
              <span className="brand-logo-text">Kasalig</span>
              <span className="brand-badge">AI</span>
            </Link>
            <p className="footer-brand-desc">
              Empowering citizens and entrepreneurs across the Province of Cebu with streamlined, intelligent access to local government transactions.
            </p>
            <div className="footer-seal-note">
              <span className="seal-dot"></span>
              <span>In partnership with Cebu Provincial LGUs</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><a href="#about">About Kasalig</a></li>
              <li><a href="#services-section">Available Services</a></li>
              <li><Link to="/track">Track Applications</Link></li>
              <li><Link to="/help">Help & FAQ</Link></li>
              <li><Link to="/chat">Chat with Kasalig AI</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <Phone size={15} className="contact-icon" />
                <a href="tel:0328882328">(032) 888-2328</a>
              </li>
              <li className="footer-contact-item">
                <Mail size={15} className="contact-icon" />
                <a href="mailto:support@kasalig.gov.ph">support@kasalig.gov.ph</a>
              </li>
              <li className="footer-contact-item">
                <MapPin size={15} className="contact-icon" />
                <span>Cebu Provincial Capitol, Escario St., Cebu City, 6000</span>
              </li>
              <li className="footer-contact-item">
                <Clock size={15} className="contact-icon" />
                <span>Mon – Fri: 8:00 AM – 5:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div className="footer-col">
            <h4 className="footer-col-title">Official Portals</h4>
            <ul className="footer-links-list">
              <li>
                <a href="https://www.cebu.gov.ph" target="_blank" rel="noopener noreferrer" className="external-footer-link">
                  <span>Province of Cebu Portal</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href="https://region7.dilg.gov.ph" target="_blank" rel="noopener noreferrer" className="external-footer-link">
                  <span>DILG Central Visayas</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href="https://psa.gov.ph" target="_blank" rel="noopener noreferrer" className="external-footer-link">
                  <span>PSA Civil Registry</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href="https://arta.gov.ph" target="_blank" rel="noopener noreferrer" className="external-footer-link">
                  <span>Anti-Red Tape Authority</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} Kasalig AI · Province of Cebu Public Services. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/help">Privacy Policy</Link>
            <span className="dot-divider">·</span>
            <Link to="/help">Terms of Service</Link>
            <span className="dot-divider">·</span>
            <Link to="/help">Citizen's Charter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
