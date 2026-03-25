'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'

// ── Bold Step Icons ──

function IdentityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="14" r="7" fill="currentColor" opacity="0.15" />
      <circle cx="20" cy="14" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" fill="currentColor" opacity="0.08" />
    </svg>
  )
}

function VoiceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Waveform bars — bold, varied heights */}
      <rect x="3" y="16" width="3" height="8" rx="1.5" fill="currentColor" />
      <rect x="9" y="10" width="3" height="20" rx="1.5" fill="currentColor" />
      <rect x="15" y="6" width="3" height="28" rx="1.5" fill="currentColor" />
      <rect x="21" y="12" width="3" height="16" rx="1.5" fill="currentColor" />
      <rect x="27" y="4" width="3" height="32" rx="1.5" fill="currentColor" />
      <rect x="33" y="14" width="3" height="12" rx="1.5" fill="currentColor" />
    </svg>
  )
}

function StoriesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Open book with filled pages */}
      <path d="M20 8C16 6 10 5 4 6v24c6-1 12 0 16 2" fill="currentColor" opacity="0.1" />
      <path d="M20 8c4-2 10-3 16-2v24c-6-1-12 0-16 2" fill="currentColor" opacity="0.1" />
      <path d="M20 8C16 6 10 5 4 6v24c6-1 12 0 16 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 8c4-2 10-3 16-2v24c-6-1-12 0-16 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 8v24" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function SituationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Compass / current bearing */}
      <circle cx="20" cy="20" r="16" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="11" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      {/* Compass needle pointing NE — you are here */}
      <polygon points="20,6 23,18 20,16 17,18" fill="currentColor" />
      <polygon points="20,34 17,22 20,24 23,22" fill="currentColor" opacity="0.3" />
      {/* Center dot */}
      <circle cx="20" cy="20" r="2.5" fill="currentColor" />
    </svg>
  )
}

// ── Journey Steps ──

const STEPS = [
  {
    number: '01',
    title: 'Identity',
    description: 'Your values, beliefs, fears, and aspirations — the foundation AI needs to actually know you.',
    Icon: IdentityIcon,
  },
  {
    number: '02',
    title: 'Voice',
    description: 'Your sentence rhythms, humor, metaphors, and the words you never use. Captured from your own writing.',
    Icon: VoiceIcon,
  },
  {
    number: '03',
    title: 'Stories',
    description: 'The moments that shaped you — a smell, a failure, a crossroads. Raw material that makes AI feel lived-in.',
    Icon: StoriesIcon,
  },
  {
    number: '04',
    title: 'Situation',
    description: 'Where you are right now — your goals, your constraints, your season of life. The context that keeps AI relevant, not just accurate.',
    Icon: SituationIcon,
  },
]

// ── How It Works Section ──

export function Pillars() {
  const sectionRef = useScrollReveal(0.08)

  return (
    <section id="pillars" className="bg-navy text-cream">
      <div
        ref={sectionRef}
        className="reveal max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 lg:pt-32 pb-20 sm:pb-28 lg:pb-32"
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

        {/* Four steps — 2x2 grid with bold icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-14 lg:gap-y-16">
          {STEPS.map((step) => (
            <div key={step.number} className="relative">
              {/* Icon + Number row */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cream/[0.04] border border-cream/[0.06] flex items-center justify-center shrink-0">
                  <step.Icon className="w-7 h-7 text-teal" />
                </div>
                <span className="font-display text-4xl lg:text-5xl font-bold text-ochre/20 leading-none">
                  {step.number}
                </span>
              </div>

              <h3 className="font-display text-cream text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="font-body text-cream/45 text-sm leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
