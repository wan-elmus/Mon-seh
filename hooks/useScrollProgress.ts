'use client'

import { useState, useEffect, useRef, RefObject } from 'react'

export function useScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    )

    const handleScroll = () => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      const total = rect.height + windowH
      const scrolled = windowH - rect.top
      const p = Math.max(0, Math.min(1, scrolled / total))
      setProgress(p)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [ref])

  return progress
}

export function useInView(threshold = 0.15): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}