import React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'altcha-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 
                challenge?: string;
                challengeurl?: string; 
            };
        }
    }
}
