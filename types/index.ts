// ─── Gallery ────────────────────────────────────────────────
export type BentoSpan = 'square' | 'portrait' | 'landscape' | 'wide' | 'tall'

export interface MemoryImage {
  id: string
  src: string
  alt: string
  date: string          // ISO string
  location: string
  commitMessage: string
  span: BentoSpan
  blurDataURL?: string
}

// ─── Timeline ───────────────────────────────────────────────
export interface Milestone {
  id: string
  date: string          // "Month YYYY"
  title: string
  commitMessage: string
  description: string
  icon: string          // lucide icon name
  accent: 'rose' | 'gold' | 'lavender'
  imageSrc?: string
}

// ─── Oracle ─────────────────────────────────────────────────
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface OracleRequest {
  message: string
  history: { role: 'user' | 'model'; parts: Array<{ text: string }> }[]
}

export interface OracleResponse {
  response?: string
  error?: string
}

// ─── Patch ──────────────────────────────────────────────────
export type PatchErrorCode = '401' | '404' | '503' | 'custom'

export interface PatchError {
  code: PatchErrorCode
  label: string
  description: string
  response: string
}

// ─── Cycle ──────────────────────────────────────────────────
export type CyclePhase = 'follicular' | 'ovulation' | 'luteal' | 'menstrual'

export interface PhaseInfo {
  name: CyclePhase
  label: string
  color: string
  colorHex: string
  days: number
  tip: string
  message: string
  emoji: string
}

export interface CycleDay {
  day: number
  phase: CyclePhase
  isToday: boolean
}

// ─── Uptime ─────────────────────────────────────────────────
export interface UptimeValues {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalDays: number
}