import { ReactNode } from 'react';
import { LoadingScreen } from './LoadingScreen';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-[#0f0f1a]">
      <LoadingScreen />
      {children}
    </div>
  );
}
