'use client'

// import { motion } from 'framer-motion'
import { Heart, Command } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { PatchRequest } from './PatchRequest'
import { BUILD_VERSION, SYSTEM_AUTHOR, SUBJECT_NAME } from '@/lib/data/constants'
// import { cn } from '@/lib/utils'

interface FooterProps {
  onCommandPaletteOpen?: () => void
}

export function Footer({ onCommandPaletteOpen }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-20 pt-12 pb-8 border-t border-white/6">
      <Container>
        <div className="flex flex-col gap-8">
          {/* Top row - Patch + Command */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <PatchRequest />
              
              {onCommandPaletteOpen && (
                <button
                  onClick={onCommandPaletteOpen}
                  className="font-mono text-dim/60 hover:text-rose text-xs flex items-center gap-1.5
                    border border-dim/20 hover:border-rose/20 rounded-full px-3 py-1.5
                    transition-all duration-200"
                >
                  <Command size={10} />
                  <span>Cmd + K</span>
                </button>
              )}
            </div>

            {/* Build version */}
            <div className="font-mono text-[10px] text-dim/40">
              {BUILD_VERSION}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Attribution */}
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-xs text-dim/60">
                Handcrafted with
              </span>
              <Heart size={10} className="text-rose animate-pulse-slow" />
              <span className="font-sans text-xs text-dim/60">
                by {SYSTEM_AUTHOR} for {SUBJECT_NAME}
              </span>
            </div>

            {/* Copyright */}
            <div className="font-mono text-[10px] text-dim/40">
              © {currentYear} The Camilla Protocol. All rights reserved.
            </div>

            {/* GitHub link (optional) */}
            {/* <a
              href="https://github.com/wan-elmus/Mon-seh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] text-dim/40 
                hover:text-dim/60 transition-colors duration-200"
            >
              <Github size={10} />
              <span>source</span>
            </a> */}
          </div>

          {/* Fine print */}
          <div className="text-center">
            <p className="font-mono text-[9px] text-dim/30 max-w-md mx-auto">
              This site is a private digital sanctuary. Every line of code, every pixel,
              every animation; built for one person.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}