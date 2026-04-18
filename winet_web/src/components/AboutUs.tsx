import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import About3D from './About3D';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

export default function AboutUs() {
  const [isExploreMode, setIsExploreMode] = useState(false);

  return (
    <div className="relative w-full h-full overflow-x-hidden bg-[#0A0B10]">
      {/* 3D Background Canvas */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: isExploreMode ? 'auto' : 'none'
        }}
      >
        <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 180, 0], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <About3D isExploreMode={isExploreMode} />
        </Canvas>
      </div>

      {/* Explore Mode Toggle */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 50,
      }}>
        <button
          onClick={() => setIsExploreMode(!isExploreMode)}
          className={`btn ${isExploreMode ? 'btn-primary' : 'btn-outline'}`}
          style={{
            background: isExploreMode ? 'var(--primary)' : 'rgba(10, 11, 16, 0.6)',
            borderColor: isExploreMode ? 'transparent' : 'rgba(255,255,255,0.2)',
            color: 'white',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          {isExploreMode ? 'Návrat k príbehu' : 'Preskúmať 3D infraštruktúru'}
        </button>
      </div>

      {/* Back to Home Button */}
      <div style={{
        position: 'fixed',
        top: '2rem',
        left: '2rem',
        zIndex: 50,
      }}>
        <a
          href="/"
          className="btn btn-outline"
          style={{
            background: 'rgba(10, 11, 16, 0.6)',
            borderColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            backdropFilter: 'blur(8px)',
            padding: '0.5rem 1rem',
          }}
        >
          <ArrowLeft size={18} /> Späť domov
        </a>
      </div>

      {/* HTML Overlay Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        opacity: isExploreMode ? 0 : 1,
        pointerEvents: isExploreMode ? 'none' : 'auto',
        transition: 'opacity 0.5s ease'
      }}>
        {/* PAGE 1: Intro */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5vw', pointerEvents: 'none', position: 'relative' }}>
          <div className="animate-fade-in hero-card" style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '32px',
            padding: '2rem 3rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.05)',
          }}>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '1rem', letterSpacing: '-0.5px', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Príbeh siete <span className="text-brand-gradient">Winet.</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.6, fontWeight: 500 }}>
              Vybudovali sme robustnú, plne zálohovanú optickú sieť, ktorá prepája stovky domácností a firiem. Našou prioritou je stabilita, bez ohľadu na podmienky.
            </p>
          </div>
        </section>

        <section className="hero-spacer" />

        {/* PAGE 2: W */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 5vw', pointerEvents: 'none' }}>
          <div className="hero-card" style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '430px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '32px',
            padding: '3rem',
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-1px' }}>Korene v regióne</h2>
            <p style={{ color: '#1E293B', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>
              Začínali sme ako lokálny nadšenec do technológií. Dnes zabezpečujeme konektivitu pre kľúčové inštitúcie, školy a tisícky rodín na východnom Slovensku.
            </p>
          </div>
        </section>

        <section className="hero-spacer" />

        {/* PAGE 3: I Transmitter */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 5vw', pointerEvents: 'none' }}>
          <div className="hero-card" style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '430px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '32px',
            padding: '3rem',
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-1px' }}>Srdce siete</h2>
            <p style={{ color: '#1E293B', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>
              Naše hlavné uzly a vysielače operujú na profesionálnych technológiách. Bezvýpadkové napájanie a záložné trasy znamenajú, že vaša linka nikdy nezhasne.
            </p>
          </div>
        </section>

        <section className="hero-spacer" />

        {/* PAGE 4: N */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 5vw', pointerEvents: 'none' }}>
          <div className="hero-card" style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '430px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '32px',
            padding: '3rem',
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-1px' }}>Napredovanie</h2>
            <p style={{ color: '#1E293B', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>
              Neustále inovujeme. Z metaliky sme prešli na rádio, z rádia na chrbticovú optiku. Dnes ťaháme gigabiť až priamo do obývačiek.
            </p>
          </div>
        </section>

        <section className="hero-spacer" />

        {/* PAGE 5: E */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 5vw', pointerEvents: 'none' }}>
          <div className="hero-card" style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '430px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '32px',
            padding: '3rem',
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-1px' }}>Ekológia a efektivita</h2>
            <p style={{ color: '#1E293B', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>
              Staviame siete s ohľadom na prostredie. Efektívne moderné switche a routery majú zanedbateľnú spotrebu energie voči výkonom, ktoré podávajú.
            </p>
          </div>
        </section>

        <section className="hero-spacer" />

        {/* PAGE 6: T */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 5vw', pointerEvents: 'none' }}>
          <div className="hero-card" style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '430px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '32px',
            padding: '3rem',
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-1px' }}>Technológia pre vás</h2>
            <p style={{ color: '#1E293B', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>
              Celá táto infraštruktúra má jeden jediný cieľ. Aby ste po príchode domov zapli Netflix a všetko jednoducho fungovalo.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
