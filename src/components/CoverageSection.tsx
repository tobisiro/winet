import React from 'react';
import { Map, MapPin } from 'lucide-react';
import MapEmbed from './MapEmbed';

const CoverageSection: React.FC = () => {
    return (
        <section id="pokrytie" style={{
            position: 'relative',
            padding: '8rem 5vw',
            display: 'flex',
            overflow: 'hidden',
            background: 'var(--bg-surface-light)'
        }}>

            {/* Abstract Map Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.05,
                pointerEvents: 'none',
                backgroundImage: 'radial-gradient(circle at 20% 50%, var(--primary) 0%, transparent 50%), radial-gradient(circle at 80% 50%, #38BDF8 0%, transparent 50%)',
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: '4rem'
                }}>
                    <div style={{
                        background: 'rgba(255, 107, 0, 0.1)',
                        color: 'var(--primary)',
                        padding: '1rem',
                        borderRadius: '24px',
                        marginBottom: '1.5rem'
                    }}>
                        <Map size={40} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Pokrytie našej siete</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>
                        Neustále rozširujeme našu infraštruktúru, aby ste mali prístup k bleskovému internetu všade tam, kde ho potrebujete.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '32px',
                    padding: '3rem',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin color="var(--primary)" size={24} />
                            Optický Internet
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                            Optické pripojenie prinášame priamo do bytových aj rodinných domov. Sme stabilným poskytovateľom gigabitových rýchlostí v našom regióne s masívnou chrbticovou optickou sieťou.
                        </p>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin color="#38BDF8" size={24} />
                            Wifi 5Ghz AC
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                            Tam, kde ešte nevedie optika, poskytujeme spoľahlivé bezdrôtové spojenie. Pokrývame viac ako <strong>150 obcí</strong> s výbornou stabilitou nezávisle od počasia.
                        </p>
                    </div>
                </div>

            </div>

            {/* Embedded Interactive Coverage Map */}
            <div style={{
                marginTop: '4rem',
                width: '100%',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '32px',
                padding: '1rem',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
                <MapEmbed
                    title="Mapa pokrytia Winet"
                    src="https://www.google.com/maps/d/embed?mid=150P_SW2nfd7JrA3ZaZEdlZVpOhxW-O-X&ehbc=2E312F"
                    height="600px"
                />
            </div>
        </section>
    );
};

export default CoverageSection;
