import { Clock, Briefcase, FileText, ArrowRight, ShieldCheck, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const servicesData = [
  {
    id: 'business-permit',
    title: 'Business Permit (Mayor\'s Permit)',
    description: 'Apply for or renew your business permit in any municipality across the Province of Cebu with automated checklist verification.',
    icon: Briefcase,
    category: 'Commercial & Trade',
    duration: '1–3 Days',
    fee: '₱530.00 standard',
    route: '/apply/business-permit',
    featured: true,
  },
  {
    id: 'civil-registry-corrections',
    title: 'Civil Registry Corrections',
    description: 'File petition for clerical or typographical corrections in birth, marriage, or death certificates under RA 9048 and RA 10172.',
    icon: FileText,
    category: 'Civil Registry',
    duration: '3–6 Months',
    fee: '₱1,000 – ₱3,000',
    route: '/apply/civil-registry-corrections',
    featured: true,
  },
  {
    id: 'barangay-clearance',
    title: 'Barangay & Community Tax (Cedula)',
    description: 'Calculate your Community Tax Certificate assessment and prepare required clearances for business and employment.',
    icon: ShieldCheck,
    category: 'Clearance & Certifications',
    duration: 'Same Day',
    fee: '₱50 – ₱150',
    route: '/chat',
    featured: false,
  },
  {
    id: 'real-property-tax',
    title: 'Real Property Tax Assessment',
    description: 'Guide for land and building tax declarations, amilyar payments, and provincial assessor clearances in Cebu LGUs.',
    icon: Home,
    category: 'Provincial Assessor',
    duration: '1–2 Days',
    fee: 'LGU Computed',
    route: '/chat',
    featured: false,
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="services-section-noterx" id="services-section">
      <div className="section-container">
        <div className="section-header text-center">
          <div className="eyebrow-tag">OFFICIAL CITIZEN SERVICES</div>
          <h2 className="display-2">
            Available Government <span className="serif-italic">Services</span>
          </h2>
          <p className="section-subhead">
            Select a service to view step-by-step requirements, fee breakdowns, and submit your initial application.
          </p>
        </div>

        <div className="services-cards-grid">
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="service-card-noterx"
                id={`service-${service.id}`}
                onClick={() => navigate(service.route)}
                role="button"
                tabIndex={0}
              >
                <div className="service-card-top">
                  <div className="service-icon-box">
                    <Icon size={22} className="service-icon" />
                  </div>
                  <span className="service-category-pill">{service.category}</span>
                </div>

                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>

                <div className="service-card-meta-row">
                  <div className="meta-duration">
                    <Clock size={13} />
                    <span>{service.duration}</span>
                  </div>
                  <div className="meta-fee">
                    <span>Fee: </span>
                    <strong>{service.fee}</strong>
                  </div>
                </div>

                <div className="service-card-bottom">
                  <button
                    className="service-apply-btn"
                    id={`apply-${service.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(service.route);
                    }}
                  >
                    <span>{service.id.includes('permit') || service.id.includes('civil') ? 'Apply Now' : 'Check Requirements'}</span>
                    <ArrowRight size={14} className="apply-arrow" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
