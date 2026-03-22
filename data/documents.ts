import type { Section } from '@/types/wizard'

export interface DocumentConfig {
  slug: string
  title: string
  subtitle: string
  description: string
  /** Which question sections to include in this document's standalone wizard */
  sections: Section[]
  /** Color accent for the page (all use teal CTA, this is for subtle theming) */
  accent: 'teal' | 'ochre'
}

export const DOCUMENTS: DocumentConfig[] = [
  {
    slug: 'constitution',
    title: 'Personal Constitution',
    subtitle: 'Who you are always',
    description:
      'Your values, beliefs, non-negotiables, and aspirations. The foundation document that tells AI — and yourself — what you stand for.',
    sections: [0, 1],
    accent: 'teal',
  },
  {
    slug: 'sotu',
    title: 'State of the Union',
    subtitle: 'Where you are right now',
    description:
      'Your current situation, active challenges, and immediate priorities. A living document that evolves as your life does.',
    sections: [0, 1],
    accent: 'ochre',
  },
  {
    slug: 'codex',
    title: 'Writing Codex',
    subtitle: 'How you write',
    description:
      'Your sentence rhythms, humor, metaphors, openings, and the words you never use. A complete voice profile built from your own patterns.',
    sections: [0, 2],
    accent: 'teal',
  },
  {
    slug: 'story-bank',
    title: 'Story Bank',
    subtitle: 'What you\'ve lived',
    description:
      'The moments that shaped you — smells, failures, crossroads, places that felt like home. Raw material that makes AI output feel lived-in.',
    sections: [0, 3],
    accent: 'ochre',
  },
]

export function getDocumentBySlug(slug: string): DocumentConfig | undefined {
  return DOCUMENTS.find((d) => d.slug === slug)
}
