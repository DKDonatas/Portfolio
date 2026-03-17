import { useEffect, useRef, useState, type RefObject } from 'react'

interface Options extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver<T extends Element>(
  options: Options = {}
): [RefObject<T>, boolean] {
  const {
    threshold = 0.15,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = true,
  } = options

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (freezeOnceVisible && isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (freezeOnceVisible) observer.unobserve(element)
        } else if (!freezeOnceVisible) {
          setIsVisible(false)
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, root, rootMargin, freezeOnceVisible, isVisible])

  return [ref, isVisible]
}
