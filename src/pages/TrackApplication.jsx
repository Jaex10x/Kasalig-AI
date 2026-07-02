import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Plus,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  Building2,
  BarChart3,
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';

/* ============================================= */
/*  Municipality processing data – Province of Cebu  */
/* ============================================= */
const municipalityData = [
  { name: 'Cebu City', avgDays: 4, pending: 342, approved: 1820, stage: 'Document Verification', trend: 'slow', rating: 3 },
  { name: 'Mandaue City', avgDays: 3, pending: 128, approved: 960, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Lapu-Lapu City', avgDays: 2, pending: 95, approved: 780, stage: 'Processing', trend: 'fast', rating: 5 },
  { name: 'Talisay City', avgDays: 4, pending: 187, approved: 540, stage: 'Approval Queue', trend: 'slow', rating: 3 },
  { name: 'Naga City', avgDays: 3, pending: 63, approved: 320, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Toledo City', avgDays: 4, pending: 94, approved: 280, stage: 'Document Verification', trend: 'slow', rating: 2 },
  { name: 'Danao City', avgDays: 3, pending: 76, approved: 390, stage: 'Approval Queue', trend: 'normal', rating: 4 },
  { name: 'Carcar City', avgDays: 3, pending: 52, approved: 410, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Bogo City', avgDays: 3, pending: 41, approved: 290, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Consolacion', avgDays: 2, pending: 88, approved: 620, stage: 'Processing', trend: 'fast', rating: 5 },
  { name: 'Liloan', avgDays: 2, pending: 67, approved: 480, stage: 'Processing', trend: 'fast', rating: 5 },
  { name: 'Minglanilla', avgDays: 3, pending: 102, approved: 510, stage: 'Document Verification', trend: 'normal', rating: 4 },
  { name: 'Compostela', avgDays: 3, pending: 38, approved: 220, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Cordova', avgDays: 2, pending: 22, approved: 180, stage: 'Processing', trend: 'fast', rating: 5 },
  { name: 'San Fernando', avgDays: 4, pending: 71, approved: 350, stage: 'Approval Queue', trend: 'slow', rating: 3 },
  { name: 'Argao', avgDays: 3, pending: 29, approved: 190, stage: 'Document Verification', trend: 'normal', rating: 4 },
  { name: 'Dalaguete', avgDays: 3, pending: 18, approved: 130, stage: 'Approval Queue', trend: 'normal', rating: 4 },
  { name: 'Barili', avgDays: 3, pending: 24, approved: 150, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Moalboal', avgDays: 2, pending: 15, approved: 110, stage: 'Processing', trend: 'fast', rating: 5 },
  { name: 'Balamban', avgDays: 3, pending: 33, approved: 200, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Asturias', avgDays: 5, pending: 27, approved: 140, stage: 'Document Verification', trend: 'slow', rating: 2 },
  { name: 'Tuburan', avgDays: 4, pending: 19, approved: 100, stage: 'Approval Queue', trend: 'slow', rating: 3 },
  { name: 'Bantayan', avgDays: 3, pending: 14, approved: 90, stage: 'Document Verification', trend: 'normal', rating: 4 },
  { name: 'Madridejos', avgDays: 3, pending: 11, approved: 70, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Santa Fe', avgDays: 2, pending: 9, approved: 85, stage: 'Processing', trend: 'fast', rating: 5 },
  { name: 'Daanbantayan', avgDays: 3, pending: 21, approved: 160, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Medellin', avgDays: 3, pending: 16, approved: 120, stage: 'Document Verification', trend: 'normal', rating: 4 },
  { name: 'Catmon', avgDays: 4, pending: 13, approved: 80, stage: 'Approval Queue', trend: 'slow', rating: 3 },
  { name: 'Carmen', avgDays: 3, pending: 25, approved: 170, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Borbon', avgDays: 4, pending: 10, approved: 60, stage: 'Approval Queue', trend: 'slow', rating: 2 },
  { name: 'Tabogon', avgDays: 3, pending: 12, approved: 75, stage: 'Document Verification', trend: 'normal', rating: 4 },
  { name: 'Sogod', avgDays: 2, pending: 8, approved: 65, stage: 'Processing', trend: 'fast', rating: 5 },
  { name: 'Tabuelan', avgDays: 4, pending: 7, approved: 50, stage: 'Approval Queue', trend: 'slow', rating: 2 },
  { name: 'Aloguinsan', avgDays: 2, pending: 11, approved: 95, stage: 'Processing', trend: 'fast', rating: 5 },
  { name: 'Pinamungajan', avgDays: 3, pending: 20, approved: 130, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Dumanjug', avgDays: 4, pending: 15, approved: 100, stage: 'Approval Queue', trend: 'slow', rating: 3 },
  { name: 'Ronda', avgDays: 3, pending: 6, approved: 55, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Alcantara', avgDays: 2, pending: 5, approved: 45, stage: 'Processing', trend: 'fast', rating: 5 },
  { name: 'Badian', avgDays: 3, pending: 10, approved: 70, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Alegria', avgDays: 4, pending: 7, approved: 50, stage: 'Document Verification', trend: 'slow', rating: 3 },
  { name: 'Ginatilan', avgDays: 4, pending: 8, approved: 45, stage: 'Approval Queue', trend: 'slow', rating: 2 },
  { name: 'Samboan', avgDays: 3, pending: 5, approved: 40, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Santander', avgDays: 2, pending: 4, approved: 35, stage: 'Processing', trend: 'fast', rating: 5 },
  { name: 'Oslob', avgDays: 2, pending: 9, approved: 80, stage: 'Processing', trend: 'fast', rating: 5 },
  { name: 'Boljoon', avgDays: 3, pending: 6, approved: 40, stage: 'Document Verification', trend: 'normal', rating: 4 },
  { name: 'Alcoy', avgDays: 3, pending: 5, approved: 35, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Sibonga', avgDays: 3, pending: 18, approved: 140, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Malabuyoc', avgDays: 4, pending: 7, approved: 30, stage: 'Approval Queue', trend: 'slow', rating: 2 },
  { name: 'Poro', avgDays: 4, pending: 8, approved: 55, stage: 'Document Verification', trend: 'slow', rating: 3 },
  { name: 'Tudela', avgDays: 3, pending: 4, approved: 30, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'San Francisco', avgDays: 3, pending: 10, approved: 65, stage: 'Processing', trend: 'normal', rating: 4 },
  { name: 'Pilar', avgDays: 3, pending: 5, approved: 40, stage: 'Document Verification', trend: 'normal', rating: 4 },
  { name: 'San Remigio', avgDays: 3, pending: 12, approved: 90, stage: 'Processing', trend: 'normal', rating: 4 },
];

/* ============================================= */
/*  User's own tracked applications (mock)       */
/* ============================================= */
const userApplications = [
  {
    id: 'KSL-2026-00213',
    title: 'Business Permit',
    municipality: 'Cebu City',
    status: 'Under Review',
    statusType: 'review',
    stepsCompleted: 2,
    totalSteps: 4,
    submittedDate: 'June 20, 2026',
    estimatedDate: 'June 23, 2026',
    timeline: [
      { label: 'Application Submitted', date: 'Jun 20, 2026', done: true },
      { label: 'Under Review', date: 'Jun 22, 2026', done: true },
      { label: 'Approved for Processing', date: null, done: false },
      { label: 'Ready for Release', date: null, done: false },
    ],
  },
  {
    id: 'KSL-2026-00287',
    title: 'Business Permit',
    municipality: 'Mandaue City',
    status: 'Pending',
    statusType: 'pending',
    stepsCompleted: 1,
    totalSteps: 4,
    submittedDate: 'June 28, 2026',
    estimatedDate: 'July 1, 2026',
    timeline: [
      { label: 'Application Submitted', date: 'Jun 28, 2026', done: true },
      { label: 'Under Review', date: null, done: false },
      { label: 'Approved for Processing', date: null, done: false },
      { label: 'Ready for Release', date: null, done: false },
    ],
  },
  {
    id: 'KSL-2026-00305',
    title: 'Civil Registry Correction',
    municipality: 'Talisay City',
    status: 'Under Review',
    statusType: 'review',
    stepsCompleted: 2,
    totalSteps: 4,
    submittedDate: 'May 10, 2026',
    estimatedDate: 'November 10, 2026',
    timeline: [
      { label: 'Correction Petition Filed', date: 'May 10, 2026', done: true },
      { label: 'Under Review by LCR', date: 'May 15, 2026', done: true },
      { label: 'Pending PSA Approval', date: null, done: false },
      { label: 'Ready for Release', date: null, done: false },
    ],
  },
];

/* ============================================= */
/*  Filter tabs                                   */
/* ============================================= */
const trendFilterTabs = [
  { key: 'all', label: 'All Municipalities' },
  { key: 'slow', label: 'Slow Processing' },
  { key: 'normal', label: 'Normal' },
  { key: 'fast', label: 'Fast Processing' },
];

const TrackApplication = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCard, setExpandedCard] = useState(userApplications[0]?.id || null);
  const [showMyApps, setShowMyApps] = useState(false);

  /* Filter municipalities */
  const filteredMunicipalities = municipalityData
    .filter((m) => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || m.trend === activeFilter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => b.avgDays - a.avgDays); /* slowest first */

  /* Summary stats */
  const totalPending = municipalityData.reduce((sum, m) => sum + m.pending, 0);
  const avgProcessing = (municipalityData.reduce((sum, m) => sum + m.avgDays, 0) / municipalityData.length).toFixed(1);
  const slowCount = municipalityData.filter((m) => m.trend === 'slow').length;
  const fastCount = municipalityData.filter((m) => m.trend === 'fast').length;

  const summaryStats = [
    { value: municipalityData.length, label: 'Municipalities', color: '#2563eb', icon: Building2 },
    { value: totalPending.toLocaleString(), label: 'Pending Permits', color: '#ea580c', icon: Clock },
    { value: slowCount, label: 'Slow Processing', color: '#dc2626', icon: TrendingDown },
    { value: `${avgProcessing}d`, label: 'Avg. Processing', color: '#16a34a', icon: BarChart3 },
  ];

  const getTrendBadge = (trend) => {
    switch (trend) {
      case 'fast': return { className: 'municipality-trend--fast', label: 'Fast', icon: TrendingUp };
      case 'slow': return { className: 'municipality-trend--slow', label: 'Slow', icon: TrendingDown };
      default: return { className: 'municipality-trend--normal', label: 'Normal', icon: BarChart3 };
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`municipality-star ${i < rating ? 'municipality-star--filled' : ''}`}>★</span>
    ));
  };

  const getProgressWidth = (days) => {
    const maxDays = 14;
    return Math.min((days / maxDays) * 100, 100);
  };

  const getProgressColor = (days) => {
    if (days <= 4) return '#16a34a';
    if (days <= 7) return '#f59e0b';
    return '#dc2626';
  };

  const getStatusBadgeClass = (type) => {
    switch (type) {
      case 'ready': return 'track-status--ready';
      case 'review': return 'track-status--review';
      case 'pending': return 'track-status--pending';
      case 'completed': return 'track-status--completed';
      default: return '';
    }
  };

  return (
    <div className="track-page" id="track-application-page">
      <Navbar />

      <div className="track-content">

        <header className="track-header" id="track-header">
          <div className="track-header__text">
            <h1 className="track-header__title">
              <MapPin size={24} className="track-header__icon" />
              Province of Cebu — Municipality Tracker
            </h1>
            <p className="track-header__subtitle">
              Monitor business permit processing speed across all municipalities in Cebu
            </p>
          </div>
          <div className="track-header__toggle">
            <button
              className={`track-toggle-btn ${!showMyApps ? 'track-toggle-btn--active' : ''}`}
              onClick={() => setShowMyApps(false)}
              id="show-municipalities-btn"
            >
              <Building2 size={14} />
              Municipalities
            </button>
            <button
              className={`track-toggle-btn ${showMyApps ? 'track-toggle-btn--active' : ''}`}
              onClick={() => setShowMyApps(true)}
              id="show-my-apps-btn"
            >
              <FileText size={14} />
              My Applications
            </button>
          </div>
        </header>

        {/* ======== SUMMARY STATS ======== */}
        <div className="track-stats" id="track-stats">
          {summaryStats.map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div className="track-stat-card" key={stat.label}>
                <div className="track-stat-card__icon-wrap" style={{ color: stat.color }}>
                  <StatIcon size={18} />
                </div>
                <div className="track-stat-card__info">
                  <span className="track-stat-card__value" style={{ color: stat.color }}>
                    {stat.value}
                  </span>
                  <span className="track-stat-card__label">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>


        {/* ======== MUNICIPALITY DASHBOARD ======== */}
        {!showMyApps && (
          <>
            {/* Search */}
            <div className="track-search" id="track-search">
              <div className="track-search__input-wrapper">
                <Search size={16} className="track-search__icon" />
                <input
                  type="text"
                  className="track-search__input"
                  placeholder="Search municipality..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id="track-search-input"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="track-filters" id="track-filters">
              {trendFilterTabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`track-filter-tab ${activeFilter === tab.key ? 'track-filter-tab--active' : ''}`}
                  onClick={() => setActiveFilter(tab.key)}
                  id={`filter-${tab.key}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Municipality Cards */}
            <div className="municipality-grid" id="municipality-grid">
              {filteredMunicipalities.map((muni) => {
                const trendInfo = getTrendBadge(muni.trend);
                const TrendIcon = trendInfo.icon;
                return (
                  <div
                    className={`municipality-card ${muni.trend === 'slow' ? 'municipality-card--slow' : ''}`}
                    key={muni.name}
                    id={`muni-${muni.name.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <div className="municipality-card__header">
                      <div className="municipality-card__name-row">
                        <MapPin size={16} className="municipality-card__pin" />
                        <h3 className="municipality-card__name">{muni.name}</h3>
                      </div>
                      <span className={`municipality-trend ${trendInfo.className}`}>
                        <TrendIcon size={12} />
                        {trendInfo.label}
                      </span>
                    </div>

                    <div className="municipality-card__body">
                      <div className="municipality-card__avg">
                        <span className="municipality-card__avg-value" style={{ color: getProgressColor(muni.avgDays) }}>
                          {muni.avgDays}
                        </span>
                        <span className="municipality-card__avg-label">avg. days</span>
                      </div>

                      <div className="municipality-card__progress">
                        <div className="municipality-card__progress-bar">
                          <div
                            className="municipality-card__progress-fill"
                            style={{
                              width: `${getProgressWidth(muni.avgDays)}%`,
                              backgroundColor: getProgressColor(muni.avgDays),
                            }}
                          />
                        </div>
                      </div>

                      <div className="municipality-card__details">
                        <div className="municipality-card__detail">
                          <span className="municipality-card__detail-label">Current Stage</span>
                          <span className="municipality-card__detail-value">{muni.stage}</span>
                        </div>
                        <div className="municipality-card__detail">
                          <span className="municipality-card__detail-label">Pending</span>
                          <span className="municipality-card__detail-value">{muni.pending}</span>
                        </div>
                        <div className="municipality-card__detail">
                          <span className="municipality-card__detail-label">Approved</span>
                          <span className="municipality-card__detail-value municipality-card__detail-value--green">{muni.approved.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="municipality-card__rating">
                        <span className="municipality-card__rating-label">Processing Rating</span>
                        <div className="municipality-card__stars">
                          {getRatingStars(muni.rating)}
                        </div>
                      </div>

                      {muni.trend === 'slow' && (
                        <div className="municipality-card__alert">
                          <AlertTriangle size={14} />
                          <span>Slow processing — expect delays of {muni.avgDays}+ days</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredMunicipalities.length === 0 && (
              <div className="track-empty" id="track-empty">
                <MapPin size={32} />
                <h3>No municipalities found</h3>
                <p>Try a different search term or filter</p>
              </div>
            )}
          </>
        )}


        {/* ======== MY APPLICATIONS ======== */}
        {showMyApps && (
          <>
            <div className="track-cards" id="track-cards">
              {userApplications.map((app) => {
                const isExpanded = expandedCard === app.id;
                const progressPercent = (app.stepsCompleted / app.totalSteps) * 100;

                return (
                  <div
                    className={`track-card ${isExpanded ? 'track-card--expanded' : ''}`}
                    key={app.id}
                    id={`track-card-${app.id}`}
                  >

                    <div
                      className="track-card__header"
                      onClick={() => setExpandedCard(isExpanded ? null : app.id)}
                    >
                      <div className="track-card__icon">
                        <FileText size={20} />
                      </div>
                      <div className="track-card__info">
                        <h3 className="track-card__title">{app.title}</h3>
                        <span className="track-card__id">
                          <MapPin size={12} /> {app.municipality} · {app.id}
                        </span>
                      </div>
                      <div className="track-card__right">
                        <span className={`track-status ${getStatusBadgeClass(app.statusType)}`}>
                          <span className="track-status__dot"></span>
                          {app.status}
                        </span>
                        {isExpanded ? <ChevronUp size={18} className="track-card__chevron" /> : <ChevronDown size={18} className="track-card__chevron" />}
                      </div>
                    </div>


                    <div className="track-card__progress">
                      <div className="track-progress-bar">
                        <div
                          className="track-progress-bar__fill"
                          style={{
                            width: `${progressPercent}%`,
                            backgroundColor: '#2563eb',
                          }}
                        />
                      </div>
                      <span className="track-card__steps">
                        {app.stepsCompleted}/{app.totalSteps} steps
                      </span>
                    </div>


                    <div className="track-card__dates">
                      <span>
                        Submitted: <strong>{app.submittedDate}</strong>
                      </span>
                      {app.estimatedDate && (
                        <span>
                          Estimated: <strong>{app.estimatedDate}</strong>
                        </span>
                      )}
                    </div>


                    {isExpanded && (
                      <div className="track-card__expanded">
                        <h4 className="track-timeline__title">APPLICATION TIMELINE</h4>
                        <div className="track-timeline">
                          {app.timeline.map((step, index) => (
                            <div
                              className={`track-timeline__item ${step.done ? 'track-timeline__item--done' : ''}`}
                              key={index}
                            >
                              <div className="track-timeline__marker">
                                {step.done ? (
                                  <CheckCircle2 size={20} className="track-timeline__check" />
                                ) : (
                                  <div className="track-timeline__circle" />
                                )}
                                {index < app.timeline.length - 1 && (
                                  <div className={`track-timeline__line ${step.done ? 'track-timeline__line--done' : ''}`} />
                                )}
                              </div>
                              <div className="track-timeline__content">
                                <span className="track-timeline__label">{step.label}</span>
                                {step.date && (
                                  <span className="track-timeline__date">{step.date}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {userApplications.length === 0 && (
              <div className="track-empty" id="track-empty-apps">
                <FileText size={32} />
                <h3>No applications yet</h3>
                <p>Apply for a business permit to get started</p>
              </div>
            )}
          </>
        )}


        {/* ======== CTA ======== */}
        <div className="track-cta" id="track-cta">
          <div className="track-cta__text">
            <h3 className="track-cta__title">Apply for a Business Permit</h3>
            <p className="track-cta__subtitle">
              Start your business permit application in any municipality across the Province of Cebu.
            </p>
          </div>
          <div className="track-cta__actions">
            <button
              className="track-cta__btn track-cta__btn--primary"
              onClick={() => navigate('/apply/business-permit')}
              id="apply-now-btn"
            >
              <Plus size={16} />
              Apply Now
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackApplication;
