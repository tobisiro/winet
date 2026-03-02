import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere, Cylinder, Box, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Precise Cylinder connection logic to avoid any geometrical gaps
function CylinderBetween({ start, end, radius, material, extraLength = 0 }: { start: THREE.Vector3, end: THREE.Vector3, radius: number, material: any, extraLength?: number }) {
    const vec = useMemo(() => new THREE.Vector3().subVectors(end, start), [start, end]);
    const length = vec.length();
    const mid = useMemo(() => new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5), [start, end]);
    const quaternion = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vec.clone().normalize()), [vec]);

    return (
        <Cylinder args={[radius, radius, length + extraLength, 6]} position={mid} quaternion={quaternion}>
            {material}
        </Cylinder>
    );
}

// Industrial Metal Lattice Tower Component
function TransmitterTower({ position, rotation = [0, 0, 0], height = 15 }: { position: [number, number, number], rotation?: [number, number, number], height?: number }) {
    const levels = Math.max(3, Math.floor(height / 1.75));
    const levelHeight = height / levels;
    const baseWidth = 1.6;
    const topWidth = 0.4;

    const towerMat = <meshStandardMaterial color="#F8FAFC" roughness={0.3} metalness={0.2} />;
    const swanLightMat = <meshBasicMaterial color="#70489D" />; // SWAN purple

    return (
        <group position={position} rotation={rotation}>
            <group>
                {Array.from({ length: levels }).map((_, l) => {
                    const yStart = l * levelHeight;
                    const yEnd = (l + 1) * levelHeight;
                    const radiusStart = baseWidth / 2 - ((baseWidth / 2 - topWidth / 2) * (yStart / height));
                    const radiusEnd = baseWidth / 2 - ((baseWidth / 2 - topWidth / 2) * (yEnd / height));

                    const getPt = (r: number, y: number, angleIdx: number) => {
                        const angle = (Math.PI / 2) * angleIdx + Math.PI / 4;
                        return new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r);
                    };

                    return (
                        <group key={`level-${l}`}>
                            {Array.from({ length: 4 }).map((_, i) => {
                                const next_i = (i + 1) % 4;
                                const pBase1 = getPt(radiusStart, yStart, i);
                                const pBase2 = getPt(radiusStart, yStart, next_i);
                                const pTop1 = getPt(radiusEnd, yEnd, i);
                                const pTop2 = getPt(radiusEnd, yEnd, next_i);

                                return (
                                    <group key={`face-${l}-${i}`}>
                                        <CylinderBetween start={pBase1} end={pTop1} radius={0.035} material={towerMat} extraLength={0.05} />
                                        {l < levels && (
                                            <CylinderBetween start={pTop1} end={pTop2} radius={0.025} material={towerMat} extraLength={0.04} />
                                        )}
                                        <CylinderBetween start={pBase1} end={pTop2} radius={0.02} material={towerMat} extraLength={0.04} />
                                        <CylinderBetween start={pBase2} end={pTop1} radius={0.02} material={towerMat} extraLength={0.04} />
                                    </group>
                                );
                            })}
                        </group>
                    );
                })}
            </group>

            <group position={[0, height - 0.2, 0]}>
                <Cylinder args={[0.6, 0.6, 0.05, 12]}>
                    <meshStandardMaterial color="#94A3B8" roughness={0.8} />
                </Cylinder>
                <Cylinder args={[0.6, 0.6, 0.3, 12]} position={[0, 0.15, 0]}>
                    <meshStandardMaterial color="#94A3B8" roughness={0.8} wireframe />
                </Cylinder>
            </group>

            <Cylinder args={[0.05, 0.08, 2.0, 6]} position={[0, height + 1.0, 0]}>
                <meshStandardMaterial color="#E2E8F0" roughness={0.5} metalness={0.8} />
            </Cylinder>

            <Box args={[0.1, 1.2, 0.2]} position={[0.2, height + 0.8, 0]}>
                <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
            </Box>
            <Box args={[0.1, 1.2, 0.2]} position={[-0.2, height + 0.8, 0]}>
                <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
            </Box>
            <Box args={[0.2, 1.2, 0.1]} position={[0, height + 0.8, 0.2]}>
                <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
            </Box>

            <group position={[0, height - 1.5, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
                <Cylinder args={[0.4, 0.4, 0.1, 12]}>
                    <meshStandardMaterial color="#F1F5F9" roughness={0.5} />
                </Cylinder>
            </group>

            <Box args={[1.2, 1.0, 1.2]} position={[1.5, 0.5, 0]}>
                <meshStandardMaterial color="#E2E8F0" roughness={0.9} />
            </Box>

            <Sphere args={[0.1, 8, 8]} position={[0, height + 2.1, 0]}>
                {swanLightMat}
            </Sphere>
        </group>
    );
}

// Utility Pole Component
function UtilityPole({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            <Cylinder args={[0.08, 0.12, 5, 8]} position={[0, 2.5, 0]}>
                <meshStandardMaterial color="#F1F5F9" roughness={0.7} metalness={0.1} />
            </Cylinder>

            <group position={[0, 4.0, 0]}>
                <Cylinder args={[0.04, 0.04, 1.8, 8]} rotation={[0, 0, Math.PI / 2]}>
                    <meshStandardMaterial color="#E2E8F0" roughness={0.5} metalness={0.3} />
                </Cylinder>
                <Cylinder args={[0.02, 0.02, 0.6, 6]} position={[-0.25, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <meshStandardMaterial color="#E2E8F0" roughness={0.5} metalness={0.3} />
                </Cylinder>
                <Cylinder args={[0.02, 0.02, 0.6, 6]} position={[0.25, -0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
                    <meshStandardMaterial color="#E2E8F0" roughness={0.5} metalness={0.3} />
                </Cylinder>
                <Cylinder args={[0.04, 0.04, 0.15, 8]} position={[-0.8, 0.1, 0]}>
                    <meshStandardMaterial color="#94A3B8" roughness={0.3} metalness={0.6} />
                </Cylinder>
                <Cylinder args={[0.04, 0.04, 0.15, 8]} position={[0.8, 0.1, 0]}>
                    <meshStandardMaterial color="#94A3B8" roughness={0.3} metalness={0.6} />
                </Cylinder>
            </group>

            <group position={[0, 4.8, 0]}>
                <Cylinder args={[0.03, 0.03, 1.0, 8]} rotation={[0, 0, Math.PI / 2]}>
                    <meshStandardMaterial color="#E2E8F0" roughness={0.5} metalness={0.3} />
                </Cylinder>
                <Cylinder args={[0.03, 0.03, 0.12, 8]} position={[-0.4, 0.08, 0]}>
                    <meshStandardMaterial color="#94A3B8" roughness={0.3} metalness={0.6} />
                </Cylinder>
                <Cylinder args={[0.03, 0.03, 0.12, 8]} position={[0.4, 0.08, 0]}>
                    <meshStandardMaterial color="#94A3B8" roughness={0.3} metalness={0.6} />
                </Cylinder>
            </group>
        </group>
    );
}

// Data Pulse along a curve
function DataPulse({ curve, speed, color, delay }: { curve: THREE.CurvePath<THREE.Vector3> | THREE.QuadraticBezierCurve3, speed: number, color: string, delay: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        const progress = ((time * speed + delay) % 10) / 10;

        if (progress >= 0 && progress <= 1) {
            curve.getPoint(progress, meshRef.current.position);
            meshRef.current.visible = true;
        } else {
            meshRef.current.visible = false;
        }
    });

    return (
        <Sphere ref={meshRef} args={[0.08, 6, 6]} visible={false}>
            <meshBasicMaterial color={color} transparent opacity={0.9} toneMapped={false} />
        </Sphere>
    );
}

// Wireless Pulse
function WirelessPulse({ start, end, speed, color, delay, pulseSize = 0.1 }: { start: THREE.Vector3, end: THREE.Vector3, speed: number, color: string, delay: number, pulseSize?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        const progress = ((time * speed + delay) % 10) / 10;

        if (progress >= 0 && progress <= 1) {
            meshRef.current.position.lerpVectors(start, end, progress);
            const opacity = Math.sin(progress * Math.PI) * 0.8;
            (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
            meshRef.current.visible = true;
        } else {
            meshRef.current.visible = false;
        }
    });

    return (
        <Sphere ref={meshRef} args={[pulseSize, 8, 8]} visible={false}>
            <meshBasicMaterial color={color} transparent opacity={0.8} toneMapped={false} />
        </Sphere>
    );
}

function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function CameraController({ isExploreMode }: { isExploreMode: boolean }) {
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

import { FontLoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';

// ... (keep CylinderBetween, TransmitterTower, UtilityPole, DataPulse, WirelessPulse, easeInOutCubic, CameraController unchanged above Hero3D)

const EXTRUDE_SETTINGS = {
    depth: 6,
    bevelEnabled: true,
    bevelThickness: 1.0,
    bevelSize: 1.0,
    bevelOffset: 0,
    bevelSegments: 5,
    curveSegments: 24,
};

export default function Hero3D({ isExploreMode = false }: { isExploreMode?: boolean }) {
    const font = useLoader(FontLoader, `${import.meta.env.BASE_URL}Inter_Bold.json`);

    // Generate text shapes and compute perimeter paths for poles
    const { letterShapes, dotShape, polePaths, towerPos, towerHeight } = useMemo(() => {
        const shapes = font.generateShapes("winet", 32);

        let dotIdx = -1;
        let minArea = Infinity;

        // Find the 'i' dot by finding the smallest bounding box
        shapes.forEach((shape, idx) => {
            shape.autoClose = true;
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            const pts = shape.getPoints();
            pts.forEach(p => {
                if (p.x < minX) minX = p.x;
                if (p.x > maxX) maxX = p.x;
                if (p.y < minY) minY = p.y;
                if (p.y > maxY) maxY = p.y;
            });
            const area = (maxX - minX) * (maxY - minY);
            if (area < minArea) {
                minArea = area;
                dotIdx = idx;
            }
        });

        const letterShapes = shapes.filter((_, i) => i !== dotIdx);
        const dotShape = shapes[dotIdx];

        // Compute tower pos (true geometric center of the dot's bounding box)
        let minDotX = Infinity, maxDotX = -Infinity, minDotY = Infinity, maxDotY = -Infinity;
        const dotPts = dotShape.getPoints();
        dotPts.forEach(p => {
            if (p.x < minDotX) minDotX = p.x;
            if (p.x > maxDotX) maxDotX = p.x;
            if (p.y < minDotY) minDotY = p.y;
            if (p.y > maxDotY) maxDotY = p.y;
        });
        const dx = (minDotX + maxDotX) / 2;
        const dy = (minDotY + maxDotY) / 2;
        // Text is rendered flat: X -> X, Y -> -Z
        const tPos = new THREE.Vector3(dx, 6, -dy);

        // Compute perimeter poles for letters
        const pPaths: { poles: { pos: THREE.Vector3, rotY: number }[], curves: THREE.QuadraticBezierCurve3[] }[] = [];

        // Include the dot shape in the perimeter wiring!
        const allShapesForWiring = [...letterShapes, dotShape];

        allShapesForWiring.forEach(shape => {
            const subPaths = [shape, ...shape.holes];

            subPaths.forEach(subPath => {
                // Extract points with a low segment count to capture intrinsic corners and curves
                const rawPts = subPath.getPoints();

                // Clean up duplicate start/end points if it's closed
                if (rawPts.length > 0 && rawPts[0].equals(rawPts[rawPts.length - 1])) {
                    rawPts.pop();
                }

                if (rawPts.length < 3) return;

                // We want poles on distinct corners, but we also want to preserve the natural font curves.
                const MIN_POLE_DIST = 2.5;
                const MAX_POLE_DIST = 12.0;
                const ANGLE_THRESHOLD = Math.PI / 4; // 45 degrees

                // Identify all sharp corners first so we know which ones to protect
                const isCorner: boolean[] = new Array(rawPts.length).fill(false);
                for (let i = 0; i < rawPts.length; i++) {
                    const curr = rawPts[i];
                    const prev = rawPts[(i - 1 + rawPts.length) % rawPts.length];
                    const next = rawPts[(i + 1) % rawPts.length];

                    const dirIn = new THREE.Vector2().subVectors(curr, prev).normalize();
                    const dirOut = new THREE.Vector2().subVectors(next, curr).normalize();
                    const dot = dirIn.dot(dirOut);
                    const angle = Math.acos(Math.max(-1, Math.min(1, dot)));

                    if (angle >= ANGLE_THRESHOLD) {
                        isCorner[i] = true;
                    }
                }

                let finalPts2d: THREE.Vector2[] = [rawPts[0]];

                for (let i = 1; i < rawPts.length; i++) {
                    const curr = rawPts[i];
                    const lastKept = finalPts2d[finalPts2d.length - 1];
                    const dist = lastKept.distanceTo(curr);

                    // If the gap is huge, fill it evenly before adding curr
                    // This happens on long straight edges like the stem of the 'T'
                    if (dist > MAX_POLE_DIST) {
                        const numExtra = Math.floor(dist / MAX_POLE_DIST);
                        for (let j = 1; j <= numExtra; j++) {
                            const lerpP = new THREE.Vector2().lerpVectors(lastKept, curr, j / (numExtra + 1));
                            finalPts2d.push(lerpP);
                        }
                        finalPts2d.push(curr);
                    }
                    // If it's a guaranteed corner, keep it no matter what
                    else if (isCorner[i]) {
                        finalPts2d.push(curr);
                    }
                    // If it's far enough from the last kept point, keep it
                    // This naturally spaces out the dense points on curves like 'e', 'n', 't'
                    else if (dist >= MIN_POLE_DIST) {
                        finalPts2d.push(curr);
                    }
                    // Otherwise skip it to reduce clutter
                }

                // Final cleanup: if the shape is closed and the last point is very close to the first point,
                // AND the last point isn't a critical corner, remove it.
                if (finalPts2d.length > 2) {
                    const first = finalPts2d[0];
                    const last = finalPts2d[finalPts2d.length - 1];
                    if (first.distanceTo(last) < MIN_POLE_DIST && !isCorner[rawPts.length - 1]) {
                        finalPts2d.pop();
                    }
                }

                const poles: { pos: THREE.Vector3, rotY: number }[] = [];
                for (let i = 0; i < finalPts2d.length; i++) {
                    const curr = finalPts2d[i];
                    const prev = finalPts2d[(i - 1 + finalPts2d.length) % finalPts2d.length];
                    const next = finalPts2d[(i + 1) % finalPts2d.length];

                    // Direction entering the point
                    const dirIn = new THREE.Vector2().subVectors(curr, prev).normalize();
                    // Direction leaving the point
                    const dirOut = new THREE.Vector2().subVectors(next, curr).normalize();

                    // The bisector direction (pointing "outward" from the corner)
                    // If dirIn and dirOut are the same (straight line), dirIn + dirOut = 2*dirOut.
                    // If it's a 90 deg corner, their sum gives the 45 deg bisector.
                    let bisect = new THREE.Vector2().addVectors(dirIn, dirOut).normalize();

                    // If the vectors are exactly opposite (U-turn), the sum is 0. Fallback:
                    if (bisect.lengthSq() < 0.001) {
                        bisect.copy(dirIn).rotateAround(new THREE.Vector2(0, 0), Math.PI / 2);
                    } else {
                        // The sum points "inward" to the convex hull. Rotate 90 degrees to get the outward facing normal
                        bisect.rotateAround(new THREE.Vector2(0, 0), -Math.PI / 2);
                    }

                    // For the 3D model, the pole is rotated around Y.
                    // Math.atan2(y, x) gives the angle.
                    const rotY = Math.atan2(bisect.y, bisect.x);

                    poles.push({ pos: new THREE.Vector3(curr.x, 6, -curr.y), rotY });
                }

                const curves: THREE.QuadraticBezierCurve3[] = [];
                const getInsPos = (pole: any, localX: number, localY: number) => {
                    const worldX = pole.pos.x + Math.cos(pole.rotY) * localX;
                    const worldZ = pole.pos.z - Math.sin(pole.rotY) * localX;
                    return new THREE.Vector3(worldX, pole.pos.y + localY, worldZ);
                };

                for (let i = 0; i < poles.length; i++) {
                    const p1 = poles[i];
                    const p2 = poles[(i + 1) % poles.length];

                    const startTopLeft = getInsPos(p1, -0.4, 4.88);
                    const endTopLeft = getInsPos(p2, -0.4, 4.88);
                    const startTopRight = getInsPos(p1, 0.4, 4.88);
                    const endTopRight = getInsPos(p2, 0.4, 4.88);
                    const startBotLeft = getInsPos(p1, -0.8, 4.08);
                    const endBotLeft = getInsPos(p2, -0.8, 4.08);
                    const startBotRight = getInsPos(p1, 0.8, 4.08);
                    const endBotRight = getInsPos(p2, 0.8, 4.08);

                    [
                        { start: startTopLeft, end: endTopLeft },
                        { start: startTopRight, end: endTopRight },
                        { start: startBotLeft, end: endBotLeft },
                        { start: startBotRight, end: endBotRight }
                    ].forEach(({ start, end }) => {
                        const midX = (start.x + end.x) / 2;
                        const midY = (start.y + end.y) / 2 - 0.5; // Droop
                        const midZ = (start.z + end.z) / 2;
                        curves.push(new THREE.QuadraticBezierCurve3(start, new THREE.Vector3(midX, midY, midZ), end));
                    });
                }
                pPaths.push({ poles, curves });
            });
        });

        return { letterShapes, dotShape, polePaths: pPaths, towerPos: tPos, towerHeight: 15 };
    }, [font]);

    // Calculate precise center of the entire word to align CameraController perfectly
    const textGroupOffset = useMemo(() => {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        [...letterShapes, dotShape].forEach(shape => {
            shape.getPoints().forEach(p => {
                if (p.x < minX) minX = p.x;
                if (p.x > maxX) maxX = p.x;
                if (p.y < minY) minY = p.y;
                if (p.y > maxY) maxY = p.y;
            });
        });
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        return new THREE.Vector3(-centerX, 0, centerY); // We shift group by this to center it
    }, [letterShapes, dotShape]);

    return (
        <>
            <fog attach="fog" args={['#F8FAFC', 30, 200]} />
            <ambientLight intensity={1.2} />
            <directionalLight position={[20, 50, 20]} intensity={1.8} color="#ffffff" castShadow />
            <pointLight position={[-10, 20, -10]} intensity={0.6} color="#70489D" />

            {isExploreMode ? (
                <OrbitControls
                    makeDefault
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    target={[0, 0, 0]}
                    maxDistance={250}
                />
            ) : (
                <CameraController isExploreMode={isExploreMode} />
            )}

            {/* Centralized Group for Text & Poles */}
            <group position={textGroupOffset}>

                {/* Render Letters as Extrusions */}
                <group rotation={[-Math.PI / 2, 0, 0]}>
                    <mesh>
                        <extrudeGeometry args={[letterShapes, EXTRUDE_SETTINGS]} />
                        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
                    </mesh>
                    <mesh>
                        <extrudeGeometry args={[dotShape, EXTRUDE_SETTINGS]} />
                        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
                    </mesh>
                </group>

                {/* Optional water plane underneath to ground the scene visually */}
                <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[600, 600]} />
                    <meshBasicMaterial color="#E0F2FE" transparent opacity={0.4} />
                </mesh>

                {/* Poles and Cables per Letter */}
                {polePaths.map((path, pIdx) => (
                    <group key={`letter-poles-${pIdx}`}>
                        {path.poles.map((pole, idx) => (
                            <UtilityPole
                                key={`pole-${pIdx}-${idx}`}
                                position={[pole.pos.x, pole.pos.y, pole.pos.z]}
                                rotation={[0, pole.rotY, 0]}
                            />
                        ))}
                        {path.curves.map((curve, idx) => {
                            const points = curve.getPoints(8);
                            return (
                                <group key={`cable-${pIdx}-${idx}`}>
                                    <Line points={points} color="#A78BFA" lineWidth={1.5} />
                                    <DataPulse curve={curve} speed={1.5} color="#70489D" delay={idx * 0.1} />
                                    <DataPulse curve={curve} speed={2} color="#f97316" delay={idx * 0.2 + 0.5} />
                                </group>
                            );
                        })}
                    </group>
                ))}

                <TransmitterTower position={[towerPos.x, towerPos.y, towerPos.z]} height={towerHeight} />

                {/* Wireless Link: Main Tower emitting to the first pole of each letter */}
                {polePaths.map((path, i) => (
                    <WirelessPulse
                        key={`tower-to-letter-${i}`}
                        start={new THREE.Vector3(towerPos.x, towerPos.y + towerHeight + 1, towerPos.z)}
                        end={new THREE.Vector3(path.poles[0].pos.x, path.poles[0].pos.y + 5, path.poles[0].pos.z)}
                        speed={1.0}
                        color={i % 2 === 0 ? "#70489D" : "#f97316"}
                        delay={i * 0.5}
                        pulseSize={0.25}
                    />
                ))}
            </group>
        </>
    );
}
