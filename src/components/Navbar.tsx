import { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: 'all 0.3s ease',
                background: 'transparent',
                borderBottom: 'none',
                padding: '1rem 0'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo */}
                <Link to="/" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-1.5px', textDecoration: 'none' }}>
                    winet<span style={{ color: 'var(--primary)' }}>.sk</span>
                </Link>

                {/* Desktop Links */}
                <div style={{ display: 'none' }} className="desktop-menu">
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 500 }}>
                        <Link to="/#sluzby" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} onMouseOver={e => (e.target as HTMLElement).style.color = 'var(--primary)'} onMouseOut={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>Služby</Link>
                        <Link to="/#cennik" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} onMouseOver={e => (e.target as HTMLElement).style.color = 'var(--primary)'} onMouseOut={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>Cenník</Link>
                        <Link to="/#pokrytie" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} onMouseOver={e => (e.target as HTMLElement).style.color = 'var(--primary)'} onMouseOut={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>Pokrytie</Link>
                        <Link to="/#vyhody" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} onMouseOver={e => (e.target as HTMLElement).style.color = 'var(--primary)'} onMouseOut={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>Prečo my?</Link>
                        <Link to="/kontakt" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} onMouseOver={e => (e.target as HTMLElement).style.color = 'var(--primary)'} onMouseOut={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>Kontakt</Link>
                        <a href="http://mail.websupport.sk" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} onMouseOver={e => (e.target as HTMLElement).style.color = 'var(--primary)'} onMouseOut={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>WebMail</a>
                        <Link to="/televizia" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} onMouseOver={e => (e.target as HTMLElement).style.color = 'var(--primary)'} onMouseOut={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>Televízia</Link>
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
                    <Link to="/#sluzby" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Služby</Link>
                    <Link to="/#cennik" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cenník</Link>
                    <Link to="/#pokrytie" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Pokrytie</Link>
                    <Link to="/#vyhody" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Prečo my?</Link>
                    <Link to="/kontakt" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Kontakt</Link>
                    <a href="http://mail.websupport.sk" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>WebMail</a>
                    <Link to="/televizia" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Televízia</Link>
                    <a href="http://klient.winet.sk" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginTop: '0.5rem' }}>Klientska zóna <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /></a>
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
