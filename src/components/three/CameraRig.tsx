import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "../../stores/useAppStore";
import { CAMERA_POSITIONS, CAMERA_TARGETS, SECTIONS } from "../../lib/constants";

export function CameraRig() {
  const { camera } = useThree();
  const { prefersReducedMotion, scrollProgress } = useAppStore();

  const targetPosition = useRef(new THREE.Vector3(...CAMERA_POSITIONS.hero));
  const targetLookAt = useRef(new THREE.Vector3(...CAMERA_TARGETS.hero));
  const currentLookAt = useRef(new THREE.Vector3(...CAMERA_TARGETS.hero));

  useFrame((_, delta) => {
    const sectionCount = SECTIONS.length;

    // Calculate current section based on scroll progress
    const sectionIndex = Math.min(
      Math.floor(scrollProgress * sectionCount),
      sectionCount - 1
    );
    const section = SECTIONS[sectionIndex];

    // Calculate progress within current section (0-1)
    const sectionSize = 1 / sectionCount;
    const sectionStart = sectionIndex * sectionSize;
    const sectionProgress = Math.min(
      (scrollProgress - sectionStart) / sectionSize,
      1
    );

    // Get current and next section positions
    const currentPos = CAMERA_POSITIONS[section];
    const nextSection = SECTIONS[Math.min(sectionIndex + 1, sectionCount - 1)];
    const nextPos = CAMERA_POSITIONS[nextSection];

    const currentTarget = CAMERA_TARGETS[section];
    const nextTarget = CAMERA_TARGETS[nextSection];

    // Interpolate between sections
    const easedProgress = easeInOutCubic(sectionProgress);

    targetPosition.current.set(
      THREE.MathUtils.lerp(currentPos[0], nextPos[0], easedProgress),
      THREE.MathUtils.lerp(currentPos[1], nextPos[1], easedProgress),
      THREE.MathUtils.lerp(currentPos[2], nextPos[2], easedProgress)
    );

    targetLookAt.current.set(
      THREE.MathUtils.lerp(currentTarget[0], nextTarget[0], easedProgress),
      THREE.MathUtils.lerp(currentTarget[1], nextTarget[1], easedProgress),
      THREE.MathUtils.lerp(currentTarget[2], nextTarget[2], easedProgress)
    );

    // Smoothly move camera
    const lerpFactor = prefersReducedMotion ? 1 : 1 - Math.exp(-3 * delta);

    camera.position.lerp(targetPosition.current, lerpFactor);
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// Easing function for smooth transitions
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
