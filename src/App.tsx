import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Scene } from './components/three/Scene';
import { useDeviceCapability } from './hooks/useDeviceCapability';

function App() {
  // Initialize device capability detection
  useDeviceCapability();

  // Handle reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      document.documentElement.classList.add('reduced-motion');
    }
  }, []);

  return (
    <Layout>
      <div className="fixed inset-0">
        <Scene />
      </div>
    </Layout>
  );
}

export default App;
