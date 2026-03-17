import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, FileText, Sparkles } from 'lucide-react'
import { useTypingEffect } from '@/hooks/useTypingEffect'
import { useParallax } from '@/hooks/useParallax'
import { TYPING_STRINGS } from '@/constants/data'
import { Button } from '@/components/ui'
import { staggerContainer, fadeInUp, fadeInDown } from '@/utils/animations'

export function Hero() {
  const typedText = useTypingEffect(TYPING_STRINGS, { typingSpeed: 75, deletingSpeed: 45 })
  const { ref, y } = useParallax<HTMLDivElement>(0.3)

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-40" />

      <motion.div ref={ref} style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </motion.div>

      <div className="section-container relative z-10 pt-24 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={fadeInDown} className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="font-mono text-sm text-violet-400 tracking-wider">
              Available for opportunities
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold text-slate-100 leading-[1.1] mb-4"
          >
            Hi, I'm{' '}
            <span className="gradient-text">Donatas</span>
          </motion.h1>

          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6 h-12">
            <span className="text-2xl md:text-3xl font-semibold text-slate-300">
              {typedText}
            </span>
            <span className="w-0.5 h-8 bg-violet-400 animate-pulse" />
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl mb-10 text-balance"
          >
            Frontend & Mobile Developer specialising in React Native, React, and Next.js.
            I build cross-platform apps and performant web experiences — clean TypeScript,
            GraphQL integrations, and solid testing from day one.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-16">
            <Button
              size="lg"
              onClick={scrollToProjects}
              rightIcon={<ArrowDown className="w-4 h-4" />}
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              rightIcon={<FileText className="w-4 h-4" />}
              onClick={() => {}}
            >
              Download CV
            </Button>
            <div className="flex items-center gap-2 ml-2">
              <motion.a
                href="https://github.com/DKDonatas"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-200 border border-slate-800 hover:border-slate-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/donatas-kusleika/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-200 border border-slate-800 hover:border-slate-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-3"
          >
            {['React', 'React Native', 'TypeScript', 'Next.js', 'GraphQL', 'Expo', 'Jest'].map(
              tech => (
              <span
                key={tech}
                className="font-mono text-xs px-3 py-1.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/60"
              >
                {tech}
              </span>
            )
            )}
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors"
        aria-label="Scroll down"
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <ArrowDown className="w-4 h-4" />
      </motion.button>
    </section>
  )
}
