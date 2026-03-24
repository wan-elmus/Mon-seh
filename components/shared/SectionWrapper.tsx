'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useScrollProgress'

interface SectionWrapperProps {
  id?: string
  className?: string
  children: React.ReactNode
  delay?: number
}

export function SectionWrapper({ id, className, children, delay = 0 }: SectionWrapperProps) {
  const [ref, inView] = useInView(0.1)

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={cn('section-pad', className)}
    >
      {children}
    </motion.section>
  )
}