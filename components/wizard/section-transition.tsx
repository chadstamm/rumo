'use client'

import { useState } from 'react'
import { SECTION_NAMES, SECTION_SUBTITLES, type Section } from '@/types/wizard'

export function SectionTransition({
  section,
  onBegin,
  totalSections,
  sectionIndex,
}: {
  section: Section
  onBegin: () => void
  totalSections?: number
  sectionIndex?: number
}) {
  const [animate, setAnimate] = useState(false)

  useState(() => {
    const timer = setTimeout(() => setAnimate(true), 50)
    return () => clearTimeout(timer)
  })

  const showLabel = section !== 0
  const displayIndex = sectionIndex ?? section
  const displayTotal = totalSections ?? 5

  if (section === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto py-2">
        {/* Header — left-aligned, editorial */}
        <div
          className={`mb-6 transition-all duration-700 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-ochre/60" aria-hidden="true" />
            <span className="font-body text-xs tracking-[0.25em] uppercase text-ochre font-bold">
              Before You Begin
            </span>
          </div>
          <h1 className="font-display text-navy font-bold leading-tight" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)' }}>
            {SECTION_NAMES[section]}
          </h1>
        </div>

        {/* Instructions — two-column grid for scan-ability */}
        <div
          className={`transition-all duration-700 delay-200 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-8">
            <InstructionItem
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2v16M6 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              title="How it works"
              body="Answer guided questions about who you are, what you value, and how you see the world. Your answers become your Personal Constitution."
            />
            <InstructionItem
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
              title="Be thorough"
              body="The more detail you give, the better your AI will understand you. No wrong answers — just honest ones."
            />
            <InstructionItem
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3a3 3 0 0 0-3 3v3a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 9v.5a5 5 0 0 0 10 0V9M10 14.5V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
              title="Speak your answers"
              body="Every question has a microphone button. Talk naturally — no time limits. Your words get transcribed automatically."
            />
            <InstructionItem
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 17V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 7h4M8 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
              title="Upload existing docs"
              body="Have a bio, resume, or writing samples? Upload them early on to give RUMO a head start."
            />
            <InstructionItem
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              title="Skip anything"
              body="Every question can be skipped. Your progress saves automatically. Come back anytime."
            />
            <InstructionItem
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 5l4 4-4 4M10 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              title="What you get"
              body="A structured context document for Claude, ChatGPT, Gemini, or any AI tool. Your AI stops guessing."
            />
          </div>
        </div>

        {/* CTA — left-aligned to match the editorial feel */}
        <div
          className={`transition-all duration-700 delay-400 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            type="button"
            onClick={onBegin}
            className="font-body font-bold text-sm tracking-[0.1em] uppercase px-10 py-4 rounded-full
                       bg-ochre text-white shadow-lg shadow-ochre/20
                       hover:bg-ochre-light hover:shadow-xl hover:shadow-ochre/30
                       hover:-translate-y-0.5 active:translate-y-0
                       transition-all duration-300"
          >
            LET&apos;S GO
          </button>
        </div>
      </div>
    )
  }

  // Non-zero sections — compact transition
  return (
    <div className="w-full max-w-3xl mx-auto text-center py-6 sm:py-8">
      {showLabel && (
        <div
          className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 delay-100 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-8 h-px bg-ochre/40" aria-hidden="true" />
          <span className="font-body text-xs tracking-[0.25em] uppercase text-ochre font-medium">
            Section {displayIndex} of {displayTotal}
          </span>
          <span className="w-8 h-px bg-ochre/40" aria-hidden="true" />
        </div>
      )}

      <h1
        className={`font-display text-navy font-semibold leading-tight mb-3 transition-all duration-700 delay-200 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
      >
        {SECTION_NAMES[section]}
      </h1>

      <p
        className={`font-body text-muted text-base leading-relaxed max-w-md mx-auto mb-6 transition-all duration-700 delay-300 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {SECTION_SUBTITLES[section]}
      </p>

      <button
        type="button"
        onClick={onBegin}
        className={`font-body font-semibold text-sm px-8 py-3.5 rounded-lg
                   bg-teal text-white
                   hover:bg-teal-light hover:shadow-lg hover:shadow-teal/20
                   hover:-translate-y-0.5 active:translate-y-0
                   transition-all duration-300 delay-400
                   ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        BEGIN SECTION
      </button>
    </div>
  )
}

// ── Instruction Item ──

function InstructionItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 mt-0.5 flex-shrink-0 text-ochre/70">
        {icon}
      </div>
      <div>
        <p className="font-body text-navy font-bold text-sm mb-0.5">{title}</p>
        <p className="font-body text-navy/60 text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  )
}
