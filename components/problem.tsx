'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function Problem() {
  const sectionRef = useScrollReveal(0.12);

  return (
    <section
      id="problem"
      className="relative bg-cream overflow-hidden"
    >
      {/* ── Decorative top edge — thin ochre rule ── */}
      <div className="absolute top-0 left-0 right-0 flex justify-center" aria-hidden="true">
        <div className="w-16 sm:w-20 h-[2px] bg-ochre/50" />
      </div>

      {/* ── Content ── */}
      <div
        ref={sectionRef}
        className="reveal relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36 lg:py-44"
      >
        {/* Eyebrow label */}
        <p
          className="font-body text-ocean/70 font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-8 sm:mb-10"
        >
          The Problem
        </p>

        {/* Display heading */}
        <h2
          className="font-display text-navy font-bold leading-[1.1] tracking-tight
                     text-[clamp(1.75rem,4.5vw,3.25rem)]
                     mb-10 sm:mb-14"
        >
          Your AI Doesn&apos;t Know
          <br />
          <span className="text-ochre">Who You Are.</span>
        </h2>

        {/* Thin ochre separator between heading and body */}
        <div className="w-12 h-[2px] bg-ochre/60 mb-10 sm:mb-14" aria-hidden="true" />

        {/* Body copy — problem, empathy, answer */}
        <div className="space-y-5 sm:space-y-6">
          <p className="font-body text-navy/80 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
            Not your voice. Not your values. Not what you&apos;re building or why it matters. Every conversation starts from zero &mdash; you explain yourself, correct the tone, add caveats about what you actually mean. You&apos;re working with a tool that forgets you between every session.
          </p>

          <p className="font-body text-navy/80 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
            It&apos;s not your fault. There&apos;s no manual for how to give AI the context it actually needs. The technology moves fast, the tools keep changing, and nobody told you the most important input was missing.
          </p>

          <p className="font-body text-navy font-semibold text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
            The most overlooked input in AI is you.
          </p>
        </div>
      </div>

      {/* ── Subtle background texture — faint compass rose watermark ── */}
      <div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] opacity-[0.025] pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer ring */}
          <circle cx="200" cy="200" r="180" stroke="#1a2744" strokeWidth="2" />
          <circle cx="200" cy="200" r="160" stroke="#1a2744" strokeWidth="1" />
          {/* Cardinal points */}
          <polygon points="200,20 228,160 200,130 172,160" fill="#1a2744" />
          <polygon points="200,380 172,240 200,270 228,240" fill="#1a2744" />
          <polygon points="380,200 240,172 270,200 240,228" fill="#1a2744" />
          <polygon points="20,200 160,228 130,200 160,172" fill="#1a2744" />
          {/* Center */}
          <circle cx="200" cy="200" r="22" fill="#1a2744" />
          <circle cx="200" cy="200" r="10" fill="#faf6f1" />
        </svg>
      </div>
    </section>
  );
}
