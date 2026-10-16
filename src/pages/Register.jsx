import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  User,
  ShieldCheck,
  CheckCircle2,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabaseClient';

const passwordRules = [
  { key: 'length', label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { key: 'uppercase', label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { key: 'number', label: 'One number', test: (p) => /\d/.test(p) },
  { key: 'special', label: 'One special character', test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

const Register = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message || 'Google sign-up failed');
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const passwordStrength = useMemo(() => {
    const passed = passwordRules.filter((r) => r.test(formData.password));
    return {
      results: passwordRules.map((r) => ({ ...r, passed: r.test(formData.password) })),
      score: passed.length,
      total: passwordRules.length,
      label:
        passed.length === 0
          ? ''
          : passed.length <= 1
            ? 'Weak'
            : passed.length <= 2
              ? 'Fair'
              : passed.length <= 3
                ? 'Good'
                : 'Strong',
      color:
        passed.length <= 1
          ? '#ef4444'
          : passed.length <= 2
            ? '#d97706'
            : passed.length <= 3
              ? '#c59b27'
              : '#15803d',
    };
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();

    if (!trimmedName || trimmedName.length < 2) {
      setError('Please enter your full name (at least 2 characters)');
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    if (passwordStrength.score < 3) {
      setError('Please use a stronger password (at least 3 of 4 rules)');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the terms and privacy policy');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      await auth.register({
        fullName: trimmedName,
        email: trimmedEmail,
        password: formData.password,
      });
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page" id="register-page">
      {/* Floating Back to Home button connecting directly to the Hero page */}
      <Link to="/" className="auth-back-nav" id="back-to-home-link">
        <ArrowLeft size={15} />
        <span>Back to Portal</span>
      </Link>

      {/* Left Column: NoterX Editorial Showcase mirroring Hero Section */}
      <div className="auth-bg" id="auth-bg-register">
        <div className="auth-bg__overlay" />
        <div className="auth-bg__content">
          <div className="auth-bg__branding">
            <div className="auth-bg__logo">
              <img src="/logo.png" alt="Kasalig AI" width={32} />
            </div>
            <div className="auth-bg__brand-info">
              <span className="auth-bg__brand-name">
                Kasalig AI <span className="auth-bg__badge">BETA</span>
              </span>
              <span className="auth-bg__brand-subtitle">Province of Cebu · Official Services</span>
            </div>
          </div>

          <div className="auth-hero-eyebrow">
            <span className="eyebrow-dot" />
            CITIZEN ONBOARDING · PROVINCE OF CEBU
          </div>

          <div className="auth-bg__tagline">
            <h1 className="auth-bg__tagline-title">
              Government Requirements,
              <br />
              <span className="auth-bg__highlight">Made Simple & Swift.</span>
            </h1>
            <p className="auth-bg__tagline-text">
              Join Filipino citizens and business owners who rely on Kasalig AI for seamless business permit applications across all 53 municipalities in the Province of Cebu.
            </p>
          </div>

          {/* Hero Trust Indicators */}
          <div className="auth-trust-row">
            <div className="auth-trust-badge">
              <ShieldCheck size={15} className="trust-icon" />
              <span>Official Cebu Guidelines</span>
            </div>
            <div className="auth-trust-badge">
              <CheckCircle2 size={15} className="trust-icon" />
              <span>53 Municipalities Covered</span>
            </div>
            <div className="auth-trust-badge">
              <Sparkles size={15} className="trust-icon" />
              <span>24/7 AI-Guided Support</span>
            </div>
          </div>

          {/* Editorial Stats Bar */}
          <div className="auth-bg__stats">
            <div className="auth-bg__stat">
              <span className="auth-bg__stat-value">53</span>
              <span className="auth-bg__stat-label">Municipalities</span>
            </div>
            <div className="auth-bg__stat-divider" />
            <div className="auth-bg__stat">
              <span className="auth-bg__stat-value">24/7</span>
              <span className="auth-bg__stat-label">AI Assistance</span>
            </div>
            <div className="auth-bg__stat-divider" />
            <div className="auth-bg__stat">
              <span className="auth-bg__stat-value">100%</span>
              <span className="auth-bg__stat-label">Free for Citizens</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Citizen Registration Card */}
      <div className="auth-form-side" id="auth-form-side-register">
        <div className="auth-form-container">
          <div className="auth-mobile-logo">
            <div className="auth-bg__logo">
              <img src="/logo.png" alt="Kasalig AI" width={28} />
            </div>
            <span className="auth-mobile-logo__text">Kasalig AI</span>
          </div>

          <div className="auth-form-header">
            <div className="auth-form-badge">CITIZEN PORTAL</div>
            <h2 className="auth-form-header__title">Create your account</h2>
            <p className="auth-form-header__subtitle">
              Get started with Kasalig AI — free, private, and secured under RA 10173.
            </p>
          </div>

          {error && (
            <div className="auth-error" id="register-error">
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} id="register-form">
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="register-name">Full name</label>
              <div className="auth-input-wrapper">
                <User size={18} className="auth-input-icon" />
                <input
                  type="text"
                  id="register-name"
                  name="fullName"
                  className="auth-input"
                  placeholder="e.g. Maria Santos Dela Cruz"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-label" htmlFor="register-email">Email address</label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  className="auth-input"
                  placeholder="e.g. maria.santos@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-row">
              <div className="auth-input-group">
                <label className="auth-label" htmlFor="register-password">Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={18} className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="register-password"
                    name="password"
                    className="auth-input"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="auth-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="auth-input-group">
                <label className="auth-label" htmlFor="register-confirm">Confirm password</label>
                <div className="auth-input-wrapper">
                  <Lock size={18} className="auth-input-icon" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    id="register-confirm"
                    name="confirmPassword"
                    className="auth-input"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="auth-toggle-password"
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {formData.password.length > 0 && (
              <div className="password-strength" id="password-strength">
                <div className="password-strength__header">
                  <span className="auth-label" style={{ fontSize: '0.74rem' }}>Password Strength</span>
                  <span className="password-strength__label" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="password-strength__bar-track">
                  <div
                    className="password-strength__bar-fill"
                    style={{
                      width: `${(passwordStrength.score / passwordStrength.total) * 100}%`,
                      backgroundColor: passwordStrength.color,
                    }}
                  />
                </div>
                <ul className="password-strength__rules">
                  {passwordStrength.results.map((rule) => (
                    <li
                      key={rule.key}
                      className={`password-strength__rule ${rule.passed ? 'password-strength__rule--pass' : ''}`}
                    >
                      {rule.passed ? <Check size={12} /> : <X size={12} />}
                      {rule.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="auth-checkbox-row">
              <label className="auth-checkbox-label" htmlFor="agree-terms">
                <input
                  type="checkbox"
                  id="agree-terms"
                  className="auth-checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span className="auth-checkbox-custom" />
                <span>
                  I agree to the{' '}
                  <span className="auth-terms-link">Terms of Service</span> and{' '}
                  <span className="auth-terms-link">Privacy Policy</span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className={`auth-submit-btn ${isLoading ? 'auth-submit-btn--loading' : ''}`}
              disabled={isLoading}
              id="register-submit-btn"
            >
              {isLoading ? (
                <span className="auth-spinner" />
              ) : (
                <>
                  <span>Create Citizen Account</span>
                  <ArrowRight size={18} className="btn-arrow" />
                </>
              )}
            </button>
          </form>

          <div className="auth-privacy-notice" id="register-privacy-notice">
            <ShieldCheck size={15} />
            <span>Compliant with the Philippine Data Privacy Act of 2012 (RA 10173). Your credentials and business records are fully encrypted.</span>
          </div>

          <div className="auth-divider">
            <span className="auth-divider__text">or continue with</span>
          </div>

          <div className="auth-alt-actions">
            <button className="auth-social-btn" id="google-register-btn" onClick={handleGoogleSignup}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="auth-switch-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-switch-link" id="switch-to-login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
