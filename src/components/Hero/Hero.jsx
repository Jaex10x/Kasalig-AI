import { MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero" id="hero-section">
      <div className="hero__badge">
        <span className="hero__badge-dot"></span>
        AI-Powered · Available 24/7
      </div>

      <h1 className="hero__title">
        Your Government Services,
        <br />
        <span className="hero__title-highlight">Made Simple.</span>
      </h1>

      <p className="hero__description">
        Kasalig AI guides every Filipino through government transactions — IDs, documents,
        business registration — all in one intelligent platform.
      </p>

      <div className="hero__actions">
        <Link to="/chat" className="btn btn--primary" id="chat-kasalig-btn">
          <MessageCircle size={16} className="btn__icon" />
          Chat with Kasalig
        </Link>
        <Link to="/track" className="btn btn--secondary" id="track-applications-btn">
          Track My Applications
          <ArrowRight size={16} className="btn__icon" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
