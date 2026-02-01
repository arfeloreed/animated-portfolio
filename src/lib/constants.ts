// Color palette - warm, cozy office aesthetic
export const COLORS = {
  // Primary palette
  primary: '#6366f1', // Indigo
  secondary: '#8b5cf6', // Violet
  accent: '#f59e0b', // Amber (warm lamp glow)

  // Background
  bgDark: '#0f0f1a',
  bgLight: '#1a1a2e',

  // 3D Scene colors
  wallColor: '#2a2a3d',
  floorColor: '#1e1e2f',
  deskColor: '#4a3728',

  // Text
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',

  // Glass effects
  glassBg: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
} as const;

// Section configuration
export const SECTIONS = ['hero', 'about', 'projects', 'contact'] as const;
export type SectionId = typeof SECTIONS[number];

// Camera positions for each section (x, y, z)
export const CAMERA_POSITIONS: Record<SectionId, [number, number, number]> = {
  hero: [0, 1.5, 4],
  about: [2, 2, 6],
  projects: [-3, 2, 5],
  contact: [0, 4, 8],
};

// Camera look-at targets for each section
export const CAMERA_TARGETS: Record<SectionId, [number, number, number]> = {
  hero: [0, 1, 0],
  about: [0, 1, 0],
  projects: [-1, 1, 0],
  contact: [0, 0, 0],
};

// Personal info
export const PERSONAL = {
  name: 'Reed',
  title: 'Product Engineer',
  subtitle: 'Building digital experiences with code & creativity',
  email: 'hello@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
} as const;

// Projects data
export const PROJECTS = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'A full-stack web application with real-time features',
    tech: ['React', 'Node.js', 'WebSocket'],
    image: '/projects/alpha.jpg',
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'Mobile-first e-commerce platform with smooth animations',
    tech: ['Next.js', 'Stripe', 'Framer Motion'],
    image: '/projects/beta.jpg',
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Project Gamma',
    description: '3D interactive data visualization dashboard',
    tech: ['Three.js', 'D3.js', 'TypeScript'],
    image: '/projects/gamma.jpg',
    link: '#',
    github: '#',
  },
] as const;

// Skills
export const SKILLS = {
  frontend: ['React', 'TypeScript', 'Next.js', 'Three.js', 'Tailwind CSS'],
  backend: ['Node.js', 'Python', 'PostgreSQL', 'Redis'],
  tools: ['Git', 'Docker', 'AWS', 'Figma'],
} as const;

// Performance thresholds
export const PERFORMANCE = {
  lowDpr: 1,
  mediumDpr: 1.5,
  highDpr: 2,
  targetFps: 60,
  minFps: 30,
} as const;
