'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

// ── Anchor data ──

const ANCHORS = [
  {
    title: 'Personal Constitution',
    question: 'Who am I? What do I stand for?',
    description: 'Your values, beliefs, non-negotiables, and aspirations — the foundation document that tells AI what you stand for.',
    slug: 'constitution',
    icon: '/icons/constitution.png',
    accent: '#c4943a',
    accentGlow: 'rgba(196, 148, 58, 0.15)',
  },
  {
    title: 'Writing Codex',
    question: 'How do I write?',
    description: 'Your sentence rhythms, humor, metaphors, and the words you never use. A complete voice fingerprint built from your own patterns.',
    slug: 'codex',
    icon: '/icons/codex.png',
    accent: '#1ebeb1',
    accentGlow: 'rgba(30, 190, 177, 0.15)',
  },
  {
    title: 'Story Bank',
    question: 'What stories do I always tell?',
    description: 'The moments that shaped you — smells, failures, crossroads, places that felt like home. Raw material that makes AI feel lived-in.',
    slug: 'story-bank',
    icon: '/icons/story-bank.png',
    accent: '#c4943a',
    accentGlow: 'rgba(196, 148, 58, 0.15)',
  },
  {
    title: 'State of the Union',
    question: 'What matters to me right now?',
    description: 'Your current situation, active challenges, and immediate priorities. A living document that evolves as your life does.',
    slug: 'sotu',
    icon: '/icons/sotu.png',
    accent: '#1ebeb1',
    accentGlow: 'rgba(30, 190, 177, 0.15)',
  },
  {
    title: 'Timeline',
    question: 'How has my life unfolded?',
    description: 'Life chapters, milestones, and where you\'re headed. The chronological context that tells AI not just who you are, but how you got here.',
    slug: 'timeline',
    icon: '/icons/timeline.png',
    accent: '#c4943a',
    accentGlow: 'rgba(196, 148, 58, 0.15)',
  },
  {
    title: 'Influence Roster',
    question: 'Who are the people that matter?',
    description: 'Your inner circle, professional network, and relationship patterns. The people context that helps AI navigate your world.',
    slug: 'roster',
    icon: '/icons/roster.png',
    accent: '#1ebeb1',
    accentGlow: 'rgba(30, 190, 177, 0.15)',
  },
]

// ── Context Anchors Section ──

export function Pillars() {
  const sectionRef = useScrollReveal(0.08)

  return (
    <section id="pillars" className="relative bg-navy text-cream overflow-hidden">
      {/* ── Atmospheric background glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(196, 148, 58, 0.06) 0%, transparent 70%)',
        }}
      />

      <div
        ref={sectionRef}
        className="reveal relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 lg:pt-40 pb-24 sm:pb-32 lg:pb-40"
      >
        {/* ── Header area — centered ── */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-6 sm:mb-8">
            How It Works
          </p>

          <h2
            className="font-display text-cream font-bold leading-[1.1] tracking-tight
                       text-[clamp(1.75rem,4.5vw,3.25rem)] mb-6 sm:mb-8"
          >
            The 6 Context Anchors
          </h2>

          <div className="w-12 h-[2px] bg-ochre/50 mx-auto mb-6 sm:mb-8" aria-hidden="true" />

          <p className="font-body text-cream/85 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
            Whether you&apos;re making your AI assistant smarter or building something that actually knows you, it starts with the same six inputs. RUMO helps you build each one through curated questions, then compiles them into context your AI can use from day one.
          </p>
        </div>

        {/* ── Anchor icon — hero-scale, centered with glow + divider lines ── */}
        <div className="relative flex items-center justify-center gap-6 sm:gap-10 mb-14 sm:mb-18">
          {/* Left divider */}
          <div className="flex-1 h-px bg-white/10" aria-hidden="true" />

          {/* Icon with glow */}
          <div className="relative flex-shrink-0">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full pointer-events-none"
              aria-hidden="true"
              style={{
                background: 'radial-gradient(circle, rgba(196, 148, 58, 0.12) 0%, rgba(196, 148, 58, 0.04) 50%, transparent 70%)',
              }}
            />
            <Image
              src="/anchor-section-icon.png"
              alt="Context Anchor"
              width={160}
              height={160}
              className="relative z-10 drop-shadow-[0_0_40px_rgba(196,148,58,0.2)]"
            />
          </div>

          {/* Right divider */}
          <div className="flex-1 h-px bg-white/10" aria-hidden="true" />
        </div>

        {/* ── Six anchors — glass cards, 3x2 grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ANCHORS.map((anchor) => (
            <Link
              key={anchor.slug}
              href={`/docs/${anchor.slug}`}
              className="group relative block rounded-2xl overflow-hidden
                         transition-all duration-500
                         hover:-translate-y-2 hover:shadow-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${anchor.accentGlow} 0%, rgba(255,255,255,0.04) 100%)`
                e.currentTarget.style.borderColor = `${anchor.accent}40`
                e.currentTarget.style.boxShadow = `0 20px 60px ${anchor.accentGlow}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Accent top bar */}
              <div
                className="h-[3px] w-full transition-opacity duration-500 opacity-40 group-hover:opacity-100"
                style={{ background: anchor.accent }}
              />

              <div className="px-7 py-8 sm:px-8 sm:py-9">
                {/* Icon */}
                <div className="mb-5">
                  <Image
                    src={anchor.icon}
                    alt=""
                    width={44}
                    height={44}
                    className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-display text-cream text-xl sm:text-2xl font-semibold mb-3
                             transition-colors duration-300"
                  style={{ }}
                >
                  <span className="group-hover:text-ochre-light transition-colors duration-300">
                    {anchor.title}
                  </span>
                </h3>

                {/* Question */}
                <p
                  className="font-body text-sm sm:text-base italic font-semibold mb-5 transition-colors duration-300"
                  style={{ color: `${anchor.accent}90` }}
                >
                  &ldquo;{anchor.question}&rdquo;
                </p>

                {/* Description */}
                <p className="font-body text-cream/55 text-sm sm:text-[0.95rem] font-medium leading-relaxed group-hover:text-cream/75 transition-colors duration-300">
                  {anchor.description}
                </p>

                {/* Explore arrow */}
                <div className="mt-6 flex items-center gap-2
                                opacity-0 group-hover:opacity-100
                                translate-y-2 group-hover:translate-y-0
                                transition-all duration-300">
                  <span
                    className="font-body text-xs font-bold tracking-[0.15em] uppercase"
                    style={{ color: anchor.accent }}
                  >
                    Explore
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
                    <path d="M3 8h10M9 4.5l4 3.5-4 3.5" stroke={anchor.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
