import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="mono-label text-silver">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full glass rounded-2xl px-4 py-3',
            'font-sans text-sm text-offwhite placeholder:text-dim',
            'border border-white/7 focus:border-rose/30',
            'focus:outline-none focus:bg-[rgba(20,20,25,0.8)]',
            'transition-all duration-200 ease-out',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            error && 'border-red-500/40 focus:border-red-500/60',
            className
          )}
          {...props}
        />
        {error && (
          <p className="font-mono text-xs text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'