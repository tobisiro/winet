import React from 'react';
import styled from 'styled-components';
import { Check, Info } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface PricingCardProps {
  title: string;
  priceMesačneViazanost: string;
  priceMesačneBezViazanosti: string;
  downloadSpeed: string;
  uploadSpeed: string;
  montazViazanost: string;
  montazBezViazanosti: string;
  features: string[];
  isWifi: boolean;
  withViazanost: boolean; 
  isPopular?: boolean;
}

const Card = styled.div<{ $isPopular?: boolean }>`
  background: ${props => props.$isPopular ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)'};
  backdrop-filter: blur(10px);
  border: ${props => props.$isPopular ? '2px solid rgba(255, 107, 0, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)'};
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transform: ${props => props.$isPopular ? 'scale(1.05)' : 'scale(1)'};
  z-index: ${props => props.$isPopular ? 10 : 1};
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
  box-shadow: ${props => props.$isPopular ? '0 30px 60px rgba(0,0,0,0.3)' : 'none'};
  cursor: default;

  &:hover {
    transform: ${props => props.$isPopular ? 'scale(1.08) translateY(-5px)' : 'scale(1) translateY(-5px)'};
    box-shadow: ${props => props.$isPopular ? '0 40px 80px rgba(255, 107, 0, 0.2)' : '0 20px 40px rgba(0,0,0,0.2)'};
  }

  @media (max-width: 768px) {
    transform: scale(1) !important;
    padding: 1.5rem;
  }
`;

const DecorativeBlur = styled.div<{ $isWifi: boolean }>`
  position: absolute;
  top: -50px;
  right: -50px;
  width: 100px;
  height: 100px;
  background: ${props => props.$isWifi ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 107, 0, 0.2)'};
  filter: blur(40px);
  borderRadius: 50%;
  zIndex: 0;
`;

const PopularBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
  color: #000;
  font-weight: 800;
  font-size: 0.75rem;
  padding: 0.4rem 1.5rem;
  border-bottom-left-radius: 24px;
  box-shadow: 0 5px 15px rgba(255,107,0,0.4);
  letter-spacing: 1px;
  text-transform: uppercase;
  z-index: 2;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
  margin-bottom: 2rem;
`;

const PriceText = styled.span`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
`;

const PriceSuffix = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const SpeedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
`;

const SpeedLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.3rem;
`;

const SpeedValue = styled.div`
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
`;

const FeaturesContainer = styled.div`
  margin-bottom: 2rem;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const InfoText = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const FeatureText = styled.span`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.4;
`;

const OrderButton = styled(Link)<{ $isPopular?: boolean }>`
  display: block;
  width: 100%;
  padding: 1rem;
  textAlign: center;
  background: ${props => props.$isPopular ? 'linear-gradient(90deg, var(--primary) 0%, #ff8c00 100%)' : 'transparent'};
  color: ${props => props.$isPopular ? 'white' : 'var(--primary)'};
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  border: ${props => props.$isPopular ? 'none' : '2px solid var(--primary)'};
  transition: all 0.2s ease;

  &:hover {
    filter: ${props => props.$isPopular ? 'brightness(1.1)' : 'none'};
    box-shadow: ${props => props.$isPopular ? '0 10px 20px rgba(255,107,0,0.3)' : 'none'};
    background: ${props => props.$isPopular ? '' : 'rgba(255, 107, 0, 0.1)'};
  }
`;

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  priceMesačneViazanost,
  priceMesačneBezViazanosti,
  downloadSpeed,
  uploadSpeed,
  montazViazanost,
  montazBezViazanosti,
  features,
  isWifi,
  withViazanost,
  isPopular,
}) => {
  const currentPrice = withViazanost ? priceMesačneViazanost : priceMesačneBezViazanosti;
  const currentMontaz = withViazanost ? montazViazanost : montazBezViazanosti;

  return (
    <Card $isPopular={isPopular}>
      <DecorativeBlur $isWifi={isWifi} />

      {isPopular && <PopularBadge>Najpredávanejší</PopularBadge>}

      <Content>
        <CardTitle>{title}</CardTitle>

        <PriceWrapper>
          <PriceText>{currentPrice}</PriceText>
          <PriceSuffix>/ mesačne</PriceSuffix>
        </PriceWrapper>

        <SpeedGrid>
          <div>
            <SpeedLabel>Sťahovanie</SpeedLabel>
            <SpeedValue>{downloadSpeed}</SpeedValue>
          </div>
          <div>
            <SpeedLabel>Odosielanie</SpeedLabel>
            <SpeedValue>{uploadSpeed}</SpeedValue>
          </div>
        </SpeedGrid>

        <FeaturesContainer>
          <InfoBox>
            <Info size={16} color="var(--primary)" />
            <InfoText>Cena montáže: <strong style={{ color: 'var(--text-primary)' }}>{currentMontaz}</strong></InfoText>
          </InfoBox>

          <FeaturesList>
            {features.map((feature, idx) => (
              <FeatureItem key={idx}>
                <Check size={18} color="var(--primary)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <FeatureText>{feature}</FeatureText>
              </FeatureItem>
            ))}
          </FeaturesList>
        </FeaturesContainer>

        <div style={{ marginTop: 'auto' }}>
          <OrderButton to="/kontakt" $isPopular={isPopular}>
            Objednať
          </OrderButton>
        </div>
      </Content>
    </Card>
  );
};

export default PricingCard;
