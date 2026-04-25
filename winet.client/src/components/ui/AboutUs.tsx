import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import styled from 'styled-components';
import { About3D } from '../../three/about/About3D';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Link } from '@tanstack/react-router';

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: #0A0B10;
`;

const BackgroundCanvas = styled.div<{ $isExploreMode: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: ${props => props.$isExploreMode ? 'auto' : 'none'};
`;

const FloatingButton = styled.div`
  position: fixed;
  z-index: 50;
`;

const ContentOverlay = styled.div<{ $isExploreMode: boolean }>`
  position: relative;
  z-index: 10;
  opacity: ${props => props.$isExploreMode ? 0 : 1};
  pointer-events: ${props => props.$isExploreMode ? 'none' : 'auto'};
  transition: opacity 0.5s ease;
`;

const Section = styled.section<{ $align?: 'flex-start' | 'center' | 'flex-end' }>`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: ${props => props.$align || 'center'};
  padding: 0 5vw;
  pointer-events: none;
  position: relative;
`;

const HeroCard = styled.div<{ $maxWidth?: string; $glass?: boolean }>`
  pointer-events: auto;
  width: 100%;
  max-width: ${props => props.$maxWidth || '600px'};
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$maxWidth === '600px' ? 'center' : 'flex-start'};
  text-align: ${props => props.$maxWidth === '600px' ? 'center' : 'left'};
  background: ${props => props.$glass ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
  backdrop-filter: blur(${props => props.$glass ? '12px' : '4px'});
  -webkit-backdrop-filter: blur(${props => props.$glass ? '12px' : '4px'});
  border: 1px solid ${props => props.$glass ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 32px;
  padding: 3rem;
  box-shadow: 0 30px 60px rgba(0,0,0,0.05);
`;

const CardTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
  letter-spacing: -1px;
`;

const CardDescription = styled.p`
  color: #1E293B;
  font-size: 1.05rem;
  line-height: 1.6;
  font-weight: 500;
`;

export default function AboutUs() {
  const [isExploreMode, setIsExploreMode] = useState(false);

  return (
    <PageContainer>
      <BackgroundCanvas $isExploreMode={isExploreMode}>
        <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 180, 0], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <About3D isExploreMode={isExploreMode} />
        </Canvas>
      </BackgroundCanvas>

      <FloatingButton style={{ bottom: '2rem', right: '2rem' }}>
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
          {isExploreMode ? 'Späť' : 'Preskúmať'}
        </button>
      </FloatingButton>

      <FloatingButton style={{ top: '2rem', left: '2rem' }}>
        <Link
          to="/"
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
        </Link>
      </FloatingButton>

      <ContentOverlay $isExploreMode={isExploreMode}>
        <Section>
          <HeroCard className="animate-fade-in">
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '1rem', letterSpacing: '-0.5px', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              Príbeh siete <span className="text-brand-gradient">Winet.</span>
            </h1>
            <CardDescription style={{ color: '#334155' }}>
              Vybudovali sme robustnú, plne zálohovanú optickú sieť, ktorá prepája stovky domácností a firiem. Našou prioritou je stabilita, bez ohľadu na podmienky.
            </CardDescription>
          </HeroCard>
        </Section>

        <section className="hero-spacer" />

        <Section $align="flex-start">
          <HeroCard $maxWidth="430px" $glass>
            <CardTitle>Korene v regióne</CardTitle>
            <CardDescription>
              Začínali sme ako lokálny nadšenec do technológií. Dnes zabezpečujeme konektivitu pre kľúčové inštitúcie, školy a tisícky rodín na východnom Slovensku.
            </CardDescription>
          </HeroCard>
        </Section>

        <section className="hero-spacer" />

        <Section $align="flex-end">
          <HeroCard $maxWidth="430px" $glass>
            <CardTitle>Srdce siete</CardTitle>
            <CardDescription>
              Naše hlavné uzly a vysielače operujú na profesionálnych technológiách. Bezvýpadkové napájanie a záložné trasy znamenajú, že vaša linka nikdy nezhasne.
            </CardDescription>
          </HeroCard>
        </Section>

        <section className="hero-spacer" />

        <Section $align="flex-start">
          <HeroCard $maxWidth="430px" $glass>
            <CardTitle>Napredovanie</CardTitle>
            <CardDescription>
              Neustále inovujeme. Z metaliky sme prešli na rádio, z rádia na chrbticovú optiku. Dnes ťaháme gigabiť až priamo do obývačiek.
            </CardDescription>
          </HeroCard>
        </Section>

        <section className="hero-spacer" />

        <Section $align="flex-end">
          <HeroCard $maxWidth="430px" $glass>
            <CardTitle>Ekológia a efektivita</CardTitle>
            <CardDescription>
              Staviame siete s ohľadom na prostredie. Efektívne moderné switche a routery majú zanedbateľnú spotrebu energie voči výkonom, ktoré podávajú.
            </CardDescription>
          </HeroCard>
        </Section>

        <section className="hero-spacer" />

        <Section $align="flex-start">
          <HeroCard $maxWidth="430px" $glass>
            <CardTitle>Technológia pre vás</CardTitle>
            <CardDescription>
              Celá táto infraštruktúra má jeden jediný cieľ. Aby ste po príchode domov zapli Netflix a všetko jednoducho fungovalo.
            </CardDescription>
          </HeroCard>
        </Section>
      </ContentOverlay>
    </PageContainer>
  );
}
