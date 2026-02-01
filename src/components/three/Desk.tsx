import { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export function Desk() {
  const woodMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4a3728',
        roughness: 0.7,
        metalness: 0.1,
      }),
    []
  );

  const legMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a2e',
        roughness: 0.3,
        metalness: 0.8,
      }),
    []
  );

  return (
    <group position={[0, 0, 0]}>
      {/* Desktop surface */}
      <RoundedBox
        args={[2.4, 0.08, 1]}
        radius={0.02}
        smoothness={4}
        position={[0, 0.75, -0.5]}
        castShadow
        receiveShadow
        material={woodMaterial}
      />

      {/* Front edge detail */}
      <RoundedBox
        args={[2.4, 0.04, 0.05]}
        radius={0.01}
        smoothness={4}
        position={[0, 0.73, 0]}
        material={woodMaterial}
      />

      {/* Left leg frame */}
      <group position={[-1.05, 0.375, -0.5]}>
        {/* Vertical post */}
        <mesh material={legMaterial} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.05]} />
        </mesh>
        {/* Horizontal support */}
        <mesh position={[0, -0.35, 0.2]} material={legMaterial} castShadow>
          <boxGeometry args={[0.05, 0.05, 0.5]} />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -0.36, 0.4]} material={legMaterial} castShadow>
          <boxGeometry args={[0.08, 0.03, 0.15]} />
        </mesh>
      </group>

      {/* Right leg frame */}
      <group position={[1.05, 0.375, -0.5]}>
        <mesh material={legMaterial} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.05]} />
        </mesh>
        <mesh position={[0, -0.35, 0.2]} material={legMaterial} castShadow>
          <boxGeometry args={[0.05, 0.05, 0.5]} />
        </mesh>
        <mesh position={[0, -0.36, 0.4]} material={legMaterial} castShadow>
          <boxGeometry args={[0.08, 0.03, 0.15]} />
        </mesh>
      </group>

      {/* Keyboard tray (subtle) */}
      <RoundedBox
        args={[0.8, 0.02, 0.3]}
        radius={0.01}
        smoothness={4}
        position={[0, 0.68, 0.1]}
        material={legMaterial}
      />
    </group>
  );
}
