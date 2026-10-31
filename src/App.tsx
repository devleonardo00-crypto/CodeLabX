import React from 'react';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { ServicesSection } from './components/services/ServicesSection';
import { WhySection } from './components/why/WhySection';
import { PortfolioSection } from './components/portfolio/PortfolioSection';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070609] text-white selection:bg-purple-600 selection:text-white font-sans overflow-x-hidden relative">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhySection />
        <PortfolioSection />
      </main>
    </div>
  );
};

export default App;
