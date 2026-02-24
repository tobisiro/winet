import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere, Cylinder, Box, Icosahedron, useScroll } from '@react-three/drei';
import * as THREE from 'three';

// Low-poly Bush Component
function Bush({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
    return (
        <group position={position} scale={scale}>
            <Icosahedron args={[0.8, 0]} position={[0, -0.2, 0]}>
                <meshStandardMaterial color="#2E7D32" roughness={0.9} flatShading />
            </Icosahedron>
            <Icosahedron args={[0.6, 0]} position={[0.5, -0.3, 0.4]}>
                <meshStandardMaterial color="#388E3C" roughness={0.9} flatShading />
            </Icosahedron>
            <Icosahedron args={[0.7, 0]} position={[-0.4, -0.1, -0.5]}>
                <meshStandardMaterial color="#1B5E20" roughness={0.9} flatShading />
            </Icosahedron>
        </group>
    );
}

// Modern House
function ModernHouse({ position, hasWifiReceiver = false, hasFiberBox = false, receiverRotation = [0, 0, 0] }: { position: [number, number, number]; hasWifiReceiver?: boolean; hasFiberBox?: boolean; receiverRotation?: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Base/Ground floor */}
            <Box args={[2.0, 1.5, 2.0]} position={[0, 0.75, 0]}>
                <meshStandardMaterial color="#F8FAFC" roughness={0.2} metalness={0.1} />
            </Box>

            {/* Wooden accent pillar/wall */}
            <Box args={[0.6, 1.5, 2.02]} position={[-0.7, 0.75, 0]}>
                <meshStandardMaterial color="#B45309" roughness={0.8} />
            </Box>

            {/* Flat modern roof */}
            <Box args={[2.3, 0.15, 2.3]} position={[0, 1.575, 0]}>
                <meshStandardMaterial color="#0F172A" roughness={0.8} />
            </Box>

            {/* Large Panorama Window Front */}
            <Box args={[1.2, 1.0, 0.05]} position={[0.3, 0.8, 1.0]}>
                <meshStandardMaterial color="#7DD3FC" roughness={0.1} metalness={0.9} transparent opacity={0.6} />
            </Box>
            <Box args={[1.2, 0.8, 0.05]} position={[0.3, 0.7, -1.0]}>
                <meshStandardMaterial color="#7DD3FC" roughness={0.1} metalness={0.9} transparent opacity={0.6} />
            </Box>

            {/* Door */}
            <Box args={[0.5, 1.0, 0.05]} position={[-0.7, 0.5, 1.02]}>
                <meshStandardMaterial color="#1E293B" />
            </Box>

            {/* Fiber Connection Box (ONT) - Back Wall (local Z = -1.01) */}
            {hasFiberBox && (
                <group position={[0, 0.6, -1.01]}>
                    <Box args={[0.2, 0.3, 0.1]}>
                        <meshStandardMaterial color="#475569" />
                    </Box>
                    <pointLight distance={0.5} intensity={1} color="#3B82F6" position={[0, 0, -0.1]} />
                </group>
            )}

            {/* Wifi Receiver Dish */}
            {hasWifiReceiver && (
                <group position={[0, 1.65, 0]}>
                    <Cylinder args={[0.02, 0.02, 0.4, 6]} position={[0, 0.2, 0]}>
                        <meshStandardMaterial color="#64748B" />
                    </Cylinder>
                    <group position={[0, 0.4, 0]} rotation={receiverRotation as any}>
                        <Cylinder args={[0.3, 0.3, 0.05, 12]} rotation={[Math.PI / 2, 0, 0]}>
                            <meshStandardMaterial color="#CBD5E1" />
                        </Cylinder>
                        <Cylinder args={[0.02, 0.02, 0.2, 6]} position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
                            <meshStandardMaterial color="#94A3B8" />
                        </Cylinder>
                    </group>
                </group>
            )}
        </group>
    );
}

// 3-Story Administrative Building
function AdminBuilding({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Ground floor (brick-like dark red/brown) */}
            <Box args={[14, 2, 6]} position={[0, 1, 0]}>
                <meshStandardMaterial color="#7f1d1d" roughness={0.9} />
            </Box>
            {/* Glass windows on ground floor */}
            <Box args={[13.8, 1.4, 6.1]} position={[0, 1, 0]}>
                <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
            </Box>

            {/* Second floor (light gray plaster/concrete) */}
            <Box args={[14, 2, 6]} position={[0, 3, 0]}>
                <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
            </Box>
            {/* Third floor (light gray plaster) */}
            <Box args={[14, 2, 6]} position={[0, 5, 0]}>
                <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
            </Box>

            {/* Roof trim */}
            <Box args={[14.2, 0.2, 6.2]} position={[0, 6.1, 0]}>
                <meshStandardMaterial color="#94a3b8" roughness={0.9} />
            </Box>

            {/* Balconies / Separator lines */}
            <Box args={[14.1, 0.4, 6.1]} position={[0, 4, 0]}>
                <meshStandardMaterial color="#b91c1c" roughness={0.8} />
            </Box>
            <Box args={[14.1, 0.4, 6.1]} position={[0, 2, 0]}>
                <meshStandardMaterial color="#b91c1c" roughness={0.8} />
            </Box>

            {/* Windows 2nd floor */}
            <Box args={[13.9, 1.2, 6.1]} position={[0, 3.1, 0]}>
                <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
            </Box>
            {/* Windows 3rd floor */}
            <Box args={[13.9, 1.2, 6.1]} position={[0, 5.1, 0]}>
                <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
            </Box>

            {/* Small mast on roof */}
            <group position={[5, 6.2, -1]}>
                {/* Main pole */}
                <Cylinder args={[0.08, 0.08, 3, 8]} position={[0, 1.5, 0]}>
                    <meshStandardMaterial color="#94A3B8" roughness={0.4} metalness={0.6} />
                </Cylinder>
                {/* Sector Antennas */}
                <Box args={[0.1, 1.2, 0.2]} position={[0.15, 2.2, 0]}>
                    <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
                </Box>
                <Box args={[0.1, 1.2, 0.2]} position={[-0.15, 2.2, 0]}>
                    <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
                </Box>
                <Box args={[0.2, 1.2, 0.1]} position={[0, 2.2, 0.15]}>
                    <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
                </Box>
                {/* Large Microwave Dish facing main tower */}
                <group position={[0, 1.0, 0.2]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
                    <Cylinder args={[0.4, 0.4, 0.1, 12]}>
                        <meshStandardMaterial color="#F1F5F9" roughness={0.5} />
                    </Cylinder>
                </group>
            </group>
        </group>
    );
}

// Utility Pole Component
function UtilityPole({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            <Cylinder args={[0.08, 0.12, 5, 8]} position={[0, 2.5, 0]}>
                <meshStandardMaterial color="#334155" roughness={0.9} metalness={0.2} />
            </Cylinder>

            <group position={[0, 4.0, 0]}>
                <Cylinder args={[0.04, 0.04, 1.8, 8]} rotation={[0, 0, Math.PI / 2]}>
                    <meshStandardMaterial color="#1E293B" roughness={0.7} metalness={0.5} />
                </Cylinder>
                {/* Fixed braces: Moved X closer to center and adjusted length so they intersect the main pole and crossarm properly */}
                <Cylinder args={[0.02, 0.02, 0.6, 6]} position={[-0.25, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <meshStandardMaterial color="#1E293B" roughness={0.7} metalness={0.5} />
                </Cylinder>
                <Cylinder args={[0.02, 0.02, 0.6, 6]} position={[0.25, -0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
                    <meshStandardMaterial color="#1E293B" roughness={0.7} metalness={0.5} />
                </Cylinder>
                <Cylinder args={[0.04, 0.04, 0.15, 8]} position={[-0.8, 0.1, 0]}>
                    <meshStandardMaterial color="#94A3B8" roughness={0.4} />
                </Cylinder>
                <Cylinder args={[0.04, 0.04, 0.15, 8]} position={[0.8, 0.1, 0]}>
                    <meshStandardMaterial color="#94A3B8" roughness={0.4} />
                </Cylinder>
            </group>

            <group position={[0, 4.8, 0]}>
                <Cylinder args={[0.03, 0.03, 1.0, 8]} rotation={[0, 0, Math.PI / 2]}>
                    <meshStandardMaterial color="#1E293B" roughness={0.7} metalness={0.5} />
                </Cylinder>
                <Cylinder args={[0.03, 0.03, 0.12, 8]} position={[-0.4, 0.08, 0]}>
                    <meshStandardMaterial color="#94A3B8" roughness={0.4} />
                </Cylinder>
                <Cylinder args={[0.03, 0.03, 0.12, 8]} position={[0.4, 0.08, 0]}>
                    <meshStandardMaterial color="#94A3B8" roughness={0.4} />
                </Cylinder>
            </group>
        </group>
    );
}

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

// Industrial Metal Lattice Tower Component (Red & White)
function TransmitterTower({ position, rotation = [0, 0, 0], height = 7 }: { position: [number, number, number], rotation?: [number, number, number], height?: number }) {
    const levels = Math.max(3, Math.floor(height / 1.75));
    const levelHeight = height / levels;
    const baseWidth = 1.6;
    const topWidth = 0.4;

    // Materials (alternating red and white for visibility)
    const redMat = <meshStandardMaterial color="#EF4444" roughness={0.7} metalness={0.4} />;
    const whiteMat = <meshStandardMaterial color="#F8FAFC" roughness={0.7} metalness={0.4} />;
    const lightRedMat = <meshBasicMaterial color="#EF4444" />;

    const getMatForLevel = (l: number) => (l % 2 === 0 ? redMat : whiteMat);

    return (
        <group position={position} rotation={rotation}>
            {/* Lattice structure built level by level using precision vector maths */}
            <group>
                {Array.from({ length: levels }).map((_, l) => {
                    const yStart = l * levelHeight;
                    const yEnd = (l + 1) * levelHeight;
                    const radiusStart = baseWidth / 2 - ((baseWidth / 2 - topWidth / 2) * (yStart / height));
                    const radiusEnd = baseWidth / 2 - ((baseWidth / 2 - topWidth / 2) * (yEnd / height));

                    const mat = getMatForLevel(l);

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
                                        {/* Vertical sloped leg (drawn exactly from the ground point to the top level point of this section) */}
                                        <CylinderBetween start={pBase1} end={pTop1} radius={0.035} material={mat} extraLength={0.05} />

                                        {/* Horizontal top frame */}
                                        {l < levels && (
                                            <CylinderBetween start={pTop1} end={pTop2} radius={0.025} material={mat} extraLength={0.04} />
                                        )}

                                        {/* X-Braces precisely spanning diagonally across the 3D face */}
                                        <CylinderBetween start={pBase1} end={pTop2} radius={0.02} material={mat} extraLength={0.04} />
                                        <CylinderBetween start={pBase2} end={pTop1} radius={0.02} material={mat} extraLength={0.04} />
                                    </group>
                                );
                            })}
                        </group>
                    );
                })}
            </group>

            {/* Top platforms (circular rings) */}
            <group position={[0, height - 0.2, 0]}>
                <Cylinder args={[0.6, 0.6, 0.05, 12]}>
                    <meshStandardMaterial color="#94A3B8" roughness={0.8} />
                </Cylinder>
                {/* Handrail */}
                <Cylinder args={[0.6, 0.6, 0.3, 12]} position={[0, 0.15, 0]}>
                    <meshStandardMaterial color="#94A3B8" roughness={0.8} wireframe />
                </Cylinder>
            </group>

            {/* Center mast on top */}
            <Cylinder args={[0.05, 0.08, 2.0, 6]} position={[0, height + 1.0, 0]}>
                <meshStandardMaterial color="#E2E8F0" roughness={0.5} metalness={0.8} />
            </Cylinder>

            {/* 5G Sector Antennas */}
            <Box args={[0.1, 1.2, 0.2]} position={[0.2, height + 0.8, 0]}>
                <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
            </Box>
            <Box args={[0.1, 1.2, 0.2]} position={[-0.2, height + 0.8, 0]}>
                <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
            </Box>
            <Box args={[0.2, 1.2, 0.1]} position={[0, height + 0.8, 0.2]}>
                <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
            </Box>

            {/* Point-to-point microwave dishes */}
            <group position={[0, height - 1.5, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
                <Cylinder args={[0.4, 0.4, 0.1, 12]}>
                    <meshStandardMaterial color="#F1F5F9" roughness={0.5} />
                </Cylinder>
            </group>
            <group position={[0.4, height - 2.5, -0.4]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
                <Cylinder args={[0.4, 0.4, 0.1, 12]}>
                    <meshStandardMaterial color="#F1F5F9" roughness={0.5} />
                </Cylinder>
            </group>

            {/* Tech box at bottom */}
            <Box args={[1.2, 1.0, 1.2]} position={[1.5, 0.5, 0]}>
                <meshStandardMaterial color="#E2E8F0" roughness={0.9} />
            </Box>

            {/* Blinking red light on the very top */}
            <Sphere args={[0.08, 6, 6]} position={[0, height + 2.1, 0]}>
                {lightRedMat}
                {/* Removed pointLight to save massive performance, glow is enough */}
            </Sphere>
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
            {/* Removed pointLight. Relying on highly emissive color instead. */}
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
            {/* Removed pointLight to save massive amounts of draw calls */}
            <meshBasicMaterial color={color} transparent opacity={0.8} toneMapped={false} />
        </Sphere>
    );
}

function InteractiveMousePulses({ startPos }: { startPos: THREE.Vector3 }) {
    const targetRef = useRef(new THREE.Vector3(0, -1, 0));
    const raycaster = useMemo(() => new THREE.Raycaster(), []);
    // Intersect plane at y=0 which is closer to the hill surface for accurate aiming
    const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);

    // Exactly 4 distinctly spaced pulses to exactly match the admin building behavior
    const pulseCount = 4;
    const speed = 1.0;

    const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        // Update mouse target intersection with ground plane
        raycaster.setFromCamera(state.pointer, state.camera);
        const intersect = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(plane, intersect)) {
            // Keep the target somewhat constrained so it doesn't fly off to infinity
            if (intersect.distanceTo(startPos) < 150) {
                // Instantly update target to mouse cursor for perfectly straight, instant tracking
                targetRef.current.copy(intersect);
            }
        }

        if (!instancedMeshRef.current) return;

        // Update each pulse in a continuous stream, just like WirelessPulse does
        for (let i = 0; i < pulseCount; i++) {
            const offset = i * (1 / pulseCount);

            // Continuous modulo 1 calculation
            let progress = (state.clock.elapsedTime * speed + offset) % 1;
            // Handle negative modulo correctly
            if (progress < 0) progress += 1;

            // Always lerp to the CURRENT exact mouse target in a straight line (no arc)
            dummy.position.lerpVectors(startPos, targetRef.current, progress);

            // Fade in and fade out smoothly via scale
            const scale = Math.sin(progress * Math.PI) * 1.5;
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
        }
        instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, pulseCount]}>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.8} toneMapped={false} /> {/* Emerald Green pulses to user */}
        </instancedMesh>
    );
}

// Easing function to slow down at the start and end of each waypoint
function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function CameraController({ towerPos, adminBuildingPos }: { towerPos: THREE.Vector3, adminBuildingPos: THREE.Vector3 }) {
    const scroll = useScroll();
    const vLookAt = useMemo(() => new THREE.Vector3(2, 2, 2), []);

    useFrame((state) => {
        const t = Math.max(0, Math.min(1, scroll.offset));

        let targetPos = new THREE.Vector3();
        let targetLookAt = new THREE.Vector3();

        if (t < 0.2) {
            // PAGE 1: Overview
            let p = t / 0.2; // 0 to 1
            p = easeInOutCubic(p);
            const radius = 35 - (p * 5);
            const angle = state.clock.elapsedTime * 0.05 + Math.PI / 4;
            targetPos.set(Math.cos(angle) * radius, 15 - (p * 5), Math.sin(angle) * radius);
            targetLookAt.set(2, 2, 2);
        } else if (t < 0.4) {
            // PAGE 2: Transmitter Tower
            let p = (t - 0.2) / 0.2;
            p = easeInOutCubic(p);
            const p1Pos = new THREE.Vector3(Math.cos(state.clock.elapsedTime * 0.05 + Math.PI / 4) * 30, 10, Math.sin(state.clock.elapsedTime * 0.05 + Math.PI / 4) * 30);
            const p1Look = new THREE.Vector3(2, 2, 2);

            const p2Pos = new THREE.Vector3(towerPos.x + 12, towerPos.y + 6, towerPos.z + 12);
            const p2Look = new THREE.Vector3(towerPos.x, towerPos.y + 8, towerPos.z);

            targetPos.lerpVectors(p1Pos, p2Pos, p);
            targetLookAt.lerpVectors(p1Look, p2Look, p);
        } else if (t < 0.6) {
            // PAGE 3: Optical Lines
            let p = (t - 0.4) / 0.2;
            p = easeInOutCubic(p);
            const p2Pos = new THREE.Vector3(towerPos.x + 12, towerPos.y + 6, towerPos.z + 12);
            const p2Look = new THREE.Vector3(towerPos.x, towerPos.y + 8, towerPos.z);

            const p3Pos = new THREE.Vector3(-5, 6, -5);
            const p3Look = new THREE.Vector3(5, 5, -15);

            targetPos.lerpVectors(p2Pos, p3Pos, p);
            targetLookAt.lerpVectors(p2Look, p3Look, p);
        } else if (t < 0.8) {
            // PAGE 4: Admin Building
            let p = (t - 0.6) / 0.2;
            p = easeInOutCubic(p);
            const p3Pos = new THREE.Vector3(-5, 6, -5);
            const p3Look = new THREE.Vector3(5, 5, -15);

            const p4Pos = new THREE.Vector3(adminBuildingPos.x - 8, adminBuildingPos.y + 5, adminBuildingPos.z + 10);
            const p4Look = new THREE.Vector3(adminBuildingPos.x, adminBuildingPos.y + 6, adminBuildingPos.z);

            targetPos.lerpVectors(p3Pos, p4Pos, p);
            targetLookAt.lerpVectors(p3Look, p4Look, p);
        } else {
            // PAGE 5-6: Normal website scroll.
            let p = Math.min((t - 0.8) / 0.2, 1.0);
            p = easeInOutCubic(p);
            const p4Pos = new THREE.Vector3(adminBuildingPos.x - 8, adminBuildingPos.y + 5, adminBuildingPos.z + 10);
            const p4Look = new THREE.Vector3(adminBuildingPos.x, adminBuildingPos.y + 6, adminBuildingPos.z);

            const p5Pos = new THREE.Vector3(adminBuildingPos.x - 8, adminBuildingPos.y + 15, adminBuildingPos.z + 10);
            const p5Look = new THREE.Vector3(adminBuildingPos.x, adminBuildingPos.y + 20, adminBuildingPos.z - 20); // Looking up

            targetPos.lerpVectors(p4Pos, p5Pos, p);
            targetLookAt.lerpVectors(p4Look, p5Look, p);
        }

        state.camera.position.lerp(targetPos, 0.05);
        vLookAt.lerp(targetLookAt, 0.05);
        state.camera.lookAt(vLookAt);
    });

    return null;
}

export default function Hero3D() {
    // Tower on the bottom left of the screen (negative X, positive Z)
    const towerPos = useMemo(() => new THREE.Vector3(-18, -1, 12), []);
    const towerHeight = 12; // Increased again per user request

    // Admin building on the bottom right of the screen (positive X, positive Z)
    const adminBuildingPos = useMemo(() => new THREE.Vector3(18, -1, 15), []);

    // L-Shaped utility pole layout matching sketch (from default camera view)
    // Path: Starts at Tech Building (-X, +Z) -> Goes Deep (-Z) -> Turns Right (+X)
    const polePaths = useMemo(() => {
        const trunkRaw = [
            new THREE.Vector3(-15, -1, 8),   // Pole 1 (Near Tech Building)
            new THREE.Vector3(-15, -1, 0),   // Pole 2
            new THREE.Vector3(-15, -1, -8),  // Pole 3
            new THREE.Vector3(-15, -1, -12), // Corner start
            new THREE.Vector3(-13, -1, -14), // Corner smooth turning
            new THREE.Vector3(-8, -1, -15),  // Pole 6
            new THREE.Vector3(0, -1, -15),   // Pole 7
            new THREE.Vector3(8, -1, -15),   // Pole 8
            new THREE.Vector3(16, -1, -15),  // Pole 9 (Passing far behind Admin Building)
            new THREE.Vector3(25, -1, -15),  // Pole 10
        ];

        // Helper to calculate rotations so pole cross-arms are perpendicular to the wire
        const addRotations = (points: THREE.Vector3[]) => {
            return points.map((pos, i) => {
                let dir = new THREE.Vector3();
                if (i < points.length - 1) {
                    // Face towards next pole
                    dir.subVectors(points[i + 1], pos);
                } else if (i > 0) {
                    // Last pole faces from previous pole
                    dir.subVectors(pos, points[i - 1]);
                } else {
                    dir.set(1, 0, 0); // fallback
                }

                // Vector angle in XZ plane
                const angle = Math.atan2(-dir.z, dir.x);
                // Offset by 90 degrees so the cross-arm is perpendicular to the wire
                return { pos, rotY: angle + Math.PI / 2 };
            });
        };

        return [addRotations(trunkRaw)];
    }, []);

    // Get flat list of all unique poles for rendering
    const allPoles = useMemo(() => {
        const unique = new Map();
        polePaths.forEach(path => {
            path.forEach(p => {
                const key = `${p.pos.x},${p.pos.y},${p.pos.z}`;
                if (!unique.has(key)) unique.set(key, p);
            });
        });
        return Array.from(unique.values());
    }, [polePaths]);

    // Attach cables to insulators based on rotation
    const getInsulatorWorldPos = (pole: any, localX: number, localY: number) => {
        const worldX = pole.pos.x + Math.cos(pole.rotY) * localX;
        const worldZ = pole.pos.z - Math.sin(pole.rotY) * localX;
        return new THREE.Vector3(worldX, pole.pos.y + localY, worldZ);
    };

    // Precalculate all bezier curves for all branches
    const cables = useMemo(() => {
        const curvesData: THREE.QuadraticBezierCurve3[] = [];

        // We need to use the actual physical pole for rotation lookups so junctions don't break insulators
        const uniquePolesMap = new Map();
        allPoles.forEach(p => uniquePolesMap.set(`${p.pos.x},${p.pos.y},${p.pos.z}`, p));

        polePaths.forEach(path => {
            for (let i = 0; i < path.length - 1; i++) {
                const key1 = `${path[i].pos.x},${path[i].pos.y},${path[i].pos.z}`;
                const key2 = `${path[i + 1].pos.x},${path[i + 1].pos.y},${path[i + 1].pos.z}`;

                const p1 = uniquePolesMap.get(key1) || path[i];
                const p2 = uniquePolesMap.get(key2) || path[i + 1];

                // 3 separate lines per span (Top, Bottom Left, Bottom Right)
                const start1 = getInsulatorWorldPos(p1, 0, 4.88);
                const end1 = getInsulatorWorldPos(p2, 0, 4.88);

                // Keep wires straight (uncrossed)
                const start2 = getInsulatorWorldPos(p1, -0.4, 4.08);
                const end2 = getInsulatorWorldPos(p2, -0.4, 4.08);

                const start3 = getInsulatorWorldPos(p1, 0.4, 4.08);
                const end3 = getInsulatorWorldPos(p2, 0.4, 4.08);

                [
                    { start: start1, end: end1 },
                    { start: start2, end: end2 },
                    { start: start3, end: end3 }
                ].forEach(({ start, end }) => {
                    const midX = (start.x + end.x) / 2;
                    const midY = (start.y + end.y) / 2 - 0.5; // Droop
                    const midZ = (start.z + end.z) / 2;
                    const curve = new THREE.QuadraticBezierCurve3(start, new THREE.Vector3(midX, midY, midZ), end);
                    curvesData.push(curve);
                });
            }
        });

        return curvesData;
    }, [polePaths, allPoles]);


    // Cables connecting the building to the first pole in the network
    const buildingCables = useMemo(() => {
        const curvesData: THREE.QuadraticBezierCurve3[] = [];

        // Roof of the building (approximate center top)
        const roofCenter = new THREE.Vector3(towerPos.x - 3, 1.2, towerPos.z + 1);

        const firstPole = polePaths[0][0];

        // 3 separate lines to the first pole's insulators
        const end1 = getInsulatorWorldPos(firstPole, 0, 4.88);
        const end2 = getInsulatorWorldPos(firstPole, -0.4, 4.08);
        const end3 = getInsulatorWorldPos(firstPole, 0.4, 4.08);

        [end1, end2, end3].forEach((end) => {
            const midX = (roofCenter.x + end.x) / 2;
            const midY = (roofCenter.y + end.y) / 2 - 0.5; // Droop
            const midZ = (roofCenter.z + end.z) / 2;
            const curve = new THREE.QuadraticBezierCurve3(roofCenter, new THREE.Vector3(midX, midY, midZ), end);
            curvesData.push(curve);
        });

        return curvesData;
    }, [polePaths, towerPos]);

    // House locations
    const house1Pos = useMemo(() => new THREE.Vector3(-8, -1, -1), []);
    const house2Pos = useMemo(() => new THREE.Vector3(15, 2, 8), []);
    const house3Pos = useMemo(() => new THREE.Vector3(-6, -1, -9), []);

    const towerToHouseReceiverRot = [-Math.PI / 2 - 0.2, -0.6, Math.PI]; // Pointing towards tower

    const dropPath = useMemo(() => {
        // Just dummy dropping path for type safety since environment is hidden
        const path = new THREE.CurvePath<THREE.Vector3>();
        path.add(new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)));
        return path;
    }, []);

    return (
        <>
            <fog attach="fog" args={['#e0f2fe', 20, 70]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[20, 30, 10]} intensity={1.2} color="#ffffff" />
            <pointLight position={[-10, 10, -5]} intensity={0.5} color="#FF6B00" />

            <CameraController towerPos={towerPos} adminBuildingPos={adminBuildingPos} />

            <group>
                {/* Terrain (Grass) base */}
                <Box args={[150, 0.5, 150]} position={[0, -1.25, 0]}>
                    <meshStandardMaterial color="#86efac" roughness={1} />
                </Box>

                {/* Building right next to the transmitter tower */}
                <group position={[towerPos.x - 3, -1, towerPos.z + 1]}>
                    {/* Main building block */}
                    <Box args={[4, 2, 3]} position={[0, 1, 0]}>
                        <meshStandardMaterial color="#CBD5E1" roughness={0.8} />
                    </Box>
                    {/* A small flat roof */}
                    <Box args={[4.2, 0.2, 3.2]} position={[0, 2.1, 0]}>
                        <meshStandardMaterial color="#64748B" roughness={0.9} />
                    </Box>
                    {/* Tech details on roof */}
                    <Box args={[0.8, 0.6, 0.8]} position={[1, 2.2, -0.5]}>
                        <meshStandardMaterial color="#94A3B8" roughness={0.7} />
                    </Box>
                </group>

                {/* Administrative Building (far away) */}
                <AdminBuilding position={[adminBuildingPos.x, adminBuildingPos.y, adminBuildingPos.z]} rotation={[0, -Math.PI / 6, 0]} />

                {/* Rolling Hills using huge spheres to create smooth curves - reduced geometry */}
                <Sphere args={[25, 16, 16]} position={[20, -22, -20]} scale={[1, 0.5, 1]}>
                    <meshStandardMaterial color="#4ade80" roughness={1} />
                </Sphere>
                <Sphere args={[18, 16, 16]} position={[25, -15, 15]} scale={[1, 0.4, 1]}>
                    <meshStandardMaterial color="#4ade80" roughness={1} />
                </Sphere>
                <Sphere args={[30, 16, 16]} position={[-25, -28, -25]} scale={[1, 0.3, 1]}>
                    <meshStandardMaterial color="#4ade80" roughness={1} />
                </Sphere>
                {(() => {
                    const showEnvironment = false;
                    if (!showEnvironment) return null;
                    return (
                        <group key="environment">
                            {/* Roads */}
                            {/* Road segment 1 (X axis) extending further */}
                            <Box args={[40, 0.1, 4]} position={[-10, -0.95, -7.5]}>
                                <meshStandardMaterial color="#64748B" roughness={0.9} />
                            </Box>
                            {/* Road segment 2 (Z axis) */}
                            <Box args={[4, 0.1, 40]} position={[6.5, -0.95, 10]}>
                                <meshStandardMaterial color="#64748B" roughness={0.9} />
                            </Box>

                            {/* Scattered Bushes (replacing tall trees) */}
                            <Bush position={[-12, -0.5, -2]} scale={1.2} />
                            <Bush position={[-10, -0.5, -9]} scale={1.5} />
                            <Bush position={[-5, -0.5, -2]} scale={1.1} />
                            <Bush position={[-1, -0.5, -10]} scale={1.8} />
                            <Bush position={[2, -0.5, -1]} scale={1.3} />
                            <Bush position={[10, -0.5, 2]} scale={1.6} />
                            <Bush position={[2, -0.5, 10]} scale={1.2} />
                            <Bush position={[10, 0.5, 15]} scale={2.0} />
                            <Bush position={[18, 3, -4]} scale={2.5} />
                            <Bush position={[-8, -0.5, 6]} scale={1.5} />
                        </group>
                    );
                })()}

                {/* Utility Poles - Unique ones */}
                {allPoles.map((pole, idx) => (
                    <UtilityPole
                        key={`pole-${idx}`}
                        position={[pole.pos.x, pole.pos.y, pole.pos.z]}
                        rotation={[0, pole.rotY, 0]}
                    />
                ))}

                {/* Building to First Pole Connections */}
                {buildingCables.map((curve, idx) => {
                    const points = curve.getPoints(8);
                    return (
                        <group key={`building-cable-${idx}`}>
                            <Line points={points} color="#1E293B" lineWidth={1.5} />
                            <DataPulse curve={curve} speed={1.5} color="#FF6B00" delay={idx * 0.2 + 0.1} />
                            <DataPulse curve={curve} speed={2} color="#3B82F6" delay={idx * 0.4 + 0.6} />
                        </group>
                    );
                })}

                {/* Main Power/Data cables */}
                {cables.map((curve, idx) => {
                    const points = curve.getPoints(8); // Lower point count for lines
                    return (
                        <group key={`cable-${idx}`}>
                            <Line points={points} color="#1E293B" lineWidth={1.5} />
                            <DataPulse curve={curve} speed={1.5} color="#FF6B00" delay={idx * 0.2} />
                            <DataPulse curve={curve} speed={2} color="#3B82F6" delay={idx * 0.4 + 0.5} />
                        </group>
                    );
                })}

                {/* Transmitter Tower on a distant hill */}
                <TransmitterTower position={[towerPos.x, towerPos.y, towerPos.z]} height={towerHeight} />

                {/* 2-Way Wireless Link: Main Tower <-> Admin Building Roof */}
                {Array.from({ length: 4 }).map((_, i) => (
                    <WirelessPulse
                        key={`tower-to-admin-${i}`}
                        start={new THREE.Vector3(towerPos.x, towerPos.y + towerHeight + 1, towerPos.z)}
                        end={new THREE.Vector3(adminBuildingPos.x + 5, adminBuildingPos.y + 6.2 + 2.5, adminBuildingPos.z - 1)} // Adjusted for simple mast
                        speed={1.0}
                        color="#3B82F6" // Blue ping
                        delay={i * 1.5}
                        pulseSize={0.25}
                    />
                ))}
                {Array.from({ length: 4 }).map((_, i) => (
                    <WirelessPulse
                        key={`admin-to-tower-${i}`}
                        start={new THREE.Vector3(adminBuildingPos.x + 5, adminBuildingPos.y + 6.2 + 2.5, adminBuildingPos.z - 1)}
                        end={new THREE.Vector3(towerPos.x, towerPos.y + towerHeight + 1, towerPos.z)}
                        speed={1.0}
                        color="#f97316" // Orange ping
                        delay={i * 1.5 + 0.75}
                        pulseSize={0.25}
                    />
                ))}

                {/* Interactive Pulses from Tower to Mouse */}
                <InteractiveMousePulses startPos={new THREE.Vector3(towerPos.x, towerPos.y + towerHeight + 1, towerPos.z)} />

                {/* Environment-dependent connections (drop cables and house wireless links) */}
                {(() => {
                    const showEnvironment = false;
                    if (!showEnvironment) return null;

                    return (
                        <group key="house-connections">
                            {/* Drop cable to house 1 */}
                            <group>
                                <Line points={dropPath.getPoints(40)} color="#1E293B" lineWidth={1.5} />
                                <DataPulse curve={dropPath} speed={1.5} color="#3B82F6" delay={0.2} />
                                <DataPulse curve={dropPath} speed={1.5} color="#f97316" delay={1.2} />
                            </group>

                            {/* Wireless Links from Tower to the wireless house */}
                            {Array.from({ length: 8 }).map((_, i) => (
                                <WirelessPulse
                                    key={`tower-pulse-${i}`}
                                    start={new THREE.Vector3(towerPos.x, towerPos.y + towerHeight + 1, towerPos.z + 0.5)}
                                    // To house 2 receiver
                                    end={new THREE.Vector3(house2Pos.x, house2Pos.y + 2.05, house2Pos.z)}
                                    speed={1.2}
                                    color="#0ea5e9"
                                    delay={i * 0.6}
                                    pulseSize={0.2}
                                />
                            ))}
                        </group>
                    );
                })()}

                {/* Houses */}
                {(() => {
                    const showEnvironment = false;
                    if (!showEnvironment) return null;
                    return (
                        <>
                            <ModernHouse position={[house1Pos.x, house1Pos.y, house1Pos.z]} hasFiberBox={true} />
                            <ModernHouse position={[house3Pos.x, house3Pos.y, house3Pos.z]} /> {/* Secondary house */}
                            <ModernHouse position={[house2Pos.x, house2Pos.y, house2Pos.z]} hasWifiReceiver={true} receiverRotation={towerToHouseReceiverRot as any} />
                        </>
                    );
                })()}
            </group>

            {/* Cameras are now controlled by CameraController based on scroll offset */}
        </>
    );
}
