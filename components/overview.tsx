'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const ANCHORS = [
  {
    name: 'Personal Constitution',
    desc: 'Who you are always',
    slug: 'constitution',
    accent: 'ochre',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 25c0-5 4-9 9-9s9 4 9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Writing Codex',
    desc: 'How you write',
    slug: 'codex',
    accent: 'teal',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="15" width="3" height="7" rx="1.5" fill="currentColor" />
        <rect x="9" y="9" width="3" height="13" rx="1.5" fill="currentColor" opacity="0.7" />
        <rect x="14" y="5" width="3" height="17" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="19" y="11" width="3" height="11" rx="1.5" fill="currentColor" opacity="0.35" />
        <rect x="24" y="13" width="2" height="9" rx="1" fill="currentColor" opacity="0.2" />
      </svg>
    ),
  },
  {
    name: 'Story Bank',
    desc: 'What you\'ve lived',
    slug: 'story-bank',
    accent: 'ochre',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <path d="M14 6C11 5 8 4.5 5 5v16c3-.5 6 0 9 1" fill="currentColor" opacity="0.12" />
        <path d="M14 6c3-1 6-1.5 9-1v16c-3-.5-6 0-9 1" fill="currentColor" opacity="0.12" />
        <path d="M14 6C11 5 8 4.5 5 5v16c3-.5 6 0 9 1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 6c3-1 6-1.5 9-1v16c-3-.5-6 0-9 1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 6v16" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'State of the Union',
    desc: 'Where you are right now',
    slug: 'sotu',
    accent: 'teal',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <polygon points="14,4 16,12 14,10.5 12,12" fill="currentColor" />
        <circle cx="14" cy="14" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Timeline',
    desc: 'Your arc and trajectory',
    slug: 'timeline',
    accent: 'ochre',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <line x1="4" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
        <circle cx="7" cy="14" r="2.5" fill="currentColor" opacity="0.35" />
        <circle cx="14" cy="14" r="3" fill="currentColor" />
        <circle cx="21" cy="14" r="2.5" fill="currentColor" opacity="0.35" />
        <line x1="7" y1="8" x2="7" y2="11" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
        <line x1="14" y1="7" x2="14" y2="10.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="21" y1="8" x2="21" y2="11" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      </svg>
    ),
  },
  {
    name: 'Roster',
    desc: 'The people who matter',
    slug: 'roster',
    accent: 'teal',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="3.5" fill="currentColor" />
        <path d="M8 22c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="currentColor" opacity="0.12" />
        <circle cx="6" cy="13" r="2.5" fill="currentColor" opacity="0.35" />
        <circle cx="22" cy="13" r="2.5" fill="currentColor" opacity="0.35" />
        <path d="M1.5 22c0-2.5 2-4.5 4.5-4.5" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <path d="M26.5 22c0-2.5-2-4.5-4.5-4.5" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      </svg>
    ),
  },
]

export function Overview() {
  const sectionRef = useScrollReveal(0.1)

  return (
    <section className="relative overflow-hidden">
      {/* ── Background image ── */}
      <Image
        src="/overview-bg.jpg"
        alt=""
        fill
        className="object-cover"
        priority={false}
        aria-hidden="true"
      />

      {/* Darker overlay */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(26, 39, 68, 0.93) 0%,
              rgba(26, 39, 68, 0.90) 40%,
              rgba(26, 39, 68, 0.82) 70%,
              rgba(30, 35, 44, 0.72) 100%
            )
          `,
        }}
      />

      {/* Ochre wash */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(196, 148, 58, 0.03) 0%,
              rgba(196, 148, 58, 0.06) 40%,
              rgba(196, 148, 58, 0.14) 75%,
              rgba(196, 148, 58, 0.25) 100%
            )
          `,
        }}
      />

      <div
        ref={sectionRef}
        className="reveal relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36 lg:py-44"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* ── Left: Editorial text ── */}
          <div>
            <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-8 sm:mb-10">
              The Missing Ingredient
            </p>

            <h2
              className="font-display text-cream font-bold leading-[1.1] tracking-tight
                         text-[clamp(2rem,5.5vw,3.75rem)]
                         mb-10 sm:mb-14"
            >
              AI Is Only As Good
              <br />
              <span className="text-ochre-light">As What You Give It.</span>
            </h2>

            <div className="w-12 h-[2px] bg-ochre/50 mb-10 sm:mb-14" aria-hidden="true" />

            <div className="space-y-5 sm:space-y-6">
              <p className="font-body text-cream/70 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
                The difference between generic AI output and something that actually sounds like you comes down to one thing: context. Your identity, your voice, your lived experience. When AI has those inputs, it stops guessing and starts collaborating.
              </p>

              <p className="font-body text-cream/70 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
                The fix is simple: give AI your context before you give it your questions. The harder part is knowing how to compile that context in a way AI can actually use.
              </p>
            </div>
          </div>

          {/* ── Right: Context Anchors ── */}
          <div className="lg:pt-6">
            <p className="font-body text-ochre font-bold text-sm tracking-[0.25em] uppercase mb-8">
              The Context Anchors
            </p>

            {/* Anchor grid — 2x3 cards */}
            <div className="grid grid-cols-2 gap-3">
              {ANCHORS.map((anchor, i) => {
                const isTeal = anchor.accent === 'teal'
                return (
                  <Link
                    key={anchor.slug}
                    href={`/docs/${anchor.slug}`}
                    className="group relative rounded-xl px-4 py-5 transition-all duration-300 overflow-hidden
                               bg-white/[0.06] border border-white/[0.08]
                               hover:bg-white/[0.12] hover:border-white/[0.18]
                               hover:-translate-y-0.5"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    {/* Accent top bar on hover */}
                    <div
                      className="absolute top-0 left-4 right-4 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: isTeal ? 'var(--teal)' : 'var(--ochre)' }}
                    />

                    {/* Icon */}
                    <div className={`mb-3 transition-colors duration-300 ${
                      isTeal
                        ? 'text-teal/60 group-hover:text-teal'
                        : 'text-ochre/60 group-hover:text-ochre-light'
                    }`}>
                      {anchor.icon}
                    </div>

                    {/* Name */}
                    <h3 className="font-display text-sm font-semibold text-white/90 mb-1 group-hover:text-white transition-colors duration-200">
                      {anchor.name}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-[11px] leading-snug text-white/35 group-hover:text-white/50 transition-colors duration-200">
                      {anchor.desc}
                    </p>
                  </Link>
                )
              })}
            </div>

            {/* CTA */}
            <div className="mt-6 text-center">
              <Link
                href="/anchors"
                className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-wide uppercase
                           text-ochre/60 hover:text-ochre-light transition-colors duration-300"
              >
                Explore all anchors
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
