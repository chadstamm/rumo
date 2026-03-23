import { AIModelId, GenerationResult } from './models'

export interface InstructionAnswer {
  questionId: string
  question: string
  answer: string
  timestamp: number
}

export interface AnalyzedInsight {
  questionId: string
  insight: string
  status: 'pending' | 'analyzing' | 'complete' | 'error'
}

export type GenerationPhase = 'idle' | 'waiting-for-insights' | 'generating' | 'streaming'

export interface InstructionsState {
  currentStep: number
  selectedModels: AIModelId[]
  writingCodex: string | null
  personalConstitution: string | null
  storyBank: string | null
  answers: InstructionAnswer[]
  analyzedInsights: AnalyzedInsight[]
  isComplete: boolean
  isGenerating: boolean
  generationPhase: GenerationPhase
  generationResult: GenerationResult | null
  streamedText: string | null
  error: string | null
}

export interface AIGeneratedQuestion {
  question: string
  subtext?: string
  inputType: 'textarea' | 'text' | 'multiselect'
  options?: string[]
  isComplete: boolean
}
