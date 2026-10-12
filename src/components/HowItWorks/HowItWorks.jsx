import { ClipboardCheck, Sparkles, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Select Your Service & LGU',
      description: 'Choose your desired transaction (Business Permit, Civil Registry, Cedula) and select your Cebu municipality for customized requirements.',
      icon: ClipboardCheck,
    },
    {
      number: '02',
      title: 'Pre-Audit Documents with AI',
      description: 'Review the required documents checklist and receive instant AI assistance in verifying attachments before filing with the municipal hall.',
      icon: Sparkles,
    },
    {
      number: '03',
      title: 'Track Approval Milestones',
      description: 'Get real-time tracking updates, estimated completion days, and direct notifications as your application moves through LGU offices.',
      icon: CheckCircle,
    },
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="section-container">
        <div className="section-header text-center">
          <div className="eyebrow-tag">SIMPLE PROCESS</div>
          <h2 className="display-2">
            How Kasalig Works in <span className="serif-italic">Three Steps</span>
          </h2>
          <p className="section-subhead">
            A frictionless, transparent journey from initial requirement checking to final document release.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="step-card">
                <div className="step-card__top">
                  <span className="step-card__number">{step.number}</span>
                  <div className="step-card__icon-wrap">
                    <Icon size={20} className="step-card__icon" />
                  </div>
                </div>
                <h3 className="step-card__title">{step.title}</h3>
                <p className="step-card__desc">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
