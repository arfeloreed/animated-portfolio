import { Suspense } from 'react';
import { Room } from './Room';
import { Lighting } from './Lighting';
import { Desk } from './Desk';
import { Monitor } from './Monitor';
import { Chair } from './Chair';
import { Plant } from './Plant';
import { Lamp } from './Lamp';
import { CoffeeMug } from './CoffeeMug';
import { Bookshelf } from './Bookshelf';
import { FloatingShapes } from './FloatingShapes';
import { PerformanceManager } from './PerformanceManager';
import { useAppStore } from '../../stores/useAppStore';

export function Office() {
  const qualityTier = useAppStore((s) => s.qualityTier);

  return (
    <group>
      {/* Lighting setup */}
      <Lighting />

      {/* Performance optimizations */}
      <PerformanceManager />

      {/* Room structure - always render first */}
      <Room />

      {/* Core furniture - critical path */}
      <Suspense fallback={null}>
        <Desk />
        <Monitor />
        <Chair />
      </Suspense>

      {/* Secondary objects - can load progressively */}
      <Suspense fallback={null}>
        {/* Desk lamp */}
        <Lamp position={[0.9, 0.79, -0.6]} />

        {/* Coffee mug on desk */}
        <CoffeeMug position={[-0.7, 0.82, -0.3]} />

        {/* Plant on desk */}
        <Plant position={[1, 0.79, -0.4]} scale={0.8} />

        {/* Bookshelf on left wall */}
        <Bookshelf position={[-3.5, 0, -2]} />

        {/* Floor plant */}
        <Plant position={[2.5, 0, -1]} scale={1.5} />
      </Suspense>

      {/* Decorative elements - lowest priority */}
      {qualityTier !== 'low' && (
        <Suspense fallback={null}>
          <FloatingShapes />
        </Suspense>
      )}
    </group>
  );
}
