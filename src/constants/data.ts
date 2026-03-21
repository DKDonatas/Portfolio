import type { NavItem, Project, Skill, Experience, SocialLink } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const TYPING_STRINGS = [
  'Frontend Developer',
  'Mobile Developer',
  'React Native Engineer',
  'TypeScript Enthusiast',
]

export const SKILLS: Skill[] = [
  { name: 'JavaScript', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'React Native', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'GraphQL (Apollo)', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Zustand / Redux', category: 'backend' },
  { name: 'SQL', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Git', category: 'tools' },
  { name: 'Jest / Cypress', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'Figma', category: 'tools' },
  { name: 'Expo', category: 'tools' },
]

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E‑shop (React + Supabase)',
    description:
      'E-commerce demo with product browsing, filtering, favorites, cart + checkout, auth, and per-user order history. Includes a first-order discount enforced via Postgres policies.',
    tech: ['React', 'Vite', 'Supabase', 'Postgres', 'React Router'],
    github: 'https://github.com/DKDonatas/eshop',
    live: 'https://starlit-otter-b4ee4b.netlify.app/',
    image: '/projects/eshop-preview.webp',
    category: 'fullstack',
    featured: true,
  },
  {
    id: '2',
    title: 'Last.fm Music Dashboard',
    description:
      'Music discovery dashboard powered by the Last.fm API with search, favorites, and user stats. Includes in-app playback via YouTube embed and a queue with prev/next.',
    tech: ['React', 'Vite', 'Last.fm API', 'YouTube Data API', 'localStorage'],
    github: 'https://github.com/DKDonatas/Last.fm-project',
    live: 'https://velvety-buttercream-823af5.netlify.app/',
    image: '/projects/lastfm-dashboard-preview.webp',
    category: 'frontend',
    featured: true,
  },
]

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    company: '',
    role: 'Software Developer',
    period: 'Feb 2025 — Present',
    description: [
      'Contributing to full-stack projects using TypeScript, JavaScript, and React Native, building scalable cross-platform mobile apps and reusable frontend components',
      'Integrating GraphQL and REST APIs using Apollo Client, and managing real-time data with GraphQL subscriptions',
      'Applying state management techniques using Zustand and Redux, and implementing in-app navigation with React Navigation',
      'Following Agile methodologies — participating in code reviews, planning sessions, and sprint retrospectives',
    ],
    tech: ['React Native', 'TypeScript', 'GraphQL', 'Apollo Client', 'Zustand', 'Redux', 'Expo'],
    current: true,
  },
  {
    id: '2',
    company: '',
    role: 'Frontend Developer',
    period: 'Nov 2024 — Feb 2025',
    description: [
      'Developed and maintained responsive web applications using Next.js and React',
      'Optimised UI/UX for improved user engagement and Core Web Vitals performance scores',
      'Wrote clean, maintainable, and scalable code following industry standards in an Agile/Scrum team',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Figma', 'CI/CD'],
    current: false,
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/DKDonatas', icon: 'Github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/donatas-kusleika/', icon: 'Linkedin' },
  { label: 'Email', href: 'mailto:DonatasKusleika@gmail.com', icon: 'Mail' },
]

export const STATS = [
  { value: '1.5+', label: 'Years in Dev' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '2', label: 'Platforms (Web + Mobile)' },
  { value: '100%', label: 'TypeScript Codebases' },
]
