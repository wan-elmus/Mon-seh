'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { PATCH_ERRORS } from '@/lib/data/patch'
import { cn } from '@/lib/utils'
import type { PatchError } from '@/types'

export function PatchRequest() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<PatchError | null>(null)
  const [executed, setExecuted] = useState(false)

  const handleExecute = () => {
    if (!selected) return
    setExecuted(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => { setSelected(null); setExecuted(false) }, 300)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="font-mono text-dim/60 hover:text-rose border-dim/20 hover:border-rose/20"
      >
        <Terminal size={12} />
        fix(main) --force
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} title="conflict.resolution.pipeline" size="md">
        <AnimatePresence mode="wait">
          {!executed ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-5"
            >
              <p className="text-silver text-sm leading-relaxed">
                Select the error type. The patch will be applied immediately.
              </p>

              {/* Error options */}
              <div className="flex flex-col gap-2">
                {PATCH_ERRORS.map((err) => (
                  <button
                    key={err.code}
                    onClick={() => setSelected(err)}
                    className={cn(
                      'text-left px-4 py-3.5 rounded-2xl border transition-all duration-200',
                      'flex flex-col gap-0.5',
                      selected?.code === err.code
                        ? 'bg-rose/8 border-rose/25 text-offwhite'
                        : 'glass border-white/7 text-silver hover:border-white/15 hover:text-offwhite'
                    )}
                  >
                    <span className="font-mono text-xs font-medium">{err.label}</span>
                    <span className="font-sans text-[11px] text-dim">{err.description}</span>
                  </button>
                ))}
              </div>

              <Button
                variant="rose"
                size="md"
                onClick={handleExecute}
                disabled={!selected}
                className="w-full mt-1"
              >
                Execute Patch
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-emerald-400" />
                <span className="mono-label text-emerald-400">patch applied</span>
              </div>

              <div className="glass rounded-2xl p-5 border border-white/7">
                <p className="text-offwhite/90 text-sm leading-loose whitespace-pre-line font-light">
                  {selected?.response}
                </p>
              </div>

              <p className="mono-label text-dim/50 text-[10px] text-center">
                — Ismael
              </p>

              <Button variant="ghost" size="sm" onClick={handleClose} className="w-full">
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </>
  )
}