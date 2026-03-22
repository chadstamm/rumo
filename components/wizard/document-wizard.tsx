'use client'

import { useState, useReducer, useCallback, useEffect } from 'react'
import type { DocumentConfig } from '@/data/documents'
import type { Section, WizardState, WizardAnswers } from '@/types/wizard'
import { INITIAL_WIZARD_STATE, SECTION_NAMES } from '@/types/wizard'
import { getQuestionsForSection, getVisibleQuestions, QUESTIONS } from '@/data/questions'
import { ProgressBar as FullProgressBar } from './progress-bar'
import { QuestionStep } from './question-step'
import { SectionTransition } from './section-transition'
import { CompassRose } from '@/components/compass-rose'
import { WizardProvider, useWizard } from '@/context/wizard-context'

// ── Standalone Document Wizard ──
// Uses the same question set but filters to only the sections
// relevant to this document. Same UI template across all four.

function DocumentHeader({ config }: { config: DocumentConfig }) {
  return (
    <div className="bg-navy text-cream">
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16 lg:py-20">
        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center gap-1.5 font-body text-xs text-cream/40
                     hover:text-teal transition-colors duration-200 mb-8"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Rumo
        </a>

        {/* Compass accent */}
        <CompassRose className="w-10 h-10 text-teal/30 mb-6" />

        {/* Document title */}
        <h1
          className="font-display text-cream font-semibold leading-tight mb-2"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          {config.title}
        </h1>

        <p className="font-body text-cream/50 text-base sm:text-lg leading-relaxed max-w-lg">
          {config.description}
        </p>

        {/* Question count */}
        <div className="mt-6 flex items-center gap-3">
          <span className="w-8 h-px bg-teal/30" aria-hidden="true" />
          <span className="font-body text-xs tracking-[0.2em] uppercase text-teal/70">
            {config.sections.reduce<number>(
              (sum, s) => sum + getQuestionsForSection(s).length,
              0
            )}{' '}
            questions
          </span>
        </div>
      </div>
    </div>
  )
}

function DocumentWizardContent({ config }: { config: DocumentConfig }) {
  const { state, isComplete, currentQuestion } = useWizard()
  const [showingSectionIntro, setShowingSectionIntro] = useState(true)
  const [lastSection, setLastSection] = useState(state.currentSection)

  if (state.currentSection !== lastSection) {
    setLastSection(state.currentSection)
    setShowingSectionIntro(true)
  }

  // Complete state
  if (isComplete) {
    return (
      <div className="bg-cream">
        <div className="max-w-lg mx-auto text-center px-6 py-20 sm:py-28">
          <CompassRose className="w-16 h-16 text-teal/40 mx-auto mb-8" />
          <h2
            className="font-display text-navy font-semibold leading-tight mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            Your {config.title} Is Ready.
          </h2>
          <p className="font-body text-muted text-base leading-relaxed mb-10">
            Document generation is coming soon. Your answers are saved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="font-body text-sm text-navy/50 hover:text-navy px-5 py-2.5 transition-colors duration-200"
            >
              ← Back to Rumo
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-cream">
      {/* Progress */}
      <div className="max-w-3xl mx-auto px-6 py-6">
        <FullProgressBar />
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

export function DocumentWizard({ config }: { config: DocumentConfig }) {
  return (
    <div className="min-h-screen">
      <DocumentHeader config={config} />
      <WizardProvider filterSections={config.sections} storageKey={config.slug}>
        <DocumentWizardContent config={config} />
      </WizardProvider>
    </div>
  )
}
