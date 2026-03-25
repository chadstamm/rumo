'use client'

import { InstructionsProvider } from '@/context/instructions-context'
import { InstructionsWizard } from '@/components/instructions/InstructionsWizard'

/**
 * Embedded instructions builder for the homepage.
 * Free tool — the main conversion entry point.
 */
export function WizardEmbedded() {
  return (
    <section id="the-path" className="relative overflow-hidden">
      {/* Navy header band */}
      <div className="bg-navy relative">
        {/* Subtle glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse at center top, rgba(30, 190, 177, 0.06) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-16 text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-10 h-px bg-teal/30" aria-hidden="true" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-teal font-semibold">
              Start Here
            </span>
            <span className="w-10 h-px bg-teal/30" aria-hidden="true" />
          </div>

          <h2
            className="font-display text-cream font-semibold leading-[1.08] tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            Build Your Custom
            <br />
            <span className="text-teal">AI Instructions</span>
          </h2>

          <p className="font-body text-cream/45 text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-2">
            Tell us how you work. We&apos;ll generate instructions
            tailored for every AI platform you use.
          </p>

          <p className="font-body text-cream/25 text-sm">
            Free. No account required to start.
          </p>
        </div>

        {/* Gradient transition to cream */}
        <div className="h-16 bg-gradient-to-b from-navy to-cream" aria-hidden="true" />
      </div>

      {/* Wizard */}
      <div className="bg-cream">
        <InstructionsProvider>
          <InstructionsWizard />
        </InstructionsProvider>
      </div>
    </section>
  )
}
