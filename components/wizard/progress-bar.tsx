'use client'

import { SECTION_NAMES, type Section } from '@/types/wizard'
import { useWizard } from '@/context/wizard-context'

export function ProgressBar() {
  const { state, totalQuestionsInSection } = useWizard()
  const { currentSection, currentStep, completedSections } = state

  const sections: Section[] = [0, 1, 2, 3]
  const sectionProgress = (currentStep + 1) / Math.max(totalQuestionsInSection, 1)

  // Overall progress: completed sections + fraction of current
  const completedWeight = completedSections.length
  const currentWeight = sectionProgress
  const overallProgress = ((completedWeight + currentWeight) / 4) * 100

  return (
    <div className="w-full">
      {/* Overall progress bar */}
      <div className="h-1 bg-navy/10 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-teal rounded-full transition-all duration-500 ease-out"
          style={{ width: `${overallProgress}%` }}
        />
      </div>

      {/* Section indicators */}
      <div className="flex items-center justify-between gap-2">
        {sections.map((section) => {
          const isCompleted = completedSections.includes(section)
          const isCurrent = currentSection === section
          const isFuture = !isCompleted && !isCurrent

          return (
            <div
              key={section}
              className={`flex-1 text-center transition-all duration-300 ${
                isCurrent
                  ? 'opacity-100'
                  : isCompleted
                  ? 'opacity-60'
                  : 'opacity-30'
              }`}
            >
              {/* Section dot */}
              <div className="flex items-center justify-center mb-1.5">
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? 'bg-teal'
                      : isCurrent
                      ? 'bg-teal ring-4 ring-teal/20'
                      : 'bg-navy/20'
                  }`}
                />
              </div>

              {/* Section name */}
              <p
                className={`font-body text-[10px] sm:text-xs tracking-wide uppercase ${
                  isCurrent ? 'text-navy font-semibold' : 'text-navy/50'
                }`}
              >
                {SECTION_NAMES[section]}
              </p>

              {/* Step count — only for current section */}
              {isCurrent && (
                <p className="font-body text-[10px] text-muted mt-0.5">
                  {currentStep + 1} of {totalQuestionsInSection}
                </p>
              )}

              {isCompleted && !isCurrent && (
                <p className="font-body text-[10px] text-teal mt-0.5">
                  Done
                </p>
              )}

              {isFuture && (
                <p className="font-body text-[10px] text-navy/30 mt-0.5">
                  &nbsp;
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
