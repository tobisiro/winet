import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function WirelessPulse({ start, end, speed, color, delay, pulseSize = 0.1 }: { start: THREE.Vector3, end: THREE.Vector3, speed: number, color: string, delay: number, pulseSize?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        const progress = ((time * speed + delay) % 10) / 10;

        if (progress >= 0 && progress <= 1) {
            meshRef.current.position.lerpVectors(start, end, progress);
            const opacity = Math.sin(progress * Math.PI) * 0.8;
            (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
            meshRef.current.visible = true;
        } else {
            meshRef.current.visible = false;
        }
    });

    return (
        <Sphere ref={meshRef} args={[pulseSize, 8, 8]} visible={false}>
            {/* Removed pointLight to save massive amounts of draw calls */}
            <meshBasicMaterial color={color} transparent opacity={0.8} toneMapped={false} />
        </Sphere>
    );
}
