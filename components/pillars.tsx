'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'

// ── Step Icons (inline SVGs for crisp rendering) ──

function IdentityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="11" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 27c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function VoiceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 16h2M10 10h2M10 22h2M14 7h2M14 25h2M18 12h2M18 20h2M22 9h2M22 23h2M26 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function StoriesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 7h8c2.2 0 4 1.8 4 4v16c0-1.7-1.3-3-3-3H5V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M27 7h-8c-2.2 0-4 1.8-4 4v16c0-1.7 1.3-3 3-3h9V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function InstructionsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 10h10M11 14h10M11 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="22" cy="22" r="5" fill="currentColor" opacity="0.15" />
      <path d="M20 22l1.5 1.5L24 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
    title: 'Instructions',
    description: 'Custom AI instructions built from everything you shared. Tailored for every platform you use.',
    Icon: InstructionsIcon,
  },
]

// ── Combined Plan Section ──

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

        {/* Four steps — 2x2 grid with icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12 lg:gap-y-14">
          {STEPS.map((step) => (
            <div key={step.number} className="relative group">
              {/* Number + Icon row */}
              <div className="flex items-start gap-4 mb-3">
                <span className="font-display text-5xl lg:text-6xl font-bold text-ochre/20 leading-none shrink-0">
                  {step.number}
                </span>
                <step.Icon className="w-8 h-8 text-teal/40 mt-2 shrink-0" />
              </div>

              <h3 className="font-display text-cream text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="font-body text-cream/45 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
