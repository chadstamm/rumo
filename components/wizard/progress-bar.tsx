'use client'

import { useState } from 'react'
import { useWizard } from '@/context/wizard-context'
import { getQuestionsForSection } from '@/data/questions'

export function ProgressBar() {
  const { state, activeSections, totalQuestionsInSection, totalQuestions, reset } = useWizard()
  const { currentSection, currentStep } = state
  const [showConfirm, setShowConfirm] = useState(false)

  // Calculate absolute question number based on position in sequence
  let currentQuestionNumber = currentStep + 1
  for (const s of activeSections) {
    if (s === currentSection) break
    currentQuestionNumber += getQuestionsForSection(s).length
  }

  const overallProgress = (currentQuestionNumber / totalQuestions) * 100

  return (
    <div className="w-full">
      {/* Overall progress bar */}
      <div className="h-1.5 bg-navy/10 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-teal rounded-full transition-all duration-500 ease-out"
          style={{ width: `${overallProgress}%` }}
        />
      </div>

      {/* Total + reset */}
      <div className="flex items-center justify-between">
        <p className="font-body text-xs text-navy/60 font-medium">
          Question {currentQuestionNumber} of {totalQuestions}
        </p>
        {currentQuestionNumber > 1 && (
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
  )
}
