import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { PROJECTS } from '@/constants/data'
import type { ProjectCategory } from '@/types'
import { Badge, Card } from '@/components/ui'
import { staggerContainer, fadeInUp, scaleIn } from '@/utils/animations'
import { cn } from '@/utils/cn'

const FILTER_OPTIONS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
]

interface ProjectCardProps {
  project: (typeof PROJECTS)[number]
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card hoverable className="h-full flex flex-col group">
        <Card.Header>
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              {project.featured && (
                <span className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md">
                  <Star className="w-3 h-3" />
                  Featured
                </span>
              )}
              <Badge variant="primary" size="sm">
                {project.category}
              </Badge>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                  aria-label="View source code"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                  aria-label="View live demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-100 group-hover:text-violet-300 transition-colors">
            {project.title}
          </h3>
        </Card.Header>

        <Card.Body>
          <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
        </Card.Body>

        <Card.Footer>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(t => (
              <Badge key={t} variant="default" size="sm">
                {t}
              </Badge>
            ))}
          </div>
        </Card.Footer>
      </Card>
    </motion.div>
  )
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all')
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.05 })

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === activeFilter),
    [activeFilter]
  )

  return (
    <section id="projects" ref={sectionRef} className="section-padding">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="font-mono text-sm text-violet-400 tracking-wider">03. projects</span>
            <h2 className="mt-2 text-4xl font-bold text-slate-100">
              Selected <span className="gradient-text">Work</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              A curated selection of projects that showcase my approach to problem-solving and
              technical execution.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 mb-10">
            {FILTER_OPTIONS.map(option => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={cn(
                  'px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  activeFilter === option.id
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                )}
              >
                {option.label}
                <span className="ml-2 font-mono text-xs text-slate-500">
                  {option.id === 'all'
                    ? PROJECTS.length
                    : PROJECTS.filter(p => p.category === option.id).length}
                </span>
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
