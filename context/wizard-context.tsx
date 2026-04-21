'use client'

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import type { Section, WizardState } from '@/types/wizard'
import { INITIAL_WIZARD_STATE } from '@/types/wizard'
import { getQuestionsForSection, getVisibleQuestions, QUESTIONS } from '@/data/questions'
import { saveToVault, getFromVault } from '@/lib/vault-storage'
import { createClient as createSupabaseClient } from '@/lib/supabase/client'
import { useAuth } from '@/components/auth-provider'

/** Anchors built by the full Chart Your Course flow, in build order. */
const FULL_BUILD_ANCHORS: Array<{ slug: string; title: string; sections: Section[] }> = [
  { slug: 'constitution', title: 'Personal Constitution', sections: [0, 1] },
  { slug: 'codex', title: 'Writing Codex', sections: [0, 2] },
  { slug: 'story-bank', title: 'Story Bank', sections: [0, 3] },
  { slug: 'sotu', title: 'State of the Union', sections: [0, 6] },
  { slug: 'timeline', title: 'Timeline', sections: [0, 4] },
  { slug: 'roster', title: 'Influence Roster', sections: [0, 5] },
]

export const FULL_BUILD_ANCHOR_SLUGS = FULL_BUILD_ANCHORS.map((a) => a.slug)

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
  | { type: 'SET_ANCHOR_PHASE'; slug: string; phase: GenerationPhase; answeredCount?: number }
  | { type: 'APPEND_ANCHOR_TEXT'; slug: string; text: string }
  | { type: 'SET_ANCHOR_ERROR'; slug: string; error: string }
  | { type: 'SET_CURRENT_GENERATING'; slug: string | null }
  | { type: 'RESET_FULL_BUILD' }
  | { type: 'HYDRATE_ANCHOR_FROM_VAULT'; slug: string; content: string; answeredCount: number }

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
      return { ...INITIAL_WIZARD_STATE, ...action.state }

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

    case 'SET_ANCHOR_PHASE': {
      const existing = state.anchorGenerations[action.slug] ?? {
        phase: 'idle' as GenerationPhase,
        content: '',
        error: null,
        answeredCount: 0,
      }
      return {
        ...state,
        anchorGenerations: {
          ...state.anchorGenerations,
          [action.slug]: {
            ...existing,
            phase: action.phase,
            error: action.phase === 'error' ? existing.error : null,
            content: action.phase === 'generating' ? '' : existing.content,
            answeredCount: action.answeredCount ?? existing.answeredCount,
          },
        },
        updatedAt: now,
      }
    }

    case 'APPEND_ANCHOR_TEXT': {
      const existing = state.anchorGenerations[action.slug] ?? {
        phase: 'streaming' as GenerationPhase,
        content: '',
        error: null,
        answeredCount: 0,
      }
      return {
        ...state,
        anchorGenerations: {
          ...state.anchorGenerations,
          [action.slug]: {
            ...existing,
            content: existing.content + action.text,
          },
        },
        updatedAt: now,
      }
    }

    case 'SET_ANCHOR_ERROR': {
      const existing = state.anchorGenerations[action.slug] ?? {
        phase: 'error' as GenerationPhase,
        content: '',
        error: null,
        answeredCount: 0,
      }
      return {
        ...state,
        anchorGenerations: {
          ...state.anchorGenerations,
          [action.slug]: {
            ...existing,
            phase: 'error',
            error: action.error,
          },
        },
        updatedAt: now,
      }
    }

    case 'SET_CURRENT_GENERATING':
      return { ...state, currentGeneratingSlug: action.slug, updatedAt: now }

    case 'RESET_FULL_BUILD':
      return {
        ...state,
        anchorGenerations: {},
        currentGeneratingSlug: null,
        updatedAt: now,
      }

    case 'HYDRATE_ANCHOR_FROM_VAULT':
      return {
        ...state,
        anchorGenerations: {
          ...state.anchorGenerations,
          [action.slug]: {
            phase: 'complete',
            content: action.content,
            error: null,
            answeredCount: action.answeredCount,
          },
        },
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
  /** Sequential generation of all 6 anchors for the Chart Your Course flow. */
  generateAllAnchors: () => Promise<void>
  /** Reset only the full-build generation state (preserves answers). */
  resetFullBuild: () => void
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

  // ── Persistence: Supabase for authenticated users, localStorage fallback ──
  //
  // When a user is signed in, the wizard state is the source of truth in
  // `wizard_state` (keyed on user_id + anchor_slug) so progress follows them
  // across devices and survives a crashed tab. When they're not signed in
  // (or auth is still loading), we fall back to localStorage. The fallback
  // path also covers unauthenticated local testing before Stripe lands.
  const { user, loading: authLoading } = useAuth()
  const useSupabase = !authLoading && !!user
  const anchorSlug = storageKey ?? 'full'
  const hasHydratedRef = useRef(false)

  // Hydrate — runs on mount and whenever auth state resolves / changes.
  useEffect(() => {
    if (authLoading) return
    let cancelled = false

    const hydrate = async () => {
      if (user) {
        try {
          const supabase = createSupabaseClient()
          const { data, error } = await supabase
            .from('wizard_state')
            .select('current_section, current_step, answers, analyzed_insights, completed_sections, created_at, updated_at')
            .eq('user_id', user.id)
            .eq('anchor_slug', anchorSlug)
            .maybeSingle()

          if (cancelled) return
          if (error) {
            console.warn('wizard_state hydrate failed, falling back to localStorage:', error.message)
          } else if (data) {
            const loadedSection = (data.current_section ?? activeSections[0]) as Section
            if (activeSections.includes(loadedSection)) {
              dispatch({
                type: 'HYDRATE',
                state: {
                  ...INITIAL_WIZARD_STATE,
                  currentSection: loadedSection,
                  currentStep: data.current_step ?? 0,
                  answers: (data.answers as WizardState['answers']) ?? {},
                  analyzedInsights: (data.analyzed_insights as WizardState['analyzedInsights']) ?? {},
                  completedSections: ((data.completed_sections as Section[]) ?? []),
                  startedAt: data.created_at ?? new Date().toISOString(),
                  updatedAt: data.updated_at ?? new Date().toISOString(),
                },
              })
              hasHydratedRef.current = true
              return
            }
          }
        } catch (e) {
          console.warn('wizard_state hydrate threw, falling back to localStorage:', e)
        }
      }

      // localStorage fallback (unauthenticated OR Supabase failed / empty)
      try {
        const saved = localStorage.getItem(fullStorageKey)
        if (saved && !cancelled) {
          const parsed = JSON.parse(saved) as WizardState
          if (activeSections.includes(parsed.currentSection)) {
            dispatch({ type: 'HYDRATE', state: parsed })
          }
        }
      } catch {
        // Start fresh
      } finally {
        hasHydratedRef.current = true
      }
    }

    hydrate()
    return () => {
      cancelled = true
    }
  }, [authLoading, user?.id, anchorSlug, fullStorageKey, activeSections])

  // Persist — Supabase (debounced) for signed-in users, localStorage otherwise.
  // anchorGenerations and currentGeneratingSlug are transient UI state (completed
  // docs live in vault storage). Streaming partials would bloat storage per chunk.
  useEffect(() => {
    // Don't write until hydration has run, otherwise we can clobber saved state
    // with INITIAL_WIZARD_STATE on mount.
    if (!hasHydratedRef.current) return

    const {
      generationError,
      analyzedInsights,
      anchorGenerations: _anchorGenerations,
      currentGeneratingSlug: _currentGeneratingSlug,
      ...persistState
    } = state
    void _anchorGenerations
    void _currentGeneratingSlug

    const shouldStripStream = state.generationPhase !== 'complete'
    const cleanState = shouldStripStream
      ? (() => {
          const { generationPhase, streamedText, ...rest } = persistState
          return rest
        })()
      : persistState

    if (useSupabase && user) {
      // Debounce Supabase writes: batch rapid state changes into one upsert.
      const timer = setTimeout(async () => {
        try {
          const supabase = createSupabaseClient()
          const isDone = activeSections.every((s) => state.completedSections.includes(s))
          await supabase.from('wizard_state').upsert(
            {
              user_id: user.id,
              anchor_slug: anchorSlug,
              current_section: state.currentSection,
              current_step: state.currentStep,
              answers: state.answers,
              analyzed_insights: state.analyzedInsights,
              completed_sections: state.completedSections,
              completed: isDone,
            },
            { onConflict: 'user_id,anchor_slug' }
          )
        } catch (e) {
          // Swallow — next state change will retry. Keep localStorage as a
          // best-effort mirror so we don't lose work on persistent network issues.
          console.warn('wizard_state upsert failed:', e)
          try {
            localStorage.setItem(fullStorageKey, JSON.stringify(cleanState))
          } catch {
            // Storage full
          }
        }
      }, 1000)

      return () => clearTimeout(timer)
    }

    // Unauthenticated path: localStorage write immediately.
    try {
      localStorage.setItem(fullStorageKey, JSON.stringify(cleanState))
    } catch {
      // Storage full
    }
  }, [state, fullStorageKey, useSupabase, user?.id, anchorSlug, activeSections])

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
  // Also catch: user has answers but cursor is past end of questions (old localStorage state)
  const cursorPastEnd = currentQuestion === null && totalAnswered > 0
  const isComplete =
    allSectionsComplete ||
    cursorPastEnd ||
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

  // ── Full-build (Chart Your Course): generate all 6 anchors sequentially ──
  // Use a ref to track in-flight state so a re-render mid-loop doesn't cause re-entry.
  const fullBuildInFlight = useRef(false)

  const generateAllAnchors = useCallback(async () => {
    if (fullBuildInFlight.current) return
    fullBuildInFlight.current = true

    try {
      for (const anchor of FULL_BUILD_ANCHORS) {
        // Skip anchors already saved to vault (e.g. page reloaded mid-build, or retry after partial failure)
        const existing = await getFromVault(anchor.slug)
        if (existing && existing.content) {
          dispatch({
            type: 'HYDRATE_ANCHOR_FROM_VAULT',
            slug: anchor.slug,
            content: existing.content,
            answeredCount: existing.answeredCount,
          })
          continue
        }

        // Filter answers to this anchor's sections (intake + the anchor's own section)
        const relevantQuestionIds = new Set(
          QUESTIONS.filter((q) => anchor.sections.includes(q.section)).map((q) => q.id)
        )
        const relevantAnswers: Record<string, string | string[]> = {}
        for (const [id, value] of Object.entries(state.answers)) {
          if (relevantQuestionIds.has(id)) relevantAnswers[id] = value
        }

        const answeredEntries = Object.entries(relevantAnswers).filter(
          ([, v]) => v && (typeof v === 'string' ? v.trim() : (v as string[]).length > 0)
        )

        // Skip empty anchors — record an error rather than burning an API call
        if (answeredEntries.length === 0) {
          dispatch({ type: 'SET_CURRENT_GENERATING', slug: anchor.slug })
          dispatch({
            type: 'SET_ANCHOR_PHASE',
            slug: anchor.slug,
            phase: 'error',
            answeredCount: 0,
          })
          dispatch({
            type: 'SET_ANCHOR_ERROR',
            slug: anchor.slug,
            error: 'No answers in the relevant sections to generate from.',
          })
          continue
        }

        dispatch({ type: 'SET_CURRENT_GENERATING', slug: anchor.slug })
        dispatch({
          type: 'SET_ANCHOR_PHASE',
          slug: anchor.slug,
          phase: 'analyzing',
          answeredCount: answeredEntries.length,
        })

        try {
          // Phase 1: Analyze answers in parallel
          const insightResults = await Promise.allSettled(
            answeredEntries.map(async ([questionId, answer]) => {
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

          // Phase 2: Generate
          dispatch({ type: 'SET_ANCHOR_PHASE', slug: anchor.slug, phase: 'generating' })

          const response = await fetch('/api/generate-anchor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              anchorSlug: anchor.slug,
              anchorTitle: anchor.title,
              answers: relevantAnswers,
              analyzedInsights: insights,
            }),
          })

          if (!response.ok) {
            const err = await response
              .json()
              .catch(() => ({ error: `Generation failed (${response.status})` }))
            dispatch({
              type: 'SET_ANCHOR_ERROR',
              slug: anchor.slug,
              error: err.error || 'Generation failed',
            })
            continue
          }

          // Phase 3: Stream
          dispatch({ type: 'SET_ANCHOR_PHASE', slug: anchor.slug, phase: 'streaming' })

          const reader = response.body!.getReader()
          const decoder = new TextDecoder()
          let fullText = ''
          let buffer = ''
          let flushScheduled = false

          const flushBuffer = () => {
            if (buffer) {
              dispatch({ type: 'APPEND_ANCHOR_TEXT', slug: anchor.slug, text: buffer })
              buffer = ''
            }
            flushScheduled = false
          }

          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            const chunk = decoder.decode(value, { stream: true })
            fullText += chunk
            buffer += chunk
            if (!flushScheduled) {
              flushScheduled = true
              setTimeout(flushBuffer, 80)
            }
          }
          if (buffer) {
            dispatch({ type: 'APPEND_ANCHOR_TEXT', slug: anchor.slug, text: buffer })
          }

          // Save the completed document to the per-anchor vault slot
          try {
            await saveToVault({
              content: fullText,
              anchorSlug: anchor.slug,
              anchorTitle: anchor.title,
              generatedAt: new Date().toISOString(),
              answeredCount: answeredEntries.length,
            })
          } catch (e) {
            console.warn(`Save to vault failed for ${anchor.slug}:`, e)
          }

          dispatch({ type: 'SET_ANCHOR_PHASE', slug: anchor.slug, phase: 'complete' })
        } catch (error) {
          console.error(`Anchor generation error (${anchor.slug}):`, error)
          dispatch({
            type: 'SET_ANCHOR_ERROR',
            slug: anchor.slug,
            error: error instanceof Error ? error.message : 'Generation failed',
          })
        }
      }
    } finally {
      dispatch({ type: 'SET_CURRENT_GENERATING', slug: null })
      fullBuildInFlight.current = false
    }
  }, [state.answers])

  const resetFullBuild = useCallback(() => {
    dispatch({ type: 'RESET_FULL_BUILD' })
  }, [])

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
        generateAllAnchors,
        resetFullBuild,
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
