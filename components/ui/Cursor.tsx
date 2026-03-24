'use client'

import { useCursor } from '@/hooks/useCursor'

export function Cursor() {
  const { dotRef, ringRef } = useCursor()

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  )
}