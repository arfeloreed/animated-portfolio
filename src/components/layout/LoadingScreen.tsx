import { useEffect, useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { cn } from '../../lib/utils';

export function LoadingScreen() {
  const { isLoading, loadingProgress } = useAppStore();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Fade out after loading complete
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f0f1a] transition-opacity duration-500',
        !isLoading && 'pointer-events-none opacity-0'
      )}
    >
      {/* Spinner */}
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-500" />
        <div
          className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-t-violet-500"
          style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
        />
      </div>

      {/* Progress */}
      <div className="mt-8 w-48">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <p className="mt-2 text-center text-sm text-slate-400">
          Loading experience...
        </p>
      </div>
    </div>
  );
}
