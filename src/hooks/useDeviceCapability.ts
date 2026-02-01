import { useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';

type GpuTier = 'low' | 'medium' | 'high';

interface DeviceCapability {
  gpuTier: GpuTier;
  isMobile: boolean;
  hasWebGL2: boolean;
  maxTextureSize: number;
  devicePixelRatio: number;
}

function detectGpuTier(): GpuTier {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) return 'low';

    const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'medium';

    const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    const rendererLower = renderer.toLowerCase();

    // High-end GPUs
    if (
      rendererLower.includes('nvidia') ||
      rendererLower.includes('radeon') ||
      rendererLower.includes('geforce') ||
      rendererLower.includes('apple m1') ||
      rendererLower.includes('apple m2') ||
      rendererLower.includes('apple m3')
    ) {
      return 'high';
    }

    // Low-end / integrated
    if (
      rendererLower.includes('intel') ||
      rendererLower.includes('mali') ||
      rendererLower.includes('adreno') ||
      rendererLower.includes('powervr')
    ) {
      return 'medium';
    }

    return 'medium';
  } catch {
    return 'medium';
  }
}

function getDeviceCapability(): DeviceCapability {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2');
  const hasWebGL2 = !!gl;

  let maxTextureSize = 4096;
  if (gl) {
    maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  }

  return {
    gpuTier: detectGpuTier(),
    isMobile,
    hasWebGL2,
    maxTextureSize,
    devicePixelRatio: window.devicePixelRatio || 1,
  };
}

export function useDeviceCapability() {
  const { setQualityTier, setDpr, setPrefersReducedMotion } = useAppStore();

  useEffect(() => {
    const capability = getDeviceCapability();

    // Set quality tier based on GPU
    setQualityTier(capability.gpuTier);

    // Set DPR based on device
    const targetDpr = Math.min(
      capability.devicePixelRatio,
      capability.gpuTier === 'high' ? 2 : capability.gpuTier === 'medium' ? 1.5 : 1
    );
    setDpr(targetDpr);

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setQualityTier, setDpr, setPrefersReducedMotion]);
}
