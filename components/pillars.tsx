'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { CompassRose } from '@/components/compass-rose'

// ── Journey Steps ──

const STEPS = [
  {
    number: '01',
    title: 'Identity',
    description: 'Your values, beliefs, fears, and aspirations. The foundation AI needs to know you — not just what you do, but who you are when it matters.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <polygon points="24,6 28,20 24,16 20,20" fill="currentColor" opacity="0.6" />
        <polygon points="24,42 20,28 24,32 28,28" fill="currentColor" opacity="0.3" />
        <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Voice',
    description: 'Your writing patterns, sentence rhythms, humor, metaphors — the things that make a reader say "that sounds like you." Captured from your own words.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M36 8C30 14 24 24 20 34C18 38 16 42 15 44L13 46L16 45C18 43 22 36 26 30C30 24 34 16 36 12L36 8Z" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <line x1="18" y1="36" x2="32" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Stories',
    description: 'The moments that shaped you. A smell, a failure, a place that felt like home. The raw material that makes AI output feel lived-in, not generated.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M24 8C18 10 10 12 6 14V40C10 38 18 36 24 34C30 36 38 38 42 40V14C38 12 30 10 24 8Z" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <line x1="24" y1="8" x2="24" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      </svg>
    ),
  },
]

// ── Output Documents ──

const OUTPUTS = [
  { name: 'Personal Constitution', desc: 'Who you are always' },
  { name: 'State of the Union', desc: 'Where you are right now' },
  { name: 'Writing Codex', desc: 'How you write' },
  { name: 'Story Bank', desc: 'What you\'ve lived' },
]

// ── Section Intro ──

function JourneyIntro() {
  const ref = useScrollReveal()

  return (
    <section className="bg-navy text-cream py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(30,190,177,0.06) 0%, transparent 50%)',
        }}
      />

      <div ref={ref} className="reveal relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="w-8 h-px bg-teal/40" aria-hidden="true" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-teal font-medium">
            How It Works
          </span>
          <span className="w-8 h-px bg-teal/40" aria-hidden="true" />
        </div>

        <h2
          className="font-display font-semibold leading-[1.12] tracking-tight text-cream mb-5"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}
        >
          One Journey. Three Sections.
          <br className="hidden sm:inline" />
          {' '}Four Documents That Know You.
        </h2>

        <p className="font-body text-cream/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Answer 38 curated questions. Rumo generates a complete personal AI foundation
          — your identity, your voice, your stories, all in documents you own.
        </p>
      </div>
    </section>
  )
}

// ── Journey Steps ──

function JourneySteps() {
  const ref = useScrollReveal(0.08)

  return (
    <section className="bg-cream py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Compass watermark */}
      <div
        className="absolute -right-10 top-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-[0.02] pointer-events-none"
        aria-hidden="true"
      >
        <CompassRose className="w-full h-full" />
      </div>

      <div ref={ref} className="reveal relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {STEPS.map((step) => (
            <div key={step.number} className="relative">
              {/* Step number watermark */}
              <span
                className="absolute -top-4 -left-2 font-display text-[5rem] font-bold text-navy/[0.04] leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 text-teal/70 mb-5">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="font-display text-navy text-xl sm:text-2xl font-semibold mb-3">
                {step.title}
              </h3>
              <p className="font-body text-navy/60 text-sm sm:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── What You Get ──

function WhatYouGet() {
  const ref = useScrollReveal(0.1)

  return (
    <section className="bg-navy text-cream py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(42,100,150,0.06) 0%, transparent 50%)',
        }}
      />

      <div ref={ref} className="reveal relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-ochre/40" aria-hidden="true" />
            <span className="font-body text-xs tracking-[0.25em] uppercase text-ochre-light/70 font-medium">
              What You Get
            </span>
            <span className="w-8 h-px bg-ochre/40" aria-hidden="true" />
          </div>

          <h2
            className="font-display font-semibold leading-[1.12] tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            Four Documents. Your Complete AI Foundation.
          </h2>
          <p className="font-body text-cream/50 text-sm sm:text-base max-w-lg mx-auto">
            Generated together after you complete all three sections — so every document
            benefits from everything you shared.
          </p>
        </div>

        {/* Output cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {OUTPUTS.map((doc) => (
            <div
              key={doc.name}
              className="px-6 py-5 rounded-xl border border-cream/[0.08] bg-cream/[0.03]
                         hover:border-teal/20 hover:bg-cream/[0.05] transition-all duration-300"
            >
              <h3 className="font-display text-cream font-semibold text-base sm:text-lg mb-1">
                {doc.name}
              </h3>
              <p className="font-body text-cream/40 text-sm">
                {doc.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#the-path"
            className="inline-flex items-center gap-2
                       px-8 py-4 rounded-lg
                       bg-teal text-white font-body font-semibold text-sm tracking-wide
                       shadow-lg shadow-teal/20
                       transition-all duration-300
                       hover:bg-teal-light hover:shadow-xl hover:shadow-teal/30
                       hover:-translate-y-0.5 active:translate-y-0
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            Begin Your Journey
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p className="font-body text-cream/30 text-xs mt-4">
            Free. No account required to start.
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Main Export ──

export function Pillars() {
  return (
    <div id="pillars">
      <JourneyIntro />
      <JourneySteps />
      <WhatYouGet />
    </div>
  )
}
