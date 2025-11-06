import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import VaultPreview from '../components/VaultPreview';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import CosmicBackground from '../components/CosmicBackground';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <CosmicBackground scrollY={scrollY} />

      <div className="relative z-10">
        <Hero />
        <VaultPreview />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
}
