import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format } from 'date-fns'
import type { UptimeValues } from '@/types'

let counter = 0

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calcUptime(since: Date): UptimeValues {
  const now = Date.now()
  const diff = now - since.getTime()

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, totalDays: days }
}

export function formatMemoryDate(dateStr: string): string {
  const date = new Date(dateStr)
  return format(date, 'MMMM d, yyyy')
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr)
  return formatDistanceToNow(date, { addSuffix: true })
}

export function pad(n: number, digits = 2): string {
  return String(n).padStart(digits, '0')
}

export function uid(): string {
  counter = (counter + 1) % 1000000
  return `${Date.now()}-${counter}`
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}