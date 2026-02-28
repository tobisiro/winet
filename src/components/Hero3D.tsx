import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere, Cylinder, Box, Text3D, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';


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
                    font={`${import.meta.env.BASE_URL}Inter_Bold.json`}
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
                    font={`${import.meta.env.BASE_URL}Inter_Bold.json`}
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

// Single Irregular Island Shape
function MergedIsland() {
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        // Base irregular outline wrapping all current features.
        // In this mapped 2D coordinate system, y represents the -Z axis of the 3D world.
        // Tower(-18,12), Admin(12,6), Houses(-6,4; 2,-8; 8,2), Poles(12->25,-15)

        // Expanded shape to ensure it covers everything without submerging houses
        // Center of the houses is ~ (1, -1) with a radius of around 10.
        // Poles go up to x=25, z=-15.

        s.moveTo(-20, 22); // Starting point Top Left
        s.splineThru([
            new THREE.Vector2(-5, 18),    // Top dip
            new THREE.Vector2(10, 22),    // Top middle bulge
            new THREE.Vector2(30, 22),    // Top right outer corner
            new THREE.Vector2(32, 10),    // Right bulge top
            new THREE.Vector2(26, -2),    // Right dip (waist)
            new THREE.Vector2(32, -15),   // Right bulge bottom
            new THREE.Vector2(25, -24),   // Bottom right corner
            new THREE.Vector2(5, -26),    // Bottom sweep
            new THREE.Vector2(-2, -20),   // Bottom dip
            new THREE.Vector2(-15, -26),  // Bottom left bulge under tower
            new THREE.Vector2(-26, -20),  // Bottom left corner
            new THREE.Vector2(-28, -5),   // Left bulge
            new THREE.Vector2(-24, 5),    // Left dip
            new THREE.Vector2(-26, 16),   // Quick left bulge before top
            new THREE.Vector2(-20, 22)    // Close the loop
        ]);
        return s;
    }, []);

    const extrudeSettings = {
        depth: 4,
        bevelEnabled: true,
        bevelThickness: 0.8,
        bevelSize: 0.8,
        bevelSegments: 4,
        curveSegments: 24,
    };

    return (
        // Static island, rotated to lie flat on the XZ plane.
        // We set position Y to -1.8 to account for the 0.8 bevel, placing the top surface exactly at y=-1.0 where objects are anchored.
        <group position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            {/* The main landmass -> we sink it heavily downwards using local Z so the top face is precisely at y=0 (relative to group) */}
            <mesh position={[0, 0, -4]}>
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
            </mesh>
            {/* Outline Glow Effect / Water Edge */}
            <mesh position={[0, 0, -4.1]}>
                <extrudeGeometry args={[shape, { ...extrudeSettings, depth: 0.1, bevelEnabled: false }]} />
                <meshBasicMaterial color="#E0F2FE" transparent opacity={0.5} />
            </mesh>
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

function CameraController({ isExploreMode, onViewChange }: { isExploreMode: boolean, onViewChange: (vp: number) => void }) {
    const vLookAt = useMemo(() => new THREE.Vector3(2, 2, 2), []);

    const [scrollT, setScrollT] = useState(0);
    const activeVp = useRef(-1);

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

        const handleResize = () => {
            handleScroll();
        };

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

        if (t < 0.15) {
            // VP0: Hero – Admin building
            let p = t / 0.15;
            p = easeInOutCubic(p);
            const p1Pos = new THREE.Vector3(41.6, 11.0, 6.8);
            const p1Look = new THREE.Vector3(5, 3, 2);
            const p2Pos = new THREE.Vector3(33.1, 8.6, -9.4);
            const p2Look = new THREE.Vector3(5, 3, 0);

            targetPos.lerpVectors(p1Pos, p2Pos, p);
            targetLookAt.lerpVectors(p1Look, p2Look, p);
        } else if (t < 0.45) {
            // VP1: Fiber intro – pole line (Doubled duration)
            let p = (t - 0.15) / 0.30;
            p = easeInOutCubic(p);
            const p2Pos = new THREE.Vector3(33.1, 8.6, -9.4);
            const p2Look = new THREE.Vector3(5, 3, 0);
            const p3Pos = new THREE.Vector3(18.0, 4.2, -17.2);
            const p3Look = new THREE.Vector3(-5, 3, -8);

            targetPos.lerpVectors(p2Pos, p3Pos, p);
            targetLookAt.lerpVectors(p2Look, p3Look, p);
        } else if (t < 0.60) {
            // VP2: Cable detail close-up
            let p = (t - 0.45) / 0.15;
            p = easeInOutCubic(p);
            const p3Pos = new THREE.Vector3(18.0, 4.2, -17.2);
            const p3Look = new THREE.Vector3(-5, 3, -8);
            const p4Pos = new THREE.Vector3(3.3, 1.4, -18.1);
            const p4Look = new THREE.Vector3(-15, 4, -5);

            targetPos.lerpVectors(p3Pos, p4Pos, p);
            targetLookAt.lerpVectors(p3Look, p4Look, p);
        } else if (t < 0.75) {
            // VP3: Transmitter tower
            let p = (t - 0.60) / 0.15;
            p = easeInOutCubic(p);
            const p4Pos = new THREE.Vector3(3.3, 1.4, -18.1);
            const p4Look = new THREE.Vector3(-15, 4, -5);
            const p5Pos = new THREE.Vector3(-25.8, 3.0, -15.4);
            const p5Look = new THREE.Vector3(-18, 5, 12);

            targetPos.lerpVectors(p4Pos, p5Pos, p);
            targetLookAt.lerpVectors(p4Look, p5Look, p);
        } else if (t < 0.90) {
            // VP4: Houses/village
            let p = (t - 0.75) / 0.15;
            p = easeInOutCubic(p);
            const p5Pos = new THREE.Vector3(-25.8, 3.0, -15.4);
            const p5Look = new THREE.Vector3(-18, 5, 12);
            const p6Pos = new THREE.Vector3(16.1, 8.0, -24.7);
            const p6Look = new THREE.Vector3(2, 1, -6);

            targetPos.lerpVectors(p5Pos, p6Pos, p);
            targetLookAt.lerpVectors(p5Look, p6Look, p);
        } else {
            // VP5: Final zoom – house detail
            let p = Math.min((t - 0.90) / 0.10, 1.0);
            p = easeInOutCubic(p);
            const p6Pos = new THREE.Vector3(16.1, 8.0, -24.7);
            const p6Look = new THREE.Vector3(2, 1, -6);
            const p7Pos = new THREE.Vector3(13.3, 7.2, -19.3);
            const p7Look = new THREE.Vector3(2, 1.5, -8);

            targetPos.lerpVectors(p6Pos, p7Pos, p);
            targetLookAt.lerpVectors(p6Look, p7Look, p);
        }

        if (isExploreMode) return;

        // Determine active viewpoint with gaps (so cards disappear during transitions)
        let vp = -1;
        if (t >= 0.0 && t < 0.12) vp = 0;
        else if (t >= 0.18 && t < 0.42) vp = 1;
        else if (t >= 0.48 && t < 0.57) vp = 2;
        else if (t >= 0.63 && t < 0.72) vp = 3;
        else if (t >= 0.78 && t < 0.87) vp = 4;
        else if (t >= 0.92 && t <= 1.0) vp = 5;

        if (vp !== activeVp.current) {
            activeVp.current = vp;
            onViewChange(vp);
        }

        // Smoother lerp for cinematic feel (Only when NOT exploring)
        state.camera.position.lerp(targetPos, 0.08);
        vLookAt.lerp(targetLookAt, 0.08);
        state.camera.lookAt(vLookAt);
    });

    return null;
}

export default function Hero3D({ isExploreMode = false }: { isExploreMode?: boolean }) {
    // Tower on the bottom left of the screen (negative X, positive Z)
    const towerPos = useMemo(() => new THREE.Vector3(-18, -1, 12), []);
    const towerHeight = 12;

    const [activeVp, setActiveVp] = useState(0);

    // Admin building
    const adminBuildingPos = useMemo(() => new THREE.Vector3(12, -1, 6), []); // Moved to mid-left

    // Extended Utility Pole Layout
    const polePaths = useMemo(() => {
        const trunkRaw = [
            new THREE.Vector3(12, -1, 17),   // Starts behind Admin
            new THREE.Vector3(0, -1, 16),    // Top middle
            new THREE.Vector3(-10, -1, 15),  // Approaching tower
            new THREE.Vector3(-15, -1, 14),  // Behind tower
            new THREE.Vector3(-15, -1, 8),   // Point 1 (Near Tech Building)
            new THREE.Vector3(-15, -1, 0),   // Point 2
            new THREE.Vector3(-15, -1, -8),  // Point 3
            new THREE.Vector3(-15, -1, -12), // Corner start
            new THREE.Vector3(-13, -1, -14), // Corner smooth turning
            new THREE.Vector3(-8, -1, -15),  // Point 6
            new THREE.Vector3(0, -1, -15),   // Point 7
            new THREE.Vector3(8, -1, -15),   // Point 8
            new THREE.Vector3(16, -1, -15),  // Point 9
            new THREE.Vector3(25, -1, -15),  // Point 10
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

                // ** CHANGED TO 4 FIRES **
                // 2 on top arm (Left, Right)
                const startTopLeft = getInsulatorWorldPos(p1, -0.4, 4.88);
                const endTopLeft = getInsulatorWorldPos(p2, -0.4, 4.88);

                const startTopRight = getInsulatorWorldPos(p1, 0.4, 4.88);
                const endTopRight = getInsulatorWorldPos(p2, 0.4, 4.88);

                // 2 on bottom arm (Left, Right)
                const startBotLeft = getInsulatorWorldPos(p1, -0.8, 4.08); // Spread wider
                const endBotLeft = getInsulatorWorldPos(p2, -0.8, 4.08);

                const startBotRight = getInsulatorWorldPos(p1, 0.8, 4.08); // Spread wider
                const endBotRight = getInsulatorWorldPos(p2, 0.8, 4.08);

                [
                    { start: startTopLeft, end: endTopLeft },
                    { start: startTopRight, end: endTopRight },
                    { start: startBotLeft, end: endBotLeft },
                    { start: startBotRight, end: endBotRight }
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


    // Cables connecting the building to the nearest pole in the network
    const buildingCables = useMemo(() => {
        const curvesData: THREE.QuadraticBezierCurve3[] = [];

        // Roof of the building (approximate center top)
        const roofCenter = new THREE.Vector3(towerPos.x - 3, 1.2, towerPos.z + 1);

        // Find the pole closest to the building
        let nearestPole = allPoles[0];
        let minDistance = Infinity;
        allPoles.forEach(pole => {
            const dist = pole.pos.distanceTo(roofCenter);
            if (dist < minDistance) {
                minDistance = dist;
                nearestPole = pole;
            }
        });

        // 4 separate lines to the nearest pole's insulators
        const endTopLeft = getInsulatorWorldPos(nearestPole, -0.4, 4.88);
        const endTopRight = getInsulatorWorldPos(nearestPole, 0.4, 4.88);
        const endBotLeft = getInsulatorWorldPos(nearestPole, -0.8, 4.08);
        const endBotRight = getInsulatorWorldPos(nearestPole, 0.8, 4.08);

        [endTopLeft, endTopRight, endBotLeft, endBotRight].forEach((end) => {
            const midX = (roofCenter.x + end.x) / 2;
            const midY = (roofCenter.y + end.y) / 2 - 0.5; // Droop
            const midZ = (roofCenter.z + end.z) / 2;
            const curve = new THREE.QuadraticBezierCurve3(roofCenter, new THREE.Vector3(midX, midY, midZ), end);
            curvesData.push(curve);
        });

        return curvesData;
    }, [allPoles, towerPos]);

    // Houses located in the center island according to sketch
    const house1Pos = useMemo(() => new THREE.Vector3(-6, -1, 4), []); // Bottom-left house (moved further right/back from admin)
    const house2Pos = useMemo(() => new THREE.Vector3(2, -1, -8), []);  // Top-middle house
    const house3Pos = useMemo(() => new THREE.Vector3(8, -1, 2), []);   // Right-middle house

    const towerToHouseReceiverRot = [-Math.PI / 2 - 0.2, -0.6, Math.PI]; // Pointing towards tower

    const dropPath = useMemo(() => {
        const path = new THREE.CurvePath<THREE.Vector3>();
        if (allPoles.length > 0) {
            let nearestPole = allPoles[0];
            let minDistance = Infinity;
            allPoles.forEach(pole => {
                const dist = pole.pos.distanceTo(house1Pos);
                if (dist < minDistance) {
                    minDistance = dist;
                    nearestPole = pole;
                }
            });

            const start = getInsulatorWorldPos(nearestPole, 0, 4.08); // lower pole wire
            const end = new THREE.Vector3(house1Pos.x, house1Pos.y + 1.5, house1Pos.z);
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2 - 2; // cable sag
            const midZ = (start.z + end.z) / 2;
            path.add(new THREE.QuadraticBezierCurve3(start, new THREE.Vector3(midX, midY, midZ), end));
        }
        return path;
    }, [allPoles, house1Pos]);

    return (
        <>
            <fog attach="fog" args={['#F8FAFC', 20, 70]} />
            <ambientLight intensity={1.2} />
            <directionalLight position={[20, 30, 10]} intensity={1.8} color="#ffffff" castShadow />
            <pointLight position={[-10, 10, -5]} intensity={0.6} color="#70489D" />

            {isExploreMode ? (
                <OrbitControls
                    makeDefault
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    target={[0, 0, 0]}
                />
            ) : (
                <CameraController isExploreMode={isExploreMode} onViewChange={() => { }} />
            )}

            <group>
                <MergedIsland />

                {/* Optional Tech Building next to Tower */}
                <group position={[towerPos.x - 3, -1, towerPos.z + 1]}>
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

                {/* Admin Building */}
                <AdminBuilding position={[adminBuildingPos.x, adminBuildingPos.y, adminBuildingPos.z]} rotation={[0, Math.PI / 4, 0]} />
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
                            <Line points={points} color="#A78BFA" lineWidth={1.5} />
                            <DataPulse curve={curve} speed={1.5} color="#70489D" delay={idx * 0.2 + 0.1} />
                            <DataPulse curve={curve} speed={2} color="#f97316" delay={idx * 0.4 + 0.6} />
                        </group>
                    );
                })}

                {/* Main Power/Data cables */}
                {cables.map((curve, idx) => {
                    const points = curve.getPoints(8); // Lower point count for lines
                    return (
                        <group key={`cable-${idx}`}>
                            <Line points={points} color="#A78BFA" lineWidth={1.5} />
                            <DataPulse curve={curve} speed={1.5} color="#70489D" delay={idx * 0.2} />
                            <DataPulse curve={curve} speed={2} color="#f97316" delay={idx * 0.4 + 0.5} />
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
                        end={new THREE.Vector3(adminBuildingPos.x, adminBuildingPos.y + 8.7, adminBuildingPos.z)} // Target admin roof origin
                        speed={1.0}
                        color="#70489D" // Purple ping
                        delay={i * 1.5}
                        pulseSize={0.25}
                    />
                ))}
                {Array.from({ length: 4 }).map((_, i) => (
                    <WirelessPulse
                        key={`admin-to-tower-${i}`}
                        start={new THREE.Vector3(adminBuildingPos.x, adminBuildingPos.y + 8.7, adminBuildingPos.z)}
                        end={new THREE.Vector3(towerPos.x, towerPos.y + towerHeight + 1, towerPos.z)}
                        speed={1.0}
                        color="#f97316" // Orange ping
                        delay={i * 1.5 + 0.75}
                        pulseSize={0.25}
                    />
                ))}



                {/* Environment-dependent connections (drop cables and house wireless links) */}
                {(() => {
                    const showEnvironment = true; // RE-ENABLED for the islands and houses
                    if (!showEnvironment) return null;

                    return (
                        <group key="house-connections">
                            {/* Drop cable to house 1 */}
                            <group>
                                <Line points={dropPath.getPoints(40)} color="#1E293B" lineWidth={1.5} />
                                <DataPulse curve={dropPath} speed={1.5} color="#70489D" delay={0.2} />
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
                                    color="#70489D"
                                    delay={i * 0.6}
                                    pulseSize={0.2}
                                />
                            ))}
                        </group>
                    );
                })()}

                {/* Houses and their central floating island (island removed) */}
                {(() => {
                    const showEnvironment = true; // RE-ENABLED for houses
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
