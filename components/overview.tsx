'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function Overview() {
  const sectionRef = useScrollReveal(0.1)

  return (
    <section className="relative bg-cream overflow-hidden">
      {/* ── Decorative top edge — matching Problem ── */}
      <div className="absolute top-0 left-0 right-0 flex justify-center" aria-hidden="true">
        <div className="w-16 sm:w-20 h-[2px] bg-teal/40" />
      </div>

      <div
        ref={sectionRef}
        className="reveal relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36 lg:py-44"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* ── Left: Editorial text (matches Problem's voice) ── */}
          <div>
            {/* Eyebrow — same style as Problem but teal */}
            <p className="font-body text-teal font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-8 sm:mb-10">
              The Missing Ingredient
            </p>

            {/* Display heading */}
            <h2
              className="font-display text-navy font-bold leading-[1.1] tracking-tight
                         text-[clamp(2rem,5.5vw,3.75rem)]
                         mb-10 sm:mb-14"
            >
              AI Is Only As Good
              <br />
              <span className="text-ochre">As What You Give It.</span>
            </h2>

            {/* Thin teal separator — mirrors Problem's ochre one */}
            <div className="w-12 h-[2px] bg-teal/50 mb-10 sm:mb-14" aria-hidden="true" />

            {/* Body copy — educational, not product-focused */}
            <div className="space-y-5 sm:space-y-6">
              <p className="font-body text-navy/80 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
                The difference between generic AI output and something that actually sounds like you comes down to one thing: context. Your identity, your voice, your lived experience. When AI has those inputs, it stops guessing and starts collaborating.
              </p>

              <p className="font-body text-navy/80 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
                Most people skip this step because nobody tells them it exists. They jump straight to prompting without ever giving AI the foundation it needs to be useful. The result is output that feels hollow, sounds generic, and requires constant correction.
              </p>

              <p className="font-body text-navy font-medium text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
                The fix is simple: give AI your context before you give it your questions.
              </p>
            </div>
          </div>

          {/* ── Right: Visual — stacked document preview ── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px]">
              {/* Background glow */}
              <div
                className="absolute inset-0 -m-8 rounded-3xl pointer-events-none"
                aria-hidden="true"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(30, 190, 177, 0.06) 0%, transparent 70%)',
                }}
              />

              {/* Document stack — 4 cards with slight rotation/offset */}
              <div className="relative" style={{ height: '380px' }}>
                {/* Card 4 (back) — Story Bank */}
                <div
                  className="absolute w-[280px] sm:w-[300px] rounded-xl border border-navy/8 bg-white shadow-sm px-6 py-5"
                  style={{ top: '0px', left: '40px', transform: 'rotate(2.5deg)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-ochre/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-ochre" viewBox="0 0 16 16" fill="none">
                        <path d="M2 3h5c1 0 2 1 2 2v8c0-1-1-2-2-2H2V3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                        <path d="M14 3H9c-1 0-2 1-2 2v8c0-1 1-2 2-2h5V3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-display text-navy/40 text-sm font-semibold">Story Bank</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-navy/5 rounded-full w-full" />
                    <div className="h-2 bg-navy/5 rounded-full w-4/5" />
                    <div className="h-2 bg-navy/5 rounded-full w-3/5" />
                  </div>
                </div>

                {/* Card 3 — Writing Codex */}
                <div
                  className="absolute w-[280px] sm:w-[300px] rounded-xl border border-navy/8 bg-white shadow-md px-6 py-5"
                  style={{ top: '80px', left: '25px', transform: 'rotate(-1deg)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-teal" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h2M5.5 4h2M5.5 12h2M8 6h2M8 10h2M10.5 3h2M10.5 13h2M13 7h1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="font-display text-navy/50 text-sm font-semibold">Writing Codex</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-navy/5 rounded-full w-full" />
                    <div className="h-2 bg-navy/5 rounded-full w-5/6" />
                    <div className="h-2 bg-navy/5 rounded-full w-2/3" />
                  </div>
                </div>

                {/* Card 2 — Personal Constitution */}
                <div
                  className="absolute w-[280px] sm:w-[300px] rounded-xl border border-navy/8 bg-white shadow-lg px-6 py-5"
                  style={{ top: '160px', left: '10px', transform: 'rotate(0.5deg)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-ochre/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-ochre" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="font-display text-navy/60 text-sm font-semibold">Personal Constitution</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-navy/6 rounded-full w-full" />
                    <div className="h-2 bg-navy/6 rounded-full w-4/5" />
                    <div className="h-2 bg-navy/6 rounded-full w-5/6" />
                  </div>
                </div>

                {/* Card 1 (front) — Custom Instructions with teal accent */}
                <div
                  className="absolute w-[280px] sm:w-[300px] rounded-xl border border-teal/20 bg-white shadow-xl shadow-teal/5 px-6 py-5"
                  style={{ top: '240px', left: '0px', transform: 'rotate(-1.5deg)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-teal/15 flex items-center justify-center">
                      <svg className="w-4 h-4 text-teal" viewBox="0 0 16 16" fill="none">
                        <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M6 5h4M6 7.5h4M6 10h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="font-display text-navy text-sm font-semibold">Custom Instructions</span>
                    <span className="ml-auto text-[10px] font-body font-semibold text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-teal/10 rounded-full w-full" />
                    <div className="h-2 bg-teal/10 rounded-full w-5/6" />
                    <div className="h-2 bg-teal/8 rounded-full w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Subtle background — navigation lines watermark ── */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] opacity-[0.02] pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
          {/* Latitude lines */}
          <line x1="0" y1="100" x2="500" y2="100" stroke="#1a2744" strokeWidth="1" />
          <line x1="0" y1="200" x2="500" y2="200" stroke="#1a2744" strokeWidth="1" />
          <line x1="0" y1="300" x2="500" y2="300" stroke="#1a2744" strokeWidth="1" />
          <line x1="0" y1="400" x2="500" y2="400" stroke="#1a2744" strokeWidth="1" />
          {/* Longitude lines */}
          <line x1="100" y1="0" x2="100" y2="500" stroke="#1a2744" strokeWidth="1" />
          <line x1="200" y1="0" x2="200" y2="500" stroke="#1a2744" strokeWidth="1" />
          <line x1="300" y1="0" x2="300" y2="500" stroke="#1a2744" strokeWidth="1" />
          <line x1="400" y1="0" x2="400" y2="500" stroke="#1a2744" strokeWidth="1" />
          {/* Route line */}
          <path d="M50 450 Q200 350 250 250 T450 50" stroke="#1a2744" strokeWidth="2" fill="none" strokeDasharray="8 4" />
        </svg>
      </div>
    </section>
  )
}
