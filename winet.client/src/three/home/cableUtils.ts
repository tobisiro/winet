import * as THREE from 'three';

// ═══ UTILITY POLE HELPER ═══
export const addRotations = (points: THREE.Vector3[], flip180: boolean = false) => {
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

export const getInsulatorWorldPos = (poleWorldX: number, poleWorldY: number, poleWorldZ: number, rotY: number, localX: number, localY: number) => {
    const worldX = poleWorldX + Math.cos(rotY) * localX;
    const worldZ = poleWorldZ - Math.sin(rotY) * localX;
    return new THREE.Vector3(worldX, poleWorldY + localY, worldZ);
};

// ═══ CABLE GENERATOR ═══
export const generatePoleCables = (
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
