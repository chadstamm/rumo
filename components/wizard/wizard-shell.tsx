'use client'

import { useState } from 'react'
import { useWizard } from '@/context/wizard-context'
import { ProgressBar } from './progress-bar'
import { QuestionStep } from './question-step'
import { SectionTransition } from './section-transition'
import { WizardComplete } from './wizard-complete'
import { SECTION_NAMES } from '@/types/wizard'

export function WizardShell() {
  const { state, activeSections, isComplete } = useWizard()
  const [showingSectionIntro, setShowingSectionIntro] = useState(true)
  const [lastSection, setLastSection] = useState(state.currentSection)

  // Detect section changes to show transition
  if (state.currentSection !== lastSection) {
    setLastSection(state.currentSection)
    setShowingSectionIntro(true)
  }

  // Wizard complete — all sections done
  if (isComplete) {
    return <WizardComplete />
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar with progress */}
      <div className="sticky top-0 z-20 bg-cream/95 backdrop-blur-sm border-b border-navy/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <ProgressBar />
        </div>
      </div>

      {/* Main content area */}
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        {showingSectionIntro ? (
          <SectionTransition
            section={state.currentSection}
            onBegin={() => setShowingSectionIntro(false)}
            totalSections={(activeSections.filter(s => s !== 0) as number[]).length}
            sectionIndex={(activeSections.filter(s => s !== 0) as number[]).indexOf(state.currentSection as number) + 1}
          />
        ) : (
          <QuestionStep />
        )}
      </main>
    </div>
  )
}
