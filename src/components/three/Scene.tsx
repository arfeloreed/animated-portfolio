import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, PerformanceMonitor } from "@react-three/drei";
import { useAppStore } from "../../stores/useAppStore";
import { Office } from "./Office";
import { CameraRig } from "./CameraRig";

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
        powerPreference: "high-performance",
      }}
      style={{ pointerEvents: "none" }}
      onCreated={() => {
        setLoadingProgress(20);
      }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(Math.max(1, dpr - 0.5))}
        onIncline={() => setDpr(Math.min(2, dpr + 0.25))}
      />

      <Suspense fallback={null}>
        <CameraRig />
        <Office />
        <Preload all />
      </Suspense>

      <LoadingComplete />
    </Canvas>
  );
}
