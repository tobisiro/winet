import { useSearchParams } from 'react-router-dom';
import Navbar from './Navbar';
import PricingSection from './PricingSection';
import FloatingContact from './FloatingContact';
import Footer from './Footer';
import { Wifi, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InternetPage() {
    const [searchParams] = useSearchParams();
    const tabParam = searchParams.get('tab');
    const defaultTab: 'optika' | 'wifi' = tabParam === 'wifi' ? 'wifi' : 'optika';

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                {/* Hero Header */}
                <section style={{
                    padding: '4rem 5vw 3rem',
                    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Decorative blurs */}
                    <div style={{
                        position: 'absolute', top: '-100px', right: '-100px',
                        width: '300px', height: '300px',
                        background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)',
                        borderRadius: '50%', pointerEvents: 'none'
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '-80px', left: '-80px',
                        width: '250px', height: '250px',
                        background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)',
                        borderRadius: '50%', pointerEvents: 'none'
                    }} />

                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ maxWidth: '700px' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.4rem 1rem',
                                background: 'rgba(255,107,0,0.15)',
                                color: 'var(--primary)',
                                borderRadius: '99px',
                                fontWeight: 700, fontSize: '0.85rem',
                                marginBottom: '1.5rem',
                                border: '1px solid rgba(255,107,0,0.3)',
                                textTransform: 'uppercase', letterSpacing: '1px'
                            }}>
                                {defaultTab === 'wifi' ? <Wifi size={16} /> : <Zap size={16} />}
                                {defaultTab === 'wifi' ? 'WiFi Internet' : 'Optický Internet'}
                            </div>

                            <h1 style={{
                                fontSize: 'clamp(2rem, 5vw, 3rem)',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                marginBottom: '1.2rem',
                                letterSpacing: '-1px'
                            }}>
                                {defaultTab === 'wifi'
                                    ? <>Spoľahlivé WiFi<br />pripojenie</>
                                    : <>Bleskový optický<br />internet</>
                                }
                            </h1>

                            <p style={{
                                fontSize: '1.1rem',
                                color: '#94A3B8',
                                lineHeight: 1.6,
                                marginBottom: '2rem'
                            }}>
                                {defaultTab === 'wifi'
                                    ? 'Kde nevedie optika, tam je naše strategické pokrytie WiFi internetu. Výkonné vysielače vo vašom regióne doručujú spoľahlivé spojenie.'
                                    : 'Poskytujeme najmodernejšie FTTH optické pripojenie priamo do vašej domácnosti s masívnymi prenosovými rýchlosťami a nulovým oneskorením.'
                                }
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <Link to="/kontakt" className="btn btn-primary" style={{ boxShadow: '0 10px 20px rgba(255,107,0,0.3)' }}>
                                    Mám záujem <ChevronRight size={20} />
                                </Link>
                                <Link to="/#pokrytie" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
                                    Overiť pokrytie
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section with pre-selected tab */}
                <PricingSection key={defaultTab} defaultTab={defaultTab} />
            </div>
            <Footer />
            <FloatingContact />
        </>
    );
}
