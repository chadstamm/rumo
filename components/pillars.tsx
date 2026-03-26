'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import {
  AnchorIcon, QuillIcon, ShipLogIcon, CompassIcon, ChronIcon, HelmIcon,
} from '@/components/icons/anchor-icons'

// ── Journey Steps ──

const STEPS = [
  {
    number: '01',
    title: 'Identity',
    description: 'Your values, beliefs, fears, and aspirations — the foundation AI needs to actually know you.',
    Icon: AnchorIcon,
  },
  {
    number: '02',
    title: 'Voice',
    description: 'Your sentence rhythms, humor, metaphors, and the words you never use. Captured from your own writing.',
    Icon: QuillIcon,
  },
  {
    number: '03',
    title: 'Stories',
    description: 'The moments that shaped you — a smell, a failure, a crossroads. Raw material that makes AI feel lived-in.',
    Icon: ShipLogIcon,
  },
  {
    number: '04',
    title: 'Situation',
    description: 'Where you are right now — your goals, your constraints, your season of life. The context that keeps AI relevant, not just accurate.',
    Icon: CompassIcon,
  },
  {
    number: '05',
    title: 'Timeline',
    description: 'Your life chapters, milestones, and trajectory. The chronological arc that tells AI not just who you are, but how you got here.',
    Icon: ChronIcon,
  },
  {
    number: '06',
    title: 'Roster',
    description: 'The people who shape your world — relationships, dynamics, and how you connect. Context that helps AI navigate your life without stepping on landmines.',
    Icon: HelmIcon,
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
          Six Context Anchors.
          <br className="hidden sm:inline" />
          {' '}AI That Actually Knows You.
        </h2>

        <p className="font-body text-cream/45 text-base sm:text-lg leading-relaxed max-w-xl mx-auto text-center mb-14 sm:mb-16">
          We call them context anchors. Through curated questions, Rumo extracts
          who you are, how you write, what you&apos;ve lived, and who matters to you — then
          assembles it into the foundation your AI agent needs to actually be useful.
        </p>

        {/* Six anchors — 3x2 grid with bold icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-14 gap-y-14 lg:gap-y-16">
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
