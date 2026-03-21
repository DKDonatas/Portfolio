import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { NAV_ITEMS } from '@/constants/data'
import { mobileMenuVariants } from '@/utils/animations'
import { cn } from '@/utils/cn'

export function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const scrollProgress = useScrollProgress()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const isScrolled = scrollProgress > 0.01

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.href.replace('#', ''))
      const current = sections.find(section => {
        const el = document.getElementById(section)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom >= 120
      })
      setActiveSection(current ?? '')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      animate={isScrolled ? 'scrolled' : 'top'}
      variants={{
        top: { backgroundColor: 'rgba(3,7,18,0)', borderColor: 'rgba(30,41,59,0)' },
        scrolled: { backgroundColor: 'rgba(3,7,18,0.85)', borderColor: 'rgba(30,41,59,0.6)' },
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b',
        isScrolled && 'backdrop-blur-xl'
      )}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-500 flex items-center justify-center">
              <span className="text-black text-xs font-bold font-mono">DK</span>
            </div>
            <span className="font-semibold text-slate-100 group-hover:text-white transition-colors">
              Donatas<span className="gradient-text">.</span>
            </span>
          </motion.button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  activeSection === item.href.replace('#', '')
                    ? 'text-zinc-100 bg-white/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.a
              href="#contact"
              onClick={e => {
                e.preventDefault()
                handleNavClick('#contact')
              }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex h-9 px-4 items-center text-sm font-medium rounded-lg bg-white text-black hover:bg-zinc-200 transition-all duration-200"
            >
              Hire me
            </motion.a>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(prev => !prev)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden overflow-hidden border-t border-slate-800/60 bg-bg-primary/95 backdrop-blur-xl"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                    activeSection === item.href.replace('#', '')
                      ? 'text-zinc-100 bg-white/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  )}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 mt-2 border-t border-slate-800/60">
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full h-10 rounded-lg bg-white text-black hover:bg-zinc-200 text-sm font-medium"
                >
                  Hire me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
