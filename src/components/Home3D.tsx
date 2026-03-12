import { useRef, useMemo, useState, useEffect, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere, Cylinder, Box, Text3D, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const getBaseUrl = () => {
    const base = import.meta.env.BASE_URL || '/';
    return base.endsWith('/') ? base : `${base}/`;
};


// Modern House
function ModernHouse({ position, hasWifiReceiver = false, hasFiberBox = false, receiverRotation = [0, 0, 0] }: { position: [number, number, number]; hasWifiReceiver?: boolean; hasFiberBox?: boolean; receiverRotation?: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Base/Ground floor */}
            <Box args={[2.0, 1.5, 2.0]} position={[0, 0.75, 0]}>
                <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.1} />
            </Box>

            {/* Wooden accent pillar/wall -> Minimalist metal accent */}
            <Box args={[0.6, 1.5, 2.02]} position={[-0.7, 0.75, 0]}>
                <meshStandardMaterial color="#94A3B8" roughness={0.5} metalness={0.3} />
            </Box>

            {/* Flat modern roof */}
            <Box args={[2.3, 0.15, 2.3]} position={[0, 1.575, 0]}>
                <meshStandardMaterial color="#F8FAFC" roughness={0.2} />
            </Box>

            {/* Large Panorama Window Front */}
            <Box args={[1.2, 1.0, 0.05]} position={[0.3, 0.8, 1.0]}>
                <meshStandardMaterial color="#E0F2FE" roughness={0.05} metalness={0.9} transparent opacity={0.6} />
            </Box>
            <Box args={[1.2, 0.8, 0.05]} position={[0.3, 0.7, -1.0]}>
                <meshStandardMaterial color="#E0F2FE" roughness={0.05} metalness={0.9} transparent opacity={0.6} />
            </Box>

            {/* Door */}
            <Box args={[0.5, 1.0, 0.05]} position={[-0.7, 0.5, 1.02]}>
                <meshStandardMaterial color="#475569" />
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
            <Box args={[14, 2, 6]} position={[0, 1, 0]}>
                <meshStandardMaterial color="#F8FAFC" roughness={0.5} />
            </Box>
            {/* Glass windows on ground floor */}
            <Box args={[13.8, 1.4, 6.1]} position={[0, 1, 0]}>
                <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.8} transparent opacity={0.9} />
            </Box>

            {/* Second floor */}
            <Box args={[14, 2, 6]} position={[0, 3, 0]}>
                <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
            </Box>
            {/* Third floor */}
            <Box args={[14, 2, 6]} position={[0, 5, 0]}>
                <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
            </Box>

            {/* The brand new 3D winet logo on the top of the wall (facing the camera) */}
            <group position={[0, 4.5, 3.01]} rotation={[0, 0, 0]}>
                {/* A dark matte plate behind the logo for contrast depending on lighting */}
                <Box args={[7.5, 2.5, 0.05]} position={[0, 0, -0.02]}>
                    <meshStandardMaterial color="#E2E8F0" roughness={0.8} />
                </Box>
                <Text3D
                    font={`${getBaseUrl()}Inter_Bold.json`}
                    size={1.6}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.03}
                    bevelSize={0.03}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={[-3.2, -0.6, 0]} // Centering manually
                >
                    winet
                    <meshStandardMaterial color="#FF6B00" roughness={0.2} metalness={0.8} />
                </Text3D>
            </group>

            {/* A second 3D winet logo on the side of the wall (visible during load/start) */}
            <group position={[7.01, 5.0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <Box args={[4.5, 1.5, 0.05]} position={[0, 0, -0.02]}>
                    <meshStandardMaterial color="#E2E8F0" roughness={0.8} />
                </Box>
                <Text3D
                    font={`${getBaseUrl()}Inter_Bold.json`}
                    size={0.9}
                    height={0.1}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={[-1.8, -0.35, 0]} // Centering manually
                >
                    winet
                    <meshStandardMaterial color="#FF6B00" roughness={0.2} metalness={0.8} />
                </Text3D>
            </group>

            {/* Roof trim */}
            <Box args={[14.2, 0.2, 6.2]} position={[0, 6.1, 0]}>
                <meshStandardMaterial color="#E2E8F0" roughness={0.5} />
            </Box>

            {/* Balconies / Separator lines */}
            <Box args={[14.1, 0.4, 6.1]} position={[0, 4, 0]}>
                <meshStandardMaterial color="#E2E8F0" roughness={0.4} />
            </Box>
            <Box args={[14.1, 0.4, 6.1]} position={[0, 2, 0]}>
                <meshStandardMaterial color="#E2E8F0" roughness={0.4} />
            </Box>

            {/* Windows 2nd floor */}
            <Box args={[13.9, 1.2, 6.1]} position={[0, 3.1, 0]}>
                <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.8} transparent opacity={0.9} />
            </Box>
            {/* Windows 3rd floor */}
            <Box args={[13.9, 1.2, 6.1]} position={[0, 5.1, 0]}>
                <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.8} transparent opacity={0.9} />
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
                <meshStandardMaterial color="#F1F5F9" roughness={0.7} metalness={0.1} />
            </Cylinder>

            <group position={[0, 4.0, 0]}>
                <Cylinder args={[0.04, 0.04, 1.8, 8]} rotation={[0, 0, Math.PI / 2]}>
                    <meshStandardMaterial color="#E2E8F0" roughness={0.5} metalness={0.3} />
                </Cylinder>
                {/* Fixed braces */}
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

// Parametric Floating Island Component (Avatar-style levitating islands)
function FloatingIsland({ position, radiusX = 10, radiusZ = 10, depth = 3.5, irregularity = 3, floatPhase = 0, floatAmplitude = 0.15, children }: {
    position: [number, number, number];
    radiusX?: number;
    radiusZ?: number;
    depth?: number;
    irregularity?: number;
    floatPhase?: number;
    floatAmplitude?: number;
    children?: ReactNode;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const baseY = position[1];

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = baseY + Math.sin(state.clock.getElapsedTime() * 0.4 + floatPhase) * floatAmplitude;
        }
    });

    const shape = useMemo(() => {
        const s = new THREE.Shape();
        const segments = 24;
        const pts: THREE.Vector2[] = [];
        for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const noise = Math.sin(angle * irregularity + 1.3) * 0.12
                + Math.cos(angle * (irregularity + 1) - 0.7) * 0.08;
            const r = 1 + noise;
            pts.push(new THREE.Vector2(
                Math.cos(angle) * radiusX * r,
                Math.sin(angle) * radiusZ * r
            ));
        }
        s.moveTo(pts[0].x, pts[0].y);
        s.splineThru([...pts.slice(1), pts[0].clone()]);
        return s;
    }, [radiusX, radiusZ, irregularity]);

    const bevel = 0.8;
    const avgRadius = (radiusX + radiusZ) / 2;

    return (
        <group ref={groupRef} position={position}>
            {/* Main island top surface */}
            <group position={[0, -bevel, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <mesh position={[0, 0, -depth]}>
                    <extrudeGeometry args={[shape, {
                        depth,
                        bevelEnabled: true,
                        bevelThickness: bevel,
                        bevelSize: bevel,
                        bevelSegments: 4,
                        curveSegments: 24,
                    }]} />
                    <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
                </mesh>
                {/* Glow ring edge */}
                <mesh position={[0, 0, -depth - 0.1]}>
                    <extrudeGeometry args={[shape, { depth: 0.1, bevelEnabled: false, curveSegments: 24 }]} />
                    <meshBasicMaterial color="#E0F2FE" transparent opacity={0.4} />
                </mesh>
            </group>

            {/* Rocky underside - tapered cone for Avatar-style look */}
            <Cylinder
                args={[avgRadius * 0.55, avgRadius * 0.1, depth * 1.5, 10, 1]}
                position={[0, -bevel - depth - depth * 0.75, 0]}
            >
                <meshStandardMaterial color="#94A3B8" roughness={0.9} metalness={0.05} />
            </Cylinder>

            {/* Children (buildings, towers, etc.) sit at local y=0 */}
            {children}
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

// Industrial Metal Lattice Tower Component (Realistic Minimalist)
function TransmitterTower({ position, rotation = [0, 0, 0], height = 7 }: { position: [number, number, number], rotation?: [number, number, number], height?: number }) {
    const levels = Math.max(3, Math.floor(height / 1.75));
    const levelHeight = height / levels;
    const baseWidth = 1.6;
    const topWidth = 0.4;

    // Materials (minimalist matte white/silver)
    const towerMat = <meshStandardMaterial color="#F8FAFC" roughness={0.3} metalness={0.2} />;
    const swanLightMat = <meshBasicMaterial color="#70489D" />; // SWAN purple for top

    const getMatForLevel = (_l: number) => towerMat;

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

            {/* Blinking Top Light */}
            <Sphere args={[0.1, 8, 8]} position={[0, height + 2.1, 0]}>
                {swanLightMat}
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



// Easing function to slow down at the start and end of each waypoint
function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function CameraController({ isExploreMode }: { isExploreMode: boolean }) {
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

export default function Home3D({ isExploreMode = false }: { isExploreMode?: boolean }) {
    // ═══ ISLAND POSITIONS (world coordinates) — spread further apart ═══
    const island1Pos: [number, number, number] = [0, 0, 0];       // Tower Island (center)
    const island2Pos: [number, number, number] = [-35, 3, -14];   // Winet Building Island (further left)
    const island3Pos: [number, number, number] = [30, -1, -18];   // Residential Island (further right)

    const towerHeight = 12;

    // ═══ RESIDENTIAL VILLAGE LAYOUT ═══
    // Houses along the pole "street". Fiber box is at house local Z=-1.01.
    // Houses on +Z side: fiber box faces road (no rotation)
    // Houses on -Z side: rotated 180° so fiber box faces road
    const housePositions: { pos: [number, number, number]; rotY: number; fiberBox: boolean; wifiReceiver: boolean }[] = [
        { pos: [-7, 0, 4], rotY: 0, fiberBox: true, wifiReceiver: false }, // H1: +Z side, near P1
        { pos: [1, 0, 5], rotY: 0, fiberBox: true, wifiReceiver: false }, // H2: +Z side, near P2
        { pos: [-3, 0, -4], rotY: Math.PI, fiberBox: true, wifiReceiver: false }, // H3: -Z side, near P1
        { pos: [5, 0, -5], rotY: Math.PI, fiberBox: true, wifiReceiver: false }, // H4: -Z side, near P3
        { pos: [9, 0, 4], rotY: 0, fiberBox: false, wifiReceiver: true }, // H5: +Z side, near P4
    ];

    // ═══ UTILITY POLE HELPER ═══
    const addRotations = (points: THREE.Vector3[], flip180: boolean = false) => {
        return points.map((pos, i) => {
            let dir = new THREE.Vector3();
            if (i < points.length - 1) {
                dir.subVectors(points[i + 1], pos);
            } else if (i > 0) {
                dir.subVectors(pos, points[i - 1]);
            } else {
                dir.set(1, 0, 0);
            }
            const angle = Math.atan2(-dir.z, dir.x);
            return { pos, rotY: angle + Math.PI / 2 + (flip180 ? Math.PI : 0) };
        });
    };

    const getInsulatorWorldPos = (poleWorldX: number, poleWorldY: number, poleWorldZ: number, rotY: number, localX: number, localY: number) => {
        const worldX = poleWorldX + Math.cos(rotY) * localX;
        const worldZ = poleWorldZ - Math.sin(rotY) * localX;
        return new THREE.Vector3(worldX, poleWorldY + localY, worldZ);
    };

    // ═══ TOWER ISLAND POLES: route around transmitter, edge-to-edge ═══
    // P0 = edge facing Winet [-35,3,-14], P4 = edge facing Residential [30,-1,-18]
    const towerPoleLocals = useMemo(() => addRotations([
        new THREE.Vector3(-6, 0, 1),     // P0: edge toward Winet (cable arrives)
        new THREE.Vector3(-3, 0, 3),     // P1: routing around tower, north side
        new THREE.Vector3(2, 0, 3),      // P2: past tech building
        new THREE.Vector3(5, 0, 1),      // P3: routing south
        new THREE.Vector3(6, 0, -2),     // P4: edge toward Residential (cable departs)
    ]), []);

    // ═══ WINET ISLAND POLES: edge → mid → near building ═══
    const winetPoleLocals = useMemo(() => addRotations([
        new THREE.Vector3(12, 0, 4),     // Edge pole (cable arrives)
        new THREE.Vector3(10, 0, -1),    // Mid-route
        new THREE.Vector3(8, 0, -5),     // Near building (outside connection box)
    ], true), []); // Flip 180 degrees to uncross cables

    // ═══ RESIDENTIAL ISLAND: 5 poles forming the village "street" ═══
    const resiPoleLocals = useMemo(() => addRotations([
        new THREE.Vector3(-10, 0, 0),    // P0: Entry pole (cable arrives)
        new THREE.Vector3(-5, 0, 0),     // P1: Near houses H1, H3
        new THREE.Vector3(0, 0, 0),      // P2: Near house H2
        new THREE.Vector3(5, 0, 0),      // P3: Near house H4
        new THREE.Vector3(10, 0, 0),     // P4: Near house H5
    ]), []);

    // ═══ CABLE GENERATOR: pole-to-pole cables with 4 wires ═══
    const generatePoleCables = (
        poles: ReturnType<typeof addRotations>,
        islandPos: [number, number, number],
        segments: [number, number][]
    ) => {
        const curves: THREE.QuadraticBezierCurve3[] = [];
        const insulatorOffsets = [
            { lx: -0.4, ly: 4.88 }, { lx: 0.4, ly: 4.88 },
            { lx: -0.8, ly: 4.08 }, { lx: 0.8, ly: 4.08 },
        ];

        segments.forEach(([fromIdx, toIdx]) => {
            const from = poles[fromIdx];
            const to = poles[toIdx];
            insulatorOffsets.forEach(({ lx, ly }) => {
                const start = getInsulatorWorldPos(
                    islandPos[0] + from.pos.x, islandPos[1] + from.pos.y,
                    islandPos[2] + from.pos.z, from.rotY, lx, ly
                );
                const end = getInsulatorWorldPos(
                    islandPos[0] + to.pos.x, islandPos[1] + to.pos.y,
                    islandPos[2] + to.pos.z, to.rotY, lx, ly
                );
                const mid = new THREE.Vector3(
                    (start.x + end.x) / 2,
                    (start.y + end.y) / 2 - 0.4,
                    (start.z + end.z) / 2
                );
                curves.push(new THREE.QuadraticBezierCurve3(start, mid, end));
            });
        });
        return curves;
    };

    // Pole-to-pole cables on each island
    const towerPoleCables = useMemo(() =>
        generatePoleCables(towerPoleLocals, island1Pos, [[0, 1], [1, 2], [2, 3], [3, 4]]),
        [towerPoleLocals]);

    const winetPoleCables = useMemo(() =>
        generatePoleCables(winetPoleLocals, island2Pos, [[0, 1], [1, 2]]),
        [winetPoleLocals]);

    const resiPoleCables = useMemo(() =>
        generatePoleCables(resiPoleLocals, island3Pos, [[0, 1], [1, 2], [2, 3], [3, 4]]),
        [resiPoleLocals]);

    // ═══ DROP CABLES: Nearest pole to each house (pole insulator → fiber box on house) ═══
    const resiDropCables = useMemo(() => {
        const curves: THREE.QuadraticBezierCurve3[] = [];
        // H1→P1, H2→P2, H3→P1, H4→P3, H5→P4
        const houseToPolePairs: [{ pos: [number, number, number]; rotY: number }, number][] = [
            [housePositions[0], 1],  // H1 → P1
            [housePositions[1], 2],  // H2 → P2
            [housePositions[2], 1],  // H3 → P1
            [housePositions[3], 3],  // H4 → P3
            [housePositions[4], 4],  // H5 → P4
        ];

        houseToPolePairs.forEach(([house, poleIdx]) => {
            const pole = resiPoleLocals[poleIdx];
            const start = getInsulatorWorldPos(
                island3Pos[0] + pole.pos.x, island3Pos[1] + pole.pos.y,
                island3Pos[2] + pole.pos.z, pole.rotY, 0, 4.08
            );
            // Fiber box position: house back wall. For rotY=0 it's at local Z=-1.01.
            // For rotY=PI it's at local Z=+1.01 (flipped).
            const fiberBoxLocalZ = house.rotY === 0 ? -1.01 : 1.01;
            const fiberBoxWorld = new THREE.Vector3(
                island3Pos[0] + house.pos[0],
                island3Pos[1] + house.pos[1] + 0.6,
                island3Pos[2] + house.pos[2] + fiberBoxLocalZ
            );
            const mid = new THREE.Vector3(
                (start.x + fiberBoxWorld.x) / 2,
                (start.y + fiberBoxWorld.y) / 2 - 0.5,
                (start.z + fiberBoxWorld.z) / 2
            );
            curves.push(new THREE.QuadraticBezierCurve3(start, mid, fiberBoxWorld));
        });

        return curves;
    }, [resiPoleLocals]);

    // ═══ BUILDING CONNECTION: Winet last pole → building connection box ═══
    // The building is rotated Math.PI/4. Let's place the box on the right wall near the roof.
    // In unrotated local building coords: x=6.5, y=3.2, z=0 (lowered to be under the logo)
    // We rotate this point by PI/4 to get the connection point relative to island2Pos
    const winetConnectionBoxLocal = new THREE.Vector3(6.5, 3.2, 0);
    const winetConnectionBoxWorld = useMemo(() => {
        const rotated = winetConnectionBoxLocal.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4);
        return new THREE.Vector3(
            island2Pos[0] + rotated.x,
            island2Pos[1] + rotated.y,
            island2Pos[2] + rotated.z
        );
    }, []);

    const winetBuildingCable = useMemo(() => {
        const curves: THREE.QuadraticBezierCurve3[] = [];
        const lastPole = winetPoleLocals[winetPoleLocals.length - 1];

        // 4 wires from insulators to the single connection box
        const insulatorOffsets = [
            { lx: -0.4, ly: 4.88 }, { lx: 0.4, ly: 4.88 },
            { lx: -0.8, ly: 4.08 }, { lx: 0.8, ly: 4.08 },
        ];

        insulatorOffsets.forEach(({ lx, ly }) => {
            const poleWireStart = getInsulatorWorldPos(
                island2Pos[0] + lastPole.pos.x,
                island2Pos[1] + lastPole.pos.y,
                island2Pos[2] + lastPole.pos.z,
                lastPole.rotY,
                lx,
                ly
            );

            // Add a small spacing at the connection box so they don't merge into exactly one point immediately
            const boxEntry = new THREE.Vector3(
                winetConnectionBoxWorld.x,
                winetConnectionBoxWorld.y + (ly - 4.48) * 0.1, // slight vertical spread
                winetConnectionBoxWorld.z + lx * 0.1 // slight horizontal spread
            );

            const mid = new THREE.Vector3(
                (poleWireStart.x + boxEntry.x) / 2,
                (poleWireStart.y + boxEntry.y) / 2 + 0.3,
                (poleWireStart.z + boxEntry.z) / 2
            );
            curves.push(new THREE.QuadraticBezierCurve3(poleWireStart, mid, boxEntry));
        });

        return curves;
    }, [winetPoleLocals, winetConnectionBoxWorld]);

    // ═══ INTER-ISLAND FIBER OPTIC CABLES ═══
    const interIslandCables = useMemo(() => {
        const curves: THREE.QuadraticBezierCurve3[] = [];

        // Tower edge poles: P0 faces Winet, P4 faces Residential
        const towerToWinet = towerPoleLocals[0];  // P0
        const towerToResi = towerPoleLocals[towerPoleLocals.length - 1];  // P4
        const winetIn = winetPoleLocals[0];
        const resiIn = resiPoleLocals[0];

        const towerWinetEdge = new THREE.Vector3(
            island1Pos[0] + towerToWinet.pos.x, island1Pos[1] + towerToWinet.pos.y + 4.5,
            island1Pos[2] + towerToWinet.pos.z
        );
        const towerResiEdge = new THREE.Vector3(
            island1Pos[0] + towerToResi.pos.x, island1Pos[1] + towerToResi.pos.y + 4.5,
            island1Pos[2] + towerToResi.pos.z
        );
        const winetStart = new THREE.Vector3(
            island2Pos[0] + winetIn.pos.x, island2Pos[1] + winetIn.pos.y + 4.5,
            island2Pos[2] + winetIn.pos.z
        );
        const resiStart = new THREE.Vector3(
            island3Pos[0] + resiIn.pos.x, island3Pos[1] + resiIn.pos.y + 4.5,
            island3Pos[2] + resiIn.pos.z
        );

        // 4 wires per link (matching pole insulator positions)
        const insulatorOffsets = [
            { lx: -0.4, ly: 4.88 }, { lx: 0.4, ly: 4.88 },
            { lx: -0.8, ly: 4.08 }, { lx: 0.8, ly: 4.08 },
        ];

        // Helper: get insulator position on a pole at island edge
        const poleInsulatorPos = (edgePos: THREE.Vector3, rotY: number, lx: number, ly: number) => {
            const baseY = edgePos.y - 4.5; // edgePos already has +4.5, subtract to get base
            return getInsulatorWorldPos(edgePos.x, baseY, edgePos.z, rotY, lx, ly);
        };

        insulatorOffsets.forEach(({ lx, ly }) => {
            // Tower P0 → Winet (edge-to-edge)
            const s1 = poleInsulatorPos(towerWinetEdge, towerToWinet.rotY, lx, ly);
            const e1 = poleInsulatorPos(winetStart, winetIn.rotY, lx, ly);
            const mid1 = new THREE.Vector3(
                (s1.x + e1.x) / 2,
                Math.min(s1.y, e1.y) - 7,
                (s1.z + e1.z) / 2
            );
            curves.push(new THREE.QuadraticBezierCurve3(s1, mid1, e1));

            // Tower P4 → Residential (edge-to-edge)
            const s2 = poleInsulatorPos(towerResiEdge, towerToResi.rotY, lx, ly);
            const e2 = poleInsulatorPos(resiStart, resiIn.rotY, lx, ly);
            const mid2 = new THREE.Vector3(
                (s2.x + e2.x) / 2,
                Math.min(s2.y, e2.y) - 6,
                (s2.z + e2.z) / 2
            );
            curves.push(new THREE.QuadraticBezierCurve3(s2, mid2, e2));
        });

        return curves;
    }, [towerPoleLocals, winetPoleLocals, resiPoleLocals]);

    // Tower and Admin building world positions (for wireless links)
    const towerWorldPos = useMemo(() => new THREE.Vector3(
        island1Pos[0], island1Pos[1], island1Pos[2]
    ), []);
    const adminWorldPos = useMemo(() => new THREE.Vector3(
        island2Pos[0], island2Pos[1], island2Pos[2]
    ), []);

    return (
        <>
            <fog attach="fog" args={['#F8FAFC', 40, 110]} />
            <ambientLight intensity={1.2} />
            <directionalLight position={[20, 30, 10]} intensity={1.8} color="#ffffff" castShadow />
            <pointLight position={[-10, 10, -5]} intensity={0.6} color="#70489D" />

            {isExploreMode ? (
                <OrbitControls
                    makeDefault
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    target={[0, 3, -5]}
                />
            ) : (
                <CameraController isExploreMode={isExploreMode} />
            )}

            {/* ═══════════════════════════════════════════════ */}
            {/* ISLAND 1: Tower / Backbone (Center)            */}
            {/* ═══════════════════════════════════════════════ */}
            <FloatingIsland
                position={island1Pos}
                radiusX={8}
                radiusZ={8}
                depth={3.5}
                irregularity={3}
                floatPhase={0}
                floatAmplitude={0.12}
            >
                {/* Transmitter Tower */}
                <TransmitterTower position={[0, 0, 0]} height={towerHeight} />

                {/* Tech Equipment Building at tower base */}
                <group position={[-3, 0, 1]}>
                    <Box args={[4, 2, 3]} position={[0, 1, 0]}>
                        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
                    </Box>
                    <Box args={[4.2, 0.2, 3.2]} position={[0, 2.1, 0]}>
                        <meshStandardMaterial color="#F8FAFC" roughness={0.9} />
                    </Box>
                    <Box args={[0.8, 0.6, 0.8]} position={[1, 2.2, -0.5]}>
                        <meshStandardMaterial color="#E2E8F0" roughness={0.5} />
                    </Box>
                </group>

                {/* Utility Poles routing around the transmitter */}
                {towerPoleLocals.map((pole, idx) => (
                    <UtilityPole
                        key={`tower-pole-${idx}`}
                        position={[pole.pos.x, pole.pos.y, pole.pos.z]}
                        rotation={[0, pole.rotY, 0]}
                    />
                ))}
            </FloatingIsland>

            {/* ═══════════════════════════════════════════════ */}
            {/* ISLAND 2: Winet Building (Left / Higher)       */}
            {/* ═══════════════════════════════════════════════ */}
            <FloatingIsland
                position={island2Pos}
                radiusX={16}
                radiusZ={11}
                depth={3.5}
                irregularity={4}
                floatPhase={2.1}
                floatAmplitude={0.18}
            >
                <AdminBuilding position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]} />

                {/* Fiber Connection Box on the Winet Building */}
                {/* Pos and Rot mapped from winetConnectionBoxLocal + PI/4 rotation */}
                <group position={[
                    winetConnectionBoxWorld.x - island2Pos[0],
                    winetConnectionBoxWorld.y - island2Pos[1],
                    winetConnectionBoxWorld.z - island2Pos[2]
                ]} rotation={[0, Math.PI / 4, 0]}>
                    <Box args={[0.2, 0.5, 0.4]}>
                        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.5} />
                    </Box>
                    <Sphere args={[0.04, 6, 6]} position={[0.12, 0, 0]}>
                        <meshBasicMaterial color="#22C55E" />
                    </Sphere>
                </group>

                {/* Utility Poles on Winet Island */}
                {winetPoleLocals.map((pole, idx) => (
                    <UtilityPole
                        key={`winet-pole-${idx}`}
                        position={[pole.pos.x, pole.pos.y, pole.pos.z]}
                        rotation={[0, pole.rotY, 0]}
                    />
                ))}
            </FloatingIsland>

            {/* ═══════════════════════════════════════════════ */}
            {/* ISLAND 3: Residential Quarter (Right / Lower)  */}
            {/* ═══════════════════════════════════════════════ */}
            <FloatingIsland
                position={island3Pos}
                radiusX={14}
                radiusZ={14}
                depth={3.5}
                irregularity={5}
                floatPhase={4.2}
                floatAmplitude={0.10}
            >
                {/* Village houses — positioned on both sides of the pole "street" */}
                {housePositions.map((h, idx) => (
                    <group key={`house-${idx}`} position={h.pos} rotation={[0, h.rotY, 0]}>
                        <ModernHouse
                            position={[0, 0, 0]}
                            hasFiberBox={h.fiberBox}
                            hasWifiReceiver={h.wifiReceiver}
                            receiverRotation={h.wifiReceiver ? [-Math.PI / 2 - 0.2, -0.6, Math.PI] : undefined}
                        />
                    </group>
                ))}

                {/* Utility Poles forming the village "street" */}
                {resiPoleLocals.map((pole, idx) => (
                    <UtilityPole
                        key={`resi-pole-${idx}`}
                        position={[pole.pos.x, pole.pos.y, pole.pos.z]}
                        rotation={[0, pole.rotY, 0]}
                    />
                ))}
            </FloatingIsland>

            {/* ═══════════════════════════════════════════════ */}
            {/* INTER-ISLAND FIBER OPTIC CABLES + DATA PULSES  */}
            {/* ═══════════════════════════════════════════════ */}
            {interIslandCables.map((curve, idx) => {
                const points = curve.getPoints(30);
                return (
                    <group key={`inter-cable-${idx}`}>
                        <Line points={points} color="#A78BFA" lineWidth={2} />
                        <DataPulse curve={curve} speed={1.2} color="#70489D" delay={idx * 0.5} />
                        <DataPulse curve={curve} speed={1.8} color="#f97316" delay={idx * 0.5 + 1.5} />
                    </group>
                );
            })}

            {/* Pole-to-pole cables on Tower Island */}
            {towerPoleCables.map((curve, idx) => {
                const points = curve.getPoints(8);
                return (
                    <group key={`tower-cable-${idx}`}>
                        <Line points={points} color="#A78BFA" lineWidth={1.5} />
                        <DataPulse curve={curve} speed={1.5} color="#70489D" delay={idx * 0.15} />
                    </group>
                );
            })}

            {/* Pole-to-pole cables on Winet Island */}
            {winetPoleCables.map((curve, idx) => {
                const points = curve.getPoints(8);
                return (
                    <group key={`winet-cable-${idx}`}>
                        <Line points={points} color="#A78BFA" lineWidth={1.5} />
                        <DataPulse curve={curve} speed={1.5} color="#70489D" delay={idx * 0.15} />
                    </group>
                );
            })}

            {/* Winet building connection cable (last pole → building roof) */}
            {winetBuildingCable.map((curve, idx) => {
                const points = curve.getPoints(12);
                return (
                    <group key={`winet-bldg-cable-${idx}`}>
                        <Line points={points} color="#1E293B" lineWidth={1.5} />
                        <DataPulse curve={curve} speed={1.5} color="#70489D" delay={0.3} />
                        <DataPulse curve={curve} speed={1.5} color="#f97316" delay={1.3} />
                    </group>
                );
            })}

            {/* Pole-to-pole fiber cables on residential island */}
            {resiPoleCables.map((curve, idx) => {
                const points = curve.getPoints(8);
                return (
                    <group key={`resi-cable-${idx}`}>
                        <Line points={points} color="#A78BFA" lineWidth={1.5} />
                        <DataPulse curve={curve} speed={1.5} color="#70489D" delay={idx * 0.15} />
                        <DataPulse curve={curve} speed={2} color="#f97316" delay={idx * 0.3 + 0.5} />
                    </group>
                );
            })}

            {/* Fiber drop cables: poles to houses */}
            {resiDropCables.map((curve, idx) => {
                const points = curve.getPoints(12);
                return (
                    <group key={`resi-drop-${idx}`}>
                        <Line points={points} color="#1E293B" lineWidth={1.5} />
                        <DataPulse curve={curve} speed={1.5} color="#70489D" delay={idx * 0.8} />
                        <DataPulse curve={curve} speed={1.5} color="#f97316" delay={idx * 0.8 + 1.0} />
                    </group>
                );
            })}

            {/* ═══════════════════════════════════════════════ */}
            {/* WIRELESS LINKS: Tower ↔ Winet Building Roof    */}
            {/* ═══════════════════════════════════════════════ */}
            {Array.from({ length: 4 }).map((_, i) => (
                <WirelessPulse
                    key={`tower-to-admin-${i}`}
                    start={new THREE.Vector3(towerWorldPos.x, towerWorldPos.y + towerHeight + 1, towerWorldPos.z)}
                    end={new THREE.Vector3(adminWorldPos.x, adminWorldPos.y + 7, adminWorldPos.z)}
                    speed={1.0}
                    color="#70489D"
                    delay={i * 1.5}
                    pulseSize={0.25}
                />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
                <WirelessPulse
                    key={`admin-to-tower-${i}`}
                    start={new THREE.Vector3(adminWorldPos.x, adminWorldPos.y + 7, adminWorldPos.z)}
                    end={new THREE.Vector3(towerWorldPos.x, towerWorldPos.y + towerHeight + 1, towerWorldPos.z)}
                    speed={1.0}
                    color="#f97316"
                    delay={i * 1.5 + 0.75}
                    pulseSize={0.25}
                />
            ))}

            {/* Wireless from tower to residential house with wifi receiver (H5) */}
            {Array.from({ length: 6 }).map((_, i) => (
                <WirelessPulse
                    key={`tower-resi-${i}`}
                    start={new THREE.Vector3(towerWorldPos.x, towerWorldPos.y + towerHeight + 1, towerWorldPos.z)}
                    end={new THREE.Vector3(
                        island3Pos[0] + housePositions[4].pos[0],
                        island3Pos[1] + housePositions[4].pos[1] + 2.05,
                        island3Pos[2] + housePositions[4].pos[2]
                    )}
                    speed={1.2}
                    color="#70489D"
                    delay={i * 0.8}
                    pulseSize={0.2}
                />
            ))}
        </>
    );
}

