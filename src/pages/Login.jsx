import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, MessageCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await auth.login({ email: formData.email, password: formData.password });
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page" id="login-page">
      {/* Background Image Side */}
      <div className="auth-bg" id="auth-bg">
        <div className="auth-bg__overlay" />
        <div className="auth-bg__content">
          <div className="auth-bg__branding">
            <div className="auth-bg__logo">
              <img src="/logo.png" alt="Kasalig AI" width={22} />
            </div>
            <div className="auth-bg__brand-info">
              <span className="auth-bg__brand-name">
                Kasalig AI <span className="auth-bg__badge">BETA</span>
              </span>
              <span className="auth-bg__brand-subtitle">Government Services AI</span>
            </div>
          </div>
          <div className="auth-bg__tagline">
            <h2 className="auth-bg__tagline-title">
              Your gateway to seamless<br />
              <span className="auth-bg__highlight">government services</span>
            </h2>
            <p className="auth-bg__tagline-text">
              Access government services, track applications, and get AI-powered assistance — all in one place.
            </p>
          </div>
          <div className="auth-bg__stats">
            <div className="auth-bg__stat">
              <span className="auth-bg__stat-value">50+</span>
              <span className="auth-bg__stat-label">Services</span>
            </div>
            <div className="auth-bg__stat-divider" />
            <div className="auth-bg__stat">
              <span className="auth-bg__stat-value">24/7</span>
              <span className="auth-bg__stat-label">AI Support</span>
            </div>
            <div className="auth-bg__stat-divider" />
            <div className="auth-bg__stat">
              <span className="auth-bg__stat-value">100%</span>
              <span className="auth-bg__stat-label">Free</span>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="auth-form-side" id="auth-form-side">
        <div className="auth-form-container">
          {}
          <div className="auth-mobile-logo">
            <div className="auth-bg__logo">
              <img src="/logo.png" alt="Kasalig AI" width={22} />
            </div>
            <span className="auth-mobile-logo__text">Kasalig AI</span>
          </div>

          <div className="auth-form-header">
            <h1 className="auth-form-header__title">Welcome back</h1>
            <p className="auth-form-header__subtitle">
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="auth-error" id="login-error">
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} id="login-form">
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="login-email">Email address</label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  className="auth-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <div className="auth-label-row">
                <label className="auth-label" htmlFor="login-password">Password</label>
                <button type="button" className="auth-forgot-link" id="forgot-password-link">
                  Forgot password?
                </button>
              </div>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  name="password"
                  className="auth-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
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

            <div className="auth-checkbox-row">
              <label className="auth-checkbox-label" htmlFor="remember-me">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="auth-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="auth-checkbox-custom" />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className={`auth-submit-btn ${isLoading ? 'auth-submit-btn--loading' : ''}`}
              disabled={isLoading}
              id="login-submit-btn"
            >
              {isLoading ? (
                <span className="auth-spinner" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span className="auth-divider__text">or</span>
          </div>

          <div className="auth-alt-actions">
            <button className="auth-social-btn" id="google-login-btn">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="auth-switch-text">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="auth-switch-link" id="switch-to-register">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
