import { ArrowRight, Clock, Briefcase, FileText, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const serviceInfo = {
  'business-permit': {
    title: 'Business Permit',
    description: 'Apply for your business permit in municipalities across Cebu Province',
    icon: Briefcase,
    duration: '30–45 mins',
    fee: '₱530.00',
    gradient: 'linear-gradient(135deg, #ea580c, #dc2626)',
  },
  'civil-registry-corrections': {
    title: 'Civil Registry Corrections',
    description: 'File clerical or spelling corrections for birth, marriage, or death certificates',
    icon: FileText,
    duration: '3–8 months',
    fee: '₱1,000.00 – ₱3,000.00',
    gradient: 'linear-gradient(135deg, #2563eb, #7c3aed)',
  },
};

const ApplicationCard = ({ serviceId }) => {
  const navigate = useNavigate();
  const service = serviceInfo[serviceId];

  if (!service) return null;

  const Icon = service.icon;

  return (
    <div className="app-card-widget" id={`app-card-${serviceId}`}>
      <div className="app-card-widget__glow" style={{ background: service.gradient }} />
      <div className="app-card-widget__inner">
        <div className="app-card-widget__header">
          <div className="app-card-widget__icon-wrap" style={{ background: service.gradient }}>
            <Icon size={20} color="#fff" />
          </div>
          <div className="app-card-widget__badge">
            <Sparkles size={12} />
            Ready to Apply
          </div>
        </div>

        <h4 className="app-card-widget__title">{service.title}</h4>
        <p className="app-card-widget__desc">{service.description}</p>

        <div className="app-card-widget__meta">
          <span className="app-card-widget__meta-item">
            <Clock size={13} />
            {service.duration}
          </span>
          <span className="app-card-widget__meta-item app-card-widget__meta-item--fee">
            Fee: <strong>{service.fee}</strong>
          </span>
        </div>

        <button
          className="app-card-widget__cta"
          id={`start-apply-${serviceId}`}
          onClick={() => navigate(`/apply/${serviceId}`)}
          style={{ background: service.gradient }}
        >
          Start Application
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export { serviceInfo };
export default ApplicationCard;
