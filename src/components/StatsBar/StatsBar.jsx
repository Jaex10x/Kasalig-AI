import { TrendingUp, Star, Users, Zap } from 'lucide-react';

const StatsBar = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '1.2M+',
      label: 'Applications Processed',
    },
    {
      icon: Star,
      value: '98.2%',
      label: 'Citizen Satisfaction',
    },
    {
      icon: Users,
      value: '45K+',
      label: 'Active Users',
    },
    {
      icon: Zap,
      value: '4.2 days',
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
