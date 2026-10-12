import { useState } from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, CheckCircle2, FileCheck, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  // Automatically loads real image when placed at public/images/hero.jpg
  // Displays an elegant placeholder container if not yet present
  const [hasRealImage, setHasRealImage] = useState(false);

  return (
    <section className="hero-noterx" id="hero-section">
      <div className="section-container">
        <div className="hero-grid">
          {/* Left Column: Rounded Real Photo or Clean Placeholder */}
          <div className="hero-image-col">
            <div className="hero-image-card">
              {hasRealImage ? (
                <img
                  src="/images/hero.jpg"
                  alt="Kasalig AI Cebu Public Service Advisory"
                  className="hero-main-img"
                  onError={() => setHasRealImage(false)}
                />
              ) : (
                <div className="hero-placeholder-box">
                  <div className="placeholder-icon-circle">
                    <Camera size={34} />
                  </div>
                  <h4 className="placeholder-title">Official Photo Placeholder</h4>
                  <p className="placeholder-desc">
                    Place your real photo at
                    <br />
                    <code>public/images/hero.jpg</code>
                  </p>
                  {/* Invisible preloader to auto-detect when user puts real image */}
                  <img
                    src="/images/hero.jpg"
                    alt=""
                    style={{ display: 'none' }}
                    onLoad={() => setHasRealImage(true)}
                    onError={() => setHasRealImage(false)}
                  />
                </div>
              )}

              <div className="hero-floating-card">
                <div className="floating-card-icon">
                  <FileCheck size={20} />
                </div>
                <div className="floating-card-text">
                  <span className="floating-card-title">Business & Civil Registry</span>
                  <span className="floating-card-desc">Verified for all 53 LGUs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Headline & Actions */}
          <div className="hero-content-col">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot"></span>
              AI-POWERED · PROVINCE OF CEBU
            </div>

            <h1 className="hero-title display-1">
              Government Requirements,
              <br />
              <span className="serif-italic">Made Simple.</span>
            </h1>

            <p className="hero-subhead">
              Kasalig AI guides every citizen and business owner through official government requirements across all 53 municipalities in the Province of Cebu — eliminating confusion, red tape, and repeated visits.
            </p>

            <div className="hero-actions-row">
              <Link to="/chat" className="btn-noterx-primary btn-noterx-lg" id="chat-kasalig-btn">
                <MessageCircle size={17} />
                <span>Chat with Kasalig AI</span>
                <ArrowRight size={16} className="btn-arrow" />
              </Link>

              <Link to="/track" className="btn-noterx-line" id="track-applications-btn">
                <span>Track My Applications</span>
                <ArrowRight size={14} className="line-arrow" />
              </Link>
            </div>

            <div className="hero-trust-row">
              <div className="hero-trust-badge">
                <ShieldCheck size={16} className="trust-icon" />
                <span>Official Cebu Guidelines</span>
              </div>
              <div className="hero-trust-divider"></div>
              <div className="hero-trust-badge">
                <CheckCircle2 size={16} className="trust-icon" />
                <span>53 Municipalities Covered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
