import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { MapPin, Phone, Building2, Clock } from 'lucide-react';
import MapEmbed from './MapEmbed';

const ContactPage: React.FC = () => {
    return (
        <div style={{ background: 'var(--bg-surface-light)', minHeight: '100vh', color: 'var(--text-primary)' }}>
            <Navbar />
            <div style={{ paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '5vw', paddingRight: '5vw' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            letterSpacing: '-2px',
                            color: 'var(--text-primary)',
                            marginBottom: '1rem'
                        }}>Kontaktujte nás</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            Sme tu pre Vás. Či už hľadáte spoľahlivý internet, potrebujete pomoc, alebo sa chcete na niečo opýtať.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {/* Box 1: Kontaktné údaje */}
                        <div style={{
                            background: '#FFFFFF',
                            border: '1px solid rgba(0,0,0,0.05)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Phone size={24} color="#0ea5e9" /> Spojte sa s nami
                            </h3>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.2rem', fontSize: '0.9rem' }}>Telefón</p>
                                <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>054 / 321 18 80</p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Zo zahraničia: +421 54 321 18 80</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.2rem', fontSize: '0.9rem' }}>Emailové oddelenia</p>
                                <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}><strong>Všeobecné:</strong> internet@winet.sk</p>
                                <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}><strong>Technické:</strong> technicke@winet.sk</p>
                                <p style={{ fontSize: '1rem', marginBottom: '0.4rem' }}><strong>Ekonomické:</strong> ekonomicke@winet.sk</p>
                                <p style={{ fontSize: '1rem' }}><strong>Reklamácie:</strong> reklamacie@wi-net.sk</p>
                            </div>
                            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={16} /> Zákaznícka linka a SMS podpora
                                </p>
                                <p style={{ marginBottom: '0.5rem' }}>Po - Pia: 8:00 - 16:00</p>
                                <p style={{ fontSize: '0.95rem' }}><strong>SMS na poruchy (mimo prac. hodín):</strong><br /> 0948 409 609</p>
                            </div>
                        </div>

                        {/* Box 2: Firemné údaje */}
                        <div style={{
                            background: '#FFFFFF',
                            border: '1px solid rgba(0,0,0,0.05)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Building2 size={24} color="#f97316" /> Fakturačné údaje
                            </h3>
                            <div>
                                <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>WI-NET s.r.o.</p>
                                <p style={{ color: 'var(--text-secondary)' }}>Hlavná 8/18</p>
                                <p style={{ color: 'var(--text-secondary)' }}>086 41 Raslavice</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>IČO</p>
                                    <p>46 047 881</p>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>DIČ</p>
                                    <p>2023223062</p>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>IČ DPH</p>
                                    <p>SK2023223062</p>
                                </div>
                            </div>
                        </div>

                        {/* Box 3: Mapa / Adresa */}
                        <div style={{
                            background: '#FFFFFF',
                            border: '1px solid rgba(0,0,0,0.05)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ padding: '2.5rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                                    <MapPin size={24} color="#10b981" /> Nájdete nás tu
                                </h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Sme stabilným operátorom pre východné Slovensko so sídlom v Raslaviciach.</p>
                            </div>
                            {/* Map component with Cookie Consent Placeholder */}
                            <div style={{ flex: 1, position: 'relative', minHeight: '350px' }}>
                                <MapEmbed
                                    title="Mapa Winet Kontakt"
                                    src="https://www.google.com/maps/d/embed?mid=1z6NS47nRtqIrWriAD91iU3RFSZVpzgBF&ehbc=2E312F"
                                    height="100%"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactPage;
