import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        obsidian: '#0A0A0A',
        charcoal: '#111113',
        surface: 'rgba(20, 20, 25, 0.7)',
        rose: {
          DEFAULT: '#E8B4B8',
          deep: '#D4919A',
          muted: '#C9979E',
        },
        gold: {
          DEFAULT: '#E6C8A0',
          deep: '#D4AD7A',
          muted: '#C9A070',
        },
        lavender: {
          DEFAULT: '#C9B6E0',
          deep: '#B09ACE',
          muted: '#9E89C0',
        },
        offwhite: '#F5F5F7',
        silver: '#A0A0A8',
        dim: '#6B6B75',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 9vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.8rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' },
          '50%': { transform: 'scale(1.15)', boxShadow: '0 0 0 8px rgba(16, 185, 129, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glow-rose': '0 0 40px rgba(232, 180, 184, 0.15)',
        'glow-gold': '0 0 40px rgba(230, 200, 160, 0.15)',
        'glow-lav': '0 0 40px rgba(201, 182, 224, 0.15)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.2, 0.9, 0.4, 1.1)',
      },
    },
  },
  plugins: [],
}

export default config
