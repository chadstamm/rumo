'use client'

import { SECTION_NAMES, type Section } from '@/types/wizard'
import { useWizard } from '@/context/wizard-context'

export function ProgressBar() {
  const { state, activeSections, totalQuestionsInSection, totalAnswered, totalQuestions } = useWizard()
  const { currentSection, currentStep, completedSections } = state

  const sections = activeSections
  const sectionProgress = (currentStep + 1) / Math.max(totalQuestionsInSection, 1)

  // Overall progress
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

      {/* Current position — conversational */}
      <div className="flex items-center justify-between">
        <p className="font-body text-xs text-navy/60">
          <span className="font-semibold text-navy">{currentSectionName}</span>
          {' '}&middot;{' '}
          Question {currentStep + 1} of {totalQuestionsInSection}
        </p>
        <p className="font-body text-xs text-navy/35">
          {totalAnswered} of {totalQuestions} total
        </p>
      </div>
    </div>
  )
}
