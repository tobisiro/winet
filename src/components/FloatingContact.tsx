import React from 'react';
import { PhoneCall } from 'lucide-react';

const FloatingContact: React.FC = () => {
    return (
        <a style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            background: 'var(--primary)',
            padding: '0.8rem 1.2rem',
            borderRadius: '99px',
            boxShadow: '0 10px 25px rgba(255, 107, 0, 0.4)',
            gap: '0.8rem',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            textDecoration: 'none',
            color: 'white'
        }}
            href="tel:0543211880"
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 107, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 107, 0, 0.4)';
            }}
        >
            <div style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <PhoneCall size={20} color="white" />
            </div>
            <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.9 }}>Podpora pri poruche</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>054 321 18 80</div>
            </div>
        </a>
    );
};

export default FloatingContact;
