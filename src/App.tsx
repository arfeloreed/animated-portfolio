import { useEffect } from "react";
import { Layout } from "./components/layout/Layout";
import { Scene } from "./components/three/Scene";
import { useDeviceCapability } from "./hooks/useDeviceCapability";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";

function App() {
  // Initialize device capability detection
  useDeviceCapability();

  // Track scroll progress for camera animation
  useScrollProgress();

  // Handle reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      document.documentElement.classList.add("reduced-motion");
    }
  }, []);

  return (
    <Layout>
      {/* Fixed 3D scene as background */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Scrollable content on top */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </Layout>
  );
}

export default App;
