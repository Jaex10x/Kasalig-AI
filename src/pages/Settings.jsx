import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShieldCheck,
  Save,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();

  // Active Tab: 'profile', 'security', 'verification'
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
  });

  // Security Form State
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Verification Form State
  const [verificationData, setVerificationData] = useState({
    govIdType: 'None',
    govIdNumber: '',
  });

  // Notifications / Alerts
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        contactNumber: user.contactNumber || '',
        address: user.address || '',
      });
      setVerificationData({
        govIdType: user.govIdType || 'None',
        govIdNumber: user.govIdNumber || '',
      });
    }
  }, [isAuthenticated, user, navigate]);

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      updateUser({
        name: profileData.name,
        email: profileData.email,
        contactNumber: profileData.contactNumber,
        address: profileData.address,
      });
      setIsLoading(false);
      showAlert('Profile information updated successfully!');
    }, 1000);
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      showAlert('New passwords do not match!', 'error');
      return;
    }
    if (securityData.newPassword.length < 8) {
      showAlert('Password must be at least 8 characters long!', 'error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      // In a real app we'd make an API request to verify current password & update
      setIsLoading(false);
      setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showAlert('Password updated successfully!');
    }, 1200);
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      updateUser({
        govIdType: verificationData.govIdType,
        govIdNumber: verificationData.govIdNumber,
      });
      setIsLoading(false);
      showAlert('Government identity link updated successfully!');
    }, 1000);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="settings-page" id="settings-page">
      <Navbar />

      <div className="settings-container">
        {/* Page Header */}
        <header className="settings-header">
          <h1 className="settings-header__title">Account Settings</h1>
          <p className="settings-header__subtitle">
            Manage your profile details, contact information, security, and verification preferences.
          </p>
        </header>

        {/* Global Feedback Alert */}
        {alert.show && (
          <div className={`settings-alert settings-alert--${alert.type}`} id="settings-alert">
            {alert.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
            <span>{alert.message}</span>
          </div>
        )}

        <div className="settings-content">
          {/* Settings Sidebar Tabs */}
          <aside className="settings-sidebar">
            <button
              className={`settings-tab-btn ${activeTab === 'profile' ? 'settings-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('profile')}
              id="tab-profile-settings"
            >
              <User size={18} />
              <span>Profile Details</span>
            </button>
            
            <button
              className={`settings-tab-btn ${activeTab === 'security' ? 'settings-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('security')}
              id="tab-security-settings"
            >
              <Lock size={18} />
              <span>Security & Password</span>
            </button>

            <button
              className={`settings-tab-btn ${activeTab === 'verification' ? 'settings-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('verification')}
              id="tab-verification-settings"
            >
              <ShieldCheck size={18} />
              <span>Identity Verification</span>
            </button>
          </aside>

          {/* Settings Main Forms */}
          <main className="settings-main">
            
            {/* PROFILE DETAILS TAB */}
            {activeTab === 'profile' && (
              <div className="settings-card" id="profile-settings-card">
                <div className="settings-card__header">
                  <h2 className="settings-card__title">Profile Information</h2>
                  <p className="settings-card__subtitle">Update your personal details and contact methods.</p>
                </div>
                <form onSubmit={handleProfileSubmit} className="settings-form">
                  <div className="settings-form-grid">
                    
                    <div className="settings-field">
                      <label className="settings-label" htmlFor="settings-name">Full Name</label>
                      <div className="settings-input-wrapper">
                        <User size={16} className="settings-input-icon" />
                        <input
                          type="text"
                          id="settings-name"
                          className="settings-input"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          placeholder="Your Full Name"
                          required
                        />
                      </div>
                    </div>

                    <div className="settings-field">
                      <label className="settings-label" htmlFor="settings-email">Email Address</label>
                      <div className="settings-input-wrapper">
                        <Mail size={16} className="settings-input-icon" />
                        <input
                          type="email"
                          id="settings-email"
                          className="settings-input"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="settings-field">
                      <label className="settings-label" htmlFor="settings-phone">Contact Number</label>
                      <div className="settings-input-wrapper">
                        <Phone size={16} className="settings-input-icon" />
                        <input
                          type="tel"
                          id="settings-phone"
                          className="settings-input"
                          value={profileData.contactNumber}
                          onChange={(e) => setProfileData({ ...profileData, contactNumber: e.target.value })}
                          placeholder="e.g. 09171234567"
                        />
                      </div>
                    </div>

                    <div className="settings-field settings-field--full">
                      <label className="settings-label" htmlFor="settings-address">Resident Address</label>
                      <div className="settings-input-wrapper">
                        <MapPin size={16} className="settings-input-icon" />
                        <input
                          type="text"
                          id="settings-address"
                          className="settings-input"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          placeholder="Street, Barangay, City, Province"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="settings-form-actions">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="settings-save-btn"
                      id="save-profile-btn"
                    >
                      <Save size={16} />
                      {isLoading ? 'Saving Changes...' : 'Save Profile Details'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="settings-card" id="security-settings-card">
                <div className="settings-card__header">
                  <h2 className="settings-card__title">Change Password</h2>
                  <p className="settings-card__subtitle">Ensure your account is using a secure, strong password.</p>
                </div>
                <form onSubmit={handleSecuritySubmit} className="settings-form">
                  <div className="settings-form-grid settings-form-grid--single">

                    <div className="settings-field">
                      <label className="settings-label" htmlFor="current-password">Current Password</label>
                      <div className="settings-input-wrapper">
                        <Lock size={16} className="settings-input-icon" />
                        <input
                          type="password"
                          id="current-password"
                          className="settings-input"
                          value={securityData.currentPassword}
                          onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    <div className="settings-field">
                      <label className="settings-label" htmlFor="new-password">New Password</label>
                      <div className="settings-input-wrapper">
                        <Lock size={16} className="settings-input-icon" />
                        <input
                          type="password"
                          id="new-password"
                          className="settings-input"
                          value={securityData.newPassword}
                          onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                          placeholder="At least 8 characters"
                          required
                        />
                      </div>
                    </div>

                    <div className="settings-field">
                      <label className="settings-label" htmlFor="confirm-new-password">Confirm New Password</label>
                      <div className="settings-input-wrapper">
                        <Lock size={16} className="settings-input-icon" />
                        <input
                          type="password"
                          id="confirm-new-password"
                          className="settings-input"
                          value={securityData.confirmPassword}
                          onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                          placeholder="Re-type new password"
                          required
                        />
                      </div>
                    </div>

                  </div>

                  <div className="settings-form-actions">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="settings-save-btn"
                      id="save-security-btn"
                    >
                      <Save size={16} />
                      {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* VERIFICATION & ID LINK TAB */}
            {activeTab === 'verification' && (
              <div className="settings-card" id="verification-settings-card">
                <div className="settings-card__header">
                  <h2 className="settings-card__title">Linked Government Credentials</h2>
                  <p className="settings-card__subtitle">Link an official credential to accelerate identity checks in Kasalig AI.</p>
                </div>
                <form onSubmit={handleVerificationSubmit} className="settings-form">
                  <div className="settings-form-grid">

                    <div className="settings-field">
                      <label className="settings-label" htmlFor="id-type-select">Identity Document Type</label>
                      <div className="settings-input-wrapper">
                        <CreditCard size={16} className="settings-input-icon" />
                        <select
                          id="id-type-select"
                          className="settings-input settings-select"
                          value={verificationData.govIdType}
                          onChange={(e) => setVerificationData({ ...verificationData, govIdType: e.target.value })}
                        >
                          <option value="None">No ID Linked</option>
                          <option value="PhilSys ID">PhilSys National ID</option>
                          <option value="Passport">DFA Passport</option>
                          <option value="Unified Multi-Purpose ID (UMID)">UMID</option>
                          <option value="Driver's License">LTO Driver's License</option>
                          <option value="Postal ID">PHLPost Postal ID</option>
                        </select>
                      </div>
                    </div>

                    <div className="settings-field">
                      <label className="settings-label" htmlFor="id-number-input">Identity Document Number</label>
                      <div className="settings-input-wrapper">
                        <CreditCard size={16} className="settings-input-icon" />
                        <input
                          type="text"
                          id="id-number-input"
                          className="settings-input"
                          disabled={verificationData.govIdType === 'None'}
                          value={verificationData.govIdNumber}
                          onChange={(e) => setVerificationData({ ...verificationData, govIdNumber: e.target.value })}
                          placeholder={verificationData.govIdType === 'None' ? 'Select ID Type first' : 'Enter registered ID number'}
                          required={verificationData.govIdType !== 'None'}
                        />
                      </div>
                    </div>

                  </div>

                  <div className="settings-verification-info">
                    <ShieldCheck size={20} className="settings-verif-badge" />
                    <p>
                      <strong>Protected Identity data:</strong> Your credential data is securely encrypted at rest. It is only shared via encrypted APIs with relevant government agencies during direct application processes initiated by you.
                    </p>
                  </div>

                  <div className="settings-form-actions">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="settings-save-btn"
                      id="save-verification-btn"
                    >
                      <Save size={16} />
                      {isLoading ? 'Linking credential...' : 'Update Linked Credential'}
                    </button>
                  </div>
                </form>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
