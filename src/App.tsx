
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import ServiceCard from './components/ServiceCard';
import PricingSection from './components/PricingSection';
import CoverageSection from './components/CoverageSection';
import FloatingContact from './components/FloatingContact';
import Footer from './components/Footer';
import { Wifi, Zap, Tv, ChevronRight, ShieldCheck, MapPin, Gauge } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ContactPage from './components/ContactPage';
import TvPage from './components/TvPage';
import InternetPage from './components/InternetPage';
import './App.css';

function Home() {
  const scrollRevealRef = useRef<HTMLDivElement>(null);

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

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      {/* 3D World Scene Fixed in Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <Canvas shadows camera={{ position: [0, 5, 20], fov: 45 }}>
          <Hero3D />
        </Canvas>
      </div>

      {/* Native HTML Scroll Content */}
      <div style={{ width: '100vw', position: 'relative' }}>
        {/* We place these sections directly in the normal document flow so they push the standard page content down */}

        {/* PAGE 1 (0-1): INITIAL HERO - RIGHT */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 5vw', pointerEvents: 'none', position: 'relative' }}>
          <div className="animate-fade-in hero-card" style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '420px',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderTop: '1px solid rgba(255, 255, 255, 0.9)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.9)',
            borderRadius: '32px',
            padding: '3rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
          }}>
            <div style={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              padding: '0.4rem 1rem',
              background: 'rgba(255,107,0,0.15)',
              color: 'var(--primary)',
              borderRadius: '99px',
              fontWeight: 700,
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
              border: '1px solid rgba(255,107,0,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Prémium Internet Provider
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1.2rem', letterSpacing: '-1px', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Rýchlosť, kvalita a <br /><span className="text-primary-gradient">stabilita.</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#1E293B', marginBottom: '2rem', lineHeight: 1.6, fontWeight: 500 }}>
              Vaše pripojenie k svetu začína u nás. Ako stabilný lokálny poskytovateľ (ISP) pokrývame viac ako 150 miest a obcí východného Slovenska už viac ako 11 rokov.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#cennik" className="btn btn-primary" style={{ boxShadow: '0 10px 20px rgba(255,107,0,0.3)' }}>
                Zobraziť cenník <ChevronRight size={20} />
              </a>
            </div>
          </div>
          {/* Scroll Indicator */}

        </section>

        {/* SPACER - 3D SCENE VISIBLE (mobile only) */}
        <section className="hero-spacer" />

        {/* PAGE 3 (2-3): OPTICAL LINES FLIGHT - LEFT */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 5vw', pointerEvents: 'none' }}>
          <div className="hero-card" style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '430px',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderTop: '1px solid rgba(255, 255, 255, 0.9)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.9)',
            borderRadius: '32px',
            padding: '3rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-1px', lineHeight: 1.2 }}>Dáta rýchlosťou svetla</h2>
            <p style={{ color: '#1E293B', fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: 1.6, fontWeight: 500 }}>
              Poskytujeme najmodernejšie FTTH optické pripojenie. Masívne prenosové rýchlosti s nulovým oneskorením zaisťujú, že vaša rodina aj firma môže streamovať v 4K a sťahovať dáta bez obmedzení.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.4)', borderRadius: '16px' }}>
              <Zap size={24} color="var(--primary)" />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Optické programy priamo do vašej domácnosti</span>
            </div>
          </div>
        </section>

        {/* SPACER - 3D SCENE VISIBLE (mobile only) */}
        <section className="hero-spacer" />

        {/* PAGE 4: CABLE DETAIL CLOSE-UP - RIGHT */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 5vw', pointerEvents: 'none' }}>
          <div className="hero-card" style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '430px',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderTop: '1px solid rgba(255, 255, 255, 0.9)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.9)',
            borderRadius: '32px',
            padding: '3rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-1px', lineHeight: 1.2 }}>Distribučná sieť</h2>
            <p style={{ color: '#1E293B', fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: 1.6, fontWeight: 500 }}>
              Dáta putujú cez stovky kilometrov optických káblov a vedení priamo k vám domov. Každý stĺp a každý spoj je starostlivo udržiavaný, aby ste mali stabilné pripojenie za každého počasia.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.4)', borderRadius: '16px' }}>
              <Zap size={24} color="var(--primary)" />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Robustná infraštruktúra pre nepretržité spojenie</span>
            </div>
          </div>
        </section>

        {/* SPACER - 3D SCENE VISIBLE (mobile only) */}
        <section className="hero-spacer" />

        {/* PAGE 5: TRANSMITTER TOWER - LEFT */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 5vw', pointerEvents: 'none' }}>
          <div className="hero-card" style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '430px',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderTop: '1px solid rgba(255, 255, 255, 0.9)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.9)',
            borderRadius: '32px',
            padding: '3rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-1px', lineHeight: 1.2 }}>Internet a Televízia</h2>
            <p style={{ color: '#1E293B', fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: 1.6, fontWeight: 500 }}>
              Kde nevedie optika, tam je naše strategické pokrytie WiFi internetu. Výkonné vysielače vo vašom regióne a plnohodnotná internetová televízia pre nekonečnú zábavu doručujú spoľahlivé spojenie aj počas nepriaznivého počasia.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.4)', borderRadius: '16px' }}>
              <Wifi size={24} color="var(--primary)" />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Spoľahlivé pripojenie kdekoľvek v regióne</span>
            </div>
          </div>
        </section>

        {/* SPACER - 3D SCENE VISIBLE (mobile only) */}
        <section className="hero-spacer" />

        {/* PAGE 7: VILLAGE/HOUSES - RIGHT */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 5vw', pointerEvents: 'none' }}>
          <div className="hero-card" style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '430px',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderTop: '1px solid rgba(255, 255, 255, 0.9)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.9)',
            borderRadius: '32px',
            padding: '3rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-1px', lineHeight: 1.2 }}>Naša lokálna podpora</h2>
            <p style={{ color: '#1E293B', fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: 1.6, fontWeight: 500 }}>
              O sieť sa starajú viacerí skúsení a vyškolení technici, ktorí Vám v prípade potreby vedia vždy pomôcť a poradiť. Internet nie sú len káble, ale aj okamžitá podpora od ľudí z vášho okolia.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.4)', borderRadius: '16px' }}>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>24/7</div>
                <div style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 600, marginTop: '0.4rem', lineHeight: 1.3 }}>Monitorovacie centrum a podpora klientov</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>11+</div>
                <div style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 600, marginTop: '0.4rem', lineHeight: 1.3 }}>Rokov lokálnych skúseností ako ISP</div>
              </div>
            </div>
          </div>
        </section>

        {/* SPACER - FINAL 3D OVERVIEW (mobile only) */}
        <section className="hero-spacer" />

        {/* PAGE 9+ (8+): STANDARD PAGE CONTENT OVERLAID ON 3D SCENE */}
        <div style={{ minHeight: '100vh', background: 'var(--bg-surface-light)', pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>
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
          <section id="sluzby" className="section-padding scroll-reveal" style={{ position: 'relative' }}>
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

          <CoverageSection />
          <PricingSection />

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
      </Routes>
    </Router>
  );
}

export default App;
