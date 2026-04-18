import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function DataPulse({ curve, speed, color, delay }: { curve: THREE.CurvePath<THREE.Vector3> | THREE.QuadraticBezierCurve3, speed: number, color: string, delay: number }) {
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
