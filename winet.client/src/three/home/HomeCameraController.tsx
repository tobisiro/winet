import { useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { easeInOutCubic } from '../components/easing';

export function HomeCameraController({ isExploreMode }: { isExploreMode: boolean }) {
    const vLookAt = useMemo(() => new THREE.Vector3(2, 2, 2), []);
    const [scrollT, setScrollT] = useState(0);
    const [waypoints, setWaypoints] = useState({ s1: 0.28, s2: 0.55, s3: 0.85 });

    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const currentScroll = window.scrollY;
            setScrollT(currentScroll / maxScroll);
        };

        const calculateWaypoints = () => {
            const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const spacers = document.querySelectorAll('.hero-spacer');
            if (spacers.length >= 3) {
                const s1 = (spacers[0].getBoundingClientRect().top + window.scrollY) / maxScroll;
                const s2 = (spacers[1].getBoundingClientRect().top + window.scrollY) / maxScroll;
                const s3 = (spacers[2].getBoundingClientRect().top + window.scrollY) / maxScroll;
                setWaypoints({ s1, s2, s3 });
            }
            handleScroll();
        };

        const handleResize = () => {
            calculateWaypoints();
        };

        // Allow DOM layout to complete before capturing precise wrapper pixel offsets
        setTimeout(calculateWaypoints, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useFrame((state) => {
        const t = Math.max(0, Math.min(1, scrollT));
        const { s1, s2, s3 } = waypoints;

        let targetPos = new THREE.Vector3();
        let targetLookAt = new THREE.Vector3();

        // Viewpoints for 3-island layout (wider spacing)
        // Hero: wide establishing shot
        const p1Pos = new THREE.Vector3(50, 28, 40);
        const p1Look = new THREE.Vector3(0, 2, -8);

        const p2Pos = new THREE.Vector3(30, 16, 22);
        const p2Look = new THREE.Vector3(0, 5, 0);

        // ═══ Spacer 1: "Optická sieť" → Residential island fiber infrastructure ═══
        // Camera approaches residential island [30, -1, -18] from above-front
        const p3Pos = new THREE.Vector3(44, 12, -8); // Approaching residential from right-front
        const p3Look = new THREE.Vector3(30, 2, -18);

        const p4Pos = new THREE.Vector3(42, 8, -26); // Close view of residential poles + houses
        const p4Look = new THREE.Vector3(30, 2, -18);

        // ═══ Spacer 2: "Vysielače a prenos" → Full transmitter tower view ═══
        // Camera pulls back to show the full tower from a distance
        const p5Pos = new THREE.Vector3(16, 14, 16); // Far enough to see full tower height
        const p5Look = new THREE.Vector3(0, 6, 0);

        const p6Pos = new THREE.Vector3(-10, 12, 14); // Opposite side, tower still fully visible
        const p6Look = new THREE.Vector3(0, 7, 0);

        // ═══ Spacer 3: "Dostupnosť všade" → Winet building zooming in ═══
        // Start further away, slowly zoom in during scroll
        const p7Pos = new THREE.Vector3(-36, 16, 4); // Wider view, higher up
        const p7Look = new THREE.Vector3(-35, 6, -14);

        const p8Pos = new THREE.Vector3(-24, 8, -4); // Zoomed in closer, lower angle (end of scroll)
        const p8Look = new THREE.Vector3(-35, 6, -14);

        if (t < s1) {
            // Journey from Hero to Spacer 1 (Residential fiber optics)
            const segT = t / s1;
            if (segT < 0.5) {
                let p = easeInOutCubic(segT / 0.5);
                targetPos.lerpVectors(p1Pos, p2Pos, p);
                targetLookAt.lerpVectors(p1Look, p2Look, p);
            } else {
                let p = easeInOutCubic((segT - 0.5) / 0.5);
                targetPos.lerpVectors(p2Pos, p3Pos, p);
                targetLookAt.lerpVectors(p2Look, p3Look, p);
            }
        }
        else if (t < s1 + 0.02) {
            // Hold at residential close-up
            targetPos.lerpVectors(p3Pos, p4Pos, easeInOutCubic((t - s1) / 0.02));
            targetLookAt.lerpVectors(p3Look, p4Look, easeInOutCubic((t - s1) / 0.02));
        }
        else if (t < s2) {
            // Journey from residential to transmitter tower (Spacer 2)
            let p = (Math.max(0, t - s1 - 0.02)) / (s2 - s1 - 0.02);
            p = Math.min(1, easeInOutCubic(p));
            targetPos.lerpVectors(p4Pos, p5Pos, p);
            targetLookAt.lerpVectors(p4Look, p5Look, p);
        }
        else if (t < s2 + 0.02) {
            // Orbit around transmitter
            let p = easeInOutCubic((t - s2) / 0.02);
            targetPos.lerpVectors(p5Pos, p6Pos, p);
            targetLookAt.lerpVectors(p5Look, p6Look, p);
        }
        else if (t < s3) {
            // Journey from transmitter to Winet building (Spacer 3 start - wide)
            let p = (Math.max(0, t - s2 - 0.02)) / (s3 - s2 - 0.02);
            p = Math.min(1, easeInOutCubic(p));
            targetPos.lerpVectors(p6Pos, p7Pos, p);
            targetLookAt.lerpVectors(p6Look, p7Look, p);
        }
        else {
            // Zooming into Winet building while scrolling the rest of the page (t from s3 to 1.0)
            let scrollRemaining = (t - s3) / (1.0 - s3);
            targetPos.lerpVectors(p7Pos, p8Pos, scrollRemaining);
            targetLookAt.lerpVectors(p7Look, p8Look, scrollRemaining);
        }

        if (isExploreMode) return;

        // Smoother lerp for cinematic feel 
        state.camera.position.lerp(targetPos, 0.08);
        vLookAt.lerp(targetLookAt, 0.08);
        state.camera.lookAt(vLookAt);
    });

    return null;
}
