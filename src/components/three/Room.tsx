import { useMemo } from 'react';
import * as THREE from 'three';

export function Room() {
  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2a2a3d',
        roughness: 0.9,
        metalness: 0,
      }),
    []
  );

  const floorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1e1e2f',
        roughness: 0.8,
        metalness: 0.1,
      }),
    []
  );

  return (
    <group>
      {/* Floor */}
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, 0, 0]}
        receiveShadow
        material={floorMaterial}
      >
        <planeGeometry args={[12, 12]} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 3, -4]} material={wallMaterial}>
        <boxGeometry args={[12, 6, 0.2]} />
      </mesh>

      {/* Left wall */}
      <mesh
        position={[-6, 3, 0]}
        rotation-y={Math.PI / 2}
        material={wallMaterial}
      >
        <boxGeometry args={[8, 6, 0.2]} />
      </mesh>

      {/* Right wall (partial for lighting) */}
      <mesh
        position={[6, 3, -1]}
        rotation-y={-Math.PI / 2}
        material={wallMaterial}
      >
        <boxGeometry args={[6, 6, 0.2]} />
      </mesh>

      {/* Baseboard trim */}
      <mesh position={[0, 0.1, -3.9]} material={wallMaterial}>
        <boxGeometry args={[12, 0.2, 0.1]} />
      </mesh>
      <mesh
        position={[-5.95, 0.1, 0]}
        rotation-y={Math.PI / 2}
        material={wallMaterial}
      >
        <boxGeometry args={[8, 0.2, 0.1]} />
      </mesh>
    </group>
  );
}
