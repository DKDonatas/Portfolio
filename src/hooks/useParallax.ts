import { useRef, type RefObject } from 'react'
import { useScroll, useTransform, type MotionValue } from 'framer-motion'

interface ParallaxResult<T extends HTMLElement> {
  ref: RefObject<T>
  y: MotionValue<number>
}

export function useParallax<T extends HTMLElement>(speed = 0.4): ParallaxResult<T> {
  const ref = useRef<T>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const range = 120 * speed
  const y = useTransform(scrollYProgress, [0, 1], [-range, range])

  return { ref, y }
}
