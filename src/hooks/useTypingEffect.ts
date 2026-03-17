import { useState, useEffect, useRef, useCallback } from 'react'

interface Options {
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  loop?: boolean
}

export function useTypingEffect(strings: string[], options: Options = {}): string {
  const { typingSpeed = 80, deletingSpeed = 50, pauseDuration = 2000, loop = true } = options

  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    if (strings.length === 0) return

    const currentString = strings[currentIndex]

    if (isPaused) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false)
        setIsTyping(false)
      }, pauseDuration)
      return clearTimer
    }

    if (isTyping) {
      if (displayText.length < currentString.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentString.slice(0, displayText.length + 1))
        }, typingSpeed)
      } else {
        setIsPaused(true)
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1))
        }, deletingSpeed)
      } else {
        const nextIndex = (currentIndex + 1) % strings.length
        if (!loop && nextIndex === 0) return
        setCurrentIndex(nextIndex)
        setIsTyping(true)
      }
    }

    return clearTimer
  }, [
    displayText,
    isTyping,
    isPaused,
    currentIndex,
    strings,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
    clearTimer,
  ])

  return displayText
}
