import React from 'react';
import { Link } from 'react-router-dom';

const getBaseUrl = () => {
    const base = import.meta.env.BASE_URL || '/';
    return base.endsWith('/') ? base : `${base}/`;
};

const Footer: React.FC = () => {
    return (
        <>
            <footer className="section-padding" style={{ background: '#0F172A', borderTop: '1px solid var(--glass-border)', color: 'var(--text-inverted)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                            <img src={`${getBaseUrl()}logo.png`} alt="WI-NET" style={{ height: '32px', filter: 'brightness(1.5)' }} />
                        </div>
                        <p style={{ color: '#94A3B8', marginBottom: '1rem' }}>
                            WI-NET s.r.o.<br />
                            Hlavná 8/18<br />
                            086 41 Raslavice
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', opacity: 0.8 }}>
                            <span style={{ fontSize: '0.8rem', color: '#CBD5E1', fontWeight: 500, letterSpacing: '0.5px' }}>ČLEN SKUPINY</span>
                            <img src={`${getBaseUrl()}logo-swan.png`} alt="SWAN" style={{ height: '36px', filter: 'brightness(1.5)' }} />
                        </div>
                        <p style={{ color: '#94A3B8' }}>
                            <strong>Tel:</strong> <a href="tel:0543211880" style={{ color: 'var(--primary)' }}>054 321 18 80</a><br />
                            <strong>Email:</strong> <a href="mailto:internet@wi-net.sk" style={{ color: 'var(--primary)' }}>internet@wi-net.sk</a>
                        </p>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-inverted)' }}>Dokumenty</h4>
                        <ul style={{ listStyle: 'none', padding: 0, gap: '0.8rem', display: 'flex', flexDirection: 'column' }}>
                            <li><Link to="/o-nas" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>O nás</Link></li>
                            <li><a href="http://winet.sk/kontaktne-informacie/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Kontaktné informácie</a></li>
                            <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Kariéra</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 600 }}>Dokumenty</h4>
                        <ul style={{ listStyle: 'none', padding: 0, gap: '0.8rem', display: 'flex', flexDirection: 'column' }}>
                            <li><a href={`${getBaseUrl()}dokumenty/cennik-optika.pdf`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cenník Optika</a></li>
                            <li><a href={`${getBaseUrl()}dokumenty/cennik-wifi.pdf`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cenník Wifi</a></li>
                            <li><a href={`${getBaseUrl()}dokumenty/VZP_WI-NET.pdf`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Všeobecné zmluvné podmienky</a></li>
                            <li><a href={`${getBaseUrl()}dokumenty/transparentnost.pdf`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Transparentnosť</a></li>
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
            </footer>
            <style dangerouslySetInnerHTML={{
                __html: `
            footer a { transition: color 0.2s; }
            footer a:hover { color: var(--swan) !important; }
        `}} />
        </>
    );
};

export default Footer;
