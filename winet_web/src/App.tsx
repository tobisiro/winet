import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home3D from './components/Home3D';
import ServiceCard from './components/ServiceCard';
import PricingSection from './components/PricingSection';
import CoverageSection from './components/CoverageSection';
import FloatingContact from './components/FloatingContact';
import Footer from './components/Footer';
import { Wifi, Zap, Tv, ChevronRight, ShieldCheck, MapPin, Gauge, Orbit, X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ContactPage from './components/ContactPage';
import TvPage from './components/TvPage';
import InternetPage from './components/InternetPage';
import AboutUs from './components/AboutUs';
import './App.css';

function Home() {
  const [isExploreMode, setIsExploreMode] = useState(false);
  const [showExploreButton, setShowExploreButton] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      const sluzby = document.getElementById('sluzby');
      if (sluzby) {
        // If the #sluzby section has scrolled into the viewport, hide the explore button
        const rect = sluzby.getBoundingClientRect();
        setShowExploreButton(rect.top > window.innerHeight * 0.8);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      {/* 3D World Scene Fixed in Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: isExploreMode ? 10 : -1 }}>
        <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 5, 20], fov: 45 }}>
          <Home3D isExploreMode={isExploreMode} />
        </Canvas>
      </div>

      {/* Explore Mode Toggle Button */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem', // Avoid overlap with FloatingContact
        zIndex: 100,
        display: showExploreButton ? 'flex' : 'none',
        alignItems: 'center',
        gap: '1rem',
        opacity: showExploreButton ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: showExploreButton ? 'auto' : 'none',
      }}>
        <button
          onClick={() => {
            setIsExploreMode(!isExploreMode);
            if (!isExploreMode) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              document.body.style.overflow = 'hidden';
            } else {
              document.body.style.overflow = 'auto';
            }
          }}
          style={{
            background: isExploreMode ? 'var(--text-primary)' : 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '99px',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            fontFamily: 'var(--font-heading)'
          }}
        >
          {isExploreMode ? <><X size={20} /> Späť</> : <><Orbit size={20} /> Preskúmať</>}
        </button>
      </div>

      {/* Native HTML Scroll Content */}
      <div style={{
        width: '100vw',
        position: 'relative',
        opacity: isExploreMode ? 0 : 1,
        pointerEvents: isExploreMode ? 'none' : 'auto',
        transition: 'opacity 0.5s ease'
      }}>
        {/* We place these sections directly in the normal document flow so they push the standard page content down */}

        {/* PAGE 1 (0-1): INITIAL HERO - TRANSPARENT OVERLAY */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5vw', pointerEvents: 'none', position: 'relative' }}>
          <div className="animate-fade-in hero-card" style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.05)', // Highly transparent
            backdropFilter: 'blur(4px)', // Very subtle blur
            WebkitBackdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '32px',
            padding: '2rem 3rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              display: 'inline-block',
              padding: '0.4rem 1rem',
              background: 'rgba(112,72,157,0.1)',
              color: 'var(--text-primary)',
              borderRadius: '99px',
              fontWeight: 700,
              fontSize: '0.85rem',
              marginBottom: '1rem',
              border: '1px solid rgba(112,72,157,0.2)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Prémium Internet Provider
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1rem', letterSpacing: '-0.5px', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Rýchlosť, kvalita a <span className="text-brand-gradient">stabilita.</span>
            </h1>
            <p style={{ fontSize: '1rem', color: '#334155', marginBottom: '1.5rem', lineHeight: 1.5, fontWeight: 500 }}>
              Vaše pripojenie k svetu začína u nás. Pokrývame viac ako 150 miest a obcí.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#cennik" className="btn btn-primary" style={{ boxShadow: '0 10px 20px rgba(255,107,0,0.2)', padding: '0.75rem 1.5rem' }}>
                Zobraziť cenník <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </section>



        {/* PAGE 9+ (8+): STANDARD PAGE CONTENT OVERLAID ON 3D SCENE */}
        <div style={{ minHeight: '100vh', pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>
          {/* Gradient transition from 3D scene to content */}
          <div style={{
            position: 'absolute',
            top: '-120px',
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to bottom, transparent 0%, var(--bg-surface-light) 100%)',
            pointerEvents: 'none',
            zIndex: 10
          }} />

          {/* Services Section */}
          <section id="sluzby" className="section-padding scroll-reveal" style={{ position: 'relative', background: 'var(--bg-surface-light)' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem auto' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Vyberte si službu podľa vašich predstáv</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  Neobmedzené pripojenie a stabilita. Ponúkame moderné technológie pre vašu domácnosť či firmu.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem'
              }}>
                <ServiceCard
                  title="Optický internet"
                  speed="až do 1000 Mbit/s"
                  icon={<Zap size={32} />}
                  description="Najmodernejšie garantované pripojenie pre náročných užívateľov."
                  features={['Zriadenie už od 1€', 'Neobmedzené sťahovanie', 'Bezplatný servis']}
                />
                <ServiceCard
                  title="Wifi Internet"
                  speed="Stabilné bezdrôtové spojenie"
                  icon={<Wifi size={32} />}
                  description="Spoľahlivé pripojenie dostupné aj tam, kde optika ešte nedorazila."
                  features={['Pokrytie širokého okolia', 'Rýchla inštalácia', 'Cenovo dostupné']}
                />
                <ServiceCard
                  title="Televízia"
                  speed="Viac ako 130 TV staníc"
                  icon={<Tv size={32} />}
                  description="Bohatá ponuka televíznych kanálov v HD kvalite."
                  features={['Archív a nahrávanie', 'Sledovanie na viacerých zariadeniach', 'Bezplatná aplikácia']}
                />
              </div>
            </div>
          </section>

          {/* Spacer 1: Fiber Optic View */}
          <section className="hero-spacer" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div className="glass-card" style={{ padding: '1.5rem 2.5rem', borderRadius: '24px', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.2rem' }}>
                <Zap className="text-brand" size={24} />
                Optická sieť
              </div>
            </div>
          </section>

          {/* Prečo my Section */}
          <section id="vyhody" className="section-padding scroll-reveal" style={{ background: 'var(--bg-dark)' }}>
            <div className="container">
              <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', color: 'var(--text-primary)' }}>Prečo my?</h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem auto', background: 'rgba(255, 107, 0, 0.1)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <Gauge size={40} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Rýchly internet</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Vysokorýchlostný internet s technológiou optiky pre maximálny výkon vo vašej sieti.</p>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem auto', background: 'rgba(255, 107, 0, 0.1)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <ShieldCheck size={40} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Kvalitné pripojenie</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Garantujeme spoľahlivosť, stabilitu a seriózny prístup našich vyškolených technikov.</p>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem auto', background: 'rgba(255, 107, 0, 0.1)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <MapPin size={40} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Dostupnosť</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Poskytujeme naše služby aj v menších obciach a menej dostupných lokalitách.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Spacer 2: Transmitter View */}
          <section className="hero-spacer" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div className="glass-card" style={{ padding: '1.5rem 2.5rem', borderRadius: '24px', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.2rem' }}>
                <Wifi className="text-brand" size={24} />
                Vysielače a prenos
              </div>
            </div>
          </section>

          <CoverageSection />
          <PricingSection />

          {/* Spacer 3: Coverage/House View */}
          <section className="hero-spacer" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div className="glass-card" style={{ padding: '1.5rem 2.5rem', borderRadius: '24px', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.2rem' }}>
                <MapPin className="text-brand" size={24} />
                Dostupnosť všade
              </div>
            </div>
          </section>

          <Footer />

        </div> {/* End of HTML overlay container */}
      </div> {/* End of native scroll container */}
      <FloatingContact />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/internet" element={<InternetPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/televizia" element={<TvPage />} />
        <Route path="/o-nas" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
