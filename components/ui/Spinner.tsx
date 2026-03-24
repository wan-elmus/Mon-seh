import { cn } from '@/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'w-4 h-4 border',
  md: 'w-7 h-7 border-2',
  lg: 'w-10 h-10 border-2',
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'rounded-full border-rose/20 border-t-rose/70 animate-spin',
        sizes[size],
        className
      )}
    />
  )
}