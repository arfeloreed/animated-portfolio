import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LampProps {
  position?: [number, number, number];
  on?: boolean;
}

export function Lamp({ position = [0, 0, 0], on = true }: LampProps) {
  const glowRef = useRef<THREE.PointLight>(null);

  const baseMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a2e',
        roughness: 0.3,
        metalness: 0.7,
      }),
    []
  );

  const shadeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#fbbf24',
        roughness: 0.6,
        metalness: 0.1,
        emissive: on ? '#fbbf24' : '#000000',
        emissiveIntensity: on ? 0.3 : 0,
        side: THREE.DoubleSide,
      }),
    [on]
  );

  // Subtle flicker animation
  useFrame((state) => {
    if (glowRef.current && on) {
      glowRef.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.02, 0]} material={baseMaterial} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.04, 16]} />
      </mesh>

      {/* Arm - vertical */}
      <mesh position={[0, 0.2, 0]} material={baseMaterial} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.35, 8]} />
      </mesh>

      {/* Arm - angled */}
      <mesh
        position={[0.08, 0.35, 0]}
        rotation-z={-0.5}
        material={baseMaterial}
        castShadow
      >
        <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
      </mesh>

      {/* Lamp shade */}
      <mesh position={[0.15, 0.4, 0]} rotation-z={0.2} material={shadeMaterial}>
        <coneGeometry args={[0.08, 0.1, 16, 1, true]} />
      </mesh>

      {/* Light bulb (hidden inside shade) */}
      {on && (
        <>
          <mesh position={[0.15, 0.38, 0]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#fff5e6" />
          </mesh>

          {/* Actual light source */}
          <pointLight
            ref={glowRef}
            position={[0.15, 0.35, 0]}
            intensity={0.8}
            color="#fbbf24"
            distance={3}
            decay={2}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
          />
        </>
      )}
    </group>
  );
}
