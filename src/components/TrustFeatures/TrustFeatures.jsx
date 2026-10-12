import { ShieldCheck, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrustFeatures = () => {
  const features = [
    {
      id: 'guidelines',
      icon: ShieldCheck,
      title: 'Official Cebu Guidelines',
      description: 'Requirements, fees, and procedures verified directly with Cebu Provincial Capitol and local ordinances.',
      linkText: 'Learn more',
      linkTo: '/help',
    },
    {
      id: 'municipalities',
      icon: MapPin,
      title: '53 Municipalities Covered',
      description: 'Localized processing speeds, department routing, and fee schedules for every city and town in Cebu.',
      linkText: 'View LGUs',
      linkTo: '/track',
    },
    {
      id: 'ai-assistance',
      icon: Sparkles,
      title: '24/7 AI Assistance',
      description: 'Conversational pre-validation of forms and documents in English and Bisaya anytime you need it.',
      linkText: 'Start chat',
      linkTo: '/chat',
    },
  ];

  return (
    <section className="trust-features-section" id="features">
      <div className="section-container">
        <div className="section-header text-center">
          <div className="eyebrow-tag">TRUSTED PUBLIC SERVICE</div>
          <h2 className="display-2">
            Your Trusted Gateway to <span className="serif-italic">Cebu Governance</span>
          </h2>
          <p className="section-subhead">
            We simplify local government transactions so you never waste a day standing in line or submitting incomplete documents.
          </p>
        </div>

        <div className="trust-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.id} className="trust-card" id={`feature-${feature.id}`}>
                <div className="trust-card__icon-wrap">
                  <Icon size={24} className="trust-card__icon" />
                </div>
                <h3 className="trust-card__title">{feature.title}</h3>
                <p className="trust-card__desc">{feature.description}</p>
                <div className="trust-card__footer">
                  <Link to={feature.linkTo} className="inline-learn-link">
                    <span>{feature.linkText}</span>
                    <ArrowRight size={14} className="learn-arrow" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustFeatures;
