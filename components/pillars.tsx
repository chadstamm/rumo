'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

// ── Anchor data ──

const ANCHORS = [
  {
    title: 'Personal Constitution',
    question: 'Who am I, and what do I stand for?',
    description: 'Your values, beliefs, non-negotiables, and aspirations — the foundation document that tells AI what you stand for.',
    slug: 'constitution',
    accent: '#c4943a',
  },
  {
    title: 'Writing Codex',
    question: 'How do I write?',
    description: 'Your sentence rhythms, humor, metaphors, and the words you never use. A complete voice fingerprint built from your own patterns.',
    slug: 'codex',
    accent: '#1ebeb1',
  },
  {
    title: 'Story Bank',
    question: 'What stories do I always tell?',
    description: 'The moments that shaped you — smells, failures, crossroads, places that felt like home. Raw material that makes AI feel lived-in.',
    slug: 'story-bank',
    accent: '#c4943a',
  },
  {
    title: 'State of the Union',
    question: 'What matters to me right now?',
    description: 'Your current situation, active challenges, and immediate priorities. A living document that evolves as your life does.',
    slug: 'sotu',
    accent: '#1ebeb1',
  },
  {
    title: 'Timeline',
    question: 'How has my life unfolded?',
    description: 'Life chapters, milestones, and where you\'re headed. The chronological context that tells AI not just who you are, but how you got here.',
    slug: 'timeline',
    accent: '#c4943a',
  },
  {
    title: 'Roster',
    question: 'Who are the people that matter?',
    description: 'Your inner circle, professional network, and relationship patterns. The people context that helps AI navigate your world.',
    slug: 'roster',
    accent: '#1ebeb1',
  },
]

// ── Context Anchors Section ──

export function Pillars() {
  const sectionRef = useScrollReveal(0.08)

  return (
    <section id="pillars" className="bg-navy text-cream">
      <div
        ref={sectionRef}
        className="reveal max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 lg:pt-32 pb-20 sm:pb-28 lg:pb-32"
      >
        {/* ── Header area ── */}
        <div className="max-w-[44rem] mb-16 sm:mb-20">
          <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-8 sm:mb-10">
            How It Works
          </p>

          <h2
            className="font-display text-cream font-bold leading-[1.1] tracking-tight
                       text-[clamp(1.75rem,4.5vw,3.25rem)] mb-10 sm:mb-14"
          >
            The 6 Context Anchors
          </h2>

          <div className="w-12 h-[2px] bg-ochre/50 mb-10 sm:mb-14" aria-hidden="true" />

          <p className="font-body text-cream/85 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
            Whether you&apos;re making your AI assistant smarter or building something that actually knows you, it starts with the same six inputs. Rumo helps you build each one through curated questions, then compiles them into context your AI can use from day one.
          </p>
        </div>

        {/* ── Anchor icon — large, centered ── */}
        <div className="flex justify-center mb-16 sm:mb-20">
          <Image
            src="/anchor-section-icon.png"
            alt="Context Anchor"
            width={120}
            height={120}
            className="opacity-60"
          />
        </div>

        {/* ── Six anchors — 3x2 grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-14 gap-y-14 lg:gap-y-16">
          {ANCHORS.map((anchor) => (
            <Link
              key={anchor.slug}
              href={`/docs/${anchor.slug}`}
              className="group relative block"
            >
              {/* Accent bar */}
              <div
                className="w-8 h-[3px] mb-5 transition-all duration-300 group-hover:w-12"
                style={{ background: anchor.accent }}
              />

              <h3 className="font-display text-cream text-xl sm:text-2xl font-semibold mb-2 group-hover:text-ochre-light transition-colors duration-300">
                {anchor.title}
              </h3>

              <p className="font-body text-cream/40 text-sm italic mb-3">
                {anchor.question}
              </p>

              <p className="font-body text-cream/55 text-sm sm:text-base leading-relaxed">
                {anchor.description}
              </p>

              {/* Hover arrow */}
              <span
                className="inline-flex items-center gap-1.5 mt-4 font-body text-xs font-semibold tracking-wide uppercase
                           opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
                           transition-all duration-300"
                style={{ color: anchor.accent }}
              >
                Explore
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
