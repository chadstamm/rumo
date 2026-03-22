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
]

// ── Output Documents ──

const OUTPUTS = [
  { name: 'Personal Constitution', desc: 'Who you are always', slug: 'constitution' },
  { name: 'State of the Union', desc: 'Where you are right now', slug: 'sotu' },
  { name: 'Writing Codex', desc: 'How you write', slug: 'codex' },
  { name: 'Story Bank', desc: 'What you\'ve lived', slug: 'story-bank' },
]

// ── Combined Plan Section ──

export function Pillars() {
  const introRef = useScrollReveal()
  const stepsRef = useScrollReveal(0.08)
  const outputRef = useScrollReveal(0.1)

  return (
    <section id="pillars" className="relative overflow-hidden">
      {/* ── Top half: How it works (navy bg) ── */}
      <div className="bg-navy text-cream">
        {/* Intro */}
        <div
          ref={introRef}
          className="reveal max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 lg:pt-32 pb-6 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-px bg-teal/40" aria-hidden="true" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-teal font-medium">
              How It Works
            </span>
            <span className="w-8 h-px bg-teal/40" aria-hidden="true" />
          </div>

          <h2
            className="font-display font-semibold leading-[1.12] tracking-tight text-cream mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}
          >
            One Journey. Three Sections.
            <br className="hidden sm:inline" />
            {' '}Four Documents That Know You.
          </h2>

          <p className="font-body text-cream/50 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Answer 38 curated questions. Rumo generates a complete personal AI foundation
            — your identity, your voice, your stories, all in documents you own.
          </p>
        </div>

        {/* Three steps */}
        <div
          ref={stepsRef}
          className="reveal max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step) => (
              <div key={step.number} className="relative pl-14 md:pl-0">
                {/* Step number */}
                <span
                  className="absolute top-0 left-0 md:static font-display text-4xl md:text-5xl font-bold text-teal/20 leading-none mb-3 block"
                >
                  {step.number}
                </span>

                <h3 className="font-display text-cream text-xl font-semibold mb-2 mt-1 md:mt-0">
                  {step.title}
                </h3>
                <p className="font-body text-cream/50 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Connecting line */}
        <div className="flex justify-center pb-0" aria-hidden="true">
          <div className="w-px h-12 bg-gradient-to-b from-teal/20 to-cream/10" />
        </div>
      </div>

      {/* ── Bottom half: What you get (cream bg with navy cards) ── */}
      <div className="bg-cream">
        <div className="flex justify-center pt-0" aria-hidden="true">
          <div className="w-px h-8 bg-gradient-to-b from-navy/10 to-transparent" />
        </div>

        <div
          ref={outputRef}
          className="reveal max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 pt-4 pb-16 sm:pb-20"
        >
          {/* Label */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-6 h-px bg-ochre/40" aria-hidden="true" />
              <span className="font-body text-[10px] sm:text-xs tracking-[0.25em] uppercase text-ochre font-medium">
                What You Get
              </span>
              <span className="w-6 h-px bg-ochre/40" aria-hidden="true" />
            </div>
            <p className="font-body text-muted text-sm max-w-md mx-auto">
              Generated together so every document benefits from everything you shared.
              Or build them one at a time.
            </p>
          </div>

          {/* Four document cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OUTPUTS.map((doc) => (
              <a
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="group relative px-6 py-5 rounded-xl
                           bg-navy text-cream
                           border border-navy/80
                           hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5
                           hover:-translate-y-0.5
                           transition-all duration-300
                           flex items-center justify-between"
              >
                <div>
                  <h3 className="font-display text-cream font-semibold text-base sm:text-lg mb-0.5">
                    {doc.name}
                  </h3>
                  <p className="font-body text-cream/40 text-sm">
                    {doc.desc}
                  </p>
                </div>
                <svg
                  width="18" height="18" viewBox="0 0 18 18" fill="none"
                  className="text-cream/15 group-hover:text-teal transition-colors duration-300 flex-shrink-0 ml-4"
                  aria-hidden="true"
                >
                  <path d="M7 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <a
              href="#the-path"
              className="inline-flex items-center gap-2.5
                         px-8 py-4 rounded-lg
                         bg-teal text-white font-body font-semibold text-sm tracking-wide
                         shadow-lg shadow-teal/15
                         transition-all duration-300
                         hover:bg-teal-light hover:shadow-xl hover:shadow-teal/25
                         hover:-translate-y-0.5 active:translate-y-0"
            >
              BUILD ALL FOUR AT ONCE
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <p className="font-body text-navy/30 text-xs mt-3">
              Free. No account required to start.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
