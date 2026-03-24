'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, X } from 'lucide-react'
import { SECRET_MESSAGES } from '@/lib/data/constants'
import { cn } from '@/lib/utils'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [selected, setSelected] = useState<number | null>(null)

  const handleClose = useCallback(() => {
    setSelected(null)
    onClose()
  }, [onClose])

  // ESC key handler
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, handleClose])

  // DOM side-effect only
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-32"
        style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(12px)',
        }}
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
          className="w-full max-w-md mx-4 glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
            <div className="flex items-center gap-2">
              <Command size={14} className="text-dim" />
              <span className="mono-label text-dim">secret.console</span>
            </div>
            <button
              onClick={handleClose}
              className="w-7 h-7 flex items-center justify-center rounded-full
                text-dim hover:text-offwhite hover:bg-white/8 transition-all"
            >
              <X size={14} />
            </button>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="font-mono text-xs text-silver/70 mb-4">
              Messages from Ismael. Scroll through them.
            </p>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {SECRET_MESSAGES.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className={cn(
                    'p-3 rounded-xl transition-all duration-200 cursor-pointer',
                    selected === idx
                      ? 'bg-rose/10 border border-rose/20'
                      : 'glass border border-white/5 hover:border-white/10'
                  )}
                  onClick={() =>
                    setSelected(selected === idx ? null : idx)
                  }
                >
                  <p className="font-serif text-sm text-offwhite/80 leading-relaxed">
                    &ldquo;{msg}&rdquo;
                  </p>

                  {selected === idx && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-mono text-[9px] text-rose/60 mt-2"
                    >
                      — always, I.
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-white/5">
              <p className="mono-label text-dim/40 text-[9px] text-center">
                {SECRET_MESSAGES.length} messages · click to reveal full note
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}