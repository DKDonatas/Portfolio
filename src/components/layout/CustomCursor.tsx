import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'click'

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const isVisible = useRef(false)

  const springConfig = { stiffness: 400, damping: 35, mass: 0.5 }
  const dotX = useSpring(cursorX, { stiffness: 600, damping: 40 })
  const dotY = useSpring(cursorY, { stiffness: 600, damping: 40 })
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible.current) {
        isVisible.current = true
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.closest('a, button, [data-cursor="pointer"], input, textarea, select') !== null
      setCursorState(isInteractive ? 'hover' : 'default')
    }

    const handleMouseDown = () => setCursorState('click')
    const handleMouseUp = () => setCursorState(prev => (prev === 'click' ? 'default' : prev))

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY])

  const ringScale = cursorState === 'hover' ? 2 : cursorState === 'click' ? 0.8 : 1
  const dotScale = cursorState === 'click' ? 0.5 : 1

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{ scale: dotScale }}
          transition={{ duration: 0.15 }}
          className="w-2 h-2 bg-white rounded-full"
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: ringScale,
            borderColor:
              cursorState === 'hover' ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-8 h-8 rounded-full border border-white/40"
        />
      </motion.div>
    </>
  )
}
