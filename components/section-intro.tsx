'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function SectionIntro() {
  const ref = useScrollReveal();

  return (
    <section className="bg-navy text-cream py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(196,148,58,0.06) 0%, transparent 50%)',
        }}
      />

      <div
        ref={ref}
        className="reveal relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center"
      >
        {/* Overline */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="w-8 h-px bg-ochre/40" aria-hidden="true" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-ochre-light font-medium">
            The Plan
          </span>
          <span className="w-8 h-px bg-ochre/40" aria-hidden="true" />
        </div>

        <h2
          className="font-display font-semibold leading-[1.12] tracking-tight text-cream mb-5"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}
        >
          Four Steps to AI
          <br className="hidden sm:inline" />
          {' '}That Actually Knows You
        </h2>

        <p className="font-body text-cream/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Most people skip straight to the tools. But without self-knowledge, voice, and story, every AI interaction starts from zero. This is the better way.
        </p>
      </div>
    </section>
  );
}
