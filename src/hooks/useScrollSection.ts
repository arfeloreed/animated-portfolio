import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { SECTIONS, SectionId } from '../lib/constants';

export function useScrollSection() {
  const scroll = useScroll();
  const setCurrentSection = useAppStore((state) => state.setCurrentSection);
  const lastSection = useRef<SectionId>('hero');

  useFrame(() => {
    const offset = scroll.offset;
    const sectionCount = SECTIONS.length;
    const sectionIndex = Math.min(
      Math.floor(offset * sectionCount),
      sectionCount - 1
    );
    const section = SECTIONS[sectionIndex];

    if (section !== lastSection.current) {
      lastSection.current = section;
      setCurrentSection(section);
    }
  });

  return scroll;
}

// Utility to get scroll progress within current section (0-1)
export function useSectionProgress() {
  const scroll = useScroll();
  const progressRef = useRef(0);

  useFrame(() => {
    const offset = scroll.offset;
    const sectionCount = SECTIONS.length;
    const sectionSize = 1 / sectionCount;
    const sectionStart = Math.floor(offset / sectionSize) * sectionSize;
    progressRef.current = (offset - sectionStart) / sectionSize;
  });

  return progressRef;
}
