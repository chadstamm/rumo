'use client'

import Link from 'next/link'
import type { DocumentConfig } from '@/data/documents'
import { getQuestionsForSection } from '@/data/questions'
import { CompassRose } from '@/components/compass-rose'

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

  return (
    <div className="relative min-h-[50vh] sm:min-h-[45vh] w-full overflow-hidden flex items-end">
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

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16 pt-24 sm:pt-28">
          {/* Back link */}
          <Link
            href="/anchors"
            className="inline-flex items-center gap-1.5 font-body text-xs text-cream/40
                       hover:text-teal transition-colors duration-200 mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Anchors
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Left: title + description */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <CompassRose className="w-6 h-6 text-teal/50" />
                <span className="font-body text-xs tracking-[0.2em] uppercase text-teal/70 font-medium">
                  Context Anchor
                </span>
              </div>

              <h1
                className="font-display text-cream font-semibold leading-tight mb-3"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
              >
                {config.title}
              </h1>

              <p className="font-body text-cream/50 text-base sm:text-lg leading-relaxed mb-2">
                {config.description}
              </p>

              {tagline && (
                <p className="font-body text-ochre/60 text-sm italic">
                  {tagline}
                </p>
              )}
            </div>

            {/* Right: stats */}
            <div className="flex items-center gap-6 lg:gap-8 text-cream/40">
              <div className="text-center">
                <p className="font-display text-2xl sm:text-3xl text-teal font-semibold">{questionCount}</p>
                <p className="font-body text-[10px] tracking-[0.15em] uppercase mt-0.5">Questions</p>
              </div>
              <div className="w-px h-10 bg-cream/10" aria-hidden="true" />
              <div className="text-center">
                <p className="font-display text-2xl sm:text-3xl text-teal font-semibold">{config.sections.length}</p>
                <p className="font-body text-[10px] tracking-[0.15em] uppercase mt-0.5">Sections</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Anchor Builder Preview (Coming Soon) ──

function AnchorComingSoon({ config }: { config: DocumentConfig }) {
  return (
    <div className="bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
        {/* Preview of what the builder will look like */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ochre/10 border border-ochre/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-ochre animate-pulse" />
            <span className="font-body text-xs font-semibold text-ochre tracking-wide uppercase">Coming Soon</span>
          </div>

          <h2
            className="font-display text-navy font-semibold leading-tight mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            {config.title} Builder
          </h2>

          <p className="font-body text-navy/50 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
            Build your {config.title.toLowerCase()} through guided questions and AI-powered generation.
            Answer at your own pace — your progress saves automatically.
          </p>
        </div>

        {/* Sample question preview cards */}
        <div className="space-y-3 mb-12 max-w-xl mx-auto">
          {getQuestionsForSection(config.sections[config.sections.length - 1])
            .slice(0, 3)
            .map((q, i) => (
              <div
                key={q.id}
                className="px-5 py-4 rounded-xl bg-white border border-navy/[0.06]
                           transition-all duration-300"
                style={{ opacity: 1 - i * 0.25 }}
              >
                <div className="flex items-start gap-3">
                  <span className="font-display text-lg font-bold text-navy/10 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-body text-sm text-navy/70 font-medium leading-snug">
                      {q.question}
                    </p>
                    {q.subtext && (
                      <p className="font-body text-xs text-navy/30 mt-1 leading-relaxed">
                        {q.subtext}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          <div className="text-center pt-2">
            <span className="font-body text-xs text-navy/25">
              + {getQuestionsForSection(config.sections[config.sections.length - 1]).length - 3} more questions
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/start"
            className="shimmer-hover font-body font-bold text-sm px-8 py-3.5 rounded-full uppercase
                       bg-ochre text-white shadow-md shadow-ochre/20
                       hover:bg-ochre-light hover:shadow-lg hover:shadow-ochre/30
                       hover:-translate-y-0.5 active:translate-y-0
                       transition-all duration-300"
          >
            Chart Your Course
          </Link>
          <Link
            href="/instructions"
            className="glow-hover font-body font-bold text-sm px-8 py-3.5 rounded-full uppercase
                       bg-teal text-white shadow-md shadow-teal/20
                       hover:bg-teal-light
                       transition-all duration-300"
          >
            Configure Free Instructions
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Main Export ──

export function DocumentWizard({ config }: { config: DocumentConfig }) {
  return (
    <div className="min-h-screen bg-cream">
      <DocumentHero config={config} />
      <AnchorComingSoon config={config} />
    </div>
  )
}
