import { FULL_BUILD_SECTIONS, type DocumentConfig } from '@/data/documents'

// Synthesized config for the full all-in-one Chart Your Course wizard.
// storageKey 'chart-your-course' isolates state from the per-anchor wizards
// so a user mid-build on Constitution doesn't collide with the full journey.
export const FULL_BUILD_CONFIG: DocumentConfig = {
  slug: 'chart-your-course',
  title: 'Chart Your Course',
  subtitle: 'The full journey — all six anchors',
  description:
    'Build all six context anchors in one session — identity, voice, stories, situation, timeline, and roster.',
  sections: FULL_BUILD_SECTIONS,
  accent: 'ochre',
}
