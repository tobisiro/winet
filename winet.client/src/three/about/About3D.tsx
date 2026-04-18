import { Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { FontLoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';

// Common 3D components
import { UtilityPole, DataPulse, TransmitterTower, WirelessPulse } from '../components';

// Camera controller
import { AboutCameraController } from './AboutCameraController';

// Logic hooks
import { useAbout3DText, useAbout3DCenter } from './useAbout3DText';

const EXTRUDE_SETTINGS = {
    depth: 6,
    bevelEnabled: true,
    bevelThickness: 1.0,
    bevelSize: 1.0,
    bevelOffset: 0,
    bevelSegments: 5,
    curveSegments: 24,
};

const getBaseUrl = () => {
    // Vite base is usually /
    return '/';
};

export function About3D({ isExploreMode = false }: { isExploreMode?: boolean }) {
    const font = useLoader(FontLoader, `${getBaseUrl()}Inter_Bold.json`);

    // Generate text shapes and compute perimeter paths for poles
    const { letterShapes, dotShape, polePaths, towerPos, towerHeight } = useAbout3DText(font);

    // Calculate precise center of the entire word to align CameraController perfectly
    const textGroupOffset = useAbout3DCenter(letterShapes, dotShape);

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
                <AboutCameraController isExploreMode={isExploreMode} />
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
