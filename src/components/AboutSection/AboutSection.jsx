import { useState } from 'react';
import { CheckCircle2, ArrowRight, Building2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  const [hasRealAboutImage, setHasRealAboutImage] = useState(false);

  const checklist = [
    'Guided requirements for RA 9048 & RA 10172 clerical corrections',
    'Step-by-step Mayor\'s & Business Permit online pre-assessment',
    'Accurate LGU processing timelines & localized fee calculators',
    '24/7 Citizen query resolution in Cebuano and English',
    'Live application tracking linked directly with municipal offices',
  ];

  return (
    <section className="about-split-section" id="about">
      <div className="section-container">
        <div className="about-grid">
          {/* Images Column */}
          <div className="about-images-col">
            <div className="about-images-wrap">
              {/* Real Cebu City Hall Photo from Project Assets */}
              <div className="about-image-card about-image-card--top">
                <img
                  src="/city-hall.jpg"
                  alt="Cebu City Hall & Provincial Administration"
                  className="about-img"
                  loading="lazy"
                />
              </div>

              {/* Second Card: Real Photo Slot or Civic Administration Card */}
              <div className="about-image-card about-image-card--bottom">
                {hasRealAboutImage ? (
                  <img
                    src="/images/about.jpg"
                    alt="Citizen Consultation and Advisory"
                    className="about-img"
                    loading="lazy"
                    onError={() => setHasRealAboutImage(false)}
                  />
                ) : (
                  <div className="about-civic-card">
                    <div className="civic-card-icon">
                      <Building2 size={28} />
                    </div>
                    <div className="civic-card-content">
                      <span className="civic-card-title">Cebu Provincial Capitol</span>
                      <span className="civic-card-subtitle">
                        <MapPin size={12} /> Escario St., Cebu City
                      </span>
                      <span className="civic-card-note">53 Municipal LGUs Integrated</span>
                    </div>
                    {/* Invisible detector for optional real about image */}
                    <img
                      src="/images/about.jpg"
                      alt=""
                      style={{ display: 'none' }}
                      onLoad={() => setHasRealAboutImage(true)}
                      onError={() => setHasRealAboutImage(false)}
                    />
                  </div>
                )}
                <div className="about-badge-float">
                  <span className="about-badge-number">53</span>
                  <span className="about-badge-label">Municipalities Guided</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text & Checklist Column */}
          <div className="about-content-col">
            <div className="eyebrow-tag">ABOUT KASALIG AI</div>
            <h2 className="display-2">
              Process Your Public Services Online. <span className="serif-italic">Anytime.</span>
            </h2>
            <p className="about-description">
              Kasalig AI was developed to bridge citizens with the local government units across the Province of Cebu. By automating document verification, calculating precise local fees, and providing 24/7 multi-lingual assistance, we help you get approved on your first submission.
            </p>

            <ul className="about-checklist" role="list">
              {checklist.map((item, index) => (
                <li key={index} className="about-checklist-item">
                  <div className="check-icon-wrap">
                    <CheckCircle2 size={18} className="check-icon" />
                  </div>
                  <span className="checklist-text">{item}</span>
                </li>
              ))}
            </ul>

            <div className="about-action-row">
              <a href="#services-section" className="btn-noterx-primary">
                <span>Explore Available Services</span>
                <ArrowRight size={16} className="btn-arrow" />
              </a>
              <Link to="/help" className="inline-learn-link">
                <span>Read FAQ & Guides</span>
                <ArrowRight size={14} className="learn-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
