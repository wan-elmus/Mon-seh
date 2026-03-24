'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Wifi, Coffee, Heart, Gift, Star, Infinity, Zap,
  type LucideIcon,
} from 'lucide-react'
import { SectionWrapper } from '@/components/shared/SectionWrapper'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { GlassCard } from '@/components/ui/GlassCard'
import { MILESTONES } from '@/lib/data/timeline'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/utils'
import type { Milestone } from '@/types'

// ─── Icon map ────────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  Wifi, Coffee, Heart, Gift, Star, Infinity, Zap,
}

const accentColors = {
  rose: {
    dot: 'bg-rose border-rose/40',
    icon: 'text-rose',
    label: 'text-rose',
    border: 'border-rose/15',
    glow: 'shadow-glow-rose',
  },
  gold: {
    dot: 'bg-gold border-gold/40',
    icon: 'text-gold',
    label: 'text-gold',
    border: 'border-gold/15',
    glow: 'shadow-glow-gold',
  },
  lavender: {
    dot: 'bg-lavender border-lavender/40',
    icon: 'text-lavender',
    label: 'text-lavender',
    border: 'border-lavender/15',
    glow: 'shadow-glow-lav',
  },
}

// ─── Timeline node ───────────────────────────────────────────
function TimelineNode({ milestone, index }: { milestone: Milestone; index: number }) {
  const colors = accentColors[milestone.accent]
  const Icon = iconMap[milestone.icon] ?? Zap
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 22,
        delay: index * 0.08,
      }}
      className={cn(
        'flex items-start gap-6',
        isEven ? 'flex-row' : 'flex-row-reverse'
      )}
    >
      {/* Card */}
      <div className="flex-1">
        <GlassCard
          padding="md"
          className={cn(
            'border transition-all duration-300',
            colors.border,
            'hover:' + colors.glow
          )}
        >
          {/* Date + icon */}
          <div className="flex items-center justify-between mb-3">
            <span className={cn('mono-label', colors.label)}>{milestone.date}</span>
            <div
              className={cn(
                'w-7 h-7 rounded-xl glass flex items-center justify-center',
                'border', colors.border
              )}
            >
              <Icon size={13} className={colors.icon} />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display text-xl text-offwhite mb-1">{milestone.title}</h3>

          {/* Commit message */}
          <p className="font-mono text-[11px] text-dim mb-3">{milestone.commitMessage}</p>

          {/* Description */}
          <p className="text-silver text-sm leading-relaxed font-light">
            {milestone.description}
          </p>
        </GlassCard>
      </div>

      {/* Center dot */}
      <div className="flex flex-col items-center shrink-0 pt-5">
        <div
          className={cn(
            'w-4 h-4 rounded-full border-2 transition-all duration-300',
            colors.dot
          )}
        />
      </div>

      {/* Spacer (other side) */}
      <div className="flex-1" />
    </motion.div>
  )
}

// ─── Timeline Section ─────────────────────────────────────────
export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)

  return (
    <SectionWrapper id="timeline">
      <Container size="md">
        <div className="section-divider mb-12" />

        <Heading
          label="deployment.pipeline"
          title="How We Got Here"
          subtitle="Every milestone, committed to memory."
          accent="lavender"
          align="center"
          className="mb-16"
        />

        {/* Timeline container */}
        <div ref={containerRef} className="relative">
          {/* Vertical line — fills on scroll */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
            {/* Track */}
            <div className="absolute inset-0 bg-white/6" />
            {/* Fill */}
            <div
              className="absolute top-0 left-0 right-0 bg-linear-to-b from-rose via-gold to-lavender
                transition-none"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          {/* Nodes */}
          <div className="flex flex-col gap-12">
            {MILESTONES.map((milestone, i) => (
              <TimelineNode key={milestone.id} milestone={milestone} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}