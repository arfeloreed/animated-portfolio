import { useEffect, useRef } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "../../stores/useAppStore";
import { SECTIONS, SectionId } from "../../lib/constants";

function getSectionOffset(sectionId: SectionId, pages: number): number | null {
  const section = document.getElementById(sectionId);
  if (!section) return null;

  const sectionTop = section.offsetTop;
  const viewportHeight = window.innerHeight;
  const totalScrollableDistance = (pages - 1) * viewportHeight;

  if (totalScrollableDistance <= 0) return 0;

  // Clamp to 0-1 range
  return Math.min(Math.max(sectionTop / totalScrollableDistance, 0), 1);
}

export function ScrollController() {
  const scroll = useScroll();
  const { targetSection, clearTargetSection, setCurrentSection } = useAppStore();
  const isAnimating = useRef(false);
  const targetOffset = useRef<number | null>(null);

  // Handle navigation requests
  useEffect(() => {
    if (targetSection) {
      const offset = getSectionOffset(targetSection, scroll.pages);
      if (offset !== null) {
        targetOffset.current = offset;
        isAnimating.current = true;
      }
      clearTargetSection();
    }
  }, [targetSection, clearTargetSection, scroll.pages]);

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
    // Find which section is closest to current scroll position
    const viewportHeight = window.innerHeight;
    const totalScrollableDistance = (scroll.pages - 1) * viewportHeight;
    const currentScrollPosition = scroll.offset * totalScrollableDistance;

    let closestSection: SectionId = SECTIONS[0];
    let closestDistance = Infinity;

    for (const sectionId of SECTIONS) {
      const section = document.getElementById(sectionId);
      if (section) {
        const distance = Math.abs(section.offsetTop - currentScrollPosition);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = sectionId;
        }
      }
    }

    setCurrentSection(closestSection);
  });

  return null;
}
