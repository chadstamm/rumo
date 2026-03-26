export type InputType = 'textarea' | 'select' | 'multiselect' | 'file' | 'phrase-list'

export type Section = 0 | 1 | 2 | 3 | 4 | 5 | 6

export const SECTION_NAMES: Record<Section, string> = {
  0: 'Getting Started',
  1: 'Identity',
  2: 'Voice',
  3: 'Stories',
  4: 'Timeline',
  5: 'Roster',
  6: 'Situation',
}

export const SECTION_SUBTITLES: Record<Section, string> = {
  0: 'The basics — who you are and what drives you',
  1: 'Your values, beliefs, and the person you\'re becoming',
  2: 'How you write, what makes it yours, and what to never do',
  3: 'The moments that shaped you and the language you carry',
  4: 'The arc of your life — milestones, chapters, and where you\'re headed',
  5: 'The people who matter — relationships, roles, and how you connect',
  6: 'Where you are right now — your season, your constraints, your priorities',
}

export interface WizardQuestion {
  id: string
  section: Section
  question: string
  subtext?: string
  considerations?: string[]
  inputType: InputType
  placeholder?: string
  options?: string[]
  required?: boolean
  /** For file upload steps — what types to accept */
  acceptTypes?: string
  /** If true, this is a writing sample upload */
  isWritingSample?: boolean
  /** Show this question only when a previous answer includes certain values */
  showWhen?: {
    questionId: string
    includesAny: string[]
  }
}

export interface WizardAnswers {
  [questionId: string]: string | string[]
}

export interface WizardState {
  currentSection: Section
  currentStep: number
  answers: WizardAnswers
  completedSections: Section[]
  startedAt: string
  updatedAt: string
}

export const INITIAL_WIZARD_STATE: WizardState = {
  currentSection: 0,
  currentStep: 0,
  answers: {},
  completedSections: [],
  startedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}
