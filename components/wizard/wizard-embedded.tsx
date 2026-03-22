'use client'

import { useState } from 'react'
import { WizardProvider, useWizard } from '@/context/wizard-context'
import { ProgressBar } from './progress-bar'
import { QuestionStep } from './question-step'
import { SectionTransition } from './section-transition'
import { WizardComplete } from './wizard-complete'

/**
 * Embedded wizard for use on the homepage.
 * Same functionality as WizardShell but designed to live
 * within the page scroll rather than owning the full viewport.
 */
function WizardContent() {
  const { state, isComplete } = useWizard()
  const [showingSectionIntro, setShowingSectionIntro] = useState(true)
  const [lastSection, setLastSection] = useState(state.currentSection)

  if (state.currentSection !== lastSection) {
    setLastSection(state.currentSection)
    setShowingSectionIntro(true)
  }

  if (isComplete) {
    return (
      <div className="py-16 sm:py-20">
        <WizardComplete />
      </div>
    )
  }

  return (
    <div>
      {/* Progress bar — not sticky, flows with the section */}
      <div className="max-w-3xl mx-auto px-6 pb-6 pt-2">
        <ProgressBar />
      </div>

      {/* Questions */}
      <div className="max-w-3xl mx-auto px-6 pb-16 sm:pb-20">
        {showingSectionIntro ? (
          <SectionTransition
            section={state.currentSection}
            onBegin={() => setShowingSectionIntro(false)}
          />
        ) : (
          <QuestionStep />
        )}
      </div>
    </div>
  )
}

export function WizardEmbedded() {
  return (
    <section id="the-path" className="bg-cream relative overflow-hidden">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 flex justify-center" aria-hidden="true">
        <div className="w-16 sm:w-20 h-[2px] bg-teal/40" />
      </div>

      {/* Section header */}
      <div className="max-w-3xl mx-auto px-6 pt-16 sm:pt-20 lg:pt-24 pb-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-5">
          <span className="w-8 h-px bg-teal/30" aria-hidden="true" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-teal font-medium">
            The Path
          </span>
          <span className="w-8 h-px bg-teal/30" aria-hidden="true" />
        </div>

        <h2
          className="font-display text-navy font-semibold leading-[1.12] tracking-tight mb-3"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
        >
          Ready? Let&apos;s Build Your Foundation.
        </h2>

        <p className="font-body text-muted text-sm sm:text-base max-w-md mx-auto">
          38 questions. Three sections. No account required to start.
        </p>
      </div>

      {/* Wizard */}
      <WizardProvider>
        <WizardContent />
      </WizardProvider>
    </section>
  )
}
