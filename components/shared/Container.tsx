import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
}

export function Container({ className, size = 'lg', children, ...props }: ContainerProps) {
  return (
    <div
      className={cn('w-full mx-auto px-5 md:px-8 lg:px-12', sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  )
}