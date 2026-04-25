import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../layout/Navbar';
import { Home3D } from '../../three/home/Home3D';
import ServiceCard from './ServiceCard';
import PricingSection from './PricingSection';
import CoverageSection from './CoverageSection';
import FloatingContact from '../layout/FloatingContact';
import Footer from '../layout/Footer';
import { Wifi, Zap, Tv, ChevronRight, ShieldCheck, MapPin, Gauge, Orbit, X } from 'lucide-react';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5vw;
  pointer-events: none;
  position: relative;
`;

const HeroCard = styled.div`
  pointer-events: auto;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 2rem 3rem;
  box-shadow: 0 30px 60px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 24px;
  }
`;

const Badge = styled.div`
  display: inline-block;
  padding: 0.4rem 1rem;
  background: rgba(255, 107, 0, 0.1);
  color: var(--text-primary);
  border-radius: 99px;
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 107, 0, 0.2);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FeatureItem = styled.div`
  text-align: center;
`;

const FeatureIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem auto;
  background: rgba(255, 107, 0, 0.1);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
`;

const SpacerCard = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  padding: 1.5rem 2.5rem;
  border-radius: 24px;
  text-align: center;
`;

const SpacerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.2rem;
`;

export default function Home() {
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
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: isExploreMode ? 10 : -1 }}>
        <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 5, 20], fov: 45 }}>
          <Home3D isExploreMode={isExploreMode} />
        </Canvas>
      </div>

      <div style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
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

      <div style={{
        width: '100%',
        position: 'relative',
        opacity: isExploreMode ? 0 : 1,
        pointerEvents: isExploreMode ? 'none' : 'auto',
        transition: 'opacity 0.5s ease'
      }}>
        <HeroSection>
          <HeroCard className="animate-fade-in hero-card">
            <Badge>
              Prémium Internet Provider
            </Badge>
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
          </HeroCard>
        </HeroSection>

        <div style={{ minHeight: '100vh', pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>
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

          <section className="hero-spacer" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <SpacerCard>
              <SpacerContent>
                <Zap className="text-brand" size={24} />
                Optická sieť
              </SpacerContent>
            </SpacerCard>
          </section>

          <section id="vyhody" className="section-padding scroll-reveal" style={{ background: 'var(--bg-dark)' }}>
            <div className="container">
              <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', color: 'var(--text-primary)' }}>Prečo my?</h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                <FeatureItem>
                  <FeatureIconWrapper>
                    <Gauge size={40} />
                  </FeatureIconWrapper>
                  <FeatureTitle>Rýchly internet</FeatureTitle>
                  <FeatureDescription>Vysokorýchlostný internet s technológiou optiky pre maximálny výkon vo vašej sieti.</FeatureDescription>
                </FeatureItem>

                <FeatureItem>
                  <FeatureIconWrapper>
                    <ShieldCheck size={40} />
                  </FeatureIconWrapper>
                  <FeatureTitle>Kvalitné pripojenie</FeatureTitle>
                  <FeatureDescription>Garantujeme spoľahlivosť, stabilitu a seriózny prístup našich vyškolených technikov.</FeatureDescription>
                </FeatureItem>

                <FeatureItem>
                  <FeatureIconWrapper>
                    <MapPin size={40} />
                  </FeatureIconWrapper>
                  <FeatureTitle>Dostupnosť</FeatureTitle>
                  <FeatureDescription>Poskytujeme naše služby aj v menších obciach a menej dostupných lokalitách.</FeatureDescription>
                </FeatureItem>
              </div>
            </div>
          </section>

          <section className="hero-spacer" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <SpacerCard>
              <SpacerContent>
                <Wifi className="text-brand" size={24} />
                Vysielače a prenos
              </SpacerContent>
            </SpacerCard>
          </section>

          <CoverageSection />
          <PricingSection />

          <section className="hero-spacer" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <SpacerCard>
              <SpacerContent>
                <MapPin className="text-brand" size={24} />
                Dostupnosť všade
              </SpacerContent>
            </SpacerCard>
          </section>

          <Footer />

        </div>
      </div>
      <FloatingContact />
    </>
  );
}
