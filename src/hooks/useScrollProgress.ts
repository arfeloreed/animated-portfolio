import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";

export function useScrollProgress() {
  const setScrollProgress = useAppStore((state) => state.setScrollProgress);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = documentHeight - viewportHeight;

      // Avoid division by zero and clamp to 0-1
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

      setScrollProgress(progress);
    };

    // Calculate initial value
    calculateProgress();

    // Listen to scroll events with passive listener for performance
    window.addEventListener("scroll", calculateProgress, { passive: true });

    // Also recalculate on resize (document height may change)
    window.addEventListener("resize", calculateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
    };
  }, [setScrollProgress]);
}
