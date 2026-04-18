import { useMemo } from 'react';
import { OrbitControls, Line, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Shared Components
import { UtilityPole, DataPulse, TransmitterTower, WirelessPulse } from '../components';

// Home Specific Components
import { FloatingIsland } from './FloatingIsland';
import { HomeCameraController } from './HomeCameraController';
import { ModernHouse } from './ModernHouse';
import { AdminBuilding } from './AdminBuilding';

// Config and Utils
import { island1Pos, island2Pos, island3Pos, towerHeight, housePositions } from './islandLayout';
import { addRotations, getInsulatorWorldPos, generatePoleCables } from './cableUtils';

export function Home3D({ isExploreMode = false }: { isExploreMode?: boolean }) {
    // ═══ TOWER ISLAND POLES: route around transmitter, edge-to-edge ═══
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

        const insulatorOffsets = [
            { lx: -0.4, ly: 4.88 }, { lx: 0.4, ly: 4.88 },
            { lx: -0.8, ly: 4.08 }, { lx: 0.8, ly: 4.08 },
        ];

        insulatorOffsets.forEach(({ lx, ly }) => {
            const poleWireStart = getInsulatorWorldPos(
                island2Pos[0] + lastPole.pos.x, island2Pos[1] + lastPole.pos.y, island2Pos[2] + lastPole.pos.z,
                lastPole.rotY, lx, ly
            );

            const boxEntry = new THREE.Vector3(
                winetConnectionBoxWorld.x,
                winetConnectionBoxWorld.y + (ly - 4.48) * 0.1,
                winetConnectionBoxWorld.z + lx * 0.1
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
        const towerToWinet = towerPoleLocals[0];
        const towerToResi = towerPoleLocals[towerPoleLocals.length - 1];
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

        const insulatorOffsets = [
            { lx: -0.4, ly: 4.88 }, { lx: 0.4, ly: 4.88 },
            { lx: -0.8, ly: 4.08 }, { lx: 0.8, ly: 4.08 },
        ];

        const poleInsulatorPos = (edgePos: THREE.Vector3, rotY: number, lx: number, ly: number) => {
            const baseY = edgePos.y - 4.5;
            return getInsulatorWorldPos(edgePos.x, baseY, edgePos.z, rotY, lx, ly);
        };

        insulatorOffsets.forEach(({ lx, ly }) => {
            // Tower P0 → Winet (edge-to-edge)
            const s1 = poleInsulatorPos(towerWinetEdge, towerToWinet.rotY, lx, ly);
            const e1 = poleInsulatorPos(winetStart, winetIn.rotY, lx, ly);
            const mid1 = new THREE.Vector3((s1.x + e1.x) / 2, Math.min(s1.y, e1.y) - 7, (s1.z + e1.z) / 2);
            curves.push(new THREE.QuadraticBezierCurve3(s1, mid1, e1));

            // Tower P4 → Residential (edge-to-edge)
            const s2 = poleInsulatorPos(towerResiEdge, towerToResi.rotY, lx, ly);
            const e2 = poleInsulatorPos(resiStart, resiIn.rotY, lx, ly);
            const mid2 = new THREE.Vector3((s2.x + e2.x) / 2, Math.min(s2.y, e2.y) - 6, (s2.z + e2.z) / 2);
            curves.push(new THREE.QuadraticBezierCurve3(s2, mid2, e2));
        });

        return curves;
    }, [towerPoleLocals, winetPoleLocals, resiPoleLocals]);

    // Tower and Admin building world positions (for wireless links)
    const towerWorldPos = useMemo(() => new THREE.Vector3(...island1Pos), []);
    const adminWorldPos = useMemo(() => new THREE.Vector3(...island2Pos), []);

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
                <HomeCameraController isExploreMode={isExploreMode} />
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
                {/* Village houses */}
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

                {/* Utility Poles */}
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

            {/* Winet building connection cable */}
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
