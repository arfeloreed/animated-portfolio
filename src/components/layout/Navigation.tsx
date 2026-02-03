import { useAppStore } from '../../stores/useAppStore';
import { SECTIONS, SectionId } from '../../lib/constants';
import { cn } from '../../lib/utils';

const SECTION_LABELS: Record<SectionId, string> = {
  hero: 'Home',
  about: 'About',
  projects: 'Projects',
  contact: 'Contact',
};

export function Navigation() {
  const { currentSection, isLoading, navigateToSection } = useAppStore();

  if (isLoading) return null;

  return (
    <nav className="fixed right-6 top-1/2 z-40 -translate-y-1/2">
      <ul className="flex flex-col gap-4">
        {SECTIONS.map((section) => (
          <li key={section} className="group relative">
            {/* Label (appears on hover) */}
            <span
              className={cn(
                'absolute right-8 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-white/10 px-3 py-1.5 text-sm opacity-0 backdrop-blur-sm transition-all duration-200',
                'group-hover:opacity-100',
                currentSection === section ? 'text-white' : 'text-slate-400'
              )}
            >
              {SECTION_LABELS[section]}
            </span>

            {/* Dot indicator */}
            <button
              onClick={() => navigateToSection(section)}
              className={cn(
                'relative h-3 w-3 rounded-full transition-all duration-300',
                currentSection === section
                  ? 'scale-125 bg-indigo-500'
                  : 'bg-white/30 hover:bg-white/50'
              )}
              aria-label={`Go to ${SECTION_LABELS[section]}`}
            >
              {currentSection === section && (
                <span className="absolute inset-0 animate-ping rounded-full bg-indigo-500/50" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
