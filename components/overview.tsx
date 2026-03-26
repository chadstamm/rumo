'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { useEffect, useRef, useState } from 'react'

// ── Anchor data ──

const ANCHORS = [
  {
    name: 'Personal Constitution',
    desc: 'Who you are always',
    slug: 'constitution',
    accent: '#c4943a',
    number: '01',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="12" r="5.5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Writing Codex',
    desc: 'How you write',
    slug: 'codex',
    accent: '#1ebeb1',
    number: '02',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="17" width="3.5" height="8" rx="1.5" fill="currentColor" />
        <rect x="10.5" y="10" width="3.5" height="15" rx="1.5" fill="currentColor" opacity="0.7" />
        <rect x="16" y="5" width="3.5" height="20" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="21.5" y="12" width="3.5" height="13" rx="1.5" fill="currentColor" opacity="0.35" />
      </svg>
    ),
  },
  {
    name: 'Story Bank',
    desc: 'What you\'ve lived',
    slug: 'story-bank',
    accent: '#c4943a',
    number: '03',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M16 7C13 6 10 5.5 7 6v18c3-.5 6 0 9 1" fill="currentColor" opacity="0.1" />
        <path d="M16 7c3-1 6-1.5 9-1v18c-3-.5-6 0-9 1" fill="currentColor" opacity="0.1" />
        <path d="M16 7C13 6 10 5.5 7 6v18c3-.5 6 0 9 1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 7c3-1 6-1.5 9-1v18c-3-.5-6 0-9 1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 7v18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'State of the Union',
    desc: 'Where you are right now',
    slug: 'sotu',
    accent: '#1ebeb1',
    number: '04',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="7.5" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <polygon points="16,5 18,14 16,12.5 14,14" fill="currentColor" />
        <polygon points="16,27 14,18 16,19.5 18,18" fill="currentColor" opacity="0.25" />
        <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Timeline',
    desc: 'Your arc and trajectory',
    slug: 'timeline',
    accent: '#c4943a',
    number: '05',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        <circle cx="8" cy="16" r="3" fill="currentColor" opacity="0.3" />
        <circle cx="16" cy="16" r="3.5" fill="currentColor" />
        <circle cx="24" cy="16" r="3" fill="currentColor" opacity="0.3" />
        <line x1="8" y1="9" x2="8" y2="12.5" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        <line x1="16" y1="8" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="9" x2="24" y2="12.5" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        <path d="M26 13.5l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: 'Roster',
    desc: 'The people who matter',
    slug: 'roster',
    accent: '#1ebeb1',
    number: '06',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="11" r="4" fill="currentColor" />
        <path d="M10 24c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="currentColor" opacity="0.12" />
        <circle cx="7" cy="15" r="3" fill="currentColor" opacity="0.3" />
        <circle cx="25" cy="15" r="3" fill="currentColor" opacity="0.3" />
        <path d="M2 24c0-2.8 2.2-5 5-5" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <path d="M30 24c0-2.8-2.2-5-5-5" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      </svg>
    ),
  },
]

// ── Staggered reveal hook ──

function useStaggerReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

// ── Main Component ──

export function Overview() {
  const sectionRef = useScrollReveal(0.1)
  const { ref: cardsRef, visible: cardsVisible } = useStaggerReveal(0.2)

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

          {/* ── Right: Context Anchors — elevated card treatment ── */}
          <div ref={cardsRef} className="lg:pt-2">
            {/* Header — large number + compass, completely different from left */}
            <div className="flex items-end gap-4 mb-8">
              <span className="font-display text-[5rem] sm:text-[6rem] leading-none font-bold text-white/[0.06] -mb-2">
                6
              </span>
              <div className="pb-3">
                <p className="font-body text-white/80 text-lg sm:text-xl font-semibold leading-tight">
                  Context Anchors
                </p>
                <p className="font-body text-white/30 text-sm mt-1">
                  that hold your AI steady
                </p>
              </div>
            </div>

            {/* Anchor cards — white backgrounds that pop */}
            <div className="grid grid-cols-2 gap-3">
              {ANCHORS.map((anchor, i) => (
                <Link
                  key={anchor.slug}
                  href={`/docs/${anchor.slug}`}
                  className={`anchor-card group relative rounded-xl overflow-hidden
                             bg-white shadow-lg shadow-navy/10
                             transition-all duration-400 ease-out
                             hover:shadow-xl hover:shadow-navy/15
                             hover:-translate-y-1
                             ${cardsVisible ? 'anchor-card-visible' : ''}`}
                  style={{
                    transitionDelay: cardsVisible ? `${i * 80}ms` : '0ms',
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  {/* Accent top edge */}
                  <div
                    className="h-[3px] w-full transition-all duration-300"
                    style={{ background: anchor.accent }}
                  />

                  <div className="px-4 py-4 sm:px-5 sm:py-5">
                    {/* Icon + Number row */}
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                                   group-hover:scale-110"
                        style={{
                          background: `${anchor.accent}12`,
                          color: anchor.accent,
                        }}
                      >
                        {anchor.icon}
                      </div>
                      <span className="font-display text-2xl font-bold text-navy/[0.06] leading-none">
                        {anchor.number}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="font-display text-navy text-[13px] sm:text-sm font-semibold leading-snug mb-1 group-hover:text-navy transition-colors duration-200">
                      {anchor.name}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-[11px] leading-snug text-navy/40 group-hover:text-navy/55 transition-colors duration-200">
                      {anchor.desc}
                    </p>
                  </div>

                  {/* Hover glow at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      background: `linear-gradient(to top, ${anchor.accent}08, transparent)`,
                    }}
                  />
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-6 flex items-center justify-between">
              <Link
                href="/anchors"
                className="font-body text-xs font-medium tracking-wide text-white/40 hover:text-white/70 transition-colors duration-300"
              >
                Explore all anchors →
              </Link>
              <Link
                href="/start"
                className="shimmer-hover font-body text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-full
                           bg-ochre/90 text-white
                           hover:bg-ochre transition-all duration-200"
              >
                Chart Your Course
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Card animation styles ── */}
      <style>{`
        .anchor-card {
          opacity: 0;
          transform: translateY(24px);
        }
        .anchor-card-visible {
          animation: anchorCardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes anchorCardIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
