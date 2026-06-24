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
  { id: 'general', label: 'General', icon: HelpCircle, count: 5 },
  { id: 'id-services', label: 'ID Services', icon: CreditCard, count: 4 },
  { id: 'documents', label: 'Documents', icon: FileText, count: 3 },
  { id: 'business', label: 'Business', icon: Briefcase, count: 3 },
  { id: 'passport', label: 'Passport', icon: Globe, count: 2 },
  { id: 'security', label: 'Security', icon: Shield, count: 2 },
];

const faqData = {
  general: [
    {
      id: 'g1',
      question: 'What is Kasalig AI?',
      answer:
        'Kasalig is an AI-powered government services platform that helps Filipino citizens navigate government transactions with ease. It guides you through ID applications, document requests, business registration, and more — all in one place, available 24/7.',
    },
    {
      id: 'g2',
      question: 'Is Kasalig AI free to use?',
      answer:
        'Yes! Kasalig AI is completely free to use. Our platform helps you find the right government services, understand requirements, and track your applications at no cost. However, official government fees for processing documents still apply.',
    },
    {
      id: 'g3',
      question: 'What payment methods are accepted?',
      answer:
        'Most government agencies accept the following payment methods: GCash, Maya/PayMaya, Online Banking (BDO, BPI, etc.), bank deposits, Bayad Center, 7-Eleven and other convenience stores, and direct cash payments at government offices. Available payment methods vary per agency.',
    },
    {
      id: 'g4',
      question: 'How do I track my application status?',
      answer:
        'You can track your application by going to "My Applications" from the navigation bar. There you\'ll see all your submitted applications with their current status, timeline, and estimated completion dates. You can also search by reference number.',
    },
    {
      id: 'g5',
      question: 'Is my personal data safe with Kasalig?',
      answer:
        'Absolutely. Kasalig follows strict data privacy guidelines in compliance with the Data Privacy Act of 2012 (RA 10173). Your personal information is encrypted and never shared with third parties without your consent. We only use your data to facilitate government service applications.',
    },
  ],
  'id-services': [
    {
      id: 'id1',
      question: 'How do I apply for a National ID (PhilSys)?',
      answer:
        'To apply for a National ID, visit your nearest PhilSys Registration Center with: PSA Birth Certificate, valid government ID (if available), and proof of address (utility bill or barangay certificate). Processing takes 7-15 business days and is FREE for first-time applicants.',
    },
    {
      id: 'id2',
      question: 'What are the requirements for a Postal ID?',
      answer:
        'For a Postal ID, you need: a completed application form, two recent 1x1 ID photos, original and photocopy of any valid ID or birth certificate, and ₱504 processing fee. Visit your nearest post office to apply.',
    },
    {
      id: 'id3',
      question: 'How long does it take to get a PhilSys ID?',
      answer:
        'The PhilSys National ID typically takes 7-15 business days to process after your registration. You can check your status through the PhilSys website or by contacting their hotline.',
    },
    {
      id: 'id4',
      question: "Can I apply for a Voter's ID online?",
      answer:
        "You can start the Voter's Registration process online through the COMELEC iRehistro system, but you'll still need to visit a COMELEC office for biometrics capture. Registration periods are announced by COMELEC before elections.",
    },
  ],
  documents: [
    {
      id: 'd1',
      question: 'How do I request a PSA Birth Certificate?',
      answer:
        'You can request a PSA Birth Certificate online through PSAHelpline.ph or visit any PSA Serbilis Center. Online requests cost ₱155 plus delivery fee. Processing takes 3-5 business days for online requests.',
    },
    {
      id: 'd2',
      question: 'What is the process for NBI Clearance?',
      answer:
        'To get an NBI Clearance: register online at clearance.nbi.gov.ph, pay the ₱130 fee, visit your chosen NBI branch on your scheduled date, and bring a valid ID. Results are usually available same day unless you have a "hit" (name match).',
    },
    {
      id: 'd3',
      question: 'How do I get a Barangay Clearance?',
      answer:
        'Visit your local barangay hall with a valid ID and proof of residency. Fill out the application form and pay the fee (₱50-100, varies by barangay). Barangay Clearances are typically issued same day.',
    },
  ],
  business: [
    {
      id: 'b1',
      question: 'How do I register a sole proprietorship?',
      answer:
        "For sole proprietorship, register with DTI (Department of Trade and Industry) online through bnrs.dti.gov.ph. Choose your business name, pay the registration fee (₱200-2,000 depending on scope), and receive your Certificate of Business Name Registration.",
    },
    {
      id: 'b2',
      question: "What do I need for a Mayor's Permit?",
      answer:
        "For a Mayor's Permit/Business Permit, you need: DTI/SEC Registration, Barangay Clearance, lease contract or proof of ownership of business location, and other requirements that vary by LGU. Visit your city/municipal hall to apply.",
    },
    {
      id: 'b3',
      question: 'How do I register with BIR?',
      answer:
        "After obtaining your DTI registration and Mayor's Permit, register with BIR using Form 1901 (for self-employed). You'll need to pay the ₱500 registration fee, ₱30 for documentary stamp tax, and apply for your official receipts/invoices.",
    },
  ],
  passport: [
    {
      id: 'p1',
      question: 'How do I apply for a passport?',
      answer:
        'To apply for a passport: schedule an appointment online at passport.gov.ph, prepare requirements (PSA birth certificate, valid ID, completed application form), visit DFA on your appointment date, and pay the processing fee (₱950 for regular, ₱1,200 for express). Processing takes 2-4 weeks.',
    },
    {
      id: 'p2',
      question: 'How do I renew an expired passport?',
      answer:
        'For passport renewal, schedule an appointment at passport.gov.ph, bring your old passport, PSA birth certificate, and valid ID. The same fees apply: ₱950 for regular processing (15-20 working days) or ₱1,200 for express (7-10 working days).',
    },
  ],
  security: [
    {
      id: 's1',
      question: 'How does Kasalig protect my data?',
      answer:
        'Kasalig uses industry-standard encryption (SSL/TLS) for all data transmission. Your personal information is stored in secure, encrypted databases. We comply with the Data Privacy Act of 2012 and have a dedicated Data Protection Officer overseeing all privacy practices.',
    },
    {
      id: 's2',
      question: 'Can I delete my account and data?',
      answer:
        'Yes, you can request account deletion at any time through the Settings page or by contacting our support team. Upon deletion, all your personal data will be permanently removed from our systems within 30 days, in compliance with data privacy regulations.',
    },
  ],
};

const quickApplyLinks = [
  { label: 'National ID', path: '/chat' },
  { label: 'Birth Certificate', path: '/chat' },
  { label: 'Business Registration', path: '/chat' },
  { label: 'Passport', path: '/chat' },
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
