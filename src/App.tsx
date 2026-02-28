
import { Canvas } from '@react-three/fiber';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import ServiceCard from './components/ServiceCard';
import PricingSection from './components/PricingSection';
import CoverageSection from './components/CoverageSection';
import FloatingContact from './components/FloatingContact';
import { Wifi, Zap, Tv, ChevronRight, ShieldCheck, MapPin, Gauge } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactPage from './components/ContactPage';
import TvPage from './components/TvPage';
import InternetPage from './components/InternetPage';
import './App.css';

function Home() {
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
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 5vw', pointerEvents: 'none' }}>
          <div className="animate-fade-in hero-card" style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '55vw',
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
        </section>

        {/* SPACER - 3D SCENE VISIBLE (mobile only) */}
        <section className="hero-spacer" />

        {/* PAGE 3 (2-3): OPTICAL LINES FLIGHT - RIGHT */}
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

        {/* PAGE 5 (4-5): TRANSMITTER TOWER - LEFT */}
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

        {/* PAGE 7 (6-7): ADMIN BUILDING - RIGHT */}
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

          {/* Services Section */}
          <section id="sluzby" className="section-padding" style={{ position: 'relative' }}>
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
          <section id="vyhody" className="section-padding" style={{ background: 'var(--bg-dark)' }}>
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

          {/* Footer */}
          <footer id="kontakt" className="section-padding" style={{ background: '#0F172A', borderTop: '1px solid var(--glass-border)', color: 'var(--text-inverted)' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                  <img src={`${import.meta.env.BASE_URL}logo.png`} alt="WI-NET" style={{ height: '32px', filter: 'brightness(1.5)' }} />
                </div>
                <p style={{ color: '#94A3B8', marginBottom: '1rem' }}>
                  WI-NET s.r.o.<br />
                  Hlavná 8/18<br />
                  086 41 Raslavice
                </p>
                <p style={{ color: '#94A3B8' }}>
                  <strong>Tel:</strong> <a href="tel:0543211880" style={{ color: 'var(--primary)' }}>054 321 18 80</a><br />
                  <strong>Email:</strong> <a href="mailto:internet@wi-net.sk" style={{ color: 'var(--primary)' }}>internet@wi-net.sk</a>
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-inverted)' }}>Dokumenty</h4>
                <ul style={{ listStyle: 'none', padding: 0, gap: '0.8rem', display: 'flex', flexDirection: 'column' }}>
                  <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>O nás</a></li>
                  <li><a href="http://winet.sk/kontaktne-informacie/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Kontaktné informácie</a></li>
                  <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Kariéra</a></li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 600 }}>Dokumenty</h4>
                <ul style={{ listStyle: 'none', padding: 0, gap: '0.8rem', display: 'flex', flexDirection: 'column' }}>
                  <li><a href={`${import.meta.env.BASE_URL}dokumenty/cennik-optika.pdf`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cenník Optika</a></li>
                  <li><a href={`${import.meta.env.BASE_URL}dokumenty/cennik-wifi.pdf`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cenník Wifi</a></li>
                  <li><a href={`${import.meta.env.BASE_URL}dokumenty/VZP_WI-NET.pdf`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Všeobecné zmluvné podmienky</a></li>
                  <li><span style={{ color: 'rgba(255,255,255,0.2)' }}>Špecifikácia rozhraní (TBD)</span></li>
                  <li><span style={{ color: 'rgba(255,255,255,0.2)' }}>Licencia a OP (TBD)</span></li>
                  <li><a href={`${import.meta.env.BASE_URL}dokumenty/transparentnost.pdf`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Transparentnosť</a></li>
                  <li><a href="http://winet.sk/index.php/tsur/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Tech. špecifikácia rozhrania</a></li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 600 }}>Doplnky</h4>
                <ul style={{ listStyle: 'none', padding: 0, gap: '0.8rem', display: 'flex', flexDirection: 'column' }}>
                  <li><a href="https://www.speedmeter.sk/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Meranie rýchlosti</a></li>
                  <li><a href="https://download.teamviewer.com/download/TeamViewerQS.exe" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>TeamViewer</a></li>
                  <li><a href="https://download.anydesk.com/AnyDesk.exe" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>AnyDesk</a></li>
                  <li><a href="http://mail.websupport.sk" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>WebMail</a></li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.9rem', color: '#64748B' }}>
              © {new Date().getFullYear()} WI-NET s.r.o. Všetky práva vyhradené. Vytvorené pre maximálnu rýchlosť a stabilitu.
            </div>
            <style dangerouslySetInnerHTML={{
              __html: `
                .hover-text-primary:hover { color: var(--primary) !important; }
              `}}
            />
          </footer>

        </div> {/* End of HTML overlay container */}

      </div> {/* End of native scroll container */}
      <FloatingContact />
    </>
  );
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
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
