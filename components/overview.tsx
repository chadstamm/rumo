'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function Overview() {
  const sectionRef = useScrollReveal(0.12)

  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(196, 148, 58, 0.06) 0%, transparent 70%)',
        }}
      />

      <div
        ref={sectionRef}
        className="reveal relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32 lg:py-36 text-center"
      >
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="w-8 h-px bg-ochre/30" aria-hidden="true" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-ochre/70 font-medium">
            The Solution
          </span>
          <span className="w-8 h-px bg-ochre/30" aria-hidden="true" />
        </div>

        {/* Heading */}
        <h2
          className="font-display text-cream font-semibold leading-[1.1] tracking-tight mb-8 sm:mb-10"
          style={{ fontSize: 'clamp(1.75rem, 5vw, 3.25rem)' }}
        >
          Rumo Helps You
          <br />
          <span className="text-ochre">Get Started With AI.</span>
        </h2>

        {/* Body */}
        <div className="space-y-5">
          <p className="font-body text-cream/55 text-lg sm:text-xl leading-relaxed">
            Before you can work with AI, it needs to know who you are. Your values, your voice, your stories.
            Without that context, every AI tool gives you the same generic output it gives everyone else.
          </p>

          <p className="font-body text-cream/55 text-lg sm:text-xl leading-relaxed">
            Rumo walks you through a guided process that mines your personal context and turns it into something useful — documents and custom instructions that make AI work like it actually knows you.
          </p>
        </div>

        {/* Three value props — minimal, inline */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-teal/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-teal" viewBox="0 0 20 20" fill="none">
                <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-body text-cream/70 text-sm font-medium mb-1">Personal</p>
            <p className="font-body text-cream/35 text-xs leading-relaxed">
              Built from your experience, not templates
            </p>
          </div>

          <div>
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-teal/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-teal" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="font-body text-cream/70 text-sm font-medium mb-1">Portable</p>
            <p className="font-body text-cream/35 text-xs leading-relaxed">
              Works with ChatGPT, Claude, Gemini, and more
            </p>
          </div>

          <div>
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-teal/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-teal" viewBox="0 0 20 20" fill="none">
                <path d="M16 4l-8 8-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="font-body text-cream/70 text-sm font-medium mb-1">Yours</p>
            <p className="font-body text-cream/35 text-xs leading-relaxed">
              You own everything Rumo generates
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
