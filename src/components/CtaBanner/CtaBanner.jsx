import { MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CtaBanner = () => {
  return (
    <section className="cta-banner-section" id="cta-banner">
      <div className="section-container">
        <div className="cta-banner-card">
          <div className="cta-banner-content text-center">
            <div className="cta-eyebrow">READY TO GET STARTED?</div>
            <h2 className="cta-heading display-1">
              Get Your Government Documents <span className="serif-italic">Processed.</span>
            </h2>
            <p className="cta-subhead">
              Skip the long queues and avoid rejected submissions. Ask Kasalig AI for instant guidance on forms, fees, and requirements in your municipality.
            </p>

            <div className="cta-actions">
              <Link to="/chat" className="btn-noterx-white" id="cta-chat-btn">
                <MessageCircle size={17} />
                <span>Chat with Kasalig AI</span>
                <ArrowRight size={15} className="btn-arrow" />
              </Link>

              <a href="tel:0328882328" className="cta-phone-link">
                <Phone size={15} />
                <span>(032) 888-2328</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
