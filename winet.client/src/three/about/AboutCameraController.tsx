import { useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { easeInOutCubic } from '../components/easing';

export function AboutCameraController({ isExploreMode }: { isExploreMode: boolean }) {
    const vLookAt = useMemo(() => new THREE.Vector3(0, 0, 0), []);
    const [scrollT, setScrollT] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const spacer = document.querySelector('.hero-spacer') as HTMLElement | null;
            const spacersVisible = spacer ? spacer.offsetHeight > 0 : false;
            const numScreens = spacersVisible ? 10 : 5;
            const maxScroll = window.innerHeight * numScreens;
            if (maxScroll <= 0) {
                setScrollT(0);
                return;
            }
            const currentScroll = window.scrollY;
            setScrollT(currentScroll / maxScroll);
        };

        const handleResize = () => handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        handleResize(); // Init

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useFrame((state) => {
        const t = Math.max(0, Math.min(1, scrollT));

        let targetPos = new THREE.Vector3();
        let targetLookAt = new THREE.Vector3();

        if (t < 0.05) {
            // Held top-down view perfectly centered on the word
            // On mobile, the screen is thin, so we need to be higher to fit the width.
            const isMobile = window.innerWidth < 768;
            const baseY = isMobile ? 180 : 110;

            const time = state.clock.getElapsedTime();
            const floatY = Math.sin(time * 0.5) * 2;
            const floatX = Math.cos(time * 0.3) * 1.5;
            const floatZ = Math.sin(time * 0.4) * 1.5;

            targetPos.set(floatX, baseY + floatY, floatZ);
            targetLookAt.set(0, 0, 0); // Look directly down at the center
        } else if (t < 0.20) {
            // VP0 -> VP1 ('w')
            let p = (t - 0.05) / 0.15;
            p = easeInOutCubic(p);

            // From top-down center
            const isMobile = window.innerWidth < 768;
            const baseY = isMobile ? 180 : 110;
            const p1Pos = new THREE.Vector3(0, baseY, 0);
            const p1Look = new THREE.Vector3(0, 0, 0);

            // 'w' is ~x=-45. We orbit it slightly as `p` progresses.
            const wX = -45;
            // The orbit offset shifts from z=50 to z=30, x from -20 to -40 relative to w
            const orbitX = wX + (20 * p);
            const orbitZ = 50 - (20 * p);

            const p2Pos = new THREE.Vector3(orbitX, 35 - (10 * p), orbitZ);
            const p2Look = new THREE.Vector3(wX, 0, 0);

            targetPos.lerpVectors(p1Pos, p2Pos, p);
            targetLookAt.lerpVectors(p1Look, p2Look, p);

        } else if (t < 0.40) {
            // VP1 ('w') -> VP2 ('i' Transmitter Detail)
            let p = (t - 0.20) / 0.20;
            p = easeInOutCubic(p);

            const p2Pos = new THREE.Vector3(-25, 25, 30);
            const p2Look = new THREE.Vector3(-45, 0, 0);

            // 'i' and tower are ~x=-22. We want a dynamic sweeping close-up.
            const iX = -22;
            const iZ = -8; // tower is pushed back a bit usually

            // Orbit sweeps around the tower from the top (back-side of the text)
            // Math.PI = negative Z (top of the word). We sweep to Math.PI * 0.7
            const angle = Math.PI - (p * Math.PI * 0.3); // Sweep from back to back-right
            const isMobile = window.innerWidth < 768;
            const mobileOffset = isMobile ? 25 : 0; // Pull significantly further back on narrow screens

            // Zooming in from 60 to 45 (massively further out to fit the full tower tip)
            const radius = 60 + mobileOffset - (15 * p);
            const heightRaw = 40 + mobileOffset - (8 * p); // Camera is flying high

            const towerPos = new THREE.Vector3(iX + Math.sin(angle) * radius, heightRaw, iZ + Math.cos(angle) * radius);

            // Look lower so the tip has breathing room at the top of the monitor
            const towerLook = new THREE.Vector3(iX, 12, iZ);

            targetPos.lerpVectors(p2Pos, towerPos, p);
            // We transition the lookAt from 'w' to the top of the 'i' tower
            targetLookAt.lerpVectors(p2Look, towerLook, p);

        } else if (t < 0.60) {
            // VP2 ('i') -> VP3 ('n')
            let p = (t - 0.40) / 0.20;
            p = easeInOutCubic(p);

            // End of previous orbit
            const iX = -22;
            const iZ = -8;
            const isMobile = window.innerWidth < 768;
            const mobileOffset = isMobile ? 25 : 0;
            const startAngle = Math.PI * 0.7; // End angle of previous sweep
            const startRadius = 45 + mobileOffset;
            const startHeight = 32 + mobileOffset;

            const p3Pos = new THREE.Vector3(iX + Math.sin(startAngle) * startRadius, startHeight, iZ + Math.cos(startAngle) * startRadius);
            const p3Look = new THREE.Vector3(iX, 12, iZ);

            // 'n' is ~x=0. Orbit around it.
            const nX = 0;
            const orbitAngle = -Math.PI * 0.2 + (p * Math.PI * 0.4); // sweep left to right

            const p4Pos = new THREE.Vector3(nX + Math.sin(orbitAngle) * 35, 25, Math.cos(orbitAngle) * 35);
            const p4Look = new THREE.Vector3(nX, 0, 0);

            targetPos.lerpVectors(p3Pos, p4Pos, p);
            targetLookAt.lerpVectors(p3Look, p4Look, p);

        } else if (t < 0.80) {
            // VP3 ('n') -> VP4 ('e')
            let p = (t - 0.60) / 0.20;
            p = easeInOutCubic(p);

            const nX = 0;
            const endOrbitAngle = Math.PI * 0.2;
            const p4Pos = new THREE.Vector3(nX + Math.sin(endOrbitAngle) * 35, 25, Math.cos(endOrbitAngle) * 35);
            const p4Look = new THREE.Vector3(nX, 0, 0);

            // 'e' is ~x=25.
            const eX = 25;
            const orbitAngle = Math.PI * 0.2 - (p * Math.PI * 0.3); // sweep right to left

            const p5Pos = new THREE.Vector3(eX + Math.sin(orbitAngle) * 30, 22, Math.cos(orbitAngle) * 30);
            const p5Look = new THREE.Vector3(eX, 0, 0);

            targetPos.lerpVectors(p4Pos, p5Pos, p);
            targetLookAt.lerpVectors(p4Look, p5Look, p);

        } else if (t < 0.95) {
            // VP4 ('e') -> VP5 ('t')
            let p = (t - 0.80) / 0.15;
            p = easeInOutCubic(p);

            const eX = 25;
            const endOrbitAngle = -Math.PI * 0.1;
            const p5Pos = new THREE.Vector3(eX + Math.sin(endOrbitAngle) * 30, 22, Math.cos(endOrbitAngle) * 30);
            const p5Look = new THREE.Vector3(eX, 0, 0);

            // 't' is ~x=45.
            const tX = 45;
            const orbitAngle = -Math.PI * 0.1 + (p * Math.PI * 0.3); // sweep left to right

            const p6Pos = new THREE.Vector3(tX + Math.sin(orbitAngle) * 35, 18, Math.cos(orbitAngle) * 35);
            const p6Look = new THREE.Vector3(tX, 2, 0);

            targetPos.lerpVectors(p5Pos, p6Pos, p);
            targetLookAt.lerpVectors(p5Look, p6Look, p);

        } else {
            // VP5: 't' Final gentle drift
            let p = Math.min((t - 0.95) / 0.05, 1.0);
            p = easeInOutCubic(p);

            const tX = 45;
            const endOrbitAngle = Math.PI * 0.2;
            const p6Pos = new THREE.Vector3(tX + Math.sin(endOrbitAngle) * 35, 18, Math.cos(endOrbitAngle) * 35);
            const p6Look = new THREE.Vector3(tX, 2, 0);

            // Slowly drift closer and lower
            const p7Pos = new THREE.Vector3(tX + Math.sin(endOrbitAngle + Math.PI * 0.05) * 30, 14, Math.cos(endOrbitAngle + Math.PI * 0.05) * 30);
            const p7Look = new THREE.Vector3(tX, 2, 0);

            targetPos.lerpVectors(p6Pos, p7Pos, p);
            targetLookAt.lerpVectors(p6Look, p7Look, p);
        }

        if (isExploreMode) return;

        state.camera.position.lerp(targetPos, 0.08);
        vLookAt.lerp(targetLookAt, 0.08);
        state.camera.lookAt(vLookAt);
    });

    return null;
}
