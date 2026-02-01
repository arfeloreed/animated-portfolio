import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../stores/useAppStore';

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  geometry: 'icosahedron' | 'torus' | 'torusKnot' | 'octahedron';
  size?: number;
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
}

function FloatingShape({
  position,
  color,
  geometry,
  size = 0.15,
  speed = 1,
  rotationIntensity = 1,
  floatIntensity = 1,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useAppStore((s) => s.prefersReducedMotion);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.3,
        metalness: 0.7,
        transparent: true,
        opacity: 0.8,
      }),
    [color]
  );

  useFrame((state) => {
    if (meshRef.current && !prefersReducedMotion) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[size, 0]} />;
      case 'torus':
        return <torusGeometry args={[size, size * 0.4, 16, 32]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[size, size * 0.3, 64, 8]} />;
      case 'octahedron':
        return <octahedronGeometry args={[size, 0]} />;
      default:
        return <icosahedronGeometry args={[size, 0]} />;
    }
  };

  if (prefersReducedMotion) {
    return (
      <mesh ref={meshRef} position={position} material={material}>
        {renderGeometry()}
      </mesh>
    );
  }

  return (
    <Float
      speed={speed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
    >
      <mesh ref={meshRef} position={position} material={material}>
        {renderGeometry()}
      </mesh>
    </Float>
  );
}

export function FloatingShapes() {
  const qualityTier = useAppStore((s) => s.qualityTier);

  // Reduce shapes on lower quality tiers
  const shapes = useMemo(() => {
    const allShapes = [
      { position: [-2, 2.5, -2] as [number, number, number], color: '#6366f1', geometry: 'icosahedron' as const, size: 0.12 },
      { position: [2.5, 1.8, -1.5] as [number, number, number], color: '#8b5cf6', geometry: 'torus' as const, size: 0.1 },
      { position: [-1.5, 3, 0] as [number, number, number], color: '#f59e0b', geometry: 'octahedron' as const, size: 0.08 },
      { position: [1.8, 2.8, -2.5] as [number, number, number], color: '#22c55e', geometry: 'torusKnot' as const, size: 0.1 },
      { position: [-2.5, 1.5, -1] as [number, number, number], color: '#ec4899', geometry: 'icosahedron' as const, size: 0.1 },
      { position: [0.5, 3.2, -1.8] as [number, number, number], color: '#06b6d4', geometry: 'torus' as const, size: 0.08 },
    ];

    if (qualityTier === 'low') return allShapes.slice(0, 2);
    if (qualityTier === 'medium') return allShapes.slice(0, 4);
    return allShapes;
  }, [qualityTier]);

  return (
    <group>
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          color={shape.color}
          geometry={shape.geometry}
          size={shape.size}
          speed={0.8 + index * 0.2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        />
      ))}
    </group>
  );
}
