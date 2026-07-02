import { ChevronRight, Clock, Briefcase, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const servicesData = [
  {
    id: 'business-permit',
    title: 'Business Permit',
    description: 'Apply for your business permit in municipalities across the Province of Cebu',
    icon: Briefcase,
    iconClass: 'service-card__icon--orange',
    tag: 'Business Permit',
    tagClass: 'service-card__tag--business',
    duration: '1-3 days',
    fee: '₱530.00',
  },
  {
    id: 'civil-registry-corrections',
    title: 'Civil Registry Corrections',
    description: 'File clerical or spelling corrections for birth, marriage, or death certificates',
    icon: FileText,
    iconClass: 'service-card__icon--blue',
    tag: 'Civil Registry',
    tagClass: 'service-card__tag--civil-registry',
    duration: '4-6 months',
    fee: '₱1,000.00 – ₱3,000.00',
  },
];

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const Icon = service.icon;

  const handleApply = (e) => {
    e.stopPropagation();
    navigate(`/apply/${service.id}`);
  };

  return (
    <div className="service-card" id={`service-${service.id}`} onClick={handleApply} role="button" tabIndex={0}>
      <div className="service-card__header">
        <div className={`service-card__icon ${service.iconClass}`}>
          <Icon size={20} />
        </div>
        <ChevronRight size={18} className="service-card__chevron" />
      </div>

      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__description">{service.description}</p>

      <div className="service-card__meta">
        <span className={`service-card__tag ${service.tagClass}`}>
          {service.tag}
        </span>
        <span className="service-card__duration">
          <Clock size={12} />
          {service.duration}
        </span>
      </div>

      <div className="service-card__footer">
        <span className="service-card__fee">
          Fee: <strong>{service.fee}</strong>
        </span>
        <button className="service-card__apply" id={`apply-${service.id}`} onClick={handleApply}>
          Apply Now <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="services-section" id="services-section">
      <div className="services-header">
        <div>
          <h2 className="services-header__title">Available Services</h2>
          <p className="services-header__subtitle">
            Apply for business permits or file civil registry corrections in Cebu Province
          </p>
        </div>
      </div>

      <div className="services-grid">
        {servicesData.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
