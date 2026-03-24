import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface HeadingProps extends HTMLAttributes<HTMLDivElement> {
  label?: string       // mono label above
  title: string
  subtitle?: string
  accent?: 'rose' | 'gold' | 'lavender'
  align?: 'left' | 'center'
}

const accentColor = {
  rose: 'text-rose',
  gold: 'text-gold',
  lavender: 'text-lavender',
}

export function Heading({
  label,
  title,
  subtitle,
  accent = 'rose',
  align = 'left',
  className,
  ...props
}: HeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className
      )}
      {...props}
    >
      {label && (
        <span className={cn('mono-label', accentColor[accent])}>
          {'> '}{label}
        </span>
      )}
      <h2 className="font-display text-display-md text-offwhite leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-silver text-base md:text-lg font-light max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}