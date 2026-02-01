import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlantProps {
  position?: [number, number, number];
  scale?: number;
}

export function Plant({ position = [0, 0, 0], scale = 1 }: PlantProps) {
  const leavesRef = useRef<THREE.Group>(null);

  const potMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#5c4033',
        roughness: 0.9,
        metalness: 0,
      }),
    []
  );

  const soilMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2d1f1a',
        roughness: 1,
        metalness: 0,
      }),
    []
  );

  const leafMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#22c55e',
        roughness: 0.7,
        metalness: 0,
        side: THREE.DoubleSide,
      }),
    []
  );

  const stemMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#166534',
        roughness: 0.8,
        metalness: 0,
      }),
    []
  );

  // Gentle sway animation
  useFrame((state) => {
    if (leavesRef.current) {
      leavesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      leavesRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.01;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Pot */}
      <mesh material={potMaterial} castShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.12, 16]} />
      </mesh>

      {/* Pot rim */}
      <mesh position={[0, 0.06, 0]} material={potMaterial}>
        <cylinderGeometry args={[0.085, 0.08, 0.02, 16]} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, 0.05, 0]} material={soilMaterial}>
        <cylinderGeometry args={[0.075, 0.075, 0.02, 16]} />
      </mesh>

      {/* Plant group with animation */}
      <group ref={leavesRef}>
        {/* Main stem */}
        <mesh position={[0, 0.15, 0]} material={stemMaterial} castShadow>
          <cylinderGeometry args={[0.008, 0.012, 0.2, 8]} />
        </mesh>

        {/* Leaves - arranged around stem */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const height = 0.12 + (i % 3) * 0.06;
          const size = 0.04 + (i % 2) * 0.02;
          const rotation = (angle * Math.PI) / 180;

          return (
            <group key={angle} position={[0, height, 0]} rotation-y={rotation}>
              {/* Leaf - using elongated sphere */}
              <mesh
                position={[0.03, 0.02, 0]}
                rotation-z={-0.5 - (i % 3) * 0.2}
                rotation-x={0.2}
                material={leafMaterial}
                castShadow
              >
                <sphereGeometry args={[size, 8, 8]} />
                <mesh scale={[2, 1, 0.3]} />
              </mesh>
            </group>
          );
        })}

        {/* Top leaves - larger and pointing up */}
        {[0, 90, 180, 270].map((angle, i) => {
          const rotation = (angle * Math.PI) / 180;
          return (
            <group key={`top-${angle}`} position={[0, 0.24, 0]} rotation-y={rotation}>
              <mesh
                position={[0.02, 0.03, 0]}
                rotation-z={-0.3}
                rotation-x={0.1}
                material={leafMaterial}
                castShadow
              >
                <sphereGeometry args={[0.03, 8, 8]} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
