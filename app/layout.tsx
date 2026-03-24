import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Cursor } from '@/components/ui/Cursor'
import { SITE_META } from '@/lib/data/constants'
import { getReduceMotion } from '@/lib/config'

// Font configuration
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: SITE_META.title,
  description: SITE_META.description,
  authors: [{ name: SITE_META.author }],
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  themeColor: '#0A0A0A',
  robots: 'noindex, nofollow', // Private site
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Check for reduced motion preference
  const prefersReducedMotion = getReduceMotion()

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${jetbrains.variable}`}
      style={prefersReducedMotion ? { scrollBehavior: 'auto' } : undefined}
    >
      <body className="bg-obsidian antialiased">
        <Cursor />
        <main className="relative z-10">{children}</main>
        
        {/* Noise overlay for texture */}
        <div className="noise fixed inset-0 pointer-events-none z-0" />
      </body>
    </html>
  )
}