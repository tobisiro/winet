import { Cylinder } from '@react-three/drei';

export function UtilityPole({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
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
