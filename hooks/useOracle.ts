'use client'

import { useState, useCallback } from 'react'
import { uid } from '@/lib/utils'
import type { ChatMessage } from '@/types'

interface GeminiHistoryItem {
  role: 'user' | 'model'
  parts: Array<{ text: string }>
}

export function useOracle() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const buildHistory = useCallback(
    (msgs: ChatMessage[]): GeminiHistoryItem[] => {
      return msgs.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }))
    },
    []
  )

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return

      const userMessage: ChatMessage = {
        id: uid(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/oracle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content.trim(),
            history: buildHistory(messages),
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()

        const assistantMessage: ChatMessage = {
          id: uid(),
          role: 'assistant',
          content: data.response || 'Something went wrong. Try again.',
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch {
        setError('Connection lost. Try again.')
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: 'assistant',
            content: "I'm having trouble connecting right now. Try again in a moment.",
            timestamp: new Date(),
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, messages, buildHistory]
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, isLoading, error, sendMessage, clearMessages }
}