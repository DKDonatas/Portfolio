import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { SKILLS } from '@/constants/data'
import type { SkillCategory } from '@/types'
import { staggerContainer, fadeInUp, scaleIn } from '@/utils/animations'
import { cn } from '@/utils/cn'

const CATEGORIES: { id: SkillCategory; label: string; emoji: string }[] = [
  { id: 'frontend', label: 'Frontend', emoji: '🎨' },
  { id: 'backend', label: 'Backend / APIs', emoji: '⚙️' },
  { id: 'tools', label: 'Tools & DevOps', emoji: '🛠️' },
]

const SKILL_ICONS: Record<string, string> = {
  JavaScript: 'JS',
  TypeScript: 'TS',
  React: 'Re',
  'React Native': 'RN',
  'Next.js': 'Nx',
  'GraphQL (Apollo)': 'GQL',
  'REST APIs': 'REST',
  'Zustand / Redux': 'Zus',
  SQL: 'SQL',
  'Node.js': 'No',
  Git: 'Git',
  'Jest / Cypress': 'Test',
  Docker: 'Dkr',
  Figma: 'Fig',
  Expo: 'Expo',
}

function SkillCard({ name }: { name: string }) {
  const abbr = SKILL_ICONS[name] ?? name.slice(0, 3)

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 p-4 rounded-xl glass-card hover:border-slate-700 hover:shadow-lg hover:shadow-white/5 transition-colors group"
    >
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/15 to-zinc-600/20 border border-white/15 flex items-center justify-center flex-shrink-0 group-hover:from-white/20 transition-colors">
        <span className="font-mono text-[10px] font-bold text-zinc-200">{abbr}</span>
      </div>
      <span className="text-sm font-medium text-slate-200">{name}</span>
    </motion.div>
  )
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('frontend')
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 })

  const filtered = SKILLS.filter(s => s.category === activeCategory)

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-bg-secondary/30">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="font-mono text-sm text-zinc-400 tracking-wider">02. skills</span>
            <h2 className="mt-2 text-4xl font-bold text-slate-100">
              Tech <span className="gradient-text">Stack</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Technologies I work with to build cross-platform apps and performant web experiences.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  activeCategory === cat.id
                    ? 'bg-white/10 text-zinc-100 border border-white/25'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                )}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto"
            >
              {filtered.map(skill => (
                <SkillCard key={skill.name} name={skill.name} />
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div variants={fadeInUp} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Clean Architecture', desc: 'SOLID, DRY, KISS principles' },
              { label: 'Cross-Platform', desc: 'Web & mobile from one codebase' },
              { label: 'Type Safety', desc: 'Full TypeScript coverage' },
              { label: 'Test Coverage', desc: 'Jest, Cypress & JMeter' },
            ].map(item => (
              <motion.div
                key={item.label}
                whileHover={{ y: -3 }}
                className="p-4 rounded-xl glass-card text-center"
              >
                <p className="text-sm font-semibold text-slate-200">{item.label}</p>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
