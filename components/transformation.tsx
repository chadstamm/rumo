'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function Transformation() {
  const sectionRef = useScrollReveal(0.08)

  return (
    <section className="relative bg-cream overflow-hidden">
      {/* ── Decorative top edge ── */}
      <div className="absolute top-0 left-0 right-0 flex justify-center" aria-hidden="true">
        <div className="w-16 sm:w-20 h-[2px] bg-ochre/50" />
      </div>

      <div
        ref={sectionRef}
        className="reveal relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36 lg:py-44"
      >
        <p className="font-body text-ocean/70 font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-8 sm:mb-10">
          What Changes?
        </p>

        <h2
          className="font-display text-navy font-bold leading-[1.1] tracking-tight
                     text-[clamp(1.75rem,4.5vw,3.25rem)]
                     mb-10 sm:mb-14"
        >
          You Stop Starting Over.
          <br />
          <span className="text-ochre">Your AI Starts Paying Attention.</span>
        </h2>

        <div className="w-12 h-[2px] bg-ochre/60 mb-10 sm:mb-14" aria-hidden="true" />

        <div className="space-y-5 sm:space-y-6">
          <p className="font-body text-navy/80 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
            Right now, every conversation with AI starts from zero. You explain who you are. You correct the tone. You add caveats about what you actually meant. RUMO gives your AI something to remember &mdash; your values, your voice, your stories &mdash; so you build it once and your AI carries it forward.
          </p>

          <p className="font-body text-navy/80 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
            The prompts get shorter. The output gets sharper. And eventually it stops feeling like a tool and starts feeling like someone who&apos;s been paying attention.
          </p>

          <p className="font-body text-navy font-semibold text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
            Start with who you are. The rest follows.
          </p>
        </div>

      </div>

      {/* ── Subtle compass watermark ── */}
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] opacity-[0.02] pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="200" cy="200" r="180" stroke="#1a2744" strokeWidth="2" />
          <circle cx="200" cy="200" r="160" stroke="#1a2744" strokeWidth="1" />
          <polygon points="200,20 228,160 200,130 172,160" fill="#1a2744" />
          <polygon points="200,380 172,240 200,270 228,240" fill="#1a2744" />
          <polygon points="380,200 240,172 270,200 240,228" fill="#1a2744" />
          <polygon points="20,200 160,228 130,200 160,172" fill="#1a2744" />
          <circle cx="200" cy="200" r="22" fill="#1a2744" />
          <circle cx="200" cy="200" r="10" fill="#faf6f1" />
        </svg>
      </div>
    </section>
  )
}
