import React, { useState } from 'react';
import styled from 'styled-components';
import PricingCard from './PricingCard';

const Section = styled.section`
    background: var(--bg-dark);
    position: relative;
    padding: 6rem 0;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 4rem;
`;

const Title = styled.h2`
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    margin-bottom: 1rem;
    color: var(--text-primary);
`;

const Subtitle = styled.p`
    color: var(--text-secondary);
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
`;

const ControlsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-bottom: 4rem;
`;

const TechToggleContainer = styled.div`
    display: inline-flex;
    background: rgba(0, 0, 0, 0.03);
    padding: 0.4rem;
    border-radius: 99px;
    border: 1px solid rgba(0, 0, 0, 0.05);
`;

const TechButton = styled.button<{ $active: boolean }>`
    padding: 0.8rem 2rem;
    border-radius: 99px;
    background: ${props => props.$active ? 'var(--primary)' : 'transparent'};
    color: ${props => props.$active ? 'white' : 'var(--text-secondary)'};
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    @media (max-width: 480px) {
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
    }
`;

const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--text-primary);
    flex-wrap: nowrap;
`;

const SwitchLabel = styled.span<{ $active: boolean }>`
    opacity: ${props => props.$active ? 1 : 0.5};
    font-weight: 500;
    white-space: nowrap;
    font-size: 0.95rem;

    @media (max-width: 480px) {
        font-size: 0.85rem;
    }
`;

const ToggleButton = styled.button<{ $withViazanost: boolean }>`
    width: 60px;
    height: 32px;
    background: ${props => props.$withViazanost ? 'var(--primary)' : '#94A3B8'};
    border-radius: 32px;
    border: none;
    position: relative;
    cursor: pointer;
    transition: background 0.3s;
    flex-shrink: 0;
`;

const ToggleCircle = styled.div<{ $withViazanost: boolean }>`
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 4px;
    left: ${props => props.$withViazanost ? '32px' : '4px'};
    transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`;

const FooterContainer = styled.div`
    text-align: center;
    margin-top: 3rem;
`;

const FooterNote = styled.p`
    color: var(--text-secondary);
    font-size: 0.9rem;
`;

const FooterLinks = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
`;

const FooterLink = styled.a`
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: var(--transition-smooth);

    &:hover {
        color: var(--primary-hover);
        text-decoration: underline;
    }
`;

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

const PricingSection: React.FC<{ defaultTab?: 'optika' | 'wifi' }> = ({ defaultTab = 'optika' }) => {
    const [activeTab, setActiveTab] = useState<'optika' | 'wifi'>(defaultTab);
    const [withViazanost, setWithViazanost] = useState<boolean>(true);

    const currentPlans = activeTab === 'optika' ? OPTIKA_PLANS : WIFI_PLANS;

    return (
        <Section id="cennik">
            <div className="container">
                <Header>
                    <Title>Nekompromisné domáce pripojenie</Title>
                    <Subtitle>
                        Vyberte si spomedzi našich najvýhodnejších balíkov. Či už je to stabilná optika alebo flexibilná wifi technológia.
                    </Subtitle>
                </Header>

                <ControlsContainer>
                    <TechToggleContainer>
                        <TechButton 
                            $active={activeTab === 'optika'} 
                            onClick={() => setActiveTab('optika')}
                        >
                            Optický internet
                        </TechButton>
                        <TechButton 
                            $active={activeTab === 'wifi'} 
                            onClick={() => setActiveTab('wifi')}
                        >
                            Wifi internet
                        </TechButton>
                    </TechToggleContainer>

                    <SwitchContainer>
                        <SwitchLabel $active={!withViazanost}>Bez viazanosti</SwitchLabel>
                        <ToggleButton 
                            $withViazanost={withViazanost} 
                            onClick={() => setWithViazanost(!withViazanost)}
                        >
                            <ToggleCircle $withViazanost={withViazanost} />
                        </ToggleButton>
                        <SwitchLabel $active={withViazanost}>Viazanosť 24 mesiacov</SwitchLabel>
                    </SwitchContainer>
                </ControlsContainer>

                <Grid className="pricing-grid">
                    {currentPlans.map((plan, index) => (
                        <PricingCard
                            key={`${activeTab}-${index}`}
                            {...plan}
                            isWifi={activeTab === 'wifi'}
                            withViazanost={withViazanost}
                        />
                    ))}
                </Grid>

                <FooterContainer>
                    <FooterNote>Všetky uvedené ceny sú vrátane DPH.</FooterNote>
                    <FooterLinks>
                        <FooterLink href="http://winet.sk/upload/dokumenty/cennik-optika.pdf" target="_blank" rel="noreferrer">
                            Stiahnuť cenník Optika (PDF)
                        </FooterLink>
                        <FooterLink href="http://winet.sk/upload/dokumenty/cennik-wifi.pdf" target="_blank" rel="noreferrer">
                            Stiahnuť cenník Wifi (PDF)
                        </FooterLink>
                    </FooterLinks>
                </FooterContainer>
            </div>
        </Section>
    );
};

export default PricingSection;
