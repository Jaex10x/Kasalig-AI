import { ArrowRight, Bell, Eye, Clock, MessageSquare, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const applicationsData = [
  {
    id: 'KSL-2026-00213',
    name: 'Business Permit',
    municipality: 'Cebu City',
    status: 'Under Review',
    statusClass: 'status-badge--review',
    date: 'Submitted 2 days ago',
  },
  {
    id: 'KSL-2026-00287',
    name: 'Business Permit',
    municipality: 'Mandaue City',
    status: 'Pending',
    statusClass: 'status-badge--pending',
    date: 'Awaiting CTC verification',
  },
  {
    id: 'KSL-2026-00305',
    name: 'Registry Correction',
    municipality: 'Talisay City',
    status: 'Under Review',
    statusClass: 'status-badge--review',
    date: 'LCR Docket Assigned',
  },
];

const announcementsData = [
  {
    id: 1,
    badge: 'New',
    badgeClass: 'announcement-badge--new',
    title: 'Online Business Permit Applications Now Open',
    text: 'All municipalities in the Province of Cebu now accept online business permit pre-assessment through Kasalig AI.',
    date: 'June 28, 2026',
  },
  {
    id: 2,
    badge: 'Important',
    badgeClass: 'announcement-badge--important',
    title: 'Civil Registry Correction Timelines Updated',
    text: 'Clerical and typographical corrections under RA 9048/10172 are now fast-tracked with average completion within 3–6 months.',
    date: 'June 20, 2026',
  },
  {
    id: 3,
    badge: 'Update',
    badgeClass: 'announcement-badge--update',
    title: 'Community Tax Certificate (Cedula) Integration',
    text: 'Starting July 2026, applicants can calculate and verify their CTC Cedula assessments directly on the portal.',
    date: 'June 15, 2026',
  },
];

const ActivitySection = () => {
  return (
    <section className="activity-section" id="activity">
      <div className="section-container">
        <div className="section-header">
          <div className="eyebrow-tag">PORTAL ACTIVITY & BULLETINS</div>
          <div className="section-header-split">
            <div>
              <h2 className="display-2">
                Live Tracking & <span className="serif-italic">Official Notices</span>
              </h2>
              <p className="section-subhead">
                Monitor your active filings and stay informed with announcements from the Cebu Provincial Capitol.
              </p>
            </div>
            <Link to="/track" className="btn-noterx-outline" id="activity-view-all">
              <span>View All Applications</span>
              <ArrowRight size={14} className="btn-arrow" />
            </Link>
          </div>
        </div>

        <div className="activity-grid">
          {/* Active Applications Column */}
          <div className="activity-col">
            <div className="activity-card" id="applications-widget">
              <div className="activity-card__header">
                <div>
                  <h3 className="activity-card__title">My Active Applications</h3>
                  <span className="activity-card__subtitle">Real-time status across Cebu LGUs</span>
                </div>
                <Link to="/track" className="subtle-link">
                  <span>Track all</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

              <div className="application-list">
                {applicationsData.map((app) => (
                  <div key={app.id} className="app-activity-row" id={`app-${app.id}`}>
                    <div className="app-activity-info">
                      <div className="app-activity-title-row">
                        <span className="app-activity-name">{app.name}</span>
                        <span className={`status-badge ${app.statusClass}`}>{app.status}</span>
                      </div>
                      <div className="app-activity-meta">
                        <span className="app-activity-lgu">{app.municipality}</span>
                        <span className="meta-bullet">·</span>
                        <span className="app-activity-id">{app.id}</span>
                        <span className="meta-bullet">·</span>
                        <span className="app-activity-date">{app.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="activity-card__footer">
                <Link to="/track" className="btn-noterx-primary full-width" id="track-all-btn">
                  <Eye size={15} />
                  <span>Open Application Tracker</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Official Announcements Column */}
          <div className="activity-col">
            <div className="activity-card" id="announcements-widget">
              <div className="activity-card__header">
                <div>
                  <h3 className="activity-card__title">
                    <Bell size={18} className="header-bell-icon" />
                    Provincial Bulletins
                  </h3>
                  <span className="activity-card__subtitle">Official advisories & circulars</span>
                </div>
              </div>

              <div className="announcement-list">
                {announcementsData.map((item) => (
                  <div key={item.id} className="announcement-card-item" id={`announcement-${item.id}`}>
                    <div className="announcement-item__header">
                      <span className={`announcement-badge ${item.badgeClass}`}>{item.badge}</span>
                      <span className="announcement-item__date">
                        <Clock size={12} /> {item.date}
                      </span>
                    </div>
                    <h4 className="announcement-item__title">{item.title}</h4>
                    <p className="announcement-item__text">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="activity-card__footer">
                <Link to="/chat" className="btn-noterx-outline full-width" id="ask-kasalig-footer-btn">
                  <MessageSquare size={15} />
                  <span>Ask Kasalig AI About These Updates</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitySection;
