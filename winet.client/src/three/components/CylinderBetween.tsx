import { useMemo } from 'react';
import * as THREE from 'three';
import { Cylinder } from '@react-three/drei';

export function CylinderBetween({ start, end, radius, material, extraLength = 0 }: { start: THREE.Vector3, end: THREE.Vector3, radius: number, material: any, extraLength?: number }) {
    const vec = useMemo(() => new THREE.Vector3().subVectors(end, start), [start, end]);
    const length = vec.length();
    const mid = useMemo(() => new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5), [start, end]);
    const quaternion = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vec.clone().normalize()), [vec]);

    return (
        <Cylinder args={[radius, radius, length + extraLength, 6]} position={mid} quaternion={quaternion}>
            {material}
        </Cylinder>
    );
}
