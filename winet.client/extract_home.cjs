const fs = require('fs');
let code = fs.readFileSync('../winet_web/src/App.tsx', 'utf8');

// The Home function is from line 19 to 294. 
// We can extract it carefully:
let homeMatch = code.match(/function Home\(\) \{[\s\S]*?^  \);?\n\}/m);
if (homeMatch) {
    let content = homeMatch[0];
    
    // Add imports
    let imports = `import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import { Home3D } from '../../three/home/Home3D';
import ServiceCard from './ServiceCard';
import PricingSection from './PricingSection';
import CoverageSection from './CoverageSection';
import FloatingContact from '../layout/FloatingContact';
import Footer from '../layout/Footer';
import { Wifi, Zap, Tv, ChevronRight, ShieldCheck, MapPin, Gauge, Orbit, X } from 'lucide-react';

export default ` + content;
    fs.writeFileSync('src/components/ui/Home.tsx', imports);
} else {
    console.log('Home component not found');
}
