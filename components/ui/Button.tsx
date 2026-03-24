import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'outline' | 'danger' | 'rose' | 'gold'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-rose/10 border border-rose/20 text-rose hover:bg-rose/20 hover:border-rose/40',
  ghost:
    'bg-transparent border border-transparent text-silver hover:text-offwhite hover:border-white/10',
  outline:
    'bg-transparent border border-white/10 text-offwhite hover:bg-white/5 hover:border-white/20',
  danger:
    'bg-transparent border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40',
  rose:
    'bg-rose text-obsidian hover:bg-rose-deep font-medium',
  gold:
    'bg-gold text-obsidian hover:bg-gold-deep font-medium',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-xl',
  md: 'px-5 py-2.5 text-sm rounded-2xl',
  lg: 'px-7 py-3.5 text-base rounded-2xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'outline', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-sans font-normal',
          'transition-all duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose/50',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'select-none whitespace-nowrap',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <LoadingDots />
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

function LoadingDots() {
  return (
    <span className="flex items-center gap-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-current animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
        />
      ))}
    </span>
  )
}

