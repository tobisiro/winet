import './Navbar.css';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from '@tanstack/react-router';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [internetDropdownOpen, setInternetDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handlePokrytieClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        if (location.pathname !== '/') {
            navigate({to: '/'});
            setTimeout(() => {
                const el = document.getElementById('pokrytie');
                el?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const el = document.getElementById('pokrytie');
            el?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
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
                transition: 'all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
                background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
                boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
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
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontWeight: 500 }}>

                        {/* Internet Dropdown */}
                        <div
                            style={{ position: 'relative' }}
                            onMouseEnter={() => setInternetDropdownOpen(true)}
                            onMouseLeave={() => setInternetDropdownOpen(false)}
                        >
                            <button
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                                    color: 'var(--text-secondary)', background: 'none', border: 'none',
                                    cursor: 'pointer', fontWeight: 500, fontSize: 'inherit',
                                    fontFamily: 'inherit', padding: 0,
                                    transition: 'color 0.2s'
                                }}
                                onMouseOver={e => (e.currentTarget.style.color = 'var(--primary)')}
                                onMouseOut={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                            >
                                Internet <ChevronDown size={16} />
                            </button>

                            {internetDropdownOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    paddingTop: '0.5rem',
                                    minWidth: '200px',
                                    zIndex: 100
                                }}>
                                    <div style={{
                                        background: 'rgba(255,255,255,0.95)',
                                        backdropFilter: 'blur(12px)',
                                        WebkitBackdropFilter: 'blur(12px)',
                                        borderRadius: '16px',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                        border: '1px solid rgba(0,0,0,0.06)',
                                        padding: '0.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.25rem'
                                    }}>
                                        <Link
                                            to="/internet" search={{ tab: 'optika' }}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                                padding: '0.75rem 1rem',
                                                color: 'var(--text-primary)',
                                                textDecoration: 'none',
                                                borderRadius: '12px',
                                                transition: 'background 0.2s',
                                                fontSize: '0.95rem'
                                            }}
                                            onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,107,0,0.08)')}
                                            onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                                        >
                                            <span style={{ fontSize: '1.1rem' }}>⚡</span>
                                            Optické programy
                                        </Link>
                                        <Link
                                            to="/internet" search={{ tab: 'wifi' }}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                                padding: '0.75rem 1rem',
                                                color: 'var(--text-primary)',
                                                textDecoration: 'none',
                                                borderRadius: '12px',
                                                transition: 'background 0.2s',
                                                fontSize: '0.95rem'
                                            }}
                                            onMouseOver={e => (e.currentTarget.style.background = 'rgba(56,189,248,0.08)')}
                                            onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                                        >
                                            <span style={{ fontSize: '1.1rem' }}>📡</span>
                                            WiFi programy
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link to="/televizia" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} onMouseOver={e => (e.target as HTMLElement).style.color = 'var(--primary)'} onMouseOut={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>Televízia</Link>
                        <a href="/#pokrytie" onClick={handlePokrytieClick} style={{ color: 'var(--text-secondary)', textDecoration: 'none', cursor: 'pointer' }} onMouseOver={e => (e.target as HTMLElement).style.color = 'var(--primary)'} onMouseOut={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>Pokrytie</a>
                        <Link to="/kontakt" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} onMouseOver={e => (e.target as HTMLElement).style.color = 'var(--primary)'} onMouseOut={e => (e.target as HTMLElement).style.color = 'var(--text-secondary)'}>Kontakt</Link>

                        <a
                            href="http://klient.winet.sk"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary"
                            style={{
                                fontSize: '0.85rem',
                                padding: '0.5rem 1.2rem',
                                boxShadow: '0 4px 12px rgba(255,107,0,0.25)'
                            }}
                        >
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
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}>
                    {/* Internet sub-group */}
                    <div style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', padding: '0.75rem 0 0.25rem', opacity: 0.5 }}>
                        Internet
                    </div>
                    <Link to="/internet" search={{ tab: 'optika' }} onClick={() => setMobileMenuOpen(false)} style={{
                        color: 'var(--text-primary)', textDecoration: 'none', padding: '0.6rem 0 0.6rem 0.75rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        borderLeft: '2px solid var(--primary)'
                    }}>
                        <span>⚡</span> Optické programy
                    </Link>
                    <Link to="/internet" search={{ tab: 'wifi' }} onClick={() => setMobileMenuOpen(false)} style={{
                        color: 'var(--text-primary)', textDecoration: 'none', padding: '0.6rem 0 0.6rem 0.75rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        borderLeft: '2px solid #38BDF8'
                    }}>
                        <span>📡</span> WiFi programy
                    </Link>

                    <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '0.5rem 0' }} />

                    <Link to="/televizia" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '0.6rem 0' }}>Televízia</Link>
                    <a href="/#pokrytie" onClick={handlePokrytieClick} style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '0.6rem 0', cursor: 'pointer' }}>Pokrytie</a>
                    <Link to="/kontakt" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '0.6rem 0' }}>Kontakt</Link>

                    <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '0.5rem 0' }} />

                    <a href="http://klient.winet.sk" target="_blank" rel="noreferrer" style={{
                        color: 'white',
                        background: 'var(--primary)',
                        textDecoration: 'none',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        fontWeight: 700,
                        textAlign: 'center',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                    }}>
                        Klientska zóna <ChevronRight size={16} />
                    </a>
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
