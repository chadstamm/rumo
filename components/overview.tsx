'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const ANCHORS = [
  {
    name: 'Personal Constitution',
    desc: 'Who you are always',
    color: 'ochre' as const,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7.5" r="3.5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Writing Codex',
    desc: 'How you write',
    color: 'ochre' as const,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="14" width="3" height="4" rx="1" fill="currentColor" />
        <rect x="7.5" y="8" width="3" height="10" rx="1" fill="currentColor" />
        <rect x="12" y="4" width="3" height="14" rx="1" fill="currentColor" opacity="0.6" />
        <rect x="16.5" y="10" width="2.5" height="8" rx="1" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: 'State of the Union',
    desc: 'Where you are right now',
    color: 'ochre' as const,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="10,4 11.2,9 10,8 8.8,9" fill="currentColor" />
        <circle cx="10" cy="10" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Story Bank',
    desc: 'What you\'ve lived',
    color: 'ochre' as const,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path d="M10 4C7.5 3 4.5 2.5 2 3v13c2.5-.5 5.5 0 8 1" fill="currentColor" opacity="0.15" />
        <path d="M10 4c2.5-1 5.5-1.5 8-.5v13c-2.5-.5-5.5 0-8 1" fill="currentColor" opacity="0.15" />
        <path d="M10 4C7.5 3 4.5 2.5 2 3v13c2.5-.5 5.5 0 8 1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 4c2.5-1 5.5-1.5 8-.5v13c-2.5-.5-5.5 0-8 1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 4v13" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'Custom Instructions',
    desc: 'Your AI, configured',
    color: 'teal' as const,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <rect x="4" y="2.5" width="12" height="15" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7.5 6.5h5M7.5 9.5h5M7.5 12.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function Overview() {
  const sectionRef = useScrollReveal(0.1)

  return (
    <section className="relative overflow-hidden">
      {/* ── Background image with overlay ── */}
      <Image
        src="/overview-bg.jpg"
        alt=""
        fill
        className="object-cover"
        priority={false}
        aria-hidden="true"
      />

      {/* Dark overlay — navy at top, warmer gold at bottom */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(26, 39, 68, 0.90) 0%,
              rgba(26, 39, 68, 0.85) 40%,
              rgba(26, 39, 68, 0.78) 70%,
              rgba(36, 42, 52, 0.75) 100%
            )
          `,
        }}
      />

      {/* Warm ochre wash — stronger at bottom for gold contrast against navy How It Works */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(196, 148, 58, 0.04) 0%,
              rgba(196, 148, 58, 0.08) 50%,
              rgba(196, 148, 58, 0.18) 100%
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

          {/* ── Right: Context Anchors list ── */}
          <div className="lg:pt-6">
            {/* Header */}
            <p className="font-body text-ochre font-bold text-sm tracking-[0.25em] uppercase mb-8">
              The Context Anchors
            </p>

            {/* Anchor cards — clean vertical list */}
            <div className="space-y-3">
              {ANCHORS.map((anchor) => {
                const isTeal = anchor.color === 'teal'
                return (
                  <div
                    key={anchor.name}
                    className={`
                      flex items-center gap-4 px-5 py-4 rounded-xl
                      border transition-all duration-300
                      ${isTeal
                        ? 'bg-teal/[0.08] border-teal/20 hover:border-teal/35'
                        : 'bg-cream/[0.04] border-cream/[0.08] hover:border-cream/[0.15]'
                      }
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                        w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                        ${isTeal ? 'bg-teal/15 text-teal' : 'bg-ochre/15 text-ochre'}
                      `}
                    >
                      {anchor.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-display text-sm font-semibold ${isTeal ? 'text-cream' : 'text-cream/80'}`}>
                        {anchor.name}
                      </h3>
                      <p className="font-body text-cream/35 text-xs">
                        {anchor.desc}
                      </p>
                    </div>

                    {/* Arrow */}
                    <svg className="w-4 h-4 text-cream/15 shrink-0" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
