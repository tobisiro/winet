const fs = require('fs');

const files = [
    'src/three/components/DataPulse.tsx',
    'src/three/components/TransmitterTower.tsx',
    'src/three/components/UtilityPole.tsx',
    'src/three/components/WirelessPulse.tsx',
    'src/three/home/AdminBuilding.tsx',
    'src/three/home/FloatingIsland.tsx',
    'src/three/home/Home3D.tsx',
    'src/three/home/ModernHouse.tsx'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/import React(?:, \{[^}]+\})? from 'react';\n?/g, (match) => {
            if (match.includes('{')) {
                return match.replace(/React, /, '');
            }
            return '';
        });
        content = content.replace(/import \{ ReactNode \} from 'react';/g, "import type { ReactNode } from 'react';");
        fs.writeFileSync(file, content);
    }
});

// Fix Navbar Links
let nav = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
nav = nav.replace(/to="\/internet\?tab=optika"/g, `to="/internet" search={{ tab: 'optika' }}`);
nav = nav.replace(/to="\/internet\?tab=wifi"/g, `to="/internet" search={{ tab: 'wifi' }}`);
fs.writeFileSync('src/components/layout/Navbar.tsx', nav);

// Fix InternetPage Link
let intP = fs.readFileSync('src/components/ui/InternetPage.tsx', 'utf8');
intP = intP.replace(/to="\/#pokrytie"/g, `to="/" hash="pokrytie"`);
fs.writeFileSync('src/components/ui/InternetPage.tsx', intP);

console.log('Fixed typescript errors');
