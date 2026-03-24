'use client'

import { useState, useEffect } from 'react'
import { calcUptime } from '@/lib/utils'
import { ANNIVERSARY_DATE } from '@/lib/data/constants'
import type { UptimeValues } from '@/types'

export function useUptime(): UptimeValues {
  const [uptime, setUptime] = useState<UptimeValues>(() => calcUptime(ANNIVERSARY_DATE))

  useEffect(() => {
    const id = setInterval(() => {
      setUptime(calcUptime(ANNIVERSARY_DATE))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return uptime
}