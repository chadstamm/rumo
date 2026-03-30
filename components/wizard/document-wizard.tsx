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
          <div className="max-w-2xl">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-ochre font-bold mb-5">
              Context Anchor
            </p>

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

  return (
    <div className="min-h-screen bg-cream">
      <DocumentHero config={config} />

      {/* Navy highlight section */}
      <div className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-10">
          {config.slug === 'constitution' ? (
            <div className="flex items-start gap-5 sm:gap-6">
              {/* Icon on far left */}
              {ANCHOR_PNG_ICONS[config.slug] && (
                <Image
                  src={ANCHOR_PNG_ICONS[config.slug]}
                  alt=""
                  width={44}
                  height={44}
                  className="flex-shrink-0 mt-1 opacity-90"
                  style={{ filter: 'brightness(0) invert(1) opacity(0.9)' }}
                  aria-hidden="true"
                />
              )}

              {/* Copy + stats + CTA */}
              <div className="flex-1">
                <p className="font-body text-cream/80 text-base sm:text-lg font-medium leading-relaxed mb-2">
                  Begin with our free Personal Constitution generator, and complete the core Context Anchor in your vault.
                </p>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-4 text-cream/40">
                    <span className="font-display text-xl text-ochre font-bold">{questionCount}</span>
                    <span className="font-body text-xs tracking-[0.15em] uppercase">Questions</span>
                    <span className="w-px h-5 bg-cream/10" />
                    <span className="font-display text-xl text-ochre font-bold">{config.sections.length}</span>
                    <span className="font-body text-xs tracking-[0.15em] uppercase">Sections</span>
                  </div>
                  <a
                    href="#wizard-start"
                    className="font-body text-sm font-bold tracking-[0.1em] uppercase px-6 py-2.5 rounded-full
                               bg-ochre text-white shadow-md shadow-ochre/20
                               hover:bg-ochre-light hover:shadow-lg hover:shadow-ochre/30
                               transition-all duration-200"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <p className="font-body text-cream/60 text-sm sm:text-base font-medium">
              {questionCount} questions &middot; {config.sections.length} sections
            </p>
          )}
        </div>
      </div>

      <div id="wizard-start" />

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
