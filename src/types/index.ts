export type Theme = 'dark' | 'light'

export type ProjectCategory = 'all' | 'frontend' | 'backend' | 'fullstack'

export type SkillCategory = 'frontend' | 'backend' | 'tools'

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  github?: string
  live?: string
  image?: string
  category: Exclude<ProjectCategory, 'all'>
  featured: boolean
}

export interface Skill {
  name: string
  category: SkillCategory
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string[]
  tech: string[]
  current?: boolean
}

export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface ContactFormValues extends Record<string, string> {
  name: string
  email: string
  subject: string
  message: string
}
