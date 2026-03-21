import { motion } from 'framer-motion'
import { MapPin, Calendar, Coffee, Zap } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { STATS } from '@/constants/data'
import { staggerContainer, fadeInLeft, fadeInRight, fadeInUp } from '@/utils/animations'

const INFO_ITEMS = [
  { icon: MapPin, label: 'Location', value: 'Kaunas, Lithuania' },
  { icon: Calendar, label: 'Dev Experience', value: '1.5+ Years' },
  { icon: Coffee, label: 'Preferred Stack', value: 'React + TypeScript' },
  { icon: Zap, label: 'Availability', value: 'Open to offers' },
]

export function About() {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 })

  return (
    <section id="about" ref={sectionRef} className="section-padding">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInLeft} className="relative">
            <div className="relative mx-auto w-72 h-72 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-zinc-500 to-zinc-800 opacity-25 blur-2xl" />
              <div className="relative w-full h-full rounded-3xl gradient-border overflow-hidden bg-bg-secondary">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-zinc-950/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-8xl font-bold gradient-text opacity-30 select-none">
                    {'</>'}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-bg-secondary to-transparent" />
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center"
              >
                <span className="text-2xl">⚡</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 w-14 h-14 rounded-2xl bg-zinc-500/15 border border-zinc-500/25 flex items-center justify-center"
              >
                <span className="text-xl">🚀</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={fadeInRight} className="space-y-8">
            <div>
              <motion.span
                variants={fadeInUp}
                className="font-mono text-sm text-zinc-400 tracking-wider"
              >
                01. about me
              </motion.span>
              <h2 className="mt-2 text-4xl font-bold text-slate-100">
                Crafting Digital{' '}
                <span className="gradient-text">Experiences</span>
              </h2>
            </div>

            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Frontend & Mobile Developer based in Kaunas, Lithuania. I specialise in building
                cross-platform mobile apps with React Native and Expo, and responsive web
                applications with Next.js and React — all in TypeScript.
              </p>
              <p>
                I'm comfortable across the stack: integrating GraphQL and REST APIs with Apollo
                Client, managing state with Zustand or Redux, and keeping things solid with
                Jest and Cypress. I thrive in Agile teams and care deeply about code quality.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {INFO_ITEMS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-zinc-300" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="text-sm font-medium text-slate-200">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-slate-800/60">
              {STATS.map(({ value, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -2 }}
                  className="text-center"
                >
                  <p className="text-2xl font-bold gradient-text">{value}</p>
                  <p className="text-xs text-slate-500 mt-1">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
