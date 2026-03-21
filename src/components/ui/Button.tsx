import { forwardRef, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-black/25',
  secondary:
    'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 hover:border-slate-600',
  outline:
    'border border-white/40 hover:border-white/70 text-zinc-300 hover:bg-white/10',
  ghost: 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60',
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-base gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'relative inline-flex items-center justify-center rounded-xl font-medium',
          'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
          'disabled:pointer-events-none disabled:opacity-50 cursor-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        ) : null}
        <span className={cn('flex items-center gap-inherit', isLoading && 'opacity-0')}>
          {leftIcon}
          {children}
          {rightIcon}
        </span>
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
