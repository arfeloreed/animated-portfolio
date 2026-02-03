import { useEffect, useRef } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "../../stores/useAppStore";
import { SECTIONS } from "../../lib/constants";

export function ScrollController() {
  const scroll = useScroll();
  const { targetSection, clearTargetSection, setCurrentSection } = useAppStore();
  const isAnimating = useRef(false);
  const targetOffset = useRef<number | null>(null);

  // Handle navigation requests
  useEffect(() => {
    if (targetSection) {
      const index = SECTIONS.indexOf(targetSection);
      if (index !== -1) {
        // Calculate target scroll offset (0 to 1)
        targetOffset.current = index / (SECTIONS.length - 1);
        isAnimating.current = true;
      }
      clearTargetSection();
    }
  }, [targetSection, clearTargetSection]);

  // Animate scroll to target
  useFrame(() => {
    if (isAnimating.current && targetOffset.current !== null) {
      const current = scroll.offset;
      const target = targetOffset.current;
      const diff = target - current;

      // Smooth interpolation with faster convergence
      if (Math.abs(diff) < 0.002) {
        scroll.offset = target;
        isAnimating.current = false;
        targetOffset.current = null;
      } else {
        scroll.offset += diff * 0.12;
      }
    }

    // Update current section based on scroll position
    const sectionIndex = Math.round(scroll.offset * (SECTIONS.length - 1));
    const clampedIndex = Math.max(0, Math.min(sectionIndex, SECTIONS.length - 1));
    setCurrentSection(SECTIONS[clampedIndex]);
  });

  return null;
}
