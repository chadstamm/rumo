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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* ── Left: Editorial text ── */}
          <div>
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
                Generic AI output and output that actually works for you are separated by one thing: context. Your identity, your voice, your lived experience. Give AI those inputs and something shifts. It <em>gets</em> you.
              </p>
              <p className="font-body text-cream/85 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
                Give AI your context before you give it your questions. That part is simple. The harder part is compiling that context in a way AI can actually use. That&apos;s what Context Anchors are for &mdash; six documents that capture who you are so your AI doesn&apos;t have to guess.
              </p>
            </div>
          </div>

          {/* ── Right: Pull quote ── */}
          <div className="hidden lg:flex items-center justify-center">
            <blockquote className="relative text-center">
              {/* Opening quote mark */}
              <span
                className="absolute -top-8 -left-6 font-script text-[7rem] leading-none text-ochre/30 select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="font-script text-cream/80 text-[clamp(2rem,3.8vw,3rem)] leading-[1.35]">
                Give your AI context before you give it questions.
              </p>
              {/* Closing quote mark */}
              <span
                className="absolute -bottom-16 -right-8 font-script text-[7rem] leading-none text-ochre/30 select-none pointer-events-none"
                aria-hidden="true"
              >
                &rdquo;
              </span>
              <div className="w-10 h-[2px] bg-ochre/40 mt-6 mx-auto" aria-hidden="true" />
            </blockquote>
          </div>
        </div>
      </div>

    </section>
  )
}
