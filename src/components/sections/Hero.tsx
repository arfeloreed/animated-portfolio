import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { PERSONAL } from '../../lib/constants';
import { useAppStore } from '../../stores/useAppStore';

export function Hero() {
  const { navigateToSection } = useAppStore();

  return (
    <section className="flex min-h-screen items-end justify-start px-8 pb-8 pt-[48vh] md:items-center md:px-16 md:py-0 lg:px-24">
      <GlassCard className="max-w-xl">
        <div className="space-y-6">
          {/* Greeting */}
          <p className="text-sm font-medium uppercase tracking-wider text-indigo-400">
            Welcome to my space
          </p>

          {/* Name */}
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              {PERSONAL.name}
            </span>
          </h1>

          {/* Title */}
          <p className="text-xl text-slate-300 md:text-2xl">
            {PERSONAL.title}
          </p>

          {/* Subtitle */}
          <p className="text-slate-400">
            {PERSONAL.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button onClick={() => navigateToSection("projects")}>
              View My Work
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigateToSection("contact")}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
