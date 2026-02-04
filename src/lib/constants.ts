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
  github: 'https://github.com/arfeloreed',
  linkedin: 'https://www.linkedin.com/in/arfeloreed',
  twitter: 'https://twitter.com',
  facebook: 'https://www.facebook.com/arfeloreed',
  instagram: 'https://www.instagram.com/reedtorz',
} as const;

// Projects data
export const PROJECTS = [
  {
    id: 1,
    title: 'Best Kept Secret',
    description: 'Audio streaming platform with 800+ stories, subscription billing, and community features',
    tech: ['NextJS', 'Python', 'Flask', 'Epoch', 'MySQL', 'AWS'],
    image: '/bks.webp',
    link: 'https://www.bestkeptsecretaudio.com',
    github: '#',
  },
  {
    id: 2,
    title: 'BKS Voting System',
    description: 'Community voting platform for users to rank and influence upcoming content releases',
    tech: ['NextJS', 'Python', 'Typescript', 'MySQL', 'AWS'],
    image: '/bks-vote.webp',
    link: 'https://www.bksaudio.com',
    github: '#',
  },
  {
    id: 3,
    title: 'iPhone 15 Pro',
    description: 'A sleek, pixel-perfect clone of the iPhone 15 Pro landing page.',
    tech: ['Three.js', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/iphone.webp',
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
