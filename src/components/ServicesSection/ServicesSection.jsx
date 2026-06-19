import { ChevronRight, Clock, CreditCard, RefreshCw, FileText, Briefcase, Car, Globe, ArrowRight, HelpCircle } from 'lucide-react';

const servicesData = [
  {
    id: 'national-id',
    title: 'National ID',
    description: 'Apply for your Philippine Identification System (PhilSys) card',
    icon: CreditCard,
    iconClass: 'service-card__icon--blue',
    tag: 'Identification',
    tagClass: 'service-card__tag--identification',
    duration: '15–20 mins',
    fee: '₱0 (Free)',
  },
  {
    id: 'id-renewal',
    title: 'ID Renewal',
    description: 'Renew your existing government-issued ID before it expires',
    icon: RefreshCw,
    iconClass: 'service-card__icon--indigo',
    tag: 'Identification',
    tagClass: 'service-card__tag--identification',
    duration: '10–15 mins',
    fee: '₱150.00',
  },
  {
    id: 'document-requests',
    title: 'Document Requests',
    description: 'Request official documents such as birth certificates and marriage certificates',
    icon: FileText,
    iconClass: 'service-card__icon--amber',
    tag: 'Civil Registry',
    tagClass: 'service-card__tag--civil-registry',
    duration: '5–10 mins',
    fee: '₱365.00',
  },
  {
    id: 'business-registration',
    title: 'Business Registration',
    description: 'Register your business with DTI and BIR in a single streamlined process',
    icon: Briefcase,
    iconClass: 'service-card__icon--orange',
    tag: 'Business Services',
    tagClass: 'service-card__tag--business',
    duration: '30–45 mins',
    fee: '₱530.00',
  },
  {
    id: 'drivers-license',
    title: "Driver's License",
    description: 'Apply for or renew your professional or non-professional driver\'s license through LTO',
    icon: Car,
    iconClass: 'service-card__icon--orange',
    tag: 'Transportation',
    tagClass: 'service-card__tag--transportation',
    duration: '20–30 mins',
    fee: '₱585.00',
  },
  {
    id: 'passport-application',
    title: 'Passport Application',
    description: 'Apply for a new Philippine passport or renew your existing one through the DFA',
    icon: Globe,
    iconClass: 'service-card__icon--teal',
    tag: 'Travel Documents',
    tagClass: 'service-card__tag--travel',
    duration: '25–35 mins',
    fee: '₱950.00',
  },
];

const ServiceCard = ({ service }) => {
  const Icon = service.icon;

  return (
    <div className="service-card" id={`service-${service.id}`}>
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
        <button className="service-card__apply" id={`apply-${service.id}`}>
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
            Select a service or ask Kasalig for guidance
          </p>
        </div>
        <a href="#help" className="services-header__help" id="need-help-link">
          Need help? <ChevronRight size={14} />
        </a>
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
