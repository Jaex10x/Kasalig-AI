import { ArrowRight, Search, Bell, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const applicationsData = [
  {
    id: 'KSL-2026-00213',
    name: 'Business Permit',
    municipality: 'Cebu City',
    status: 'Under Review',
    statusClass: 'application-item__status--review',
    dotClass: 'application-item__dot--blue',
  },
  {
    id: 'KSL-2026-00287',
    name: 'Business Permit',
    municipality: 'Mandaue City',
    status: 'Pending',
    statusClass: 'application-item__status--pending',
    dotClass: 'application-item__dot--orange',
  },
  {
    id: 'KSL-2026-00305',
    name: 'Registry Correction',
    municipality: 'Talisay City',
    status: 'Under Review',
    statusClass: 'application-item__status--review',
    dotClass: 'application-item__dot--blue',
  },
];

const announcementsData = [
  {
    id: 1,
    badge: 'New',
    badgeClass: 'announcement-item__badge--new',
    title: 'Online Business Permit Applications Now Open',
    text: 'All municipalities in the Province of Cebu now accept online business permit applications through Kasalig.',
    date: 'June 28, 2026',
  },
  {
    id: 2,
    badge: 'Important',
    badgeClass: 'announcement-item__badge--important',
    title: 'Civil Registry Correction Timelines',
    text: 'Spelling and clerical error corrections on registry documents are now processed in 3–8 months.',
    date: 'June 20, 2026',
  },
  {
    id: 3,
    badge: 'Update',
    badgeClass: 'announcement-item__badge--update',
    title: 'New Requirements Reminder',
    text: 'Starting July 2026, all business permit applicants must include a Community Tax Certificate (Cedula).',
    date: 'June 15, 2026',
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar" id="sidebar">

      <div className="applications-widget" id="applications-widget">
        <div className="widget-header">
          <h3 className="widget-header__title">My Applications</h3>
          <Link to="/track" className="widget-header__action" id="view-all-applications">
            View All <ArrowRight size={12} />
          </Link>
        </div>

        {applicationsData.map((app) => (
          <div className="application-item" key={app.id} id={`app-${app.id}`}>
            <div className="application-item__info">
              <span className={`application-item__dot ${app.dotClass}`}></span>
              <div className="application-item__details">
                <span className="application-item__name">{app.name}</span>
                <span className="application-item__id">{app.municipality} · {app.id}</span>
              </div>
            </div>
            <span className={`application-item__status ${app.statusClass}`}>
              {app.status}
            </span>
          </div>
        ))}

        <Link to="/track" className="track-all-btn" id="track-all-btn">
          <Eye size={14} />
          Track all applications
        </Link>
      </div>


      <div className="announcements-widget" id="announcements-widget">
        <div className="widget-header">
          <h3 className="widget-header__title">
            <Bell size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            Announcements
          </h3>
        </div>

        {announcementsData.map((announcement) => (
          <div className="announcement-item" key={announcement.id} id={`announcement-${announcement.id}`}>
            <div className="announcement-item__header">
              <span className={`announcement-item__badge ${announcement.badgeClass}`}>
                {announcement.badge}
              </span>
              <span className="announcement-item__title">{announcement.title}</span>
            </div>
            <p className="announcement-item__text">{announcement.text}</p>
            <span className="announcement-item__date">{announcement.date}</span>
          </div>
        ))}
      </div>


      <div className="ask-kasalig-widget" id="ask-kasalig-widget">
        <div className="ask-kasalig__header">
          <div className="ask-kasalig__icon">
            <Search size={18} />
          </div>
          <div className="ask-kasalig__info">
            <span className="ask-kasalig__title">Ask Kasalig</span>
            <span className="ask-kasalig__subtitle">AI Assistant</span>
          </div>
        </div>
        <p className="ask-kasalig__text">
          Have questions about business permits? I'm available 24/7 to guide you through
          the application process, step by step.
        </p>
        <Link to="/chat" className="ask-kasalig__btn" id="start-conversation-btn">
          Start a Conversation
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
