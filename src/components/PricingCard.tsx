import React from 'react';
import { Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingCardProps {
  title: string;
  priceMesačneViazanost: string;
  priceMesačneBezViazanosti: string;
  downloadSpeed: string;
  uploadSpeed: string;
  montazViazanost: string;
  montazBezViazanosti: string;
  features: string[];
  isWifi: boolean;
  withViazanost: boolean; // Managed by parent toggle
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  priceMesačneViazanost,
  priceMesačneBezViazanosti,
  downloadSpeed,
  uploadSpeed,
  montazViazanost,
  montazBezViazanosti,
  features,
  isWifi,
  withViazanost,
  isPopular,
}) => {
  const currentPrice = withViazanost ? priceMesačneViazanost : priceMesačneBezViazanosti;
  const currentMontaz = withViazanost ? montazViazanost : montazBezViazanosti;

  return (
    <div className="pricing-card" style={{
      background: isPopular ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      border: isPopular ? '2px solid rgba(255, 107, 0, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      padding: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      transform: isPopular ? 'scale(1.05)' : 'scale(1)',
      zIndex: isPopular ? 10 : 1,
      transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease',
      boxShadow: isPopular ? '0 30px 60px rgba(0,0,0,0.3)' : 'none',
      cursor: 'default',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = isPopular ? 'scale(1.08) translateY(-5px)' : 'scale(1) translateY(-5px)';
        e.currentTarget.style.boxShadow = isPopular ? '0 40px 80px rgba(255, 107, 0, 0.2)' : '0 20px 40px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = isPopular ? 'scale(1.05)' : 'scale(1)';
        e.currentTarget.style.boxShadow = isPopular ? '0 30px 60px rgba(0,0,0,0.3)' : 'none';
      }}
    >
      {/* Decorative gradient blur */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '100px',
        height: '100px',
        background: isWifi ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 107, 0, 0.2)', // Blue/cyan for Wifi, Orange for Optika
        filter: 'blur(40px)',
        borderRadius: '50%',
        zIndex: 0
      }} />

      {isPopular && (
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          background: 'linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%)',
          color: '#000',
          fontWeight: 800,
          fontSize: '0.75rem',
          padding: '0.4rem 1.5rem',
          borderBottomLeftRadius: '24px',
          boxShadow: '0 5px 15px rgba(255,107,0,0.4)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          zIndex: 2
        }}>
          Najpredávanejší
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{title}</h3>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{currentPrice}</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>/ mesačne</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.3rem' }}>Sťahovanie</div>
            <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}>{downloadSpeed}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.3rem' }}>Odosielanie</div>
            <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}>{uploadSpeed}</div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Info size={16} color="var(--primary)" />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Cena montáže: <strong style={{ color: 'var(--text-primary)' }}>{currentMontaz}</strong></span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {features.map((feature, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Check size={18} color="var(--primary)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.4 }}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <Link to="/kontakt" style={{
            display: 'block',
            width: '100%',
            padding: '1rem',
            textAlign: 'center',
            background: isPopular ? 'linear-gradient(90deg, var(--primary) 0%, #ff8c00 100%)' : 'transparent',
            color: isPopular ? 'white' : 'var(--primary)',
            borderRadius: '12px',
            fontWeight: 700,
            textDecoration: 'none',
            border: isPopular ? 'none' : '2px solid var(--primary)',
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={(e) => {
              if (isPopular) {
                e.currentTarget.style.filter = 'brightness(1.1)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,107,0,0.3)';
              } else {
                e.currentTarget.style.background = 'rgba(255, 107, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (isPopular) {
                e.currentTarget.style.filter = 'none';
                e.currentTarget.style.boxShadow = 'none';
              } else {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            Objednať
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
