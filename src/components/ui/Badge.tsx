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
  primary: 'bg-white/10 text-zinc-100 border border-white/20',
  secondary: 'bg-zinc-500/15 text-zinc-300 border border-zinc-500/30',
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
