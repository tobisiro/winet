import { Box, Cylinder, Text3D } from '@react-three/drei';

const getBaseUrl = () => {
    return '/';
};

export function AdminBuilding({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
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
