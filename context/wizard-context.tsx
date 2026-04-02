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

type GenerationPhase = 'idle' | 'analyzing' | 'generating' | 'streaming' | 'complete' | 'error'

type WizardAction =
  | { type: 'SET_ANSWER'; questionId: string; value: string | string[] }
  | { type: 'NEXT_STEP'; activeSections: Section[] }
  | { type: 'PREV_STEP'; activeSections: Section[] }
  | { type: 'GO_TO_SECTION'; section: Section }
  | { type: 'COMPLETE_SECTION'; section: Section }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; state: WizardState }
  | { type: 'SET_GENERATION_PHASE'; phase: GenerationPhase }
  | { type: 'APPEND_STREAMED_TEXT'; text: string }
  | { type: 'SET_GENERATED_TEXT'; text: string }
  | { type: 'SET_GENERATION_ERROR'; error: string }

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

    case 'SET_GENERATION_PHASE':
      return {
        ...state,
        generationPhase: action.phase,
        generationError: action.phase === 'error' ? state.generationError : null,
        streamedText: action.phase === 'generating' ? '' : state.streamedText,
        updatedAt: now,
      }

    case 'APPEND_STREAMED_TEXT':
      return {
        ...state,
        streamedText: state.streamedText + action.text,
        updatedAt: now,
      }

    case 'SET_GENERATED_TEXT':
      return {
        ...state,
        streamedText: action.text,
        generationPhase: 'complete',
        updatedAt: now,
      }

    case 'SET_GENERATION_ERROR':
      return {
        ...state,
        generationPhase: 'error',
        generationError: action.error,
        updatedAt: now,
      }

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
  generateDocument: (anchorSlug: string, anchorTitle: string) => Promise<void>
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
    () => filterSections ?? ([0, 1, 6, 2, 3, 4, 5] as Section[]),
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

  // Persist to localStorage — keep completed generation, exclude in-progress state
  useEffect(() => {
    try {
      const { generationError, analyzedInsights, ...persistState } = state
      // Only persist generation output if complete (avoid saving partial streams)
      if (state.generationPhase !== 'complete') {
        const { generationPhase, streamedText, ...cleanState } = persistState
        localStorage.setItem(fullStorageKey, JSON.stringify(cleanState))
      } else {
        localStorage.setItem(fullStorageKey, JSON.stringify(persistState))
      }
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
  // Complete if all sections are done — regardless of cursor position (handles page revisit)
  const allSectionsComplete = activeSections.every(s => state.completedSections.includes(s))
  const isComplete =
    allSectionsComplete ||
    (isLastSection &&
    isLastQuestionInSection &&
    state.completedSections.includes(activeSections[activeSections.length - 1]))

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

  const generateDocument = useCallback(async (anchorSlug: string, anchorTitle: string) => {
    try {
      // Phase 1: Analyze answers with Sonnet
      dispatch({ type: 'SET_GENERATION_PHASE', phase: 'analyzing' })

      const answeredQuestions = Object.entries(state.answers).filter(
        ([, v]) => v && (typeof v === 'string' ? v.trim() : (v as string[]).length > 0)
      )

      // Fire off analysis for each answer in parallel
      const insightResults = await Promise.allSettled(
        answeredQuestions.map(async ([questionId, answer]) => {
          const answerText = Array.isArray(answer) ? answer.join(', ') : answer
          const res = await fetch('/api/analyze-answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: questionId, answer: answerText }),
          })
          if (!res.ok) return { questionId, insight: null }
          const data = await res.json()
          return { questionId, insight: data.insight as string | null }
        })
      )

      const insights: Record<string, string> = {}
      for (const result of insightResults) {
        if (result.status === 'fulfilled' && result.value.insight) {
          insights[result.value.questionId] = result.value.insight
        }
      }

      // Phase 2: Generate document with Opus
      dispatch({ type: 'SET_GENERATION_PHASE', phase: 'generating' })

      const response = await fetch('/api/generate-anchor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          anchorSlug,
          anchorTitle,
          answers: state.answers,
          analyzedInsights: insights,
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Generation failed' }))
        throw new Error(err.error || 'Generation failed')
      }

      // Phase 3: Stream the response
      dispatch({ type: 'SET_GENERATION_PHASE', phase: 'streaming' })

      const reader = response.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let flushScheduled = false

      const flushBuffer = () => {
        if (buffer) {
          dispatch({ type: 'APPEND_STREAMED_TEXT', text: buffer })
          buffer = ''
        }
        flushScheduled = false
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        buffer += chunk

        if (!flushScheduled) {
          flushScheduled = true
          setTimeout(flushBuffer, 80)
        }
      }

      // Flush remaining
      if (buffer) {
        dispatch({ type: 'APPEND_STREAMED_TEXT', text: buffer })
      }

      dispatch({ type: 'SET_GENERATION_PHASE', phase: 'complete' })
    } catch (error) {
      console.error('Document generation error:', error)
      dispatch({
        type: 'SET_GENERATION_ERROR',
        error: error instanceof Error ? error.message : 'Generation failed',
      })
    }
  }, [state.answers])

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
        generateDocument,
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
