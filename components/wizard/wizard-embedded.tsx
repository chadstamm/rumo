'use client'

import { InstructionsProvider } from '@/context/instructions-context'
import { InstructionsWizard } from '@/components/instructions/InstructionsWizard'

/**
 * Embedded instructions builder for the homepage.
 * Free tool — the main conversion entry point.
 */
export function WizardEmbedded() {
  return (
    <section id="the-path" className="bg-cream relative overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 flex justify-center" aria-hidden="true">
        <div className="w-16 sm:w-20 h-[2px] bg-teal/40" />
      </div>

      {/* Section header */}
      <div className="max-w-3xl mx-auto px-6 pt-16 sm:pt-20 lg:pt-24 pb-4 text-center">
        <div className="flex items-center justify-center gap-4 mb-5">
          <span className="w-8 h-px bg-teal/30" aria-hidden="true" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-teal font-medium">
            Free Tool
          </span>
          <span className="w-8 h-px bg-teal/30" aria-hidden="true" />
        </div>

        <h2
          className="font-display text-navy font-semibold leading-[1.12] tracking-tight mb-3"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
        >
          Build Your Custom AI Instructions
        </h2>

        <p className="font-body text-muted text-sm sm:text-base max-w-md mx-auto">
          Tell us how you work. We&apos;ll generate instructions for every AI platform you use.
        </p>
      </div>

      {/* Instructions wizard */}
      <InstructionsProvider>
        <InstructionsWizard />
      </InstructionsProvider>
    </section>
  )
}
