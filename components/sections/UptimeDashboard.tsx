'use client'

import { motion } from 'framer-motion'
import { Heart, Clock, MapPin, Calculator } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionWrapper } from '@/components/shared/SectionWrapper'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { useUptime } from '@/hooks/useUptime'
import { pad } from '@/lib/utils'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { ANNIVERSARY_DATE, SUBJECT_NAME } from '@/lib/data/constants'
import { format } from 'date-fns'

// ─── Love Meter ──────────────────────────────────────────────
function LoveMeter() {
  return (
    <GlassCard glow="rose" className="flex flex-col gap-5 h-full group">
      <div className="flex items-center justify-between">
        <span className="mono-label text-dim">heart.status</span>
        <Heart size={14} className="text-rose animate-pulse-slow" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-linear-to-r from-rose to-gold rounded-full"
          />
        </div>
        
        <div className="flex justify-between text-xs">
          <span className="font-mono text-dim">init</span>
          <span className="font-mono text-rose/80">∞</span>
        </div>
      </div>

      <div className="mt-2">
        <p className="font-display text-lg text-offwhite/90 italic leading-relaxed">
          &quot;Some things don&apos;t need measuring.&quot;
        </p>
        <p className="mono-label text-dim mt-2 text-xs">
          — but if they did, this would be full
        </p>
      </div>
    </GlassCard>
  )
}

// ─── Time Together ───────────────────────────────────────────
function TimeTogether() {
  const { days, hours, minutes, seconds } = useUptime()

  const units = [
    { value: days, label: 'days' },
    { value: hours, label: 'hours' },
    { value: minutes, label: 'minutes' },
    { value: seconds, label: 'seconds' },
  ]

  return (
    <GlassCard glow="gold" className="flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between">
        <span className="mono-label text-dim">time.together</span>
        <Clock size={14} className="text-gold" />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {units.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className="glass rounded-xl w-full py-2.5 flex items-center justify-center">
              <span className="font-mono text-xl md:text-2xl font-medium text-gold tabular-nums">
                {pad(value)}
              </span>
            </div>
            <span className="mono-label text-dim/60 text-[9px]">{label}</span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-white/5">
        <p className="mono-label text-dim/50 text-[10px]">
          since {format(ANNIVERSARY_DATE, 'MMMM d, yyyy')}
        </p>
        <p className="font-mono text-xs text-gold/80 mt-1">
          every moment counts
        </p>
      </div>
    </GlassCard>
  )
}

// ─── Her World (Teacher tribute) ─────────────────────────────
function HerWorld() {
  return (
    <GlassCard glow="lavender" className="flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between">
        <span className="mono-label text-dim">her.world</span>
        <div className="flex gap-1.5">
          <Calculator size={14} className="text-lavender" />
          <MapPin size={14} className="text-gold" />
        </div>
      </div>

      {/* Mathematics tribute */}
      <div className="space-y-3">
        <div className="glass rounded-2xl p-4 border border-lavender/10">
          <p className="font-serif text-sm text-offwhite/90 leading-relaxed">
            She teaches numbers to make sense. 
            But the only equation that truly matters? 
            <span className="text-rose font-medium"> Her + them = </span>
            <span className="text-gold font-display text-lg">understanding</span>
          </p>
        </div>

        {/* Geography tribute */}
        <div className="glass rounded-2xl p-4 border border-gold/10">
          <p className="font-serif text-sm text-offwhite/90 leading-relaxed">
            She shows students the world — maps, coordinates, 
            the places that shape us. 
            <span className="text-gold"> Home</span> is wherever she is.
          </p>
        </div>

        {/* Personal touch */}
        <div className="mt-2 text-center">
          <p className="font-mono text-[10px] text-dim">
            {SUBJECT_NAME} · Math & Geography Teacher
          </p>
          <p className="font-mono text-[9px] text-dim/50 mt-1">
            shaping minds, one lesson at a time
          </p>
        </div>
      </div>
    </GlassCard>
  )
}

// ─── Dashboard Section ───────────────────────────────────────
export function UptimeDashboard() {
  return (
    <SectionWrapper id="dashboard">
      <Container>
        <div className="section-divider mb-12" />

        <Heading
          label="the.heart.of.it"
          title="What Matters"
          subtitle="Three reminders of what makes this beautiful."
          accent="rose"
          className="mb-10"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {[<LoveMeter key="love" />, <TimeTogether key="time" />, <HerWorld key="world" />].map(
            (card, i) => (
              <motion.div key={i} variants={fadeUp} className="h-full">
                {card}
              </motion.div>
            )
          )}
        </motion.div>
      </Container>
    </SectionWrapper>
  )
}