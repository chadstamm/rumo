'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { DocumentConfig } from '@/data/documents'
import { getQuestionsForSection } from '@/data/questions'
import { CompassRose } from '@/components/compass-rose'
import { WizardProvider } from '@/context/wizard-context'
import { useWizard } from '@/context/wizard-context'
import { ProgressBar } from './progress-bar'
import { QuestionStep } from './question-step'
import { SectionTransition } from './section-transition'
import { ANCHOR_ICON_MAP, type AnchorSlug } from '@/components/icons/anchor-icons'

// ── Hero backgrounds per document ──

const HERO_IMAGES: Record<string, string> = {
  constitution: '/heroes/constitution.jpg',
  sotu: '/heroes/sotu.jpg',
  codex: '/heroes/codex.jpg',
  'story-bank': '/heroes/story-bank.jpg',
  timeline: '/heroes/constitution.jpg',
  roster: '/heroes/sotu.jpg',
}

// ── Anchor-specific taglines ──

const ANCHOR_TAGLINES: Record<string, string> = {
  constitution: 'The foundation everything else builds on',
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
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: heroImage
            ? `linear-gradient(to bottom, rgba(26,39,68,0.4) 0%, rgba(26,39,68,0.6) 40%, rgba(26,39,68,0.92) 80%, rgba(26,39,68,1) 100%)`
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
          {/* Back link */}
          <Link
            href="/anchors"
            className="inline-flex items-center gap-1.5 font-body text-xs text-cream/40
                       hover:text-teal transition-colors duration-200 mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Anchors
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* Left: title + description */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                {iconEntry && (
                  <div className="w-7 h-7 text-teal/60">
                    <iconEntry.Icon className="w-full h-full" />
                  </div>
                )}
                <span className="font-body text-xs tracking-[0.2em] uppercase text-teal/70 font-medium">
                  Context Anchor
                </span>
              </div>

              <h1
                className="font-display text-cream font-semibold leading-tight mb-2"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
              >
                {config.title}
              </h1>

              <div className="w-10 h-[2px] bg-ochre/50 mb-3" aria-hidden="true" />

              <p className="font-body text-cream/50 text-sm sm:text-base leading-relaxed">
                {config.description}
              </p>

              {tagline && (
                <p className="font-body text-ochre/50 text-xs italic mt-2">
                  {tagline}
                </p>
              )}
            </div>

            {/* Right: stats */}
            <div className="flex items-center gap-6 lg:gap-8 text-cream/40">
              <div className="text-center">
                <p className="font-display text-2xl text-teal font-semibold">{questionCount}</p>
                <p className="font-body text-[10px] tracking-[0.15em] uppercase mt-0.5">Questions</p>
              </div>
              <div className="w-px h-8 bg-cream/10" aria-hidden="true" />
              <div className="text-center">
                <p className="font-display text-2xl text-teal font-semibold">{config.sections.length}</p>
                <p className="font-body text-[10px] tracking-[0.15em] uppercase mt-0.5">Sections</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Anchor-Specific Completion ──

function AnchorComplete({ config }: { config: DocumentConfig }) {
  const { totalAnswered, reset } = useWizard()
  const iconEntry = ANCHOR_ICON_MAP[config.slug as AnchorSlug]

  return (
    <div className="bg-cream">
      <div className="max-w-lg mx-auto px-6 py-16 sm:py-24 text-center">
        {iconEntry ? (
          <div className="w-16 h-16 mx-auto mb-6 text-teal/40">
            <iconEntry.Icon className="w-full h-full" />
          </div>
        ) : (
          <CompassRose className="w-16 h-16 text-teal/40 mx-auto mb-6" />
        )}

        <h2
          className="font-display text-navy font-semibold leading-tight mb-3"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          {config.title} Complete.
        </h2>

        <p className="font-body text-muted text-base leading-relaxed mb-2">
          You answered {totalAnswered} questions for your {config.title.toLowerCase()}.
          That&apos;s the raw material your AI needs.
        </p>

        <p className="font-body text-navy/35 text-sm mb-10">
          Document generation is coming soon. Your answers are saved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/anchors"
            className="shimmer-hover font-body font-semibold text-sm px-7 py-3 rounded-full
                       bg-ochre text-white shadow-md shadow-ochre/20
                       hover:bg-ochre-light hover:shadow-lg hover:shadow-ochre/30
                       transition-all duration-200 hover:-translate-y-[1px]"
          >
            Build Another Anchor
          </Link>
          <Link
            href="/vault"
            className="font-body text-sm text-navy/50 hover:text-navy px-5 py-2.5 transition-colors duration-200"
          >
            Go to Vault →
          </Link>
        </div>

        <button
          type="button"
          onClick={reset}
          className="font-body text-xs text-navy/25 hover:text-navy/40 px-4 py-2 mt-6 transition-colors duration-200"
        >
          Start Over
        </button>
      </div>
    </div>
  )
}

// ── Anchor Wizard Body (inside WizardProvider) ──

function AnchorWizardBody({ config }: { config: DocumentConfig }) {
  const { state, activeSections, isComplete } = useWizard()
  const [showingSectionIntro, setShowingSectionIntro] = useState(true)
  const [lastSection, setLastSection] = useState(state.currentSection)

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
            totalSections={contentSections.length}
            sectionIndex={currentIdx >= 0 ? currentIdx + 1 : undefined}
          />
        ) : (
          <QuestionStep />
        )}
      </main>
    </div>
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
