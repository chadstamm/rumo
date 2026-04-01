'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import type { DocumentConfig } from '@/data/documents'
import { getQuestionsForSection } from '@/data/questions'
import { CompassRose } from '@/components/compass-rose'
import { WizardProvider } from '@/context/wizard-context'
import { useWizard } from '@/context/wizard-context'
import { ProgressBar } from './progress-bar'
import { QuestionStep } from './question-step'
import { SectionTransition } from './section-transition'
import Image from 'next/image'
import { ANCHOR_ICON_MAP, type AnchorSlug } from '@/components/icons/anchor-icons'

const ANCHOR_PNG_ICONS: Record<string, string> = {
  constitution: '/icons/constitution.png',
  codex: '/icons/codex.png',
  'story-bank': '/icons/story-bank.png',
  sotu: '/icons/sotu.png',
  timeline: '/icons/timeline.png',
  roster: '/icons/roster.png',
}

// ── Hero backgrounds per document ──

const HERO_IMAGES: Record<string, string> = {
  constitution: '/heroes/constitution.jpg',
  sotu: '/heroes/sotu.jpg',
  codex: '/heroes/codex.jpg',
  'story-bank': '/heroes/story-bank.jpg',
  timeline: '/heroes/timeline.jpg',
  roster: '/heroes/roster.jpg',
}

// Focal point overrides — shift object-position for specific hero images
const HERO_FOCUS: Record<string, string> = {
  codex: 'center 70%', // Show typewriter keys, not top of machine
  timeline: 'center 40%', // Focus on the ornate black and white calçada pattern
}

// ── Anchor-specific taglines ──

const ANCHOR_TAGLINES: Record<string, string> = {
  constitution: '',
  sotu: 'A living document that evolves as your life does',
  codex: 'Your voice, extracted and preserved',
  'story-bank': 'Raw material that makes AI feel lived-in',
  timeline: 'The chronological arc that tells AI how you got here',
  roster: 'The relationship context your agent needs to navigate your world',
}

// ── Document Hero (full-width, immersive) ──

function DocumentHero({ config }: { config: DocumentConfig }) {
  const heroImage = HERO_IMAGES[config.slug]
  const tagline = ANCHOR_TAGLINES[config.slug]
  const questionCount = config.sections.reduce<number>(
    (sum, s) => sum + getQuestionsForSection(s).length,
    0
  )
  const iconEntry = ANCHOR_ICON_MAP[config.slug as AnchorSlug]

  return (
    <div className="relative min-h-[40vh] sm:min-h-[35vh] w-full overflow-hidden flex items-end">
      {/* Background image */}
      {heroImage && (
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={HERO_FOCUS[config.slug] ? { objectPosition: HERO_FOCUS[config.slug] } : undefined}
        />
      )}

      {/* Overlay — warm gold tint over all hero images */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: heroImage
            ? `linear-gradient(to bottom, rgba(40,32,18,0.35) 0%, rgba(30,28,20,0.55) 40%, rgba(26,39,68,0.88) 80%, rgba(26,39,68,1) 100%)`
            : '#1a2744',
        }}
      />

      {/* Compass rose watermark */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 opacity-[0.02]" aria-hidden="true">
        <CompassRose className="w-full h-full text-cream" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 pt-24 sm:pt-28">
          <div className="flex items-end justify-between gap-8">
            {/* Left: text */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-body text-sm tracking-[0.2em] uppercase text-ochre font-bold">
                  Context Anchor
                </span>
                {config.slug === 'constitution' && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-teal border border-teal font-body text-[10px] font-bold tracking-[0.15em] uppercase text-white">
                    Free
                  </span>
                )}
              </div>

              <h1
                className="font-display text-cream font-bold leading-tight mb-3"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
              >
                {config.title}
              </h1>

              <div className="w-10 h-[2px] bg-ochre/50 mb-4" aria-hidden="true" />

              <p className="font-body text-cream/70 text-base sm:text-lg leading-relaxed font-medium">
                {config.description}
              </p>
            </div>

            {/* Right: large icon */}
            {ANCHOR_PNG_ICONS[config.slug] && (
              <div className="hidden lg:block flex-shrink-0">
                <Image
                  src={ANCHOR_PNG_ICONS[config.slug]}
                  alt=""
                  width={180}
                  height={180}
                  className="opacity-100 -ml-8"
                  style={{ filter: 'brightness(0) invert(1)' }}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Anchor-Specific Completion ──

function AnchorComplete({ config }: { config: DocumentConfig }) {
  const { state, totalAnswered, reset, generateDocument } = useWizard()
  const iconEntry = ANCHOR_ICON_MAP[config.slug as AnchorSlug]
  const hasTriggered = useRef(false)
  const outputRef = useRef<HTMLDivElement>(null)

  // Auto-trigger generation on mount
  useEffect(() => {
    if (!hasTriggered.current && state.generationPhase === 'idle') {
      hasTriggered.current = true
      generateDocument(config.slug, config.title)
    }
  }, [config.slug, config.title, generateDocument, state.generationPhase])

  // Auto-scroll as text streams
  useEffect(() => {
    if (outputRef.current && state.generationPhase === 'streaming') {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [state.streamedText, state.generationPhase])

  const isGenerating = ['analyzing', 'generating', 'streaming'].includes(state.generationPhase)
  const isDone = state.generationPhase === 'complete'
  const isError = state.generationPhase === 'error'

  const phaseLabel = {
    idle: '',
    analyzing: 'Analyzing your answers...',
    generating: 'Generating your document...',
    streaming: 'Writing your ' + config.title.toLowerCase() + '...',
    complete: '',
    error: '',
  }[state.generationPhase]

  return (
    <div className="bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-10">
          {iconEntry ? (
            <div className="w-16 h-16 mx-auto mb-6 text-teal/40">
              <iconEntry.Icon className="w-full h-full" />
            </div>
          ) : (
            <CompassRose className="w-16 h-16 text-teal/40 mx-auto mb-6" />
          )}

          {isGenerating && (
            <>
              <h2
                className="font-display text-navy font-semibold leading-tight mb-3"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
              >
                Building Your {config.title}
              </h2>
              <p className="font-body text-muted text-base leading-relaxed mb-2">
                {phaseLabel}
              </p>
              <div className="w-12 h-1 bg-teal/30 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-teal rounded-full animate-pulse" style={{ width: state.generationPhase === 'streaming' ? '80%' : '40%' }} />
              </div>
            </>
          )}

          {isDone && (
            <>
              <h2
                className="font-display text-navy font-semibold leading-tight mb-3"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
              >
                Your {config.title}
              </h2>
              <p className="font-body text-muted text-base leading-relaxed">
                Generated from {totalAnswered} answers. Copy it, download it, or upload it to your AI.
              </p>
            </>
          )}

          {isError && (
            <>
              <h2
                className="font-display text-navy font-semibold leading-tight mb-3"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
              >
                Generation Failed
              </h2>
              <p className="font-body text-red-600 text-base leading-relaxed mb-4">
                {state.generationError || 'Something went wrong. Your answers are saved — try again.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  hasTriggered.current = false
                  generateDocument(config.slug, config.title)
                }}
                className="font-body font-semibold text-sm px-7 py-3 rounded-full
                           bg-teal text-white shadow-md shadow-teal/20
                           hover:bg-teal-light transition-all duration-200"
              >
                Try Again
              </button>
            </>
          )}
        </div>

        {/* Streamed document output */}
        {(isGenerating || isDone) && state.streamedText && (
          <div
            ref={outputRef}
            className="relative bg-white rounded-2xl border border-navy/10 shadow-sm px-8 py-10 sm:px-12 sm:py-14 mb-10 max-h-[70vh] overflow-y-auto"
          >
            <div className="prose prose-navy max-w-none font-body text-base leading-relaxed whitespace-pre-wrap">
              {state.streamedText}
            </div>
          </div>
        )}

        {/* Actions — only show when complete */}
        {isDone && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(state.streamedText)
              }}
              className="shimmer-hover font-body font-semibold text-sm px-7 py-3 rounded-full
                         bg-teal text-white shadow-md shadow-teal/20
                         hover:bg-teal-light hover:shadow-lg hover:shadow-teal/30
                         transition-all duration-200 hover:-translate-y-[1px]"
            >
              Copy to Clipboard
            </button>
            <button
              type="button"
              onClick={() => {
                const blob = new Blob([state.streamedText], { type: 'text/markdown' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `${config.slug}-${new Date().toISOString().split('T')[0]}.md`
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="font-body font-semibold text-sm px-7 py-3 rounded-full
                         bg-ochre text-white shadow-md shadow-ochre/20
                         hover:bg-ochre-light hover:shadow-lg hover:shadow-ochre/30
                         transition-all duration-200 hover:-translate-y-[1px]"
            >
              Download .md
            </button>
            <Link
              href="/anchors"
              className="font-body text-sm text-navy/50 hover:text-navy px-5 py-2.5 transition-colors duration-200"
            >
              Build Another Anchor →
            </Link>
          </div>
        )}

        {isDone && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={reset}
              className="font-body text-xs text-navy/25 hover:text-navy/40 px-4 py-2 transition-colors duration-200"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Anchor Wizard Body (inside WizardProvider) ──

function AnchorWizardBody({ config }: { config: DocumentConfig }) {
  const { state, activeSections, isComplete } = useWizard()
  const [showingSectionIntro, setShowingSectionIntro] = useState(true)
  const [lastSection, setLastSection] = useState(state.currentSection)
  const questionCount = config.sections.reduce<number>(
    (sum, s) => sum + getQuestionsForSection(s).length,
    0
  )

  // Detect section changes to show transition
  if (state.currentSection !== lastSection) {
    setLastSection(state.currentSection)
    setShowingSectionIntro(true)
  }

  if (isComplete) {
    return (
      <>
        <DocumentHero config={config} />
        <AnchorComplete config={config} />
      </>
    )
  }

  const contentSections = activeSections.filter(s => s !== 0) as number[]
  const currentIdx = contentSections.indexOf(state.currentSection as number)

  const showFullBuildCTA = showingSectionIntro && state.currentSection === 0

  return (
    <div className="min-h-screen bg-cream">
      <DocumentHero config={config} />


      {/* Progress bar */}
      <div className="sticky top-0 z-20 bg-cream/95 backdrop-blur-sm border-b border-navy/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <ProgressBar />
        </div>
      </div>

      {/* Questions */}
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        {showingSectionIntro ? (
          <SectionTransition
            section={state.currentSection}
            onBegin={() => setShowingSectionIntro(false)}
            anchorSlug={config.slug}
            totalSections={contentSections.length}
            sectionIndex={currentIdx >= 0 ? currentIdx + 1 : undefined}
          />
        ) : (
          <QuestionStep />
        )}
      </main>

      {/* Full-width upsell — only on Getting Started intro */}
      {showFullBuildCTA && <FullBuildCTA currentSlug={config.slug} />}
    </div>
  )
}

// ── Full Build CTA (full-width, below Getting Started) ──

const ANCHOR_LABELS: Record<string, string> = {
  constitution: 'Constitution',
  codex: 'Voice',
  'story-bank': 'Stories',
  sotu: 'Situation',
  timeline: 'Timeline',
  roster: 'Influencers',
}

function FullBuildCTA({ currentSlug }: { currentSlug?: string }) {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Atmospheric layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 50%, rgba(30, 190, 177, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse 60% 60% at 80% 30%, rgba(196, 148, 58, 0.06) 0%, transparent 70%),
            radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0, 0, 0, 0.3) 0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        {/* Top: anchor icon + heading */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <img
              src="/anchor-section-icon.png"
              alt=""
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto opacity-70"
              aria-hidden="true"
            />
          </div>

          <p className="font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-ochre font-bold mb-4">
            Want the full picture?
          </p>

          <h2
            className="font-display text-cream font-bold leading-[1.1] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
          >
            Build All Six Anchors
          </h2>

          <p className="font-body text-cream/50 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            Your Constitution is the foundation. Add your Voice, Stories, Situation, Timeline,
            and Influence Roster — then store and update your documents anytime in your personal vault.
          </p>

          <p className="font-body text-cream/30 text-sm mb-10">
            $49/year <span className="text-cream/20">·</span> all six anchors <span className="text-cream/20">·</span> unlimited updates <span className="text-cream/20">·</span> vault access
          </p>
        </div>

        {/* Anchor icon row — clickable */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-12 mb-14">
          {(['constitution', 'codex', 'story-bank', 'sotu', 'timeline', 'roster'] as const).map((slug) => {
            const isCurrent = slug === currentSlug
            return (
              <Link
                key={slug}
                href={`/docs/${slug}`}
                className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <div
                    className={`absolute inset-0 rounded-full transition-opacity duration-300 blur-xl ${isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    style={{ background: slug === 'constitution' ? 'rgba(30, 190, 177, 0.3)' : 'rgba(196, 148, 58, 0.2)' }}
                    aria-hidden="true"
                  />
                  <img
                    src={`/icons/${slug}.png`}
                    alt={ANCHOR_LABELS[slug]}
                    className={`relative w-10 h-10 sm:w-14 sm:h-14 transition-all duration-300 ${isCurrent ? 'opacity-90' : 'opacity-50 group-hover:opacity-100'}`}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
                <span className={`font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${isCurrent ? 'text-cream/80' : 'text-cream/30 group-hover:text-cream/70'}`}>
                  {ANCHOR_LABELS[slug]}
                </span>
                {slug === 'constitution' && (
                  <span className="font-body text-[9px] tracking-wider uppercase text-teal/60 -mt-1">Free</span>
                )}
              </Link>
            )
          })}
        </div>

        {/* CTA button */}
        <div className="text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-3 font-body font-bold text-sm sm:text-base tracking-[0.1em] uppercase
                       px-10 sm:px-14 py-4 sm:py-5 rounded-full
                       bg-ochre text-white shadow-lg shadow-ochre/25
                       hover:bg-ochre-light hover:shadow-xl hover:shadow-ochre/35
                       hover:-translate-y-1 active:translate-y-0
                       transition-all duration-300"
          >
            BUILD ALL SIX
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 10h10M12 6.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Gold line before footer */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-ochre/50 to-transparent" aria-hidden="true" />
    </section>
  )
}

// ── Main Export ──

export function DocumentWizard({ config }: { config: DocumentConfig }) {
  return (
    <WizardProvider
      filterSections={config.sections}
      storageKey={config.slug}
    >
      <AnchorWizardBody config={config} />
    </WizardProvider>
  )
}
