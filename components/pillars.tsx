'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'

// ── Journey Steps ──

const STEPS = [
  {
    number: '01',
    title: 'Identity',
    description: 'Your values, beliefs, fears, and aspirations — the foundation AI needs to actually know you.',
  },
  {
    number: '02',
    title: 'Voice',
    description: 'Your sentence rhythms, humor, metaphors, and the words you never use. Captured from your own writing.',
  },
  {
    number: '03',
    title: 'Stories',
    description: 'The moments that shaped you — a smell, a failure, a crossroads. Raw material that makes AI feel lived-in.',
  },
  {
    number: '04',
    title: 'Instructions',
    description: 'Custom AI instructions built from everything you shared. Tailored for every platform you use.',
  },
]

// ── Output Documents ──

const OUTPUTS = [
  { name: 'Personal Constitution', desc: 'Who you are always' },
  { name: 'Writing Codex', desc: 'How you write' },
  { name: 'State of the Union', desc: 'Where you are right now' },
  { name: 'Story Bank', desc: 'What you\'ve lived' },
]

// ── Combined Plan Section ──

export function Pillars() {
  const sectionRef = useScrollReveal(0.08)
  const outputRef = useScrollReveal(0.1)

  return (
    <section id="pillars" className="bg-navy text-cream">
      <div
        ref={sectionRef}
        className="reveal max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-20"
      >
        {/* Section label */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="w-8 h-px bg-ochre/40" aria-hidden="true" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-ochre font-medium">
            How It Works
          </span>
          <span className="w-8 h-px bg-ochre/40" aria-hidden="true" />
        </div>

        {/* Heading */}
        <h2
          className="font-display font-semibold leading-[1.12] tracking-tight text-cream mb-4 text-center"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}
        >
          One Journey. Four Steps.
          <br className="hidden sm:inline" />
          {' '}AI That Actually Knows You.
        </h2>

        <p className="font-body text-cream/45 text-base sm:text-lg leading-relaxed max-w-xl mx-auto text-center mb-14 sm:mb-16">
          Answer curated questions about who you are, how you write, and what you&apos;ve lived.
          Rumo builds your personal AI foundation — context anchors and custom instructions you own.
        </p>

        {/* Four steps — 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 lg:gap-y-12">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Step number */}
              <span className="font-display text-5xl lg:text-6xl font-bold text-ochre/20 leading-none block mb-3">
                {step.number}
              </span>

              <h3 className="font-display text-cream text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="font-body text-cream/45 text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Subtle connector between step 3 and 4 */}
              {i === 2 && (
                <div className="hidden sm:block absolute -bottom-6 left-1/2 sm:left-auto sm:right-[-2rem] lg:right-[-2.5rem] sm:top-1/2 sm:-translate-y-1/2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-ochre/15" aria-hidden="true">
                    <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── What gets generated — subtle, not heavy ── */}
      <div ref={outputRef} className="reveal border-t border-cream/8">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-14">
          <p className="font-body text-cream/30 text-xs tracking-[0.25em] uppercase text-center mb-8">
            Along the way, Rumo generates
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {OUTPUTS.map((doc, i) => (
              <div key={doc.name} className="flex items-center gap-3">
                <span className="font-display text-cream/70 text-sm font-semibold">
                  {doc.name}
                </span>
                <span className="font-body text-cream/25 text-xs">
                  {doc.desc}
                </span>
                {i < OUTPUTS.length - 1 && (
                  <span className="text-ochre/20 ml-2 hidden sm:inline" aria-hidden="true">
                    /
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
