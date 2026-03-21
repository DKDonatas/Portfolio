import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
}

interface CardSectionProps {
  children: ReactNode
  className?: string
}

function Card({ children, className, hoverable = false, onClick }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverable ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'glass-card p-6',
        hoverable && 'cursor-none transition-shadow duration-300 hover:shadow-xl hover:shadow-white/5 hover:border-slate-700',
        onClick && 'cursor-none',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

function CardHeader({ children, className }: CardSectionProps) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

function CardBody({ children, className }: CardSectionProps) {
  return <div className={cn('flex-1', className)}>{children}</div>
}

function CardFooter({ children, className }: CardSectionProps) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-slate-800/60', className)}>{children}</div>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export { Card }
