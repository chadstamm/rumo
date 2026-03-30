'use client'

import { useState } from 'react'
import { SECTION_NAMES } from '@/types/wizard'
import { useWizard } from '@/context/wizard-context'

export function ProgressBar() {
  const { state, activeSections, totalQuestionsInSection, totalAnswered, totalQuestions, reset } = useWizard()
  const { currentSection, currentStep, completedSections } = state
  const [showConfirm, setShowConfirm] = useState(false)

  const sections = activeSections
  const sectionProgress = (currentStep + 1) / Math.max(totalQuestionsInSection, 1)

  const completedWeight = completedSections.filter((s) => sections.includes(s)).length
  const currentWeight = sectionProgress
  const overallProgress = ((completedWeight + currentWeight) / sections.length) * 100

  const currentSectionName = SECTION_NAMES[state.currentSection] || ''

  return (
    <div className="w-full">
      {/* Overall progress bar */}
      <div className="h-1.5 bg-navy/10 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-teal rounded-full transition-all duration-500 ease-out"
          style={{ width: `${overallProgress}%` }}
        />
      </div>

      {/* Current position + reset */}
      <div className="flex items-center justify-between">
        <p className="font-body text-xs text-navy/60">
          <span className="font-semibold text-navy">{currentSectionName}</span>
          {' '}&middot;{' '}
          Question {currentStep + 1} of {totalQuestionsInSection}
        </p>
        <div className="flex items-center gap-3">
          <p className="font-body text-xs text-navy/35">
            {totalAnswered} of {totalQuestions} total
          </p>
          {totalAnswered > 0 && (
            <>
              {showConfirm ? (
                <div className="flex items-center gap-2">
                  <span className="font-body text-xs text-navy/40">Clear all answers?</span>
                  <button
                    type="button"
                    onClick={() => { reset(); setShowConfirm(false) }}
                    className="font-body text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirm(false)}
                    className="font-body text-xs text-navy/40 hover:text-navy/60 transition-colors"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirm(true)}
                  className="font-body text-xs text-navy/25 hover:text-navy/50 transition-colors"
                >
                  Start Over
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
