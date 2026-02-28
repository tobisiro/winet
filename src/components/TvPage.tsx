import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Tv, Info, ExternalLink, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TvPage: React.FC = () => {
    useEffect(() => {
        // Embed the SledovanieTV plugin script just like on the original website
        const script = document.createElement('script');
        script.src = "https://plugin.sledovanietv.sk/plugin.js?id=m-plugin&partner=winet&lang=sk";
        script.id = "m-plugin-loader";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup on unmount
            const existingScript = document.getElementById('m-plugin-loader');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    return (
        <div style={{ background: 'var(--bg-surface-light)', minHeight: '100vh', color: 'var(--text-primary)' }}>
            <Navbar />

            {/* Header Section */}
            <div style={{
                paddingTop: '8rem',
                paddingBottom: '4rem',
                paddingLeft: '5vw',
                paddingRight: '5vw',
                background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.05) 0%, rgba(56, 189, 248, 0.05) 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'inline-flex',
                        background: 'rgba(255, 107, 0, 0.1)',
                        padding: '1rem',
                        borderRadius: '50%',
                        marginBottom: '2rem'
                    }}>
                        <Tv size={48} color="var(--primary)" />
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 800,
                        letterSpacing: '-2px',
                        color: 'var(--text-primary)',
                        marginBottom: '1.5rem'
                    }}>Digitálna Televízia</h1>

                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: 1.6,
                        marginBottom: '2rem'
                    }}>
                        Sledujte vaše obľúbené relácie, filmy a športové prenosy v najvyššej kvalite. Winet vám prináša modernú televíziu v spolupráci so SledovanieTV.
                    </p>

                    <a
                        href="http://sledovanietv.sk"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}
                    >
                        Prihlásiť sa na SledovanieTV <ExternalLink size={20} />
                    </a>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ padding: '4rem 5vw', position: 'relative' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>

                    {/* Important Info Alert */}
                    <div style={{
                        background: '#FFF4E5', // Light orange background for alert
                        border: '1px solid #FFD8A8',
                        borderLeft: '4px solid var(--primary)',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        marginBottom: '4rem',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
                            <div style={{ background: 'var(--primary)', padding: '0.6rem', borderRadius: '50%', marginTop: '0.2rem' }}>
                                <Info size={24} color="white" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem', color: '#B34700' }}>
                                    Dôležitá informácia k balíku Štart
                                </h3>
                                <p style={{ color: '#CC5200', lineHeight: 1.6 }}>
                                    Súčasťou balíka Štart sú aj televízne stanice skupín <strong>Markíza</strong> a <strong>JOJ</strong>.
                                    Z technických dôvodov nemusia byť tieto stanice zobrazené v zoznamoch kanálov nižšie,
                                    ich sledovanie je však v balíku plne pripravené a dostupné.
                                </p>
                            </div>
                        </div>

                        {/* Channel Grids */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {/* Markíza Group */}
                            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                    <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Skupina Markíza</h4>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                                    <img src="https://www.winet.sk/wp-content/uploads/loga/markiza.png" alt="Markíza" style={{ height: '30px', objectFit: 'contain' }} />
                                    <img src="https://www.winet.sk/wp-content/uploads/loga/dajto.png" alt="Dajto" style={{ height: '30px', objectFit: 'contain' }} />
                                    <img src="https://www.winet.sk/wp-content/uploads/loga/doma.png" alt="Doma" style={{ height: '30px', objectFit: 'contain' }} />
                                    <img src="https://www.winet.sk/wp-content/uploads/loga/markiza-krimi.png" alt="Markíza Krimi" style={{ height: '30px', objectFit: 'contain' }} />
                                    <img src="https://www.winet.sk/wp-content/uploads/loga/markiza-klasik.png" alt="Markíza Klasik" style={{ height: '30px', objectFit: 'contain' }} />
                                </div>
                            </div>

                            {/* JOJ Group */}
                            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                    <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Skupina JOJ</h4>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                                    <img src="https://www.winet.sk/wp-content/uploads/loga/joj.png" alt="JOJ" style={{ height: '30px', objectFit: 'contain' }} />
                                    <img src="https://www.winet.sk/wp-content/uploads/loga/joj-plus.png" alt="JOJ Plus" style={{ height: '30px', objectFit: 'contain' }} />
                                    <img src="https://www.winet.sk/wp-content/uploads/loga/wau.png" alt="WAU" style={{ height: '30px', objectFit: 'contain' }} />
                                    <img src="https://www.winet.sk/wp-content/uploads/loga/jojko.png" alt="Jojko" style={{ height: '30px', objectFit: 'contain' }} />
                                    <img src="https://www.winet.sk/wp-content/uploads/loga/joj-sport.png" alt="JOJ Šport" style={{ height: '30px', objectFit: 'contain' }} />
                                    <img src="https://www.winet.sk/wp-content/uploads/loga/joj-sport2.png" alt="JOJ Šport 2" style={{ height: '30px', objectFit: 'contain' }} />
                                    <img src="https://www.winet.sk/wp-content/uploads/loga/joj-svet.png" alt="JOJ Svet" style={{ height: '30px', objectFit: 'contain' }} />
                                    <img src="https://www.winet.sk/wp-content/uploads/loga/joj24.png" alt="JOJ 24" style={{ height: '30px', objectFit: 'contain' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Original SledovanieTV Packages Integration */}
                    <div style={{ marginTop: '2rem', marginBottom: '4rem' }}>
                        <div id="m-plugin"></div>
                    </div>

                    {/* SledovanieTV Integration Banner */}
                    <div style={{
                        background: '#FFFFFF',
                        border: '1px solid rgba(0,0,0,0.05)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                        borderRadius: '24px',
                        padding: '3rem',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2rem'
                    }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                            <PlayCircle size={40} color="#0ea5e9" />
                            <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Portál SledovanieTV</h2>
                        </div>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.6 }}>
                            Pre prístup k vašim televíznym kanálom, archívu a nahrávkam prosím prejdite na portál nášho partnera SledovanieTV.sk.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
                            <a
                                href="http://sledovanietv.sk"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-primary"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}
                            >
                                Prejsť na SledovanieTV <ExternalLink size={20} />
                            </a>
                            <Link
                                to="/"
                                className="btn btn-outline"
                                style={{ display: 'flex', alignItems: 'center', padding: '1rem 2rem', fontSize: '1.1rem' }}
                            >
                                Zobraziť ponuku služieb
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <div style={{
                padding: '3rem 5vw',
                background: '#FFFFFF',
                borderTop: '1px solid rgba(0,0,0,0.05)',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem'
            }}>
                © {new Date().getFullYear()} WI-NET s.r.o. Všetky práva vyhradené. Vytvorené pre maximálnu rýchlosť a stabilitu.
            </div>
        </div>
    );
};

export default TvPage;
