import { TrendingUp, Star, MapPin, Zap } from 'lucide-react';

const StatsBar = () => {
  const stats = [
    {
      value: '12K+',
      label: 'Permits Processed',
      desc: 'Completed across Cebu Province',
    },
    {
      value: '96.5%',
      label: 'Approval Rate',
      desc: 'First-time document acceptance',
    },
    {
      value: '53',
      label: 'Cebu Municipalities',
      desc: 'Complete provincial coverage',
    },
    {
      value: '3 Days',
      label: 'Avg. Turnaround',
      desc: 'Expedited processing speed',
    },
  ];

  return (
    <section className="stats-section-noterx" id="stats-section">
      <div className="section-container">
        <div className="stats-split-grid">
          {/* Left: 4 Stat Items with huge Serif Numbers */}
          <div className="stats-numbers-col">
            <div className="stats-header">
              <div className="eyebrow-tag">PROVEN IMPACT</div>
              <h2 className="display-2">
                Delivering Excellence in <span className="serif-italic">Public Service</span>
              </h2>
            </div>

            <div className="stats-4-grid">
              {stats.map((stat, index) => (
                <div key={index} className="noterx-stat-box">
                  <div className="stat-large-number">{stat.value}</div>
                  <div className="stat-large-label">{stat.label}</div>
                  <div className="stat-large-desc">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Rounded Architectural Image */}
          <div className="stats-image-col">
            <div className="stats-image-card">
              <img
                src="/city-hall.jpg"
                alt="Cebu City Hall & Provincial Administration"
                className="stats-img"
                loading="lazy"
              />
              <div className="stats-image-overlay">
                <span className="stats-overlay-pill">Serving 53 Local Government Units</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
