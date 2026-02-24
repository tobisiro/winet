import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: 'all 0.3s ease',
                background: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
                padding: '1rem 0',
                boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Logo */}
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                        src="/logo.png"
                        alt="WI-NET"
                        style={{
                            height: '48px',
                            width: 'auto',
                            objectFit: 'contain'
                        }}
                    />
                </a>

                {/* Desktop Links */}
                <div style={{ display: 'none' }} className="desktop-menu">
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 500 }}>
                        <a href="#sluzby" style={{ color: 'var(--text-secondary)' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Služby</a>
                        <a href="#vyhody" style={{ color: 'var(--text-secondary)' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Prečo my?</a>
                        <a href="#kontakt" style={{ color: 'var(--text-secondary)' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Kontakt</a>
                        <a href="http://klient.winet.sk" className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                            Klientska zóna
                        </a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" style={{ cursor: 'pointer' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'var(--bg-dark)',
                    borderBottom: '1px solid var(--glass-border)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}>
                    <a href="#sluzby" onClick={() => setMobileMenuOpen(false)}>Služby</a>
                    <a href="#vyhody" onClick={() => setMobileMenuOpen(false)}>Prečo my?</a>
                    <a href="#kontakt" onClick={() => setMobileMenuOpen(false)}>Kontakt</a>
                    <a href="http://klient.winet.sk" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Klientska zóna <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /></a>
                </div>
            )}
            <style dangerouslySetInnerHTML={{
                __html: `
        @media (min-width: 768px) {
          .desktop-menu { display: block !important; }
          .mobile-toggle { display: none !important; }
        }
      `}} />
        </nav>
    );
}
