import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
    title: string;
    icon: React.ReactNode;
    speed: string;
    description: string;
    features: string[];
}

export default function ServiceCard({ title, icon, speed, description, features }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="glass"
            style={{
                padding: '2rem',
                borderRadius: '16px',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: isHovered ? 'translateY(-10px)' : 'none',
                boxShadow: isHovered ? '0 20px 40px rgba(255, 107, 0, 0.1)' : 'none',
                border: isHovered ? '1px solid rgba(255, 107, 0, 0.3)' : '1px solid var(--glass-border)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'var(--primary)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                opacity: isHovered ? 0.4 : 0.1,
                transition: 'opacity 0.5s ease',
                zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: 'rgba(255, 107, 0, 0.1)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease'
                }}>
                    {icon}
                </div>

                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{title}</h3>
                {speed && (
                    <div style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem', fontSize: '1.1rem' }}>
                        {speed}
                    </div>
                )}

                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                    {description}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                    {features.map((feature, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <div style={{ color: 'var(--primary)', marginTop: '2px' }}>✓</div>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <a href="#" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: isHovered ? 'var(--primary)' : 'var(--text-primary)',
                    fontWeight: 600,
                    marginTop: 'auto'
                }}>
                    Viac informácií
                    <ArrowRight size={18} style={{ transform: isHovered ? 'translateX(5px)' : 'none', transition: 'transform 0.3s' }} />
                </a>
            </div>
        </div>
    );
}
