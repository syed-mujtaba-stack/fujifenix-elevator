import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Accepts any string. Named variants map to the standard palette; unknown
   * values fall back to "neutral". Status labels like "new"/"replied" are
   * forwarded directly from server data without a cast.
   */
  variant?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300',
      success: 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-300',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300',
      danger: 'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300',
      info: 'bg-purple-100 text-purple-800 dark:bg-purple-500/15 dark:text-purple-300',
      neutral: 'bg-slate-100 text-slate-800 dark:bg-slate-700/40 dark:text-slate-300',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-xs',
      lg: 'px-3 py-1 text-sm',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          (variants as Record<string, string>)[variant] ?? variants.neutral,
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'