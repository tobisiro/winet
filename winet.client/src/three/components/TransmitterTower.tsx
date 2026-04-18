import { Box, Cylinder, Sphere } from '@react-three/drei';
import { CylinderBetween } from './CylinderBetween';
import * as THREE from 'three';

export function TransmitterTower({ position, rotation = [0, 0, 0], height = 7 }: { position: [number, number, number], rotation?: [number, number, number], height?: number }) {
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
                        // Avoid THREE imported directly if we don't need it, or we should import it. Wait, CylinderBetween uses THREE.Vector3, so we must import THREE if we use new THREE.Vector3
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
