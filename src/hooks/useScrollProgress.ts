import { useState, useEffect } from 'react'

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calculateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const scrollable = scrollHeight - clientHeight
      if (scrollable === 0) {
        setProgress(0)
        return
      }
      setProgress(scrollTop / scrollable)
    }

    window.addEventListener('scroll', calculateProgress, { passive: true })
    calculateProgress()

    return () => window.removeEventListener('scroll', calculateProgress)
  }, [])

  return progress
}
