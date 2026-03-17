import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { EXPERIENCES } from '@/constants/data'
import { Badge } from '@/components/ui'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/utils/animations'

export function Experience() {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.05 })

  return (
    <section id="experience" ref={sectionRef} className="section-padding bg-bg-secondary/30">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="font-mono text-sm text-violet-400 tracking-wider">04. experience</span>
            <h2 className="mt-2 text-4xl font-bold text-slate-100">
              Work <span className="gradient-text">History</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              My professional journey building products that people love and systems that scale.
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-slate-700 to-transparent hidden sm:block" />

            <div className="space-y-8">
              {EXPERIENCES.map((exp, index) => {
                const variant = index % 2 === 0 ? fadeInLeft : fadeInRight

                return (
                  <motion.div
                    key={exp.id}
                    variants={variant}
                    className="relative sm:pl-16"
                  >
                    <div className="absolute left-0 top-6 w-12 h-12 rounded-xl bg-bg-primary border border-slate-800 flex items-center justify-center hidden sm:flex z-10">
                      <Briefcase className="w-5 h-5 text-violet-400" />
                    </div>

                    <div className="glass-card p-6 hover:border-slate-700 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                          {(exp.company || exp.current) && (
                            <div className="flex items-center gap-2 mt-1">
                              {exp.company && (
                                <span className="text-violet-400 font-medium text-sm">{exp.company}</span>
                              )}
                              {exp.current && (
                                <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-md">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  Current
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/40 flex-shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </div>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.description.map((point, i) => (
                          <li key={i} className="flex gap-3 text-sm text-slate-400">
                            <span className="text-violet-500 mt-1.5 flex-shrink-0">▸</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5">
                        {exp.tech.map(t => (
                          <Badge key={t} variant="secondary" size="sm">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
