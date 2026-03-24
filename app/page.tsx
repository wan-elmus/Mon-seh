'use client'

import { Hero } from '@/components/sections/Hero'
import { UptimeDashboard } from '@/components/sections/UptimeDashboard'
import { Timeline } from '@/components/sections/Timeline'
import { Gallery } from '@/components/sections/Gallery'
import { Oracle } from '@/components/sections/Oracle'
import { Footer } from '@/components/sections/Footer'
import { useCommandPalette } from '@/hooks/useCommandPalette'
import CommandPalette from '@/components/ui/CommandPalette'

export default function Home() {
  const { isOpen, close, toggle } = useCommandPalette()

  return (
    <>
      <Hero />
      <UptimeDashboard />
      <Timeline />
      <Gallery />
      <Oracle />
      <Footer onCommandPaletteOpen={toggle} />
      
      <CommandPalette isOpen={isOpen} onClose={close} />
    </>
  )
}