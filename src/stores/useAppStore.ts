import { create } from 'zustand';
import { SectionId, SECTIONS } from '../lib/constants';

type QualityTier = 'low' | 'medium' | 'high';

interface AppState {
  // Loading state
  isLoading: boolean;
  loadingProgress: number;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;

  // Current section
  currentSection: SectionId;
  sectionIndex: number;
  setCurrentSection: (section: SectionId) => void;

  // Navigation target (for programmatic scrolling)
  targetSection: SectionId | null;
  navigateToSection: (section: SectionId) => void;
  clearTargetSection: () => void;

  // Performance/quality
  qualityTier: QualityTier;
  dpr: number;
  setQualityTier: (tier: QualityTier) => void;
  setDpr: (dpr: number) => void;

  // Reduced motion preference
  prefersReducedMotion: boolean;
  setPrefersReducedMotion: (prefers: boolean) => void;

  // 3D ready state
  sceneReady: boolean;
  setSceneReady: (ready: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Loading
  isLoading: true,
  loadingProgress: 0,
  setLoading: (isLoading) => set({ isLoading }),
  setLoadingProgress: (loadingProgress) => set({ loadingProgress }),

  // Section
  currentSection: 'hero',
  sectionIndex: 0,
  setCurrentSection: (currentSection) =>
    set({
      currentSection,
      sectionIndex: SECTIONS.indexOf(currentSection),
    }),

  // Navigation target
  targetSection: null,
  navigateToSection: (targetSection) => set({ targetSection }),
  clearTargetSection: () => set({ targetSection: null }),

  // Quality
  qualityTier: 'high',
  dpr: 2,
  setQualityTier: (qualityTier) => set({ qualityTier }),
  setDpr: (dpr) => set({ dpr }),

  // Reduced motion
  prefersReducedMotion: false,
  setPrefersReducedMotion: (prefersReducedMotion) => set({ prefersReducedMotion }),

  // Scene ready
  sceneReady: false,
  setSceneReady: (sceneReady) => set({ sceneReady }),
}));
