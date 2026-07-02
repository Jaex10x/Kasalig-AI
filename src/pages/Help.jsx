import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Phone,
  ChevronRight,
  Shield,
  Globe,
  FileText,
  Briefcase,
  CreditCard,
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';

const categories = [
  { id: 'general', label: 'General & Tracker', icon: HelpCircle, count: 4 },
  { id: 'business', label: 'Business Permit', icon: Briefcase, count: 3 },
  { id: 'civil-registry', label: 'Civil Registry', icon: FileText, count: 2 },
  { id: 'security', label: 'Security & Privacy', icon: Shield, count: 2 },
];

const faqData = {
  general: [
    {
      id: 'g1',
      question: 'Magandang Araw! What is Kasalig AI?',
      answer:
        'Kasalig is an AI-powered government services platform tailored for the Province of Cebu. It helps citizens navigate and submit business permit applications, track municipality processing speeds, and receive AI support 24/7.',
    },
    {
      id: 'g2',
      question: 'Is Kasalig AI free to use?',
      answer:
        'Yes! Kasalig AI is completely free to use. Our platform helps you apply for business permits, check municipality speeds, and receive AI assistance at no cost. However, the LGU business permit fees still apply.',
    },
    {
      id: 'g3',
      question: 'What is the Municipality Tracker?',
      answer:
        'The Municipality Tracker allows you to monitor the average business permit processing times for all 53 municipalities in the Province of Cebu. It helps you identify fast or slow-processing municipal offices to better plan your application.',
    },
    {
      id: 'g4',
      question: 'How do I track my permit application status?',
      answer:
        'You can track your application by going to "My Applications" tab in the tracker page. You will see your submitted business permit application status, current stage, and estimated release date.',
    },
  ],
  business: [
    {
      id: 'b1',
      question: 'How do I apply for a Business Permit in Cebu?',
      answer:
        'Select "Start Application" on the home page, select your municipality in Cebu, fill in the business permit details (capitalization, business type, line of business), upload your files, and click submit. You can track its progress immediately.',
    },
    {
      id: 'b2',
      question: 'What are the required documents for a Business Permit?',
      answer:
        'For a municipal business permit, the standard requirements include: Valid Government ID, Barangay Clearance, DTI/SEC Registration Certificate, Community Tax Certificate (Cedula), and a Contract of Lease or Land Title.',
    },
    {
      id: 'b3',
      question: 'What is the average processing speed in Cebu municipalities?',
      answer:
        'With Kasalig, processing averages 3 days. Most municipalities in Cebu process permits within 2-3 days, while those experiencing higher application volumes take up to 4-5 days. Check the tracker to view real-time processing statistics.',
    },
  ],
  'civil-registry': [
    {
      id: 'c1',
      question: 'How do I file for a Civil Registry Correction?',
      answer:
        'Select "Start Application" under Civil Registry Corrections on the home page. Fill in the registry correction details (document type, correction type, registration details), select the municipality where it was registered, upload required files (PSA erroneous copy, ID, Barangay clearance, and supporting files), and submit.',
    },
    {
      id: 'c2',
      question: 'How long does a Civil Registry Correction take and what does it cost?',
      answer:
        'Civil Registry Corrections (clerical or spelling errors under RA 9048/10172) typically take between 3 to 8 months to process depending on LCR and PSA approval queues. The total official fee ranges from ₱1,000.00 to ₱3,000.00 depending on the type of error and municipality.',
    },
  ],
  security: [
    {
      id: 's1',
      question: 'How does Kasalig protect my privacy and data?',
      answer:
        'Kasalig complies fully with the Data Privacy Act of 2012 (RA 10173). All password data and sensitive personal files are encrypted. Passwords are handled entirely by Supabase and never touch our custom backend server. We sanitize all input to prevent security exploits.',
    },
    {
      id: 's2',
      question: 'Can I delete my account and data?',
      answer:
        'Yes, you can request account deletion at any time through the Settings page. All personal information and history will be permanently deleted from our systems within 30 days.',
    },
  ],
};

const quickApplyLinks = [
  { label: 'Business Permit', path: '/apply/business-permit' },
  { label: 'Registry Correction', path: '/apply/civil-registry-corrections' },
];

const Help = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFaq, setExpandedFaq] = useState('g1');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState({});

  const handleFeedback = (faqId, type) => {
    setFeedbackGiven((prev) => ({ ...prev, [faqId]: type }));
  };

  const toggleFaq = (faqId) => {
    setExpandedFaq((prev) => (prev === faqId ? null : faqId));
  };

  const getFilteredFaqs = () => {
    if (!searchQuery.trim()) {
      return faqData[activeCategory] || [];
    }
    const query = searchQuery.toLowerCase();
    const allFaqs = Object.values(faqData).flat();
    return allFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  };

  const filteredFaqs = getFilteredFaqs();

  return (
    <div className="help-page" id="help-page">
      <Navbar />


      <div className="help-hero" id="help-hero">
        <div className="help-hero__icon">
          <HelpCircle size={32} />
        </div>
        <h1 className="help-hero__title">Help Center & FAQ</h1>
        <p className="help-hero__subtitle">
          Find answers to common questions about Kasalig and government services
        </p>
      </div>


      <div className="help-search-wrapper" id="help-search">
        <div className="help-search">
          <Search size={18} className="help-search__icon" />
          <input
            type="text"
            className="help-search__input"
            id="help-search-input"
            placeholder="Search frequently asked questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>


      <div className="help-content" id="help-content">

        <aside className="help-sidebar" id="help-sidebar">

          <div className="help-categories">
            <h3 className="help-sidebar__heading">CATEGORIES</h3>
            <div className="help-categories__list">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    className={`help-category-btn ${activeCategory === cat.id ? 'help-category-btn--active' : ''}`}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSearchQuery('');
                      setExpandedFaq(null);
                    }}
                    id={`help-cat-${cat.id}`}
                  >
                    <Icon size={16} className="help-category-btn__icon" />
                    <span className="help-category-btn__label">{cat.label}</span>
                    <span className="help-category-btn__count">{cat.count}</span>
                  </button>
                );
              })}
            </div>
          </div>


          <div className="help-quick-apply">
            <h3 className="help-sidebar__heading">QUICK APPLY</h3>
            <div className="help-quick-apply__list">
              {quickApplyLinks.map((link) => (
                <button
                  key={link.label}
                  className="help-quick-apply__link"
                  onClick={() => navigate(link.path)}
                  id={`quick-apply-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} className="help-quick-apply__chevron" />
                </button>
              ))}
            </div>
          </div>


          <div className="help-cta-card" id="help-cta-card">
            <MessageCircle size={24} className="help-cta-card__icon" />
            <h4 className="help-cta-card__title">Still have questions?</h4>
            <p className="help-cta-card__text">
              Chat with Kasalig for personalized help 24/7.
            </p>
            <button
              className="help-cta-card__btn"
              onClick={() => navigate('/chat')}
              id="help-chat-btn"
            >
              Chat with Kasalig
            </button>
          </div>
        </aside>


        <div className="help-faq" id="help-faq">
          {filteredFaqs.length === 0 ? (
            <div className="help-faq__empty">
              <HelpCircle size={40} className="help-faq__empty-icon" />
              <p className="help-faq__empty-text">
                No results found for &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="help-faq__empty-hint">
                Try different keywords or browse categories
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedFaq === faq.id;
              const feedback = feedbackGiven[faq.id];
              return (
                <div
                  className={`help-faq-item ${isExpanded ? 'help-faq-item--expanded' : ''}`}
                  key={faq.id}
                  id={`faq-${faq.id}`}
                >
                  <button
                    className="help-faq-item__header"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isExpanded}
                  >
                    <span className="help-faq-item__toggle">
                      {isExpanded ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </span>
                    <span className="help-faq-item__question">{faq.question}</span>
                  </button>

                  {isExpanded && (
                    <div className="help-faq-item__body">
                      <p className="help-faq-item__answer">{faq.answer}</p>
                      <div className="help-faq-item__footer">
                        <div className="help-faq-item__feedback">
                          <button
                            className={`help-feedback-btn ${feedback === 'helpful' ? 'help-feedback-btn--active' : ''}`}
                            onClick={() => handleFeedback(faq.id, 'helpful')}
                            aria-label="Helpful"
                          >
                            <ThumbsUp size={14} />
                            Helpful
                          </button>
                          <button
                            className={`help-feedback-btn ${feedback === 'not-helpful' ? 'help-feedback-btn--active-negative' : ''}`}
                            onClick={() => handleFeedback(faq.id, 'not-helpful')}
                            aria-label="Not helpful"
                          >
                            <ThumbsDown size={14} />
                            Not helpful
                          </button>
                        </div>
                        <button
                          className="help-faq-item__ask-more"
                          onClick={() => navigate('/chat')}
                        >
                          Ask Kasalig for more →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>


      <div className="help-bottom-cta" id="help-bottom-cta">
        <div className="help-bottom-cta__text">
          <h3 className="help-bottom-cta__title">Can&apos;t find what you&apos;re looking for?</h3>
          <p className="help-bottom-cta__subtitle">
            Our team and Kasalig AI are always ready to help you with any government service question.
          </p>
        </div>
        <div className="help-bottom-cta__actions">
          <button
            className="help-bottom-cta__btn help-bottom-cta__btn--primary"
            onClick={() => navigate('/chat')}
            id="help-bottom-chat-btn"
          >
            <MessageCircle size={16} />
            Chat with Kasalig
          </button>
          <button
            className="help-bottom-cta__btn help-bottom-cta__btn--outline"
            id="help-hotline-btn"
          >
            <Phone size={16} />
            Hotline
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;
