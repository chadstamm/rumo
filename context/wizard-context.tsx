'use client'

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import type { Section, WizardState } from '@/types/wizard'
import { INITIAL_WIZARD_STATE } from '@/types/wizard'
import { getQuestionsForSection, getVisibleQuestions } from '@/data/questions'

const STORAGE_KEY_PREFIX = 'rumo-wizard'

// ── Actions ──

type WizardAction =
  | { type: 'SET_ANSWER'; questionId: string; value: string | string[] }
  | { type: 'NEXT_STEP'; activeSections: Section[] }
  | { type: 'PREV_STEP'; activeSections: Section[] }
  | { type: 'GO_TO_SECTION'; section: Section }
  | { type: 'COMPLETE_SECTION'; section: Section }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; state: WizardState }

// ── Reducer ──

function getNextSection(current: Section, activeSections: Section[]): Section | null {
  const idx = activeSections.indexOf(current)
  if (idx < 0 || idx >= activeSections.length - 1) return null
  return activeSections[idx + 1]
}

function getPrevSection(current: Section, activeSections: Section[]): Section | null {
  const idx = activeSections.indexOf(current)
  if (idx <= 0) return null
  return activeSections[idx - 1]
}

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

      // Section complete — find next active section
      const nextSection = getNextSection(state.currentSection, action.activeSections)
      const completed = state.completedSections.includes(state.currentSection)
        ? state.completedSections
        : [...state.completedSections, state.currentSection]

      if (nextSection !== null) {
        return {
          ...state,
          currentSection: nextSection,
          currentStep: 0,
          completedSections: completed,
          updatedAt: now,
        }
      }

      // All sections complete
      return { ...state, completedSections: completed, updatedAt: now }
    }

    case 'PREV_STEP': {
      if (state.currentStep > 0) {
        return { ...state, currentStep: state.currentStep - 1, updatedAt: now }
      }
      const prevSection = getPrevSection(state.currentSection, action.activeSections)
      if (prevSection !== null) {
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
      return { ...state, currentSection: action.section, currentStep: 0, updatedAt: now }

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
  activeSections: Section[]
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

interface WizardProviderProps {
  children: ReactNode
  /** Filter to specific sections (for standalone anchor builders). Defaults to all [0,1,2,3,4,5]. */
  filterSections?: Section[]
  /** Storage key suffix for isolated persistence per document */
  storageKey?: string
}

export function WizardProvider({
  children,
  filterSections,
  storageKey,
}: WizardProviderProps) {
  const activeSections = useMemo(
    () => filterSections ?? ([0, 1, 2, 3, 4, 5] as Section[]),
    [filterSections]
  )

  const fullStorageKey = storageKey
    ? `${STORAGE_KEY_PREFIX}-${storageKey}`
    : `${STORAGE_KEY_PREFIX}-full`

  const initialState: WizardState = {
    ...INITIAL_WIZARD_STATE,
    currentSection: activeSections[0],
  }

  const [state, dispatch] = useReducer(wizardReducer, initialState)

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(fullStorageKey)
      if (saved) {
        const parsed = JSON.parse(saved) as WizardState
        // Verify the saved section is still valid for this wizard
        if (activeSections.includes(parsed.currentSection)) {
          dispatch({ type: 'HYDRATE', state: parsed })
        }
      }
    } catch {
      // Start fresh
    }
  }, [fullStorageKey, activeSections])

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(fullStorageKey, JSON.stringify(state))
    } catch {
      // Storage full
    }
  }, [state, fullStorageKey])

  // Derived values
  const sectionQuestions = getQuestionsForSection(state.currentSection)
  const visibleQuestions = getVisibleQuestions(sectionQuestions, state.answers)
  const currentQuestion = visibleQuestions[state.currentStep] ?? null

  const totalAnswered = Object.keys(state.answers).length
  const totalQuestions = activeSections.reduce<number>(
    (sum, s) => sum + getQuestionsForSection(s).length,
    0
  )

  const isFirstQuestion =
    state.currentSection === activeSections[0] && state.currentStep === 0
  const isLastQuestionInSection = state.currentStep === visibleQuestions.length - 1
  const isLastSection =
    state.currentSection === activeSections[activeSections.length - 1]
  const isComplete =
    isLastSection &&
    isLastQuestionInSection &&
    state.completedSections.includes(activeSections[activeSections.length - 1])

  const setAnswer = useCallback(
    (questionId: string, value: string | string[]) => {
      dispatch({ type: 'SET_ANSWER', questionId, value })
    },
    []
  )

  const nextStep = useCallback(
    () => dispatch({ type: 'NEXT_STEP', activeSections }),
    [activeSections]
  )
  const prevStep = useCallback(
    () => dispatch({ type: 'PREV_STEP', activeSections }),
    [activeSections]
  )
  const goToSection = useCallback(
    (section: Section) => dispatch({ type: 'GO_TO_SECTION', section }),
    []
  )
  const reset = useCallback(() => {
    localStorage.removeItem(fullStorageKey)
    dispatch({ type: 'RESET' })
  }, [fullStorageKey])

  return (
    <WizardContext.Provider
      value={{
        state,
        activeSections,
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
