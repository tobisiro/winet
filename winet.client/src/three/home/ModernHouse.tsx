import { Box, Cylinder } from '@react-three/drei';

export function ModernHouse({ position, hasWifiReceiver = false, hasFiberBox = false, receiverRotation = [0, 0, 0] }: { position: [number, number, number]; hasWifiReceiver?: boolean; hasFiberBox?: boolean; receiverRotation?: [number, number, number] }) {
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
