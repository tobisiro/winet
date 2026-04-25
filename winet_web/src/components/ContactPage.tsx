import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import { MapPin, Phone, Building2, Clock } from 'lucide-react';
import MapEmbed from './MapEmbed';

const PageContainer = styled.div`
  background: var(--bg-surface-light);
  min-height: 100vh;
  color: var(--text-primary);
`;

const ContentWrapper = styled.div`
  padding-top: 8rem;
  padding-bottom: 4rem;
  padding-left: 5vw;
  padding-right: 5vw;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  letter-spacing: -2px;
  color: var(--text-primary);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ContactCard = styled.div<{ $noPadding?: boolean }>`
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  border-radius: 24px;
  padding: ${props => props.$noPadding ? '0' : '2.5rem'};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: hidden;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Label = styled.p`
  color: var(--text-secondary);
  margin-bottom: 0.2rem;
  font-size: 0.9rem;
`;

const InfoText = styled.p<{ $bold?: boolean; $large?: boolean }>`
  font-size: ${props => props.$large ? '1.2rem' : '1rem'};
  font-weight: ${props => props.$bold ? '600' : '400'};
  margin-bottom: 0.4rem;
`;

const FooterBox = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(0,0,0,0.05);
`;

const ContactPage: React.FC = () => {
    return (
        <PageContainer>
            <Navbar />
            <ContentWrapper>
                <Container>
                    <Header>
                        <Title>Kontaktujte nás</Title>
                        <Subtitle>
                            Sme tu pre Vás. Či už hľadáte spoľahlivý internet, potrebujete pomoc, alebo sa chcete na niečo opýtať.
                        </Subtitle>
                    </Header>

                    <Grid>
                        {/* Box 1: Kontaktné údaje */}
                        <ContactCard>
                            <CardTitle>
                                <Phone size={24} color="var(--primary)" /> Spojte sa s nami
                            </CardTitle>
                            <div>
                                <Label>Telefón</Label>
                                <InfoText $large $bold>054 / 321 18 80</InfoText>
                                <InfoText style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Zo zahraničia: +421 54 321 18 80</InfoText>
                            </div>
                            <div>
                                <Label>Emailové oddelenia</Label>
                                <InfoText><strong>Všeobecné:</strong> internet@winet.sk</InfoText>
                                <InfoText><strong>Technické:</strong> technicke@winet.sk</InfoText>
                                <InfoText><strong>Ekonomické:</strong> ekonomicke@winet.sk</InfoText>
                                <InfoText style={{ marginBottom: 0 }}><strong>Reklamácie:</strong> reklamacie@wi-net.sk</InfoText>
                            </div>
                            <FooterBox>
                                <Label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={16} /> Zákaznícka linka a SMS podpora
                                </Label>
                                <InfoText style={{ marginBottom: '0.5rem' }}>Po - Pia: 8:00 - 16:00</InfoText>
                                <InfoText style={{ fontSize: '0.95rem', marginBottom: 0 }}><strong>SMS na poruchy (mimo prac. hodín):</strong><br /> 0948 409 609</InfoText>
                            </FooterBox>
                        </ContactCard>

                        {/* Box 2: Firemné údaje */}
                        <ContactCard>
                            <CardTitle>
                                <Building2 size={24} color="var(--primary)" /> Fakturačné údaje
                            </CardTitle>
                            <div>
                                <InfoText $large $bold style={{ marginBottom: '0.5rem' }}>WI-NET s.r.o.</InfoText>
                                <InfoText style={{ color: 'var(--text-secondary)' }}>Hlavná 8/18</InfoText>
                                <InfoText style={{ color: 'var(--text-secondary)' }}>086 41 Raslavice</InfoText>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                                <div>
                                    <Label>IČO</Label>
                                    <InfoText style={{ marginBottom: 0 }}>46 047 881</InfoText>
                                </div>
                                <div>
                                    <Label>DIČ</Label>
                                    <InfoText style={{ marginBottom: 0 }}>2023223062</InfoText>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <Label>IČ DPH</Label>
                                    <InfoText style={{ marginBottom: 0 }}>SK2023223062</InfoText>
                                </div>
                            </div>
                        </ContactCard>

                        {/* Box 3: Mapa / Adresa */}
                        <ContactCard $noPadding>
                            <div style={{ padding: '2.5rem' }}>
                                <CardTitle style={{ marginBottom: '0.5rem' }}>
                                    <MapPin size={24} color="var(--primary)" /> Nájdete nás tu
                                </CardTitle>
                                <p style={{ color: 'var(--text-secondary)' }}>Sme stabilným operátorom pre východné Slovensko so sídlom v Raslaviciach.</p>
                            </div>
                            <div style={{ flex: 1, position: 'relative', minHeight: '350px' }}>
                                <MapEmbed
                                    title="Mapa Winet Kontakt"
                                    src="https://www.google.com/maps/d/embed?mid=1z6NS47nRtqIrWriAD91iU3RFSZVpzgBF&ehbc=2E312F"
                                    height="100%"
                                />
                            </div>
                        </ContactCard>
                    </Grid>
                </Container>
            </ContentWrapper>
            <Footer />
        </PageContainer>
    );
};

export default ContactPage;
