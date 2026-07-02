import { TrendingUp, Star, MapPin, Zap } from 'lucide-react';

const StatsBar = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '12K+',
      label: 'Permits Processed',
    },
    {
      icon: Star,
      value: '96.5%',
      label: 'Approval Rate',
    },
    {
      icon: MapPin,
      value: '53',
      label: 'Cebu Municipalities',
    },
    {
      icon: Zap,
      value: '3 days',
      label: 'Avg. Processing',
    },
  ];

  return (
    <section className="stats-bar" id="stats-bar">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div className="stat-item" key={index}>
            <div className="stat-item__icon">
              <Icon size={18} />
            </div>
            <div>
              <div className="stat-item__value">{stat.value}</div>
              <div className="stat-item__label">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default StatsBar;
