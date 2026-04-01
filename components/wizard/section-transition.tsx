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
          className={`mb-8 transition-all duration-700 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-ochre/60" aria-hidden="true" />
            <span className="font-body text-xs tracking-[0.25em] uppercase text-ochre font-bold">
              Getting Started
            </span>
          </div>
          <h1 className="font-display text-navy font-bold leading-tight" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)' }}>
            Before You Begin
          </h1>
        </div>

        {/* Instructions — two-column grid, bold subheads */}
        <div
          className={`transition-all duration-700 delay-200 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 mb-10">
            <InstructionItem
              icon={
                <svg width="38" height="38" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M10 1.5v1M10 17.5v1M1.5 10h1M17.5 10h1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <polygon points="10,4 12,9 10,10 8,9" fill="currentColor" opacity="0.9" />
                  <polygon points="10,16 8,11 10,10 12,11" stroke="currentColor" strokeWidth="0.8" fill="none" />
                  <circle cx="10" cy="10" r="1" fill="currentColor" />
                </svg>
              }
              title="HOW IT WORKS"
              body="Answer guided questions about who you are, what you value, and how you see the world. Your answers become your Personal Constitution."
            />
            <InstructionItem
              icon={
                <svg width="38" height="38" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
              title="BE THOROUGH"
              body="The more detail you give, the better your AI will understand you. No wrong answers — just honest ones."
            />
            <InstructionItem
              icon={
                <svg width="38" height="38" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3a3 3 0 0 0-3 3v3a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 9v.5a5 5 0 0 0 10 0V9M10 14.5V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
              title="SPEAK YOUR ANSWERS"
              body="Every question has a microphone button. Talk naturally — no time limits. Your words get transcribed automatically."
            />
            <InstructionItem
              icon={
                <svg width="38" height="38" viewBox="0 0 20 20" fill="none">
                  <path d="M4 17V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 7h4M8 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
              title="UPLOAD EXISTING DOCS"
              body="Have a bio, resume, or writing samples? Upload them early on to give RUMO a head start."
            />
            <InstructionItem
              icon={
                <svg width="38" height="38" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              title="SKIP ANYTHING"
              body="Every question can be skipped. Your progress saves automatically. Come back anytime."
            />
            <InstructionItem
              icon={
                <svg width="38" height="38" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1l1.5 4.5L16 7l-4.5 1.5L10 13l-1.5-4.5L4 7l4.5-1.5L10 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M16 13l.75 2.25L19 16l-2.25.75L16 19l-.75-2.25L13 16l2.25-.75L16 13Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                  <path d="M4 14l.5 1.5L6 16l-1.5.5L4 18l-.5-1.5L2 16l1.5-.5L4 14Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
                </svg>
              }
              title="WHAT YOU GET"
              body="Critical context you can upload to Claude, ChatGPT, Gemini, or any AI agent — so it works more effectively on your behalf."
            />
          </div>
        </div>

        {/* CTA — centered */}
        <div
          className={`text-center transition-all duration-700 delay-400 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            type="button"
            onClick={onBegin}
            className="font-body font-bold text-sm tracking-[0.1em] uppercase px-10 py-4 rounded-full
                       bg-teal text-white shadow-lg shadow-teal/20
                       hover:bg-teal-light hover:shadow-xl hover:shadow-teal/30
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
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 mt-0.5 flex-shrink-0 text-ochre">
        {icon}
      </div>
      <div>
        <p className="font-body text-navy font-black text-sm tracking-[0.08em] mb-1.5">{title}</p>
        <p className="font-body text-navy/55 text-[15px] leading-relaxed">{body}</p>
      </div>
    </div>
  )
}
