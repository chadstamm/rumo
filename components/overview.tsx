'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

// ── Main Component ──

export function Overview() {
  const sectionRef = useScrollReveal(0.1)

  return (
    <section className="relative overflow-hidden">
      {/* ── Background image ── */}
      <Image
        src="/overview-bg.jpg"
        alt=""
        fill
        className="object-cover -scale-x-100"
        priority={false}
        aria-hidden="true"
      />

      {/* Overlays */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to bottom,
            rgba(26, 39, 68, 0.93) 0%, rgba(26, 39, 68, 0.90) 40%,
            rgba(26, 39, 68, 0.82) 70%, rgba(30, 35, 44, 0.72) 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to bottom,
            rgba(196, 148, 58, 0.03) 0%, rgba(196, 148, 58, 0.06) 40%,
            rgba(196, 148, 58, 0.14) 75%, rgba(196, 148, 58, 0.25) 100%)`,
        }}
      />

      <div
        ref={sectionRef}
        className="reveal relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36 lg:py-44"
      >
        <div className="max-w-[44rem]">
          {/* ── Editorial text only ── */}
          <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-8 sm:mb-10">
            The Missing Ingredient
          </p>

          <h2
            className="font-display text-cream font-bold leading-[1.1] tracking-tight
                       text-[clamp(2rem,5.5vw,3.75rem)] mb-10 sm:mb-14"
          >
            AI Is Only As Good
            <br />
            <span className="text-ochre-light">As What You Give It.</span>
          </h2>

          <div className="w-12 h-[2px] bg-ochre/50 mb-10 sm:mb-14" aria-hidden="true" />

          <div className="space-y-5 sm:space-y-6">
            <p className="font-body text-cream/85 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
              The difference between generic AI output and something that actually works for you comes down to one thing: context. Your identity, your voice, your lived experience. When AI has those inputs, it stops guessing and starts collaborating.
            </p>
            <p className="font-body text-cream/85 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
              The fix is simple: give AI your context before you give it your questions. The harder part is compiling that context in a way AI can actually use.
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}
