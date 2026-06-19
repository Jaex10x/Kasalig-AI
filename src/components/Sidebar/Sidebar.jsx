import { ArrowRight, Search, Bell, MessageCircle, Eye } from 'lucide-react';

const applicationsData = [
  {
    id: 'KSL-2026-00142',
    name: 'National ID',
    status: 'Ready for Pickup',
    statusClass: 'application-item__status--ready',
    dotClass: 'application-item__dot--green',
  },
  {
    id: 'KSL-2026-00213',
    name: 'Business Reg.',
    status: 'Under Review',
    statusClass: 'application-item__status--review',
    dotClass: 'application-item__dot--blue',
  },
  {
    id: 'KSL-2026-00287',
    name: 'Birth Certificate',
    status: 'Pending',
    statusClass: 'application-item__status--pending',
    dotClass: 'application-item__dot--orange',
  },
];

const announcementsData = [
  {
    id: 1,
    badge: 'New',
    badgeClass: 'announcement-item__badge--new',
    title: 'Online Passport Renewal Now Available',
    text: 'DFA online passport renewal is now available for all citizens through the Kasalig platform.',
    date: 'May 10, 2026',
  },
  {
    id: 2,
    badge: 'Important',
    badgeClass: 'announcement-item__badge--important',
    title: 'Holiday Notice — May 12',
    text: 'Government offices will be closed on May 12 (National Day of Valor). Online services remain available.',
    date: 'May 8, 2026',
  },
  {
    id: 3,
    badge: 'Update',
    badgeClass: 'announcement-item__badge--update',
    title: 'Faster Business Registration',
    text: 'Processing time for DTI business registration has been reduced to 3–5 working days.',
    date: 'May 5, 2026',
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar" id="sidebar">
      {/* My Applications Widget */}
      <div className="applications-widget" id="applications-widget">
        <div className="widget-header">
          <h3 className="widget-header__title">My Applications</h3>
          <button className="widget-header__action" id="view-all-applications">
            View All <ArrowRight size={12} />
          </button>
        </div>

        {applicationsData.map((app) => (
          <div className="application-item" key={app.id} id={`app-${app.id}`}>
            <div className="application-item__info">
              <span className={`application-item__dot ${app.dotClass}`}></span>
              <div className="application-item__details">
                <span className="application-item__name">{app.name}</span>
                <span className="application-item__id">{app.id}</span>
              </div>
            </div>
            <span className={`application-item__status ${app.statusClass}`}>
              {app.status}
            </span>
          </div>
        ))}

        <button className="track-all-btn" id="track-all-btn">
          <Eye size={14} />
          Track all applications
        </button>
      </div>

      {/* Announcements Widget */}
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

      {/* Ask Kasalig Widget */}
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
          Have questions? I'm available 24/7 to guide you through
          any government service, step by step.
        </p>
        <button className="ask-kasalig__btn" id="start-conversation-btn">
          Start a Conversation
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
