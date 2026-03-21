import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { SOCIAL_LINKS } from '@/constants/data'

const ICON_MAP = {
  Github,
  Linkedin,
  Twitter,
  Mail,
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800/60 bg-bg-secondary/50">
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-500 flex items-center justify-center">
              <span className="text-black text-xs font-bold font-mono">DK</span>
            </div>
            <span className="font-semibold text-slate-300">Donatas<span className="gradient-text">.</span></span>
          </div>

          <p className="text-sm text-slate-500">
            © {currentYear} — Built with React & TypeScript
          </p>

          <div className="flex items-center gap-1">
            {SOCIAL_LINKS.map(link => {
              const Icon = ICON_MAP[link.icon as keyof typeof ICON_MAP]
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
