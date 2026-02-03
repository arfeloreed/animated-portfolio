import { create } from 'zustand';

type QualityTier = 'low' | 'medium' | 'high';

interface AppState {
  // Loading state
  isLoading: boolean;
  loadingProgress: number;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;

  // Scroll progress (0-1) for camera animation
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

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

  // Scroll progress
  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),

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
