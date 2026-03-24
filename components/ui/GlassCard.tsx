import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'rose' | 'gold' | 'lavender' | 'none'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const glowMap = {
  rose: 'hover:shadow-glow-rose',
  gold: 'hover:shadow-glow-gold',
  lavender: 'hover:shadow-glow-lav',
  none: '',
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8 md:p-10',
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow = 'none', padding = 'md', hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass rounded-3xl',
          'transition-all duration-300 ease-out',
          hover && 'glass-hover cursor-pointer',
          glowMap[glow],
          paddingMap[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassCard.displayName = 'GlassCard'