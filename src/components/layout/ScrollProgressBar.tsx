import { motion, useSpring } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgressBar() {
  const progress = useScrollProgress()
  const scaleX = useSpring(progress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
      }}
    />
  )
}
