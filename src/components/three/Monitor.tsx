import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export function Monitor() {
  const screenRef = useRef<THREE.Mesh>(null);

  const frameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a2e',
        roughness: 0.3,
        metalness: 0.7,
      }),
    []
  );

  const screenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0f0f1a',
        roughness: 0.1,
        metalness: 0.9,
        emissive: '#6366f1',
        emissiveIntensity: 0.15,
      }),
    []
  );

  // Subtle screen glow animation
  useFrame((state) => {
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group position={[0, 1.1, -0.8]}>
      {/* Monitor frame */}
      <RoundedBox
        args={[0.7, 0.45, 0.03]}
        radius={0.015}
        smoothness={4}
        material={frameMaterial}
        castShadow
      >
        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.016]} material={screenMaterial}>
          <planeGeometry args={[0.62, 0.38]} />
        </mesh>

        {/* Screen bezel lines (subtle detail) */}
        <mesh position={[0, -0.2, 0.016]}>
          <planeGeometry args={[0.1, 0.01]} />
          <meshBasicMaterial color="#4a4a6a" />
        </mesh>
      </RoundedBox>

      {/* Monitor stand neck */}
      <mesh position={[0, -0.35, 0]} material={frameMaterial} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
      </mesh>

      {/* Monitor stand base */}
      <RoundedBox
        args={[0.25, 0.02, 0.15]}
        radius={0.01}
        smoothness={4}
        position={[0, -0.46, 0.05]}
        material={frameMaterial}
        castShadow
      />

      {/* Subtle ambient screen light */}
      <pointLight
        position={[0, 0, 0.3]}
        intensity={0.3}
        color="#6366f1"
        distance={2}
        decay={2}
      />
    </group>
  );
}
