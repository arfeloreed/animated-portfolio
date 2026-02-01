import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Preload, PerformanceMonitor } from '@react-three/drei';
import { useAppStore } from '../../stores/useAppStore';
import { Office } from './Office';
import { CameraRig } from './CameraRig';
import { SECTIONS } from '../../lib/constants';

// HTML content sections
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Projects } from '../sections/Projects';
import { Contact } from '../sections/Contact';

function SceneContent() {
  return (
    <>
      <CameraRig />
      <Office />
    </>
  );
}

function LoadingComplete() {
  const { setLoading, setLoadingProgress, setSceneReady } = useAppStore();

  useEffect(() => {
    setLoadingProgress(100);
    setSceneReady(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [setLoading, setLoadingProgress, setSceneReady]);

  return null;
}

export function Scene() {
  const { dpr, setDpr, setLoadingProgress } = useAppStore();

  return (
    <Canvas
      dpr={[1, dpr]}
      camera={{ position: [0, 1.5, 4], fov: 50 }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
      }}
      onCreated={() => {
        setLoadingProgress(20);
      }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(Math.max(1, dpr - 0.5))}
        onIncline={() => setDpr(Math.min(2, dpr + 0.25))}
      />

      <ScrollControls pages={SECTIONS.length} damping={0.25}>
        {/* 3D Scene */}
        <Suspense fallback={null}>
          <SceneContent />
          <Preload all />
        </Suspense>

        {/* HTML Content Overlay */}
        <Scroll html>
          <div
            className="w-screen"
            style={{ height: `${SECTIONS.length * 100}vh` }}
            data-scroll-container
          >
            <Hero />
            <About />
            <Projects />
            <Contact />
          </div>
        </Scroll>
      </ScrollControls>

      {/* Trigger loading complete after scene mounts */}
      <LoadingComplete />
    </Canvas>
  );
}
