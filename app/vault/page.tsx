'use client'

import { useState, useEffect } from 'react'
import { CompassRose } from '@/components/compass-rose'
import Link from 'next/link'
import type { GenerationResult } from '@/types/models'
import { AI_MODELS, MODEL_FIELDS } from '@/data/models'
import type { AIModelId } from '@/types/models'

const INSTRUCTIONS_KEY = 'rumo-instructions-state'

interface SavedInstructionsState {
  isComplete: boolean
  generationResult: GenerationResult | null
  selectedModels: AIModelId[]
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="font-body text-xs px-3 py-1.5 rounded-lg
                 bg-teal/10 text-teal hover:bg-teal/20
                 transition-all duration-200"
    >
      {copied ? 'COPIED' : label || 'COPY'}
    </button>
  )
}

function InstructionsCard({
  modelId,
  result,
}: {
  modelId: AIModelId
  result: Record<string, unknown>
}) {
  const model = AI_MODELS.find((m) => m.id === modelId)
  const fields = MODEL_FIELDS[modelId]
  if (!model || !fields) return null

  return (
    <div className="rounded-xl border border-navy/10 bg-white overflow-hidden">
      {/* Model header */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ borderBottom: `2px solid ${model.color}20` }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
          style={{ backgroundColor: model.color }}
        >
          {model.name[0]}
        </div>
        <div>
          <h3 className="font-display text-navy font-semibold text-lg">{model.name}</h3>
          <p className="font-body text-navy/40 text-xs">{model.company}</p>
        </div>
      </div>

      {/* Fields */}
      <div className="px-6 py-5 space-y-5">
        {fields.map((field) => {
          const value = result[field.id]
          if (!value) return null

          return (
            <div key={field.id}>
              <div className="flex items-center justify-between mb-2">
                <label className="font-body text-xs font-semibold text-navy/60 uppercase tracking-wide">
                  {field.label}
                </label>
                <CopyButton text={String(value)} />
              </div>

              {field.navigationPath && (
                <p className="font-body text-[10px] text-navy/30 mb-2">
                  {field.navigationPath}
                </p>
              )}

              {field.type === 'textarea' ? (
                <div className="font-body text-sm text-navy/80 leading-relaxed whitespace-pre-wrap bg-cream/50 rounded-lg px-4 py-3 border border-navy/5">
                  {String(value)}
                </div>
              ) : field.type === 'three-way' ? (
                <div className="flex items-center gap-2">
                  {['Less', 'Default', 'More'].map((opt) => (
                    <span
                      key={opt}
                      className={`font-body text-xs px-3 py-1.5 rounded-full ${
                        String(value) === opt
                          ? 'bg-teal text-white font-medium'
                          : 'bg-navy/5 text-navy/30'
                      }`}
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="font-body text-sm text-navy/80 bg-cream/50 rounded-lg px-4 py-2 border border-navy/5">
                  {String(value)}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function VaultPage() {
  const [instructionsState, setInstructionsState] = useState<SavedInstructionsState | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(INSTRUCTIONS_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.isComplete && parsed.generationResult) {
          setInstructionsState(parsed)
        }
      }
    } catch {
      // Ignore
    }
    setLoaded(true)
  }, [])

  if (!loaded) return null

  const hasInstructions = instructionsState?.isComplete && instructionsState?.generationResult

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-navy text-cream">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
          <CompassRose className="w-8 h-8 text-teal/40 mb-5" />
          <h1
            className="font-display text-cream font-semibold leading-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Your Vault
          </h1>
          <p className="font-body text-cream/50 text-base max-w-lg">
            Everything you&apos;ve built with Rumo, in one place.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-14">
        {/* Instructions Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-teal/40" aria-hidden="true" />
            <span className="font-body text-xs tracking-[0.2em] uppercase text-teal font-medium">
              Custom Instructions
            </span>
          </div>

          {hasInstructions ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {instructionsState.selectedModels.map((modelId) => {
                const result = instructionsState.generationResult?.[modelId]
                if (!result) return null
                return (
                  <InstructionsCard
                    key={modelId}
                    modelId={modelId}
                    result={result as Record<string, unknown>}
                  />
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 rounded-xl border-2 border-dashed border-navy/10">
              <p className="font-body text-navy/40 text-sm mb-4">
                No instructions generated yet.
              </p>
              <Link
                href="/instructions"
                className="glow-hover font-body font-bold text-sm px-6 py-3 rounded-full uppercase
                           bg-teal text-white hover:bg-teal-light
                           transition-all duration-300 inline-block"
              >
                BUILD FREE INSTRUCTIONS
              </Link>
            </div>
          )}
        </div>

        {/* Context Anchors Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-ochre/40" aria-hidden="true" />
            <span className="font-body text-xs tracking-[0.2em] uppercase text-ochre font-medium">
              Context Anchors
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Personal Constitution', slug: 'constitution', desc: 'Who you are always' },
              { name: 'State of the Union', slug: 'sotu', desc: 'Where you are right now' },
              { name: 'Writing Codex', slug: 'codex', desc: 'How you write' },
              { name: 'Story Bank', slug: 'story-bank', desc: 'What you\'ve lived' },
              { name: 'Timeline', slug: 'timeline', desc: 'Where you\'ve been and where you\'re headed' },
              { name: 'Roster', slug: 'roster', desc: 'The people who shape your world' },
            ].map((anchor) => (
              <Link
                key={anchor.slug}
                href={`/docs/${anchor.slug}`}
                className="group px-6 py-5 rounded-xl border border-navy/10 bg-white
                           hover:border-ochre/30 hover:shadow-sm
                           transition-all duration-300 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-display text-navy font-semibold text-base mb-0.5">
                    {anchor.name}
                  </h3>
                  <p className="font-body text-navy/40 text-sm">{anchor.desc}</p>
                  <span className="font-body text-[10px] text-ochre uppercase tracking-wide mt-2 inline-block">
                    Coming Soon — Pro
                  </span>
                </div>
                <svg
                  width="18" height="18" viewBox="0 0 18 18" fill="none"
                  className="text-navy/15 group-hover:text-ochre transition-colors duration-300 flex-shrink-0 ml-4"
                  aria-hidden="true"
                >
                  <path d="M7 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
