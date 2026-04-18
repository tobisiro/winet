import { useMemo } from 'react';
import * as THREE from 'three';

export function useAbout3DText(font: any) {
    return useMemo(() => {
        const shapes = font.generateShapes("winet", 32);

        let dotIdx = -1;
        let minArea = Infinity;

        // Find the 'i' dot by finding the smallest bounding box
        shapes.forEach((shape: any, idx: number) => {
            shape.autoClose = true;
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            const pts = shape.getPoints();
            pts.forEach((p: any) => {
                if (p.x < minX) minX = p.x;
                if (p.x > maxX) maxX = p.x;
                if (p.y < minY) minY = p.y;
                if (p.y > maxY) maxY = p.y;
            });
            const area = (maxX - minX) * (maxY - minY);
            if (area < minArea) {
                minArea = area;
                dotIdx = idx;
            }
        });

        const letterShapes = shapes.filter((_: any, i: number) => i !== dotIdx);
        const dotShape = shapes[dotIdx];

        // Compute tower pos (true geometric center of the dot's bounding box)
        let minDotX = Infinity, maxDotX = -Infinity, minDotY = Infinity, maxDotY = -Infinity;
        const dotPts = dotShape.getPoints();
        dotPts.forEach((p: any) => {
            if (p.x < minDotX) minDotX = p.x;
            if (p.x > maxDotX) maxDotX = p.x;
            if (p.y < minDotY) minDotY = p.y;
            if (p.y > maxDotY) maxDotY = p.y;
        });
        const dx = (minDotX + maxDotX) / 2;
        const dy = (minDotY + maxDotY) / 2;
        const tPos = new THREE.Vector3(dx, 6, -dy);

        // Compute perimeter poles
        const pPaths: { poles: { pos: THREE.Vector3, rotY: number }[], curves: THREE.QuadraticBezierCurve3[] }[] = [];
        const allShapesForWiring = [...letterShapes, dotShape];

        allShapesForWiring.forEach(shape => {
            const subPaths = [shape, ...shape.holes];
            subPaths.forEach(subPath => {
                const rawPts = subPath.getPoints();
                if (rawPts.length > 0 && rawPts[0].equals(rawPts[rawPts.length - 1])) {
                    rawPts.pop();
                }
                if (rawPts.length < 3) return;

                const MIN_POLE_DIST = 2.5;
                const MAX_POLE_DIST = 12.0;
                const ANGLE_THRESHOLD = Math.PI / 4;

                const isCorner: boolean[] = new Array(rawPts.length).fill(false);
                for (let i = 0; i < rawPts.length; i++) {
                    const curr = rawPts[i];
                    const prev = rawPts[(i - 1 + rawPts.length) % rawPts.length];
                    const next = rawPts[(i + 1) % rawPts.length];
                    const dirIn = new THREE.Vector2().subVectors(curr, prev).normalize();
                    const dirOut = new THREE.Vector2().subVectors(next, curr).normalize();
                    const dot = dirIn.dot(dirOut);
                    const angle = Math.acos(Math.max(-1, Math.min(1, dot)));
                    if (angle >= ANGLE_THRESHOLD) {
                        isCorner[i] = true;
                    }
                }

                let finalPts2d: THREE.Vector2[] = [rawPts[0]];
                for (let i = 1; i < rawPts.length; i++) {
                    const curr = rawPts[i];
                    const lastKept = finalPts2d[finalPts2d.length - 1];
                    const dist = lastKept.distanceTo(curr);

                    if (dist > MAX_POLE_DIST) {
                        const numExtra = Math.floor(dist / MAX_POLE_DIST);
                        for (let j = 1; j <= numExtra; j++) {
                            const lerpP = new THREE.Vector2().lerpVectors(lastKept, curr, j / (numExtra + 1));
                            finalPts2d.push(lerpP);
                        }
                        finalPts2d.push(curr);
                    } else if (isCorner[i]) {
                        finalPts2d.push(curr);
                    } else if (dist >= MIN_POLE_DIST) {
                        finalPts2d.push(curr);
                    }
                }

                if (finalPts2d.length > 2) {
                    const first = finalPts2d[0];
                    const last = finalPts2d[finalPts2d.length - 1];
                    if (first.distanceTo(last) < MIN_POLE_DIST && !isCorner[rawPts.length - 1]) {
                        finalPts2d.pop();
                    }
                }

                const poles: { pos: THREE.Vector3, rotY: number }[] = [];
                for (let i = 0; i < finalPts2d.length; i++) {
                    const curr = finalPts2d[i];
                    const prev = finalPts2d[(i - 1 + finalPts2d.length) % finalPts2d.length];
                    const next = finalPts2d[(i + 1) % finalPts2d.length];

                    const dirIn = new THREE.Vector2().subVectors(curr, prev).normalize();
                    const dirOut = new THREE.Vector2().subVectors(next, curr).normalize();
                    let bisect = new THREE.Vector2().addVectors(dirIn, dirOut).normalize();
                    if (bisect.lengthSq() < 0.001) {
                        bisect.copy(dirIn).rotateAround(new THREE.Vector2(0, 0), Math.PI / 2);
                    } else {
                        bisect.rotateAround(new THREE.Vector2(0, 0), -Math.PI / 2);
                    }

                    const rotY = Math.atan2(bisect.y, bisect.x);
                    poles.push({ pos: new THREE.Vector3(curr.x, 6, -curr.y), rotY });
                }

                const curves: THREE.QuadraticBezierCurve3[] = [];
                const getInsPos = (pole: any, localX: number, localY: number) => {
                    const worldX = pole.pos.x + Math.cos(pole.rotY) * localX;
                    const worldZ = pole.pos.z - Math.sin(pole.rotY) * localX;
                    return new THREE.Vector3(worldX, pole.pos.y + localY, worldZ);
                };

                for (let i = 0; i < poles.length; i++) {
                    const p1 = poles[i];
                    const p2 = poles[(i + 1) % poles.length];

                    const startTopLeft = getInsPos(p1, -0.4, 4.88);
                    const endTopLeft = getInsPos(p2, -0.4, 4.88);
                    const startTopRight = getInsPos(p1, 0.4, 4.88);
                    const endTopRight = getInsPos(p2, 0.4, 4.88);
                    const startBotLeft = getInsPos(p1, -0.8, 4.08);
                    const endBotLeft = getInsPos(p2, -0.8, 4.08);
                    const startBotRight = getInsPos(p1, 0.8, 4.08);
                    const endBotRight = getInsPos(p2, 0.8, 4.08);

                    [
                        { start: startTopLeft, end: endTopLeft },
                        { start: startTopRight, end: endTopRight },
                        { start: startBotLeft, end: endBotLeft },
                        { start: startBotRight, end: endBotRight }
                    ].forEach(({ start, end }) => {
                        const midX = (start.x + end.x) / 2;
                        const midY = (start.y + end.y) / 2 - 0.5;
                        const midZ = (start.z + end.z) / 2;
                        curves.push(new THREE.QuadraticBezierCurve3(start, new THREE.Vector3(midX, midY, midZ), end));
                    });
                }
                pPaths.push({ poles, curves });
            });
        });

        return { letterShapes, dotShape, polePaths: pPaths, towerPos: tPos, towerHeight: 15 };
    }, [font]);
}

// Calculate precise center of the entire word to align CameraController perfectly
export function useAbout3DCenter(letterShapes: any[], dotShape: any) {
    return useMemo(() => {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        [...letterShapes, dotShape].forEach((shape: any) => {
            shape.getPoints().forEach((p: any) => {
                if (p.x < minX) minX = p.x;
                if (p.x > maxX) maxX = p.x;
                if (p.y < minY) minY = p.y;
                if (p.y > maxY) maxY = p.y;
            });
        });
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        return new THREE.Vector3(-centerX, 0, centerY);
    }, [letterShapes, dotShape]);
}
