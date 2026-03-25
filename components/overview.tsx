'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const ANCHORS = [
  {
    name: 'Personal Constitution',
    desc: 'Who you are always — your values, beliefs, and identity foundation',
    color: 'ochre' as const,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="9" r="4" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Writing Codex',
    desc: 'How you write — your rhythms, patterns, and voice fingerprint',
    color: 'ochre' as const,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="16" width="3.5" height="5" rx="1" fill="currentColor" />
        <rect x="8" y="9" width="3.5" height="12" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="13" y="4" width="3.5" height="17" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="18" y="11" width="3" height="10" rx="1" fill="currentColor" opacity="0.35" />
      </svg>
    ),
  },
  {
    name: 'State of the Union',
    desc: 'Where you are right now — your goals, constraints, and current season',
    color: 'ochre' as const,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <polygon points="12,4.5 13.5,10.5 12,9.5 10.5,10.5" fill="currentColor" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Story Bank',
    desc: 'What you\'ve lived — the moments, crossroads, and raw material',
    color: 'ochre' as const,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 5C9 4 6 3.5 3 4v15c3-.5 6 0 9 1" fill="currentColor" opacity="0.15" />
        <path d="M12 5c3-1 6-1.5 9-.5v15c-3-.5-6 0-9 1" fill="currentColor" opacity="0.15" />
        <path d="M12 5C9 4 6 3.5 3 4v15c3-.5 6 0 9 1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 5c3-1 6-1.5 9-.5v15c-3-.5-6 0-9 1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 5v15" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'Custom Instructions',
    desc: 'Your AI, configured — tailored for every platform you use',
    color: 'teal' as const,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="14" height="18" rx="2.5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="19" cy="18" r="4.5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17 18l1.5 1.5L21 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

      {/* Darker overlay — navy at top, warmer gold pulled out at bottom */}
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

      {/* Ochre wash — more gold at bottom */}
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
            {/* Header */}
            <p className="font-body text-ochre font-bold text-sm tracking-[0.25em] uppercase mb-6">
              The Context Anchors
            </p>

            {/* Cards — white-backed for contrast and visual pop */}
            <div className="space-y-2.5">
              {ANCHORS.map((anchor) => {
                const isTeal = anchor.color === 'teal'
                return (
                  <div
                    key={anchor.name}
                    className={`
                      flex items-center gap-4 px-5 py-4 rounded-xl
                      transition-all duration-300
                      ${isTeal
                        ? 'bg-white/[0.12] border border-teal/25 hover:bg-white/[0.16] hover:border-teal/40'
                        : 'bg-white/[0.07] border border-white/[0.08] hover:bg-white/[0.12] hover:border-white/[0.16]'
                      }
                    `}
                  >
                    {/* Icon container */}
                    <div
                      className={`
                        w-11 h-11 rounded-xl flex items-center justify-center shrink-0
                        ${isTeal
                          ? 'bg-teal/20 text-teal'
                          : 'bg-white/[0.10] text-ochre'
                        }
                      `}
                    >
                      {anchor.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm font-semibold text-white mb-0.5">
                        {anchor.name}
                      </h3>
                      <p className={`font-body text-xs leading-snug ${isTeal ? 'text-teal/60' : 'text-white/40'}`}>
                        {anchor.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Subtle connector line to next section */}
            <div className="flex justify-center mt-8" aria-hidden="true">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-px h-6 bg-gradient-to-b from-ochre/30 to-ochre/10" />
                <svg className="w-4 h-4 text-ochre/25" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
