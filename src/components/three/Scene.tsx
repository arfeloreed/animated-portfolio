import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Preload, PerformanceMonitor } from '@react-three/drei';
import { useAppStore } from '../../stores/useAppStore';
import { Office } from './Office';
import { CameraRig } from './CameraRig';
import { SECTIONS } from '../../lib/constants';

// Calculate pages needed based on screen size
function useResponsivePages() {
  const [pages, setPages] = useState<number>(SECTIONS.length);

  useEffect(() => {
    const updatePages = () => {
      // Align with Tailwind's md breakpoint (768px) where grid layouts change
      // Below 768px: Projects uses single column (3 stacked cards = tall)
      // At 768px+: Projects uses 2-column grid (less vertical space)
      const isMobile = window.innerWidth < 768;
      setPages(isMobile ? 5.1 : SECTIONS.length);
    };

    updatePages();
    window.addEventListener('resize', updatePages);
    return () => window.removeEventListener('resize', updatePages);
  }, []);

  return pages;
}

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
  const pages = useResponsivePages();

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

      <ScrollControls pages={pages} damping={0.25}>
        {/* 3D Scene */}
        <Suspense fallback={null}>
          <SceneContent />
          <Preload all />
        </Suspense>

        {/* HTML Content Overlay */}
        <Scroll html>
          <div
            className="w-screen"
            style={{ height: `${pages * 100}vh` }}
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
