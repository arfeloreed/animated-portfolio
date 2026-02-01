import { useRef } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

export function Lighting() {
  const spotLightRef = useRef<THREE.SpotLight>(null);

  return (
    <>
      {/* Ambient base lighting */}
      <ambientLight intensity={0.2} color="#a5b4fc" />

      {/* Main key light - warm desk lamp feel */}
      <spotLight
        ref={spotLightRef}
        position={[2, 3, 2]}
        angle={0.5}
        penumbra={0.8}
        intensity={1}
        color="#fbbf24"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Fill light - cool tone from window */}
      <directionalLight
        position={[-3, 4, 2]}
        intensity={0.3}
        color="#818cf8"
      />

      {/* Rim light - subtle back lighting */}
      <pointLight position={[0, 2, -3]} intensity={0.2} color="#c084fc" />

      {/* Environment for reflections and ambient lighting */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={0.5}
          color="#818cf8"
          position={[0, 5, -5]}
          rotation-x={Math.PI / 2}
          scale={[10, 10, 1]}
        />
        <Lightformer
          form="circle"
          intensity={0.8}
          color="#fbbf24"
          position={[3, 2, 3]}
          scale={2}
        />
        <Lightformer
          form="ring"
          intensity={0.3}
          color="#c084fc"
          position={[-3, 1, 2]}
          scale={3}
        />
      </Environment>
    </>
  );
}
