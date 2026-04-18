import React, { useState } from 'react';

interface MapEmbedProps {
    src: string;
    title: string;
    height?: string;
}

const MapEmbed: React.FC<MapEmbedProps> = ({ src, title, height = '480px' }) => {
    // In the future, this state will be initialized by reading actual cookie preferences
    const [cookiesAccepted, setCookiesAccepted] = useState(true);

    if (!cookiesAccepted) {
        return (
            <div style={{
                width: '100%',
                height: height,
                background: 'var(--bg-surface-light)',
                border: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center',
                borderRadius: 'inherit' // Inherits from parent container usually 
            }}>
                <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                        <path d="M8.5 8.5v.01" />
                        <path d="M16 12.5v.01" />
                        <path d="M12 16v.01" />
                        <path d="M11 12v.01" />
                    </svg>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Externý obsah zablokovaný</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '400px' }}>
                    Pre prístup k tomuto obsahu (Google Maps), prosím, akceptujte súbory cookie pre externé služby.
                </p>
                <button
                    onClick={() => setCookiesAccepted(true)}
                    className="btn btn-primary"
                    style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}
                >
                    Akceptovať súbory cookie
                </button>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: height, position: 'relative', borderRadius: 'inherit', overflow: 'hidden' }}>
            <iframe
                title={title}
                src={src}
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default MapEmbed;
