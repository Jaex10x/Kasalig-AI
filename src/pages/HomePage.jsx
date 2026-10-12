import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import TrustFeatures from '../components/TrustFeatures/TrustFeatures';
import AboutSection from '../components/AboutSection/AboutSection';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import ActivitySection from '../components/ActivitySection/ActivitySection';
import StatsBar from '../components/StatsBar/StatsBar';
import CtaBanner from '../components/CtaBanner/CtaBanner';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
  return (
    <div id="home-page" className="noterx-page-wrapper">
      <Navbar />
      <Hero />
      <TrustFeatures />
      <AboutSection />
      <ServicesSection />
      <HowItWorks />
      <ActivitySection />
      <StatsBar />
      <CtaBanner />
      <Footer />
    </div>
  );
};

export default HomePage;
