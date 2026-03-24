'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, RotateCcw } from 'lucide-react'
import { SectionWrapper } from '@/components/shared/SectionWrapper'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { useOracle } from '@/hooks/useOracle'
import { cn } from '@/lib/utils'
import { messageIn } from '@/lib/animations'
import { format } from 'date-fns'

const SUGGESTIONS = [
  'Why does he love me?',
  'Tell me something sweet',
  'I need cheering up',
  'Am I enough?',
  'Tell me something about myself',
  "I'm having a rough day",
]

// ─── Typing indicator ────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 px-4 py-2">
      <div className="w-6 h-6 rounded-full glass border border-rose/20
        flex items-center justify-center shrink-0">
        <Sparkles size={10} className="text-rose" />
      </div>
      <div className="glass rounded-2xl rounded-bl-sm px-4 py-3 border border-white/7">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-rose/60"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.18,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Message Bubble ──────────────────────────────────────────
function MessageBubble({ role, content, timestamp }: {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}) {
  const isUser = role === 'user'

  return (
    <motion.div
      variants={messageIn}
      initial="hidden"
      animate="visible"
      className={cn('flex items-end gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      {/* Avatar */}
      <div
        className={cn(
          'w-6 h-6 rounded-full flex items-center justify-center shrink-0 glass',
          isUser ? 'border border-gold/20' : 'border border-rose/20'
        )}
      >
        {isUser ? (
          <span className="font-mono text-[9px] text-gold">you</span>
        ) : (
          <Sparkles size={10} className="text-rose" />
        )}
      </div>

      <div className={cn('max-w-[78%] flex flex-col gap-1', isUser && 'items-end')}>
        {/* Bubble */}
        <div
          className={cn(
            'px-4 py-3 rounded-2xl text-sm leading-relaxed',
            isUser
              ? 'glass border border-gold/15 text-offwhite rounded-br-sm'
              : 'glass border border-rose/12 text-offwhite/90 rounded-bl-sm'
          )}
        >
          {/* Preserve line breaks from Oracle */}
          {content.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < content.split('\n').length - 1 && <br />}
            </span>
          ))}
        </div>

        {/* Timestamp */}
        <span className="font-mono text-[9px] text-dim/50 px-1">
          {format(timestamp, 'HH:mm')}
        </span>
      </div>
    </motion.div>
  )
}

// ─── Oracle Section ──────────────────────────────────────────
export function Oracle() {
  const { messages, isLoading, sendMessage, clearMessages } = useOracle()
  const [input, setInput] = useState('')
  const [suggestionsVisible, setSuggestionsVisible] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    setSuggestionsVisible(false)
    sendMessage(input.trim())
    setInput('')
  }

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestion = (s: string) => {
    setSuggestionsVisible(false)
    sendMessage(s)
  }

  return (
    <SectionWrapper id="oracle">
      <Container size="md">
        <div className="section-divider mb-12" />

        <div className="flex items-end justify-between mb-10">
          <Heading
            label="llm.intelligence"
            title="The Oracle"
            subtitle="Ask me anything about you two."
            accent="rose"
          />
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { clearMessages(); setSuggestionsVisible(true) }}
              className="mb-1 shrink-0"
            >
              <RotateCcw size={12} />
              Reset
            </Button>
          )}
        </div>

        <GlassCard padding="none" className="overflow-hidden border border-white/7">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/6">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-rose animate-pulse-slow" />
              <div className="absolute inset-0 rounded-full bg-rose/20 animate-ping" />
            </div>
            <span className="mono-label text-silver">oracle.active — context loaded</span>
          </div>

          {/* Messages area */}
          <div className="h-100 overflow-y-auto px-4 py-5 flex flex-col gap-4
            scrollbar-thin scrollbar-thumb-rose/20 scrollbar-track-transparent">

            {/* Empty state */}
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full gap-3 text-center"
              >
                <Sparkles size={24} className="text-rose/40" />
                <p className="font-display text-xl text-offwhite/30 italic">
                  Ask me anything.
                </p>
                <p className="mono-label text-dim/40 text-[10px]">
                  I know you better than you think.
                </p>
              </motion.div>
            )}

            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                role={msg.role}
                content={msg.content}
                timestamp={msg.timestamp}
              />
            ))}

            {isLoading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <AnimatePresence>
            {suggestionsVisible && messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-3 flex flex-wrap gap-2 border-t border-white/5 pt-3"
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="font-mono text-[11px] text-silver/70 hover:text-rose
                      glass px-3 py-1.5 rounded-full border border-white/7
                      hover:border-rose/20 transition-all duration-200"
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <div className="px-4 pb-4 pt-2 border-t border-white/6">
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask the Oracle…"
                disabled={isLoading}
                rows={1}
                className={cn(
                  'flex-1 glass rounded-2xl px-4 py-3 resize-none',
                  'font-sans text-sm text-offwhite placeholder:text-dim',
                  'border border-white/7 focus:border-rose/25 focus:outline-none',
                  'transition-all duration-200 max-h-32 overflow-y-auto',
                  'disabled:opacity-50'
                )}
                style={{ minHeight: '44px' }}
              />
              <Button
                variant="primary"
                size="sm"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                loading={isLoading}
                className="shrink-0 h-11 w-11 p-0 rounded-2xl"
              >
                {!isLoading && <Send size={14} />}
              </Button>
            </div>
            <p className="mono-label text-dim/30 text-[9px] mt-2 text-center">
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </GlassCard>
      </Container>
    </SectionWrapper>
  )
}