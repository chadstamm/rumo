'use client'

import type { DocumentConfig } from '@/data/documents'
import { getQuestionsForSection } from '@/data/questions'
import { CompassRose } from '@/components/compass-rose'

// ── Hero backgrounds per document ──

const HERO_IMAGES: Record<string, string> = {
  constitution: '/heroes/constitution.jpg',
  sotu: '/heroes/sotu.jpg',
  codex: '/heroes/codex.jpg',
  'story-bank': '/heroes/story-bank.jpg',
}

// ── Document Hero (full-width, immersive) ──

function DocumentHero({ config }: { config: DocumentConfig }) {
  const heroImage = HERO_IMAGES[config.slug]
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

      {/* Fallback / overlay */}
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
          <a
            href="/"
            className="inline-flex items-center gap-1.5 font-body text-xs text-cream/40
                       hover:text-teal transition-colors duration-200 mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Rumo
          </a>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Left: title + description */}
            <div className="max-w-2xl">
              {/* Compass + label */}
              <div className="flex items-center gap-3 mb-5">
                <CompassRose className="w-6 h-6 text-teal/50" />
                <span className="font-body text-xs tracking-[0.2em] uppercase text-teal/70 font-medium">
                  Context Engine
                </span>
              </div>

              <h1
                className="font-display text-cream font-semibold leading-tight mb-3"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
              >
                {config.title}
              </h1>

              <p className="font-body text-cream/50 text-base sm:text-lg leading-relaxed">
                {config.description}
              </p>
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
              <div className="w-px h-10 bg-cream/10" aria-hidden="true" />
              <div className="text-center">
                <p className="font-display text-2xl sm:text-3xl text-ochre font-semibold">Pro</p>
                <p className="font-body text-[10px] tracking-[0.15em] uppercase mt-0.5">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Wizard Content (wider layout) ──

function AnchorComingSoon({ config }: { config: DocumentConfig }) {
  return (
    <div className="bg-cream">
      <div className="max-w-2xl mx-auto text-center px-6 py-20 sm:py-28">
        <CompassRose className="w-16 h-16 text-ochre/30 mx-auto mb-8" />

        <h2
          className="font-display text-navy font-semibold leading-tight mb-4"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          {config.title} Builder
        </h2>

        <p className="font-body text-muted text-base sm:text-lg leading-relaxed mb-4 max-w-lg mx-auto">
          Build your {config.title.toLowerCase()} with guided questions and AI-powered generation.
          This context anchor will be available with a Rumo subscription.
        </p>

        <p className="font-body text-navy/30 text-sm mb-10">
          Launching soon. Start with free custom instructions in the meantime.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/#the-path"
            className="font-body font-bold text-sm px-8 py-3.5 rounded-lg uppercase
                       bg-teal text-white
                       hover:bg-teal-light hover:shadow-lg hover:shadow-teal/20
                       hover:-translate-y-0.5 active:translate-y-0
                       transition-all duration-300"
          >
            BUILD FREE INSTRUCTIONS
          </a>
          <a
            href="/"
            className="font-body text-sm text-navy/40 hover:text-navy px-5 py-2.5 transition-colors duration-200"
          >
            ← Back to Rumo
          </a>
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
