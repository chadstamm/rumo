'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInstructions } from '@/context/instructions-context'
import { ModelSelectionStep } from './ModelSelectionStep'
import { FoundationStep } from './FoundationStep'
import { QuestionStep } from './QuestionStep'
import { GeneratingStep } from './GeneratingStep'
import { ResultsStep } from './ResultsStep'
import { CompassRose } from '@/components/compass-rose'

function IntroStep() {
  const { nextStep } = useInstructions()

  return (
    <motion.div
      className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CompassRose className="w-14 h-14 text-teal/30 mb-8" />

      <h1
        className="font-display text-navy font-semibold leading-tight mb-4"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        Custom AI Instructions
      </h1>

      <p className="font-body text-muted text-base sm:text-lg leading-relaxed max-w-lg mb-4">
        Answer a few questions about how you work and communicate.
        RUMO generates custom instructions for every AI platform you use.
      </p>

      <p className="font-body text-navy/30 text-sm mb-10">
        Free. Takes about 10 minutes.
      </p>

      <button
        onClick={nextStep}
        className="font-body font-bold text-sm px-8 py-4 rounded-lg uppercase
                   bg-teal text-white
                   hover:bg-teal-light hover:shadow-lg hover:shadow-teal/20
                   hover:-translate-y-0.5 active:translate-y-0
                   transition-all duration-300"
      >
        GET STARTED
      </button>
    </motion.div>
  )
}

export function InstructionsWizard() {
  const { state, hasSavedProgress, resumeProgress, clearSavedProgress } = useInstructions()
  const [showResumeBanner, setShowResumeBanner] = useState(true)

  const renderStep = () => {
    if (state.currentStep === 0) return <IntroStep />
    if (state.currentStep === 1) return <ModelSelectionStep />
    if (state.currentStep === 2) return <FoundationStep />
    if (state.isComplete) return <ResultsStep />
    if (state.isGenerating || state.generationPhase !== 'idle') return <GeneratingStep />
    if (state.currentStep >= 3) return <QuestionStep />
    return <IntroStep />
  }

  const getStepKey = () => {
    if (state.currentStep === 0) return 'intro'
    if (state.currentStep === 1) return 'model-selection'
    if (state.currentStep === 2) return 'foundation'
    if (state.isComplete) return 'results'
    if (state.isGenerating || state.generationPhase !== 'idle') return 'generating'
    return `question-${state.currentStep}`
  }

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden">
      {/* Resume banner */}
      {state.currentStep === 0 && hasSavedProgress && showResumeBanner && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-teal"
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <p className="text-sm text-white font-body">You have saved progress. Pick up where you left off?</p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => resumeProgress()}
                className="px-4 py-1.5 text-sm font-medium rounded-lg bg-white text-teal hover:opacity-90 transition-opacity"
              >
                RESUME
              </button>
              <button
                onClick={() => { clearSavedProgress(); setShowResumeBanner(false) }}
                className="text-sm text-white opacity-60 hover:opacity-100 transition-opacity"
              >
                Start Fresh
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main content — fixed frame prevents vertical jumping between steps */}
      <main className="relative z-10 min-h-[70vh] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={getStepKey()}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onAnimationStart={() => {
              // Scroll to wizard content area (below navy header) on step change
              const el = document.getElementById('wizard-content')
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
