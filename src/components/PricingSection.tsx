import React, { useState } from 'react';
import PricingCard from './PricingCard';

const OPTIKA_PLANS = [
    {
        title: 'OPTIK Start',
        downloadSpeed: '100 Mbit/s',
        uploadSpeed: '20 Mbit/s',
        priceMesačneViazanost: '14,24€',
        priceMesačneBezViazanosti: '16,30€',
        montazViazanost: '100€ (alebo 4,20€ mesačne)',
        montazBezViazanosti: '180€',
        features: [
            'Pri montáži je zväčša potrebné zakúpiť optický prevodník. Viď cenník.',
            'Cena počas celej doby viazanosti sa nenavyšuje.',
            'Stabilné optické pripojenie.',
            'Možnosť dokúpenia TV balíku už od 8,50 € mesačne, prvý mesiac zadarmo.'
        ]
    },
    {
        title: 'OPTIK Klasik',
        downloadSpeed: '200 Mbit/s',
        uploadSpeed: '40 Mbit/s',
        priceMesačneViazanost: '16,30€',
        priceMesačneBezViazanosti: '19,37€',
        montazViazanost: '50€ (alebo 2,20€ mesačne)',
        montazBezViazanosti: '140€',
        isPopular: true,
        features: [
            'Pri montáži je zväčša potrebné zakúpiť optický prevodník. Viď cenník.',
            'Cena počas celej doby viazanosti sa nenavyšuje.',
            'Stabilné optické pripojenie.',
            'Možnosť dokúpenia TV balíku už od 8,50 € mesačne, prvý mesiac zadarmo.'
        ]
    },
    {
        title: 'OPTIK Profi',
        downloadSpeed: '300 Mbit/s',
        uploadSpeed: '50 Mbit/s',
        priceMesačneViazanost: '19,37€',
        priceMesačneBezViazanosti: '22,45€',
        montazViazanost: 'zadarmo',
        montazBezViazanosti: '120€',
        features: [
            'Pri montáži je zväčša potrebné zakúpiť optický prevodník. Viď cenník.',
            'Cena počas celej doby viazanosti sa nenavyšuje.',
            'Stabilné optické pripojenie.',
            'Možnosť dokúpenia TV balíku už od 8,50 € mesačne, prvý mesiac zadarmo.'
        ]
    }
];

const WIFI_PLANS = [
    {
        title: 'AC Standard',
        downloadSpeed: '15 - 18 Mbit/s',
        uploadSpeed: '4 Mbit/s',
        priceMesačneViazanost: '12,30€',
        priceMesačneBezViazanosti: '13,84€',
        montazViazanost: '25€ (s IPTV len 5€)',
        montazBezViazanosti: '35€',
        features: [
            'Pri montáži je potrebné zakúpiť aj anténu (od 89€).',
            'Možnosť dokúpenia TV balíku už od 8,50 € mesačne.'
        ]
    },
    {
        title: 'AC Profi',
        downloadSpeed: '20 - 25 Mbit/s',
        uploadSpeed: '5 Mbit/s',
        priceMesačneViazanost: '17,43€',
        priceMesačneBezViazanosti: '18,97€',
        montazViazanost: '15€ (s IPTV len 1€)',
        montazBezViazanosti: '35€',
        isPopular: true,
        features: [
            'Pri montáži je potrebné zakúpiť aj anténu (od 89€).',
            'Možnosť dokúpenia TV balíku už od 8,50 € mesačne.'
        ]
    },
    {
        title: 'AC Maxi',
        downloadSpeed: '25 - 33 Mbit/s',
        uploadSpeed: '6 Mbit/s',
        priceMesačneViazanost: '22,55€',
        priceMesačneBezViazanosti: '24,08€',
        montazViazanost: 'zadarmo',
        montazBezViazanosti: '35€',
        features: [
            'Pri montáži je potrebné zakúpiť aj anténu (od 89€).',
            'Možnosť dokúpenia TV balíku už od 8,50 € mesačne.'
        ]
    }
];

const PricingSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'optika' | 'wifi'>('optika');
    const [withViazanost, setWithViazanost] = useState<boolean>(true);

    const currentPlans = activeTab === 'optika' ? OPTIKA_PLANS : WIFI_PLANS;

    return (
        <section id="cennik" className="section-padding" style={{ background: 'var(--bg-dark)', position: 'relative' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1rem', color: 'var(--text-primary)' }}>Nekompromisné domáce pripojenie</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Vyberte si spomedzi našich najvýhodnejších balíkov. Či už je to stabilná optika alebo flexibilná wifi technológia.
                    </p>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginBottom: '4rem' }}>

                    {/* Tech Toggle */}
                    <div style={{
                        display: 'inline-flex',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '0.4rem',
                        borderRadius: '99px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <button
                            onClick={() => setActiveTab('optika')}
                            style={{
                                padding: '0.8rem 2rem',
                                borderRadius: '99px',
                                background: activeTab === 'optika' ? 'var(--primary)' : 'transparent',
                                color: activeTab === 'optika' ? 'white' : 'var(--text-secondary)',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Optický internet
                        </button>
                        <button
                            onClick={() => setActiveTab('wifi')}
                            style={{
                                padding: '0.8rem 2rem',
                                borderRadius: '99px',
                                background: activeTab === 'wifi' ? 'var(--primary)' : 'transparent',
                                color: activeTab === 'wifi' ? 'white' : 'var(--text-secondary)',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Wifi internet
                        </button>
                    </div>

                    {/* Viazanost Switch */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-primary)' }}>
                        <span style={{ opacity: withViazanost ? 0.5 : 1, fontWeight: 500 }}>Bez viazanosti</span>
                        <button
                            onClick={() => setWithViazanost(!withViazanost)}
                            style={{
                                width: '60px',
                                height: '32px',
                                background: withViazanost ? 'var(--primary)' : '#94A3B8', // Changed to visible slate color
                                borderRadius: '32px',
                                border: 'none',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'background 0.3s'
                            }}
                        >
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '4px',
                                left: withViazanost ? '32px' : '4px',
                                transition: 'left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }} />
                        </button>
                        <span style={{ opacity: withViazanost ? 1 : 0.5, fontWeight: 500 }}>Viazanosť 24 mesiacov</span>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="pricing-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {currentPlans.map((plan, index) => (
                        <PricingCard
                            key={`${activeTab}-${index}`}
                            {...plan}
                            isWifi={activeTab === 'wifi'}
                            withViazanost={withViazanost}
                        />
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Všetky uvedené ceny sú vrátane DPH.</p>
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href="http://winet.sk/upload/dokumenty/cennik-optika.pdf" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Stiahnuť cenník Optika (PDF)</a>
                        <a href="http://winet.sk/upload/dokumenty/cennik-wifi.pdf" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Stiahnuť cenník Wifi (PDF)</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
