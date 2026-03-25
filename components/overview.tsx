'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function Overview() {
  const sectionRef = useScrollReveal(0.1)

  return (
    <section className="relative overflow-hidden">
      {/* ── Background image with ochre overlay ── */}
      <Image
        src="/overview-bg.jpg"
        alt=""
        fill
        className="object-cover"
        priority={false}
        aria-hidden="true"
      />

      {/* Ochre-tinted overlay — warm, nautical feel */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(
              to right,
              rgba(26, 39, 68, 0.88) 0%,
              rgba(26, 39, 68, 0.82) 50%,
              rgba(26, 39, 68, 0.72) 100%
            )
          `,
        }}
      />

      {/* Subtle warm wash on top of navy */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(135deg, rgba(196, 148, 58, 0.08) 0%, transparent 60%)',
        }}
      />

      <div
        ref={sectionRef}
        className="reveal relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36 lg:py-44"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* ── Left: Editorial text ── */}
          <div>
            {/* Eyebrow — ochre, not teal */}
            <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-8 sm:mb-10">
              The Missing Ingredient
            </p>

            {/* Display heading */}
            <h2
              className="font-display text-cream font-bold leading-[1.1] tracking-tight
                         text-[clamp(2rem,5.5vw,3.75rem)]
                         mb-10 sm:mb-14"
            >
              AI Is Only As Good
              <br />
              <span className="text-ochre-light">As What You Give It.</span>
            </h2>

            {/* Thin ochre separator */}
            <div className="w-12 h-[2px] bg-ochre/50 mb-10 sm:mb-14" aria-hidden="true" />

            {/* Body copy — cream text on dark bg */}
            <div className="space-y-5 sm:space-y-6">
              <p className="font-body text-cream/70 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
                The difference between generic AI output and something that actually sounds like you comes down to one thing: context. Your identity, your voice, your lived experience. When AI has those inputs, it stops guessing and starts collaborating.
              </p>

              <p className="font-body text-cream/70 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
                Most people skip this step because nobody tells them it exists. They jump straight to prompting without ever giving AI the foundation it needs to be useful. The result is output that feels hollow, sounds generic, and requires constant correction.
              </p>

              <p className="font-body text-cream/70 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
                The fix is simple: give AI your context before you give it your questions. The harder part is knowing how to compile that context in a way AI can actually use.
              </p>

              <p className="font-body text-cream font-medium text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
                That&apos;s where Rumo comes in. We call it personal context mining — a guided process that extracts who you are, how you think, and what you&apos;ve lived, then assembles it into documents and instructions that make every AI platform work better for you.
              </p>
            </div>
          </div>

          {/* ── Right: Visual — stacked document preview ── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px]">
              {/* Document stack — 5 cards with slight rotation/offset */}
              <div className="relative" style={{ height: '440px' }}>
                {/* Card 5 (back) — Story Bank */}
                <div
                  className="absolute w-[280px] sm:w-[300px] rounded-xl border border-cream/10 bg-cream/[0.06] backdrop-blur-sm px-6 py-5"
                  style={{ top: '0px', left: '40px', transform: 'rotate(2.5deg)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-ochre/15 flex items-center justify-center">
                      <svg className="w-4 h-4 text-ochre" viewBox="0 0 16 16" fill="none">
                        <path d="M2 3h5c1 0 2 1 2 2v8c0-1-1-2-2-2H2V3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                        <path d="M14 3H9c-1 0-2 1-2 2v8c0-1 1-2 2-2h5V3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-display text-cream/40 text-sm font-semibold">Story Bank</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-cream/8 rounded-full w-full" />
                    <div className="h-2 bg-cream/8 rounded-full w-4/5" />
                    <div className="h-2 bg-cream/6 rounded-full w-3/5" />
                  </div>
                </div>

                {/* Card 4 — Writing Codex */}
                <div
                  className="absolute w-[280px] sm:w-[300px] rounded-xl border border-cream/10 bg-cream/[0.07] backdrop-blur-sm px-6 py-5"
                  style={{ top: '75px', left: '28px', transform: 'rotate(-1deg)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-teal/15 flex items-center justify-center">
                      <svg className="w-4 h-4 text-teal" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h2M5.5 4h2M5.5 12h2M8 6h2M8 10h2M10.5 3h2M10.5 13h2M13 7h1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="font-display text-cream/45 text-sm font-semibold">Writing Codex</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-cream/8 rounded-full w-full" />
                    <div className="h-2 bg-cream/8 rounded-full w-5/6" />
                    <div className="h-2 bg-cream/6 rounded-full w-2/3" />
                  </div>
                </div>

                {/* Card 3 — State of the Union */}
                <div
                  className="absolute w-[280px] sm:w-[300px] rounded-xl border border-cream/10 bg-cream/[0.08] backdrop-blur-sm px-6 py-5"
                  style={{ top: '150px', left: '15px', transform: 'rotate(1deg)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-ochre/15 flex items-center justify-center">
                      <svg className="w-4 h-4 text-ochre" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
                        <polygon points="8,3 9,7 8,6 7,7" fill="currentColor" />
                        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="font-display text-cream/50 text-sm font-semibold">State of the Union</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-cream/8 rounded-full w-full" />
                    <div className="h-2 bg-cream/8 rounded-full w-4/5" />
                    <div className="h-2 bg-cream/6 rounded-full w-5/6" />
                  </div>
                </div>

                {/* Card 2 — Personal Constitution */}
                <div
                  className="absolute w-[280px] sm:w-[300px] rounded-xl border border-cream/12 bg-cream/[0.09] backdrop-blur-sm px-6 py-5"
                  style={{ top: '225px', left: '5px', transform: 'rotate(-0.5deg)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-ochre/15 flex items-center justify-center">
                      <svg className="w-4 h-4 text-ochre" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="font-display text-cream/60 text-sm font-semibold">Personal Constitution</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-cream/10 rounded-full w-full" />
                    <div className="h-2 bg-cream/10 rounded-full w-4/5" />
                    <div className="h-2 bg-cream/8 rounded-full w-5/6" />
                  </div>
                </div>

                {/* Card 1 (front) — Custom Instructions with teal accent */}
                <div
                  className="absolute w-[280px] sm:w-[300px] rounded-xl border border-teal/25 bg-cream/[0.12] backdrop-blur-md px-6 py-5 shadow-lg shadow-black/10"
                  style={{ top: '300px', left: '0px', transform: 'rotate(-1.5deg)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-teal/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-teal" viewBox="0 0 16 16" fill="none">
                        <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M6 5h4M6 7.5h4M6 10h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="font-display text-cream text-sm font-semibold">Custom Instructions</span>
                    <span className="ml-auto text-[10px] font-body font-semibold text-teal bg-teal/15 px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-teal/15 rounded-full w-full" />
                    <div className="h-2 bg-teal/12 rounded-full w-5/6" />
                    <div className="h-2 bg-teal/10 rounded-full w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
