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
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';

const applicationsData = [
  {
    id: 'KSL-2026-00142',
    title: 'National ID (PhilSys)',
    icon: 'id',
    status: 'Ready for Pickup',
    statusType: 'ready',
    stepsCompleted: 4,
    totalSteps: 4,
    submittedDate: 'March 15, 2026',
    estimatedDate: 'May 5, 2026',
    completedDate: null,
    timeline: [
      { label: 'Application Submitted', date: 'Mar 15, 2026', done: true },
      { label: 'Under Review', date: 'Mar 18, 2026', done: true },
      { label: 'Approved for Processing', date: 'Apr 10, 2026', done: true },
      { label: 'Ready for Pickup', date: 'May 5, 2026', done: true },
    ],
    pickupInfo: {
      location: 'SM Megamall Kasalig Service Center, 3rd Floor, EDSA, Mandaluyong City.',
      hours: 'Mon–Fri 8:00 AM – 5:00 PM',
    },
  },
  {
    id: 'KSL-2026-00213',
    title: 'Business Registration (DTI)',
    icon: 'business',
    status: 'Under Review',
    statusType: 'review',
    stepsCompleted: 2,
    totalSteps: 4,
    submittedDate: 'April 20, 2026',
    estimatedDate: 'May 20, 2026',
    completedDate: null,
    timeline: [
      { label: 'Application Submitted', date: 'Apr 20, 2026', done: true },
      { label: 'Under Review', date: 'Apr 25, 2026', done: true },
      { label: 'Approved for Processing', date: null, done: false },
      { label: 'Ready for Pickup', date: null, done: false },
    ],
    pickupInfo: null,
  },
  {
    id: 'KSL-2026-00287',
    title: 'Birth Certificate (PSA)',
    icon: 'document',
    status: 'Pending',
    statusType: 'pending',
    stepsCompleted: 1,
    totalSteps: 4,
    submittedDate: 'May 8, 2026',
    estimatedDate: 'May 22, 2026',
    completedDate: null,
    timeline: [
      { label: 'Application Submitted', date: 'May 8, 2026', done: true },
      { label: 'Under Review', date: null, done: false },
      { label: 'Approved for Processing', date: null, done: false },
      { label: 'Ready for Pickup', date: null, done: false },
    ],
    pickupInfo: null,
  },
  {
    id: 'KSL-2025-09921',
    title: 'Passport Application (DFA)',
    icon: 'document',
    status: 'Completed',
    statusType: 'completed',
    stepsCompleted: 4,
    totalSteps: 4,
    submittedDate: 'Dec 3, 2025',
    estimatedDate: null,
    completedDate: 'Dec 22, 2025',
    timeline: [
      { label: 'Application Submitted', date: 'Dec 3, 2025', done: true },
      { label: 'Under Review', date: 'Dec 8, 2025', done: true },
      { label: 'Approved for Processing', date: 'Dec 15, 2025', done: true },
      { label: 'Completed', date: 'Dec 22, 2025', done: true },
    ],
    pickupInfo: null,
  },
];

const filterTabs = [
  { key: 'all', label: 'All', count: 4 },
  { key: 'pending', label: 'Pending', count: 1 },
  { key: 'review', label: 'Processing', count: 1 },
  { key: 'ready', label: 'Ready', count: 1 },
  { key: 'completed', label: 'Completed', count: 1 },
];

const TrackApplication = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCard, setExpandedCard] = useState('KSL-2026-00142');

  const filteredApps = applicationsData.filter((app) => {
    const matchesSearch =
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === 'all' || app.statusType === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const summaryStats = [
    { value: applicationsData.length, label: 'Total', color: '#2563eb' },
    { value: applicationsData.filter((a) => a.statusType === 'pending').length, label: 'Pending', color: '#ea580c' },
    { value: applicationsData.filter((a) => a.statusType === 'review').length, label: 'In Progress', color: '#2563eb' },
    { value: applicationsData.filter((a) => a.statusType === 'ready').length, label: 'Ready', color: '#16a34a' },
  ];

  const getStatusBadgeClass = (type) => {
    switch (type) {
      case 'ready': return 'track-status--ready';
      case 'review': return 'track-status--review';
      case 'pending': return 'track-status--pending';
      case 'completed': return 'track-status--completed';
      default: return '';
    }
  };

  const getProgressColor = (type) => {
    switch (type) {
      case 'ready': return '#16a34a';
      case 'completed': return '#16a34a';
      case 'review': return '#2563eb';
      case 'pending': return '#2563eb';
      default: return '#2563eb';
    }
  };

  return (
    <div className="track-page" id="track-application-page">
      <Navbar />

      <div className="track-content">
        {/* Page Header */}
        <header className="track-header" id="track-header">
          <h1 className="track-header__title">My Applications</h1>
          <p className="track-header__subtitle">
            Track the status of all your government service applications
          </p>
        </header>

        {/* Summary Stats */}
        <div className="track-stats" id="track-stats">
          {summaryStats.map((stat) => (
            <div className="track-stat-card" key={stat.label}>
              <span className="track-stat-card__value" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <span className="track-stat-card__label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="track-search" id="track-search">
          <div className="track-search__input-wrapper">
            <Search size={16} className="track-search__icon" />
            <input
              type="text"
              className="track-search__input"
              placeholder="Search by reference number or service name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="track-search-input"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="track-filters" id="track-filters">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              className={`track-filter-tab ${activeFilter === tab.key ? 'track-filter-tab--active' : ''}`}
              onClick={() => setActiveFilter(tab.key)}
              id={`filter-${tab.key}`}
            >
              {tab.label}
              <span className="track-filter-tab__count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Application Cards */}
        <div className="track-cards" id="track-cards">
          {filteredApps.map((app) => {
            const isExpanded = expandedCard === app.id;
            const progressPercent = (app.stepsCompleted / app.totalSteps) * 100;

            return (
              <div
                className={`track-card ${isExpanded ? 'track-card--expanded' : ''}`}
                key={app.id}
                id={`track-card-${app.id}`}
              >
                {/* Card Header */}
                <div
                  className="track-card__header"
                  onClick={() => setExpandedCard(isExpanded ? null : app.id)}
                >
                  <div className="track-card__icon">
                    <FileText size={20} />
                  </div>
                  <div className="track-card__info">
                    <h3 className="track-card__title">{app.title}</h3>
                    <span className="track-card__id">{app.id}</span>
                  </div>
                  <div className="track-card__right">
                    <span className={`track-status ${getStatusBadgeClass(app.statusType)}`}>
                      <span className="track-status__dot"></span>
                      {app.status}
                    </span>
                    {isExpanded ? <ChevronUp size={18} className="track-card__chevron" /> : <ChevronDown size={18} className="track-card__chevron" />}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="track-card__progress">
                  <div className="track-progress-bar">
                    <div
                      className="track-progress-bar__fill"
                      style={{
                        width: `${progressPercent}%`,
                        backgroundColor: getProgressColor(app.statusType),
                      }}
                    />
                  </div>
                  <span className="track-card__steps">
                    {app.stepsCompleted}/{app.totalSteps} steps
                  </span>
                </div>

                {/* Dates */}
                <div className="track-card__dates">
                  <span>
                    Submitted: <strong>{app.submittedDate}</strong>
                  </span>
                  {app.completedDate ? (
                    <span>
                      Completed: <strong>{app.completedDate}</strong>
                    </span>
                  ) : app.estimatedDate ? (
                    <span>
                      Estimated: <strong>{app.estimatedDate}</strong>
                    </span>
                  ) : null}
                </div>

                {/* Expanded Timeline */}
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

                    {/* Pickup Info */}
                    {app.pickupInfo && (
                      <div className="track-pickup-notice" id="pickup-notice">
                        <div className="track-pickup-notice__icon">
                          <MapPin size={18} />
                        </div>
                        <div className="track-pickup-notice__content">
                          <strong className="track-pickup-notice__title">Ready for Pickup!</strong>
                          <p className="track-pickup-notice__text">
                            Your document is available at <strong>{app.pickupInfo.location}</strong>
                          </p>
                          <p className="track-pickup-notice__hours">
                            Operating hours: <strong>{app.pickupInfo.hours}</strong>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="track-cta" id="track-cta">
          <div className="track-cta__text">
            <h3 className="track-cta__title">Need Another Service?</h3>
            <p className="track-cta__subtitle">
              Apply for additional government services in just a few minutes.
            </p>
          </div>
          <div className="track-cta__actions">
            <button
              className="track-cta__btn track-cta__btn--outline"
              onClick={() => navigate('/')}
              id="browse-services-btn"
            >
              <Plus size={16} />
              Browse Services
            </button>
            <button
              className="track-cta__btn track-cta__btn--primary"
              onClick={() => navigate('/')}
              id="apply-now-btn"
            >
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
