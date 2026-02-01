import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { BakeShadows } from '@react-three/drei';
import { useAppStore } from '../../stores/useAppStore';

export function PerformanceManager() {
  const { gl, scene } = useThree();
  const qualityTier = useAppStore((s) => s.qualityTier);

  useEffect(() => {
    // Optimize static objects by disabling automatic matrix updates
    scene.traverse((object) => {
      // Skip objects that need to animate
      if (
        object.name.includes('animated') ||
        object.name.includes('float') ||
        object.userData.animated
      ) {
        return;
      }

      // Disable matrix auto update for static meshes
      if (object.type === 'Mesh' || object.type === 'Group') {
        object.matrixAutoUpdate = false;
        object.updateMatrix();
      }
    });

    // Configure renderer based on quality tier
    if (qualityTier === 'low') {
      gl.shadowMap.enabled = false;
    } else {
      gl.shadowMap.enabled = true;
      gl.shadowMap.type =
        qualityTier === 'high'
          ? 2 // PCFSoftShadowMap
          : 1; // PCFShadowMap
    }
  }, [scene, gl, qualityTier]);

  return (
    <>
      {/* Bake shadows for static scene elements */}
      {qualityTier !== 'low' && <BakeShadows />}
    </>
  );
}
