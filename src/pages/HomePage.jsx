import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import StatsBar from '../components/StatsBar/StatsBar';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import Sidebar from '../components/Sidebar/Sidebar';

const HomePage = () => {
  return (
    <div id="home-page">
      <Navbar />
      <Hero />
      <StatsBar />
      <main className="main-content">
        <ServicesSection />
        <Sidebar />
      </main>
    </div>
  );
};

export default HomePage;
