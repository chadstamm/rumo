'use client'

import { useState, useEffect, useRef } from 'react'
import { useWizard } from '@/context/wizard-context'
import { getQuestionsForSection } from '@/data/questions'

export function ProgressBar() {
  const { state, activeSections, totalQuestionsInSection, totalQuestions, reset } = useWizard()
  const { currentSection, currentStep, updatedAt } = state
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const isFirstRender = useRef(true)

  // Flash "Progress saved" when updatedAt changes (skip initial mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setShowSaved(true)
    const timer = setTimeout(() => setShowSaved(false), 2000)
    return () => clearTimeout(timer)
  }, [updatedAt])

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

      {/* Total + save indicator + reset */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="font-body text-xs text-navy/60 font-medium">
            Question {currentQuestionNumber} of {totalQuestions}
          </p>
          <span
            className={`font-body text-xs text-teal transition-opacity duration-500 ${
              showSaved ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Saved
          </span>
        </div>
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
                className="font-body text-xs text-navy/50 hover:text-navy/70 transition-colors"
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
