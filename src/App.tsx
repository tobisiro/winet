// App.tsx
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import ServiceCard from './components/ServiceCard';
import { Wifi, Zap, Tv, ChevronRight, ShieldCheck, MapPin, Gauge } from 'lucide-react';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        {/* The entire website is now a 3D scroll-driven experience */}
        <Canvas camera={{ position: [20, 15, 30], fov: 50 }} dpr={[1, 1.5]}>
          <ScrollControls pages={6} damping={0.25} distance={1}>

            {/* 3D World Scene */}
            <Hero3D />

            {/* DOM Overlay Sections mapped to scroll pages */}
            <Scroll html style={{ width: '100vw' }}>

              {/* PAGE 1 (0-1): INITIAL HERO */}
              <section style={{ height: '100vh', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                <div className="container" style={{ pointerEvents: 'auto' }}>
                  <div style={{ maxWidth: '700px' }} className="animate-fade-in">
                    <div style={{
                      display: 'inline-block',
                      padding: '0.5rem 1rem',
                      background: 'rgba(255,107,0,0.1)',
                      color: 'var(--primary)',
                      borderRadius: '99px',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      marginBottom: '1.5rem',
                      border: '1px solid rgba(255,107,0,0.2)'
                    }}>
                      Nová éra pripojenia
                    </div>
                    <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', marginBottom: '1.5rem', letterSpacing: '-1px', color: 'var(--text-primary)' }}>
                      Rýchlosť, kvalita a <span className="text-primary-gradient">stabilita.</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px' }}>
                      Pripravte sa na scrollovací 3D zážitok, ktorý vás prevedie našou modernou optickou infraštruktúrou naprieč celým Slovenskom. Posúvajte nižšie pre viac informácií.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <a href="#sluzby" className="btn btn-primary">
                        Zistiť dostupnosť <ChevronRight size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* PAGE 2 (1-2): TRANSMITTER TOWER */}
              <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', pointerEvents: 'none' }}>
                <div className="container" style={{ pointerEvents: 'auto' }}>
                  <div style={{ maxWidth: '500px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Srdce siete</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                      Náš centrálny vysielač na najvyššom kopci distribuuje masívnu 10Gbit/s dátovú konektivitu pre stovky menších okolitých uzlov cez optiku a vzdušné mikrovlnné spoje.
                    </p>
                    <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Spoľahlivosť 99.9% aj počas búrok.</p>
                  </div>
                </div>
              </section>

              {/* PAGE 3 (2-3): OPTICAL LINES */}
              <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pointerEvents: 'none' }}>
                <div className="container" style={{ pointerEvents: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ maxWidth: '500px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Rozsiahla optika</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                      Stavebný kameň našej siete. Desiatky kilometrov závesných káblov spájajú mestá rýchlosťou svetla priamo k vám domov (FTTH).
                    </p>
                    <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Dáta plynú v ultra-vysokej rýchlosti k našim klientom.</p>
                  </div>
                </div>
              </section>

              {/* PAGE 4 (3-4): ADMIN BUILDING */}
              <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', pointerEvents: 'none' }}>
                <div className="container" style={{ pointerEvents: 'auto' }}>
                  <div style={{ maxWidth: '500px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>NOC Dohľadové Centrum</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                      Naša centrála, kde experti neustále monitorujú a optimalizujú prúdenie siete 24 hodín denne, 7 dní v týždni. Ak nastane porucha, vieme o nej skôr, než vy.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                      <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>24/7</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Podpora</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>11+</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Rokov na trhu</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* PAGE 5 & 6 (4-6): STANDARD PAGE CONTENT OVERLAID ON 3D SCENE */}
              <div style={{ minHeight: '200vh', background: 'var(--bg-surface-light)', pointerEvents: 'auto' }}>

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

                {/* Footer */}
                <footer id="kontakt" className="section-padding" style={{ background: '#0F172A', borderTop: '1px solid var(--glass-border)', color: 'var(--text-inverted)' }}>
                  <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <img src="/logo.png" alt="WI-NET" style={{ height: '32px', filter: 'brightness(1.5)' }} />
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
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#94A3B8' }}>
                        <li><a href="#" className="hover-text-primary">Všeobecné zmluvné podmienky</a></li>
                        <li><a href="#" className="hover-text-primary">Cenník služieb (Optika)</a></li>
                        <li><a href="#" className="hover-text-primary">Cenník služieb (Wifi)</a></li>
                        <li><a href="#" className="hover-text-primary">Informácie pre koncových užívateľov</a></li>
                      </ul>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-inverted)' }}>Rýchle odkazy</h4>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#94A3B8' }}>
                        <li><a href="http://klient.winet.sk" className="hover-text-primary">Klientská zóna (Podpora)</a></li>
                        <li><a href="http://mail.websupport.sk" className="hover-text-primary">WebMail</a></li>
                        <li><a href="https://www.speedmeter.sk/" target="_blank" className="hover-text-primary">Meranie rýchlosti</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: '#64748B', fontSize: '0.9rem' }}>
                    © {new Date().getFullYear()} WI-NET s.r.o. Všetky práva vyhradené. Vytvorené pre maximálnu rýchlosť a stabilitu.
                  </div>
                  <style dangerouslySetInnerHTML={{
                    __html: `
                    .hover-text-primary:hover { color: var(--primary) !important; }
                  `}} />
                </footer>
              </div>

            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </>
  );
}

export default App;
