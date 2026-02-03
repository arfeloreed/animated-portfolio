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
