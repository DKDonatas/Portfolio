import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { SOCIAL_LINKS } from '@/constants/data'
import { staggerContainer, fadeInUp, fadeInLeft } from '@/utils/animations'

const ICON_MAP = { Github, Linkedin, Mail }

export function Contact() {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.05 })

  return (
    <section id="contact" ref={sectionRef} className="section-padding">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="font-mono text-sm text-zinc-400 tracking-wider">05. contact</span>
            <h2 className="mt-2 text-4xl font-bold text-slate-100">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div variants={fadeInLeft} className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Get In Touch</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:DonatasKusleika@gmail.com"
                    className="flex items-center gap-3 group w-full p-4 rounded-2xl glass-card hover:border-slate-700 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                      <Mail className="w-4 h-4 text-zinc-300" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                        DonatasKusleika@gmail.com
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-3">Find me on</h3>
                <div className="flex gap-2">
                  {SOCIAL_LINKS.filter(l => l.label !== 'Email').map(link => {
                    const Icon = ICON_MAP[link.icon as keyof typeof ICON_MAP]
                    return (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={link.label}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-200 bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition-colors"
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-sm font-medium text-slate-200">Available for work</span>
                </div>
                <p className="text-xs text-slate-500">
                  Currently open to full-time roles and select freelance opportunities.
                  Response time is typically within 24 hours.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
