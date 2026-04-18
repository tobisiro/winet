import { useRef, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingIsland({ position, radiusX = 10, radiusZ = 10, depth = 3.5, irregularity = 3, floatPhase = 0, floatAmplitude = 0.15, children }: {
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
