import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'default' | 'primary' | 'secondary' | 'outline'
type Size = 'sm' | 'md'

interface BadgeProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

const variantStyles: Record<Variant, string> = {
  default: 'bg-slate-800 text-slate-300 border border-slate-700/60',
  primary: 'bg-violet-500/15 text-violet-300 border border-violet-500/30',
  secondary: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
  outline: 'bg-transparent text-slate-400 border border-slate-600',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
}

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md font-mono font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  )
}
