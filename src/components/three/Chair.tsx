import { useMemo } from 'react';
import * as THREE from 'three';

// Procedural office chair (no GLTF dependency)
export function Chair() {
  const seatMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2d2d42',
        roughness: 0.8,
        metalness: 0.1,
      }),
    []
  );

  const frameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a2e',
        roughness: 0.3,
        metalness: 0.7,
      }),
    []
  );

  return (
    <group position={[0, 0, 0.8]} rotation-y={Math.PI * 0.1}>
      {/* Seat cushion */}
      <mesh position={[0, 0.45, 0]} material={seatMaterial} castShadow>
        <boxGeometry args={[0.45, 0.08, 0.45]} />
      </mesh>

      {/* Backrest */}
      <mesh
        position={[0, 0.75, -0.2]}
        rotation-x={-0.1}
        material={seatMaterial}
        castShadow
      >
        <boxGeometry args={[0.42, 0.5, 0.06]} />
      </mesh>

      {/* Armrests */}
      <mesh position={[-0.23, 0.58, 0]} material={frameMaterial} castShadow>
        <boxGeometry args={[0.04, 0.04, 0.3]} />
      </mesh>
      <mesh position={[0.23, 0.58, 0]} material={frameMaterial} castShadow>
        <boxGeometry args={[0.04, 0.04, 0.3]} />
      </mesh>

      {/* Armrest supports */}
      <mesh position={[-0.23, 0.52, 0.1]} material={frameMaterial} castShadow>
        <boxGeometry args={[0.03, 0.1, 0.03]} />
      </mesh>
      <mesh position={[0.23, 0.52, 0.1]} material={frameMaterial} castShadow>
        <boxGeometry args={[0.03, 0.1, 0.03]} />
      </mesh>

      {/* Center pole */}
      <mesh position={[0, 0.25, 0]} material={frameMaterial} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.35]} />
      </mesh>

      {/* Gas lift cylinder */}
      <mesh position={[0, 0.08, 0]} material={frameMaterial} castShadow>
        <cylinderGeometry args={[0.025, 0.04, 0.1]} />
      </mesh>

      {/* Base star */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <mesh
          key={angle}
          position={[
            Math.sin((angle * Math.PI) / 180) * 0.22,
            0.03,
            Math.cos((angle * Math.PI) / 180) * 0.22,
          ]}
          rotation-y={(angle * Math.PI) / 180}
          material={frameMaterial}
          castShadow
        >
          <boxGeometry args={[0.04, 0.02, 0.22]} />
        </mesh>
      ))}

      {/* Casters */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <mesh
          key={`caster-${angle}`}
          position={[
            Math.sin((angle * Math.PI) / 180) * 0.28,
            0.02,
            Math.cos((angle * Math.PI) / 180) * 0.28,
          ]}
          material={frameMaterial}
          castShadow
        >
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>
      ))}
    </group>
  );
}
