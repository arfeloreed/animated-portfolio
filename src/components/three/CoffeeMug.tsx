import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../stores/useAppStore';

interface CoffeeMugProps {
  position?: [number, number, number];
}

export function CoffeeMug({ position = [0, 0, 0] }: CoffeeMugProps) {
  const steamRef = useRef<THREE.Points>(null);
  const prefersReducedMotion = useAppStore((s) => s.prefersReducedMotion);

  const mugMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f8fafc',
        roughness: 0.3,
        metalness: 0.1,
      }),
    []
  );

  const coffeeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3d2314',
        roughness: 0.2,
        metalness: 0,
      }),
    []
  );

  // Steam particles
  const steamGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(15 * 3);
    for (let i = 0; i < 15; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.02;
      positions[i * 3 + 1] = Math.random() * 0.05;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const steamMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#ffffff',
        size: 0.008,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  // Animate steam
  useFrame((state) => {
    if (steamRef.current && !prefersReducedMotion) {
      const positions = steamRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += 0.002;
        if (positions[i * 3 + 1] > 0.08) {
          positions[i * 3 + 1] = 0;
          positions[i * 3] = (Math.random() - 0.5) * 0.02;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }
      }
      steamRef.current.geometry.attributes.position.needsUpdate = true;
      steamMaterial.opacity = 0.2 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Mug body */}
      <mesh material={mugMaterial} castShadow>
        <cylinderGeometry args={[0.03, 0.025, 0.06, 16]} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.04, 0, 0]} rotation-z={Math.PI / 2} material={mugMaterial}>
        <torusGeometry args={[0.02, 0.005, 8, 16, Math.PI]} />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.025, 0]} material={coffeeMaterial}>
        <cylinderGeometry args={[0.027, 0.027, 0.005, 16]} />
      </mesh>

      {/* Steam particles */}
      {!prefersReducedMotion && (
        <points ref={steamRef} position={[0, 0.04, 0]} geometry={steamGeometry} material={steamMaterial} />
      )}
    </group>
  );
}
