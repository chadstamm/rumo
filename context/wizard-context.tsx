'use client'

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import type { Section, WizardState, WizardAnswers } from '@/types/wizard'
import { INITIAL_WIZARD_STATE } from '@/types/wizard'
import { getQuestionsForSection, getVisibleQuestions } from '@/data/questions'

const STORAGE_KEY = 'rumo-wizard-state'

// ── Actions ──

type WizardAction =
  | { type: 'SET_ANSWER'; questionId: string; value: string | string[] }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_SECTION'; section: Section }
  | { type: 'COMPLETE_SECTION'; section: Section }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; state: WizardState }

// ── Reducer ──

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  const now = new Date().toISOString()

  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
        updatedAt: now,
      }

    case 'NEXT_STEP': {
      const sectionQuestions = getVisibleQuestions(
        getQuestionsForSection(state.currentSection),
        state.answers
      )
      const nextStep = state.currentStep + 1

      if (nextStep < sectionQuestions.length) {
        return { ...state, currentStep: nextStep, updatedAt: now }
      }

      // Section complete — move to next section or stay
      const nextSection = (state.currentSection + 1) as Section
      if (nextSection <= 3) {
        const completed = state.completedSections.includes(state.currentSection)
          ? state.completedSections
          : [...state.completedSections, state.currentSection]
        return {
          ...state,
          currentSection: nextSection,
          currentStep: 0,
          completedSections: completed,
          updatedAt: now,
        }
      }

      // All sections complete
      return {
        ...state,
        completedSections: state.completedSections.includes(state.currentSection)
          ? state.completedSections
          : [...state.completedSections, state.currentSection],
        updatedAt: now,
      }
    }

    case 'PREV_STEP': {
      if (state.currentStep > 0) {
        return { ...state, currentStep: state.currentStep - 1, updatedAt: now }
      }
      // Go to previous section's last step
      if (state.currentSection > 0) {
        const prevSection = (state.currentSection - 1) as Section
        const prevQuestions = getVisibleQuestions(
          getQuestionsForSection(prevSection),
          state.answers
        )
        return {
          ...state,
          currentSection: prevSection,
          currentStep: Math.max(0, prevQuestions.length - 1),
          updatedAt: now,
        }
      }
      return state
    }

    case 'GO_TO_SECTION':
      return {
        ...state,
        currentSection: action.section,
        currentStep: 0,
        updatedAt: now,
      }

    case 'COMPLETE_SECTION':
      return {
        ...state,
        completedSections: state.completedSections.includes(action.section)
          ? state.completedSections
          : [...state.completedSections, action.section],
        updatedAt: now,
      }

    case 'RESET':
      return { ...INITIAL_WIZARD_STATE, startedAt: now, updatedAt: now }

    case 'HYDRATE':
      return action.state

    default:
      return state
  }
}

// ── Context ──

interface WizardContextValue {
  state: WizardState
  currentQuestion: ReturnType<typeof getQuestionsForSection>[number] | null
  visibleQuestions: ReturnType<typeof getQuestionsForSection>
  totalQuestionsInSection: number
  totalAnswered: number
  totalQuestions: number
  isFirstQuestion: boolean
  isLastQuestionInSection: boolean
  isLastSection: boolean
  isComplete: boolean
  setAnswer: (questionId: string, value: string | string[]) => void
  nextStep: () => void
  prevStep: () => void
  goToSection: (section: Section) => void
  reset: () => void
}

const WizardContext = createContext<WizardContextValue | null>(null)

// ── Provider ──

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, INITIAL_WIZARD_STATE)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as WizardState
        dispatch({ type: 'HYDRATE', state: parsed })
      }
    } catch {
      // Corrupted storage — start fresh
    }
  }, [])

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Storage full or unavailable
    }
  }, [state])

  // Derived values
  const sectionQuestions = getQuestionsForSection(state.currentSection)
  const visibleQuestions = getVisibleQuestions(sectionQuestions, state.answers)
  const currentQuestion = visibleQuestions[state.currentStep] ?? null

  const totalAnswered = Object.keys(state.answers).length
  const totalQuestions = [0, 1, 2, 3].reduce(
    (sum, s) => sum + getQuestionsForSection(s as Section).length,
    0
  )

  const isFirstQuestion = state.currentSection === 0 && state.currentStep === 0
  const isLastQuestionInSection = state.currentStep === visibleQuestions.length - 1
  const isLastSection = state.currentSection === 3
  const isComplete = isLastSection && isLastQuestionInSection && state.completedSections.includes(3)

  const setAnswer = useCallback(
    (questionId: string, value: string | string[]) => {
      dispatch({ type: 'SET_ANSWER', questionId, value })
    },
    []
  )

  const nextStep = useCallback(() => dispatch({ type: 'NEXT_STEP' }), [])
  const prevStep = useCallback(() => dispatch({ type: 'PREV_STEP' }), [])
  const goToSection = useCallback(
    (section: Section) => dispatch({ type: 'GO_TO_SECTION', section }),
    []
  )
  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    dispatch({ type: 'RESET' })
  }, [])

  return (
    <WizardContext.Provider
      value={{
        state,
        currentQuestion,
        visibleQuestions,
        totalQuestionsInSection: visibleQuestions.length,
        totalAnswered,
        totalQuestions,
        isFirstQuestion,
        isLastQuestionInSection,
        isLastSection,
        isComplete,
        setAnswer,
        nextStep,
        prevStep,
        goToSection,
        reset,
      }}
    >
      {children}
    </WizardContext.Provider>
  )
}

export function useWizard() {
  const ctx = useContext(WizardContext)
  if (!ctx) throw new Error('useWizard must be used within WizardProvider')
  return ctx
}
