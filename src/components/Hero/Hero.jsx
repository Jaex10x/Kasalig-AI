import { useState } from 'react';
import {
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Camera,
  Plus,
  FileText,
  Clock,
  Sparkles,
  AlertCircle,
  Check,
  Building2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/* User mock applications for the logged-in citizen view */
const citizenApplications = [
  {
    id: 'KSL-2026-00213',
    title: "Business Permit (Mayor's Permit)",
    lgu: 'Cebu City',
    status: 'Under Review',
    statusClass: 'status-badge--review',
    step: 2,
    totalSteps: 4,
    pct: 50,
    papers: ['Barangay Clearance', 'DTI Cert', 'Cedula'],
    updated: '2 hrs ago',
  },
  {
    id: 'KSL-2026-00287',
    title: 'Barangay & Community Tax (Cedula)',
    lgu: 'Mandaue City',
    status: 'Pending Verification',
    statusClass: 'status-badge--pending',
    step: 1,
    totalSteps: 3,
    pct: 33,
    papers: ['Government ID', 'Proof of Income'],
    updated: 'Yesterday',
  },
  {
    id: 'KSL-2026-00305',
    title: 'Civil Registry Correction',
    lgu: 'Talisay City',
    status: 'LCR Docket Assigned',
    statusClass: 'status-badge--review',
    step: 2,
    totalSteps: 4,
    pct: 50,
    papers: ['PSA Copy', 'Affidavit of Correction'],
    updated: '3 days ago',
  },
];

/* Official requirements checklist for Cebu LGUs */
const requiredChecklist = [
  {
    title: 'Barangay Business Clearance',
    category: 'Local Clearance',
    status: 'Verified',
    statusType: 'verified',
    description: 'Mandatory territorial clearance prior to Mayor’s Permit issuance.',
  },
  {
    title: 'Community Tax Certificate (Cedula)',
    category: 'Assessment & Tax',
    status: 'Verified',
    statusType: 'verified',
    description: 'Current taxable year certification computed at municipal treasury.',
  },
  {
    title: 'DTI / SEC Registration Certificate',
    category: 'National Trade Legitimacy',
    status: 'Verified',
    statusType: 'verified',
    description: 'Sole proprietorship (DTI) or corporate registration (SEC).',
  },
  {
    title: 'Contract of Lease / Property Title',
    category: 'Location Proof',
    status: 'Action Needed',
    statusType: 'action',
    description: 'Official proof of physical establishment inside the LGU.',
  },
  {
    title: 'Sanitary & Fire Safety Clearances',
    category: 'Regulatory Inspections',
    status: 'Next Step',
    statusType: 'pending',
    description: 'Scheduled after municipal document review is approved.',
  },
];

const Hero = () => {
  const { isAuthenticated, user } = useAuth();
  const [hasRealImage, setHasRealImage] = useState(true);
  const [citizenTab, setCitizenTab] = useState('applications'); // 'applications' | 'checklist'

  /* ==============================================================
     LOGGED-IN CITIZEN VIEW: Government Papers & Requirements Desk
     ============================================================== */
  if (isAuthenticated) {
    return (
      <section className="hero-noterx citizen-hero-section" id="hero-section">
        <div className="section-container">
          <div className="hero-grid citizen-hero-grid">
            {/* Left Column: Citizen Welcome & Quick Overview */}
            <div className="hero-content-col citizen-hero-left">
              <div className="hero-eyebrow citizen-hero-eyebrow">
                <span className="eyebrow-dot"></span>
                CITIZEN PORTAL · PROVINCE OF CEBU
              </div>

              <h1 className="hero-title display-1">
                Welcome back,
                <br />
                <span className="serif-italic">{user?.name || 'Citizen'}</span>
              </h1>

              <p className="hero-subhead citizen-hero-subhead">
                Your centralized desk for municipal clearances, official document requirements, and live permit processing across all 53 municipalities in the Province of Cebu.
              </p>

              {/* Citizen Overview Stats */}
              <div className="citizen-hero-stats">
                <div className="citizen-hero-stat-chip">
                  <span className="stat-chip-number">3</span>
                  <span className="stat-chip-label">Active Applications</span>
                </div>
                <div className="citizen-hero-stat-divider"></div>
                <div className="citizen-hero-stat-chip">
                  <span className="stat-chip-number">3/5</span>
                  <span className="stat-chip-label">Requirements Verified</span>
                </div>
                <div className="citizen-hero-stat-divider"></div>
                <div className="citizen-hero-stat-chip">
                  <span className="stat-chip-number">53</span>
                  <span className="stat-chip-label">LGUs Available</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="hero-actions-row citizen-hero-actions">
                <Link
                  to="/apply/business-permit"
                  className="btn-noterx-primary btn-noterx-lg"
                  id="citizen-apply-btn"
                >
                  <Plus size={18} />
                  <span>File New Application</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </Link>

                <Link
                  to="/track"
                  className="btn-noterx-line"
                  id="citizen-track-btn"
                >
                  <span>Track All Filings</span>
                  <ArrowRight size={14} className="line-arrow" />
                </Link>

                <Link
                  to="/chat"
                  className="btn-noterx-outline citizen-ask-ai-btn"
                  id="citizen-chat-btn"
                >
                  <MessageCircle size={15} />
                  <span>Ask Kasalig AI</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="hero-trust-row citizen-trust-row">
                <div className="hero-trust-badge">
                  <ShieldCheck size={16} className="trust-icon" />
                  <span>Official Cebu Guidelines</span>
                </div>
                <div className="hero-trust-divider"></div>
                <div className="hero-trust-badge">
                  <CheckCircle2 size={16} className="trust-icon" />
                  <span>Verified Citizen Account</span>
                </div>
              </div>
            </div>

            {/* Right Column: Government Papers & Requirements Desk */}
            <div className="hero-image-col citizen-desk-col">
              <div className="citizen-desk-card" id="citizen-desk-card">
                {/* Desk Header */}
                <div className="citizen-desk-header">
                  <div className="citizen-desk-meta-top">
                    <span className="citizen-desk-badge">
                      <FileText size={12} />
                      GOVERNMENT PAPERS & REQUIREMENTS
                    </span>
                    <span className="citizen-desk-live-indicator">
                      <span className="live-dot"></span> 3 In Progress
                    </span>
                  </div>

                  {/* Segmented Switcher */}
                  <div className="citizen-desk-tabs" role="tablist">
                    <button
                      type="button"
                      className={`citizen-desk-tab ${citizenTab === 'applications' ? 'citizen-desk-tab--active' : ''}`}
                      onClick={() => setCitizenTab('applications')}
                      id="tab-citizen-applications"
                    >
                      <span>Active Applications</span>
                      <span className="citizen-tab-count">3</span>
                    </button>
                    <button
                      type="button"
                      className={`citizen-desk-tab ${citizenTab === 'checklist' ? 'citizen-desk-tab--active' : ''}`}
                      onClick={() => setCitizenTab('checklist')}
                      id="tab-citizen-checklist"
                    >
                      <span>Document Checklist</span>
                      <span className="citizen-tab-count">5</span>
                    </button>
                  </div>
                </div>

                {/* Desk Body: Applications Tab */}
                {citizenTab === 'applications' && (
                  <div className="citizen-desk-content" id="desk-applications-list">
                    <div className="citizen-applications-list">
                      {citizenApplications.map((app) => (
                        <div key={app.id} className="citizen-app-row" id={`hero-app-${app.id}`}>
                          <div className="citizen-app-main">
                            <div className="citizen-app-title-line">
                              <span className="citizen-app-title">{app.title}</span>
                              <span className={`status-badge ${app.statusClass}`}>{app.status}</span>
                            </div>

                            <div className="citizen-app-lgu-line">
                              <span className="citizen-lgu-tag">
                                <Building2 size={12} />
                                {app.lgu}
                              </span>
                              <span className="meta-bullet">·</span>
                              <span className="citizen-id-tag">{app.id}</span>
                              <span className="meta-bullet">·</span>
                              <span className="citizen-time-tag">
                                <Clock size={11} /> {app.updated}
                              </span>
                            </div>

                            {/* Progress Indicator */}
                            <div className="citizen-progress-wrapper">
                              <div className="citizen-progress-labels">
                                <span>Step {app.step} of {app.totalSteps}</span>
                                <span>{app.pct}% completed</span>
                              </div>
                              <div className="citizen-progress-track">
                                <div
                                  className="citizen-progress-bar"
                                  style={{ width: `${app.pct}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Attached Government Papers */}
                            <div className="citizen-attached-papers">
                              <span className="papers-label">Papers on file:</span>
                              {app.papers.map((paper, idx) => (
                                <span key={idx} className="paper-tag">
                                  <Check size={10} /> {paper}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="citizen-desk-footer">
                      <Link to="/track" className="citizen-desk-footer-link" id="hero-view-all-tracker">
                        <span>Open Complete Application Tracker</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Desk Body: Checklist Tab */}
                {citizenTab === 'checklist' && (
                  <div className="citizen-desk-content" id="desk-checklist-list">
                    <div className="citizen-checklist-lead">
                      <span>Standard documents required by Cebu municipal assessors and licensing bureaus:</span>
                    </div>

                    <div className="citizen-checklist-list">
                      {requiredChecklist.map((item, idx) => (
                        <div key={idx} className="citizen-checklist-row">
                          <div className="checklist-status-icon">
                            {item.statusType === 'verified' && (
                              <div className="icon-circle icon-circle--success">
                                <Check size={13} />
                              </div>
                            )}
                            {item.statusType === 'action' && (
                              <div className="icon-circle icon-circle--warning">
                                <AlertCircle size={13} />
                              </div>
                            )}
                            {item.statusType === 'pending' && (
                              <div className="icon-circle icon-circle--neutral">
                                <Clock size={13} />
                              </div>
                            )}
                          </div>

                          <div className="checklist-content">
                            <div className="checklist-header-line">
                              <span className="checklist-title">{item.title}</span>
                              <span
                                className={`checklist-badge checklist-badge--${item.statusType}`}
                              >
                                {item.status}
                              </span>
                            </div>
                            <p className="checklist-desc">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="citizen-desk-footer">
                      <Link
                        to="/apply/business-permit"
                        className="citizen-desk-footer-link"
                        id="hero-checklist-upload"
                      >
                        <span>Upload Remaining Requirements</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ==============================================================
     UNAUTHENTICATED GUEST VIEW: Public Hero Section
     ============================================================== */
  return (
    <section className="hero-noterx" id="hero-section">
      <div className="section-container">
        <div className="hero-grid">
          {/* Left Column: Official Photo or Civic Placeholder */}
          <div className="hero-image-col">
            <div className="hero-image-card">
              {hasRealImage ? (
                <img
                  src="/images/hero.jpg"
                  alt="Hon. Nestor Archival - Kasalig AI Cebu Public Service"
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
                  <img
                    src="/images/hero.jpg"
                    alt=""
                    style={{ display: 'none' }}
                    onLoad={() => setHasRealImage(true)}
                    onError={() => setHasRealImage(false)}
                  />
                </div>
              )}
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

            <div className="hero-citizen-prompt">
              <span>Applying for a permit or clearance?</span>{' '}
              <Link to="/register" className="hero-citizen-link" id="hero-register-link">
                Register as Citizen <ArrowRight size={13} />
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
