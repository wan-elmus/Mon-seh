'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { NAMES, FINAL_TAGLINE } from '@/lib/data/constants'
import { cn } from '@/lib/utils'

// ─── Typing Animation ────────────────────────────────────────
function useTypingAnimation(words: readonly string[], finalText: string) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting' | 'final'>('typing')
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (phase === 'final') return

    const current = words[wordIndex]

    if (phase === 'typing') {
      if (charIndex < current.length) {
        const timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1))
          setCharIndex((c) => c + 1)
        }, 70 + Math.random() * 40)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => setPhase('pausing'), 1400)
        return () => clearTimeout(timeout)
      }
    }

    if (phase === 'pausing') {
      const isLast = wordIndex === words.length - 1
      if (isLast) {
        const timeout = setTimeout(() => {
          setPhase('deleting')
        }, 900)
        return () => clearTimeout(timeout)
      }
      const timeout = setTimeout(() => setPhase('deleting'), 900)
      return () => clearTimeout(timeout)
    }

    if (phase === 'deleting') {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1))
          setCharIndex((c) => c - 1)
        }, 35)
        return () => clearTimeout(timeout)
      } else {
        if (wordIndex < words.length - 1) {
          setWordIndex((w) => w + 1)
          setPhase('typing')
        } else {
          // Type final tagline
          setPhase('final')
          let i = 0
          const typeInterval = setInterval(() => {
            i++
            setDisplayed(finalText.slice(0, i))
            if (i >= finalText.length) clearInterval(typeInterval)
          }, 55)
          return () => clearInterval(typeInterval)
        }
      }
    }
  }, [phase, charIndex, wordIndex, words, finalText])

  return { displayed, phase }
}

// ─── Parallax ────────────────────────────────────────────────
function useParallax() {
  const bgRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    target.current = {
      x: ((e.clientX - cx) / cx) * 18,
      y: ((e.clientY - cy) / cy) * 12,
    }
  }, [])

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isMobile) return

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.06
      current.current.y += (target.current.y - current.current.y) * 0.06
      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px) scale(1.08)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return bgRef
}

// ─── Hero Section ────────────────────────────────────────────
export function Hero() {
  const { displayed, phase } = useTypingAnimation(NAMES, FINAL_TAGLINE)
  const bgRef = useParallax()
  const isFinal = phase === 'final'

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-150 flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-[-8%] will-change-transform">
          <Image
            src="/images/hero/camilla-main.jpg"
            alt="Camilla"
            fill
            priority
            quality={90}
            className="object-cover object-center"
            style={{ filter: 'brightness(0.55) contrast(1.08) saturate(0.85)' }}
          />
        </div>
      </div>

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-linear-to-t from-obsidian via-transparent to-obsidian/30 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-r from-obsidian/40 via-transparent to-obsidian/40 pointer-events-none" />

      {/* Glass card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-[min(90%,560px)] px-5"
      >
        <GlassCard padding="lg" className="border-white/8">
          {/* Boot sequence label */}
          <div className="mb-5">
            <span className="mono-label text-rose/70">
              {'// camilla.protocol — boot sequence complete'}
            </span>
          </div>

          {/* Typing line */}
          <div className="mb-6">
            <div className="flex items-start gap-2 mb-1">
              <span className="mono-label text-dim mt-0.5 shrink-0">{'>'}</span>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-dim">init: loading_subject.ts</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-4">
              <h1
                className={cn(
                  'font-display leading-tight',
                  isFinal
                    ? 'text-display-md text-gradient-rose'
                    : 'text-2xl md:text-3xl text-offwhite'
                )}
              >
                {displayed}
                {!isFinal && <span className="typing-cursor" />}
              </h1>
            </div>
          </div>

          {/* Status grid */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/6">
            <StatusRow label="system" value="online" color="text-emerald-400" />
            <StatusRow label="uptime" value="∞ days" color="text-gold" />
            <StatusRow label="subject" value="Camilla" color="text-rose" />
            <StatusRow label="status" value="loved" color="text-lavender" />
          </div>
        </GlassCard>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="mono-label text-dim/50 text-[10px]">scroll</span>
        <div className="w-px h-10 bg-linear-to-b from-transparent to-rose/30" />
      </motion.div>
    </section>
  )
}

function StatusRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="mono-label text-dim/60 text-[10px]">{label}</span>
      <span className={cn('font-mono text-xs font-medium', color)}>{value}</span>
    </div>
  )
}