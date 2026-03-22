'use client'

import { CompassRose } from '@/components/compass-rose'
import { useWizard } from '@/context/wizard-context'

/**
 * Shown when all sections are complete.
 * In the future, this triggers document generation.
 * For now, it's a confirmation screen with a summary.
 */
export function WizardComplete() {
  const { totalAnswered, reset } = useWizard()

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <CompassRose className="w-20 h-20 text-teal/40 mx-auto mb-8" />

        <h1
          className="font-display text-navy font-semibold leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          Your Foundation Is Set.
        </h1>

        <p className="font-body text-muted text-base sm:text-lg leading-relaxed mb-3">
          You answered {totalAnswered} questions across identity, voice, and stories.
          That&apos;s the raw material for your Personal Constitution, Writing Codex,
          Story Bank, and State of the Union.
        </p>

        <p className="font-body text-navy/40 text-sm mb-10">
          Document generation is coming soon. Your answers are saved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="font-body text-sm text-navy/50 hover:text-navy px-5 py-2.5 transition-colors duration-200"
          >
            ← Back to Home
          </a>

          <button
            type="button"
            onClick={reset}
            className="font-body text-xs text-navy/30 hover:text-navy/50 px-4 py-2 transition-colors duration-200"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  )
}
