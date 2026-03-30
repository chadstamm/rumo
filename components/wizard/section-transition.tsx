'use client'

import { useState } from 'react'
import { SECTION_NAMES, SECTION_SUBTITLES, type Section } from '@/types/wizard'
import { CompassRose } from '@/components/compass-rose'

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

  return (
    <div className="w-full max-w-xl mx-auto text-center py-6 sm:py-8">
      {/* Compass rose accent */}
      <div
        className={`mx-auto mb-4 transition-all duration-700 ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <CompassRose className="w-12 h-12 text-teal/30 mx-auto" />
      </div>

      {/* Section label */}
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

      {/* Section name */}
      <h1
        className={`font-display text-navy font-semibold leading-tight mb-3 transition-all duration-700 delay-200 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
      >
        {SECTION_NAMES[section]}
      </h1>

      {/* Section subtitle */}
      <p
        className={`font-body text-muted text-base leading-relaxed max-w-md mx-auto mb-6 transition-all duration-700 delay-300 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {SECTION_SUBTITLES[section]}
      </p>

      {/* Getting Started instructions — only for section 0 */}
      {section === 0 && (
        <div
          className={`text-left max-w-md mx-auto mb-8 space-y-4 transition-all duration-700 delay-350 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-navy/[0.03] border border-navy/[0.06] rounded-xl px-6 py-5 space-y-3">
            <p className="font-body text-navy/70 text-sm leading-relaxed">
              <span className="font-semibold text-navy">How it works:</span> You&apos;ll answer a series of guided questions about who you are, what you value, and how you see the world. Your answers become the foundation of your Personal Constitution.
            </p>
            <p className="font-body text-navy/70 text-sm leading-relaxed">
              <span className="font-semibold text-navy">Be as complete as possible.</span> The more detail you provide, the better your AI will understand you. There are no wrong answers — just honest ones.
            </p>
            <p className="font-body text-navy/70 text-sm leading-relaxed">
              <span className="font-semibold text-navy">You can speak your answers.</span> Every text question has a microphone button. Talk naturally and your words get transcribed. No time limits.
            </p>
            <p className="font-body text-navy/70 text-sm leading-relaxed">
              <span className="font-semibold text-navy">Upload existing docs.</span> Have a bio, resume, or writing samples? You&apos;ll have a chance to upload them early on to give RUMO a head start.
            </p>
            <p className="font-body text-navy/70 text-sm leading-relaxed">
              <span className="font-semibold text-navy">Skip anything.</span> Every question can be skipped. Come back anytime — your progress saves automatically.
            </p>
            <p className="font-body text-navy/70 text-sm leading-relaxed">
              <span className="font-semibold text-navy">What you get:</span> A structured context document you can drop into Claude, ChatGPT, Gemini, or any AI tool. Your AI stops guessing and starts working like it actually knows you.
            </p>
          </div>
        </div>
      )}

      {/* Begin button */}
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
        {section === 0 ? 'LET\'S GO' : 'BEGIN SECTION'}
      </button>
    </div>
  )
}
