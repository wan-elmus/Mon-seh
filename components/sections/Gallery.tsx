'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, GitCommit, Calendar } from 'lucide-react'
import { SectionWrapper } from '@/components/shared/SectionWrapper'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { GALLERY_IMAGES } from '@/lib/data/gallery'
import { formatMemoryDate, formatRelativeDate } from '@/lib/utils'
import type { MemoryImage } from '@/types'
import { cn } from '@/lib/utils'

// ─── Span → CSS grid classes ─────────────────────────────────
const spanClasses: Record<string, string> = {
  square:    'col-span-1 row-span-1 aspect-square',
  portrait:  'col-span-1 row-span-2',
  landscape: 'col-span-2 row-span-1',
  wide:      'col-span-2 row-span-1',
  tall:      'col-span-1 row-span-2',
}

// ─── Heart particle ──────────────────────────────────────────
function HeartParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20, x: `${20 + i * 15}%` }}
          animate={{
            opacity: [0, 1, 0],
            y: [20, -60],
            x: [`${20 + i * 15}%`, `${15 + i * 15 + Math.sin(i) * 10}%`],
          }}
          transition={{ delay: i * 0.1, duration: 1.2, ease: 'easeOut' }}
          className="absolute bottom-6 text-rose text-lg"
        >
          ♥
        </motion.div>
      ))}
    </div>
  )
}

// ─── Image Card ──────────────────────────────────────────────
function ImageCard({ image, onClick }: { image: MemoryImage; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  const [showHearts, setShowHearts] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
    setShowHearts(true)
    setTimeout(() => setShowHearts(false), 1400)
  }

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl cursor-pointer group',
        spanClasses[image.span] || spanClasses.square
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.2, 0.9, 0.4, 1.1] }}
      layout
    >
      {/* Image */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn(
          'object-cover transition-all duration-500',
          hovered ? 'grayscale-0 scale-105' : 'grayscale brightness-90'
        )}
      />

      {/* Overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-linear-to-t from-obsidian/80 via-transparent to-transparent',
          'transition-opacity duration-300',
          hovered ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Glow border on hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl border transition-all duration-300',
          hovered ? 'border-rose/30 shadow-glow-rose' : 'border-white/5'
        )}
      />

      {/* Commit message */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 p-4"
          >
            <p className="font-mono text-[10px] text-rose/80 truncate">
              {image.commitMessage}
            </p>
            <p className="mono-label text-dim/70 text-[9px] mt-0.5">
              {formatRelativeDate(image.date)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {showHearts && <HeartParticles />}
    </motion.div>
  )
}

// ─── Image Modal ─────────────────────────────────────────────
function ImageModal({
  image,
  onClose,
}: {
  image: MemoryImage | null
  onClose: () => void
}) {
  if (!image) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="relative w-full max-w-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full glass
              flex items-center justify-center text-silver hover:text-offwhite
              border border-white/10 hover:border-white/20 transition-all"
          >
            <X size={15} />
          </button>

          <div className="glass rounded-3xl overflow-hidden border border-white/8">
            {/* Image */}
            <div className="relative aspect-4/3 w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover"
              />
            </div>

            {/* Metadata */}
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-start gap-2">
                <GitCommit size={13} className="text-rose mt-0.5 shrink-0" />
                <p className="font-mono text-sm text-offwhite/90 leading-relaxed">
                  {image.commitMessage}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                  <Calendar size={11} className="text-dim" />
                  <span className="mono-label text-silver">
                    {formatMemoryDate(image.date)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={11} className="text-dim" />
                  <span className="mono-label text-silver">{image.location}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Gallery Section ─────────────────────────────────────────
export function Gallery() {
  const [selected, setSelected] = useState<MemoryImage | null>(null)

  return (
    <SectionWrapper id="gallery">
      <Container>
        <div className="section-divider mb-12" />

        <Heading
          label="stateful.moments"
          title="Memory Gallery"
          subtitle="Hover to colorize. Click to remember."
          accent="rose"
          className="mb-10"
        />

        {/* Bento grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]"
        >
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
            >
              <ImageCard image={img} onClick={() => setSelected(img)} />
            </motion.div>
          ))}
        </motion.div>

        {/* Count */}
        <div className="mt-6 flex items-center justify-end">
          <span className="mono-label text-dim/50">
            {GALLERY_IMAGES.length} memories committed
          </span>
        </div>
      </Container>

      <ImageModal image={selected} onClose={() => setSelected(null)} />
    </SectionWrapper>
  )
}