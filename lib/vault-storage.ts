/**
 * Vault Storage — localStorage-based document persistence per anchor.
 * Supabase replaces this for authenticated (paid) users later.
 */

const VAULT_PREFIX = 'rumo-vault'

export interface VaultDocument {
  content: string
  anchorSlug: string
  anchorTitle: string
  generatedAt: string
  answeredCount: number
  version: number
}

export function saveToVault(doc: Omit<VaultDocument, 'version'>): void {
  const key = `${VAULT_PREFIX}-${doc.anchorSlug}`
  const existing = getFromVault(doc.anchorSlug)
  const version = existing ? existing.version + 1 : 1

  const entry: VaultDocument = { ...doc, version }
  localStorage.setItem(key, JSON.stringify(entry))
}

export function getFromVault(anchorSlug: string): VaultDocument | null {
  if (typeof window === 'undefined') return null
  const key = `${VAULT_PREFIX}-${anchorSlug}`
  const raw = localStorage.getItem(key)
  if (!raw) return null
  try {
    return JSON.parse(raw) as VaultDocument
  } catch {
    return null
  }
}

export function getAllVaultDocuments(): Record<string, VaultDocument | null> {
  const slugs = ['constitution', 'codex', 'story-bank', 'sotu', 'timeline', 'roster'] as const
  const result: Record<string, VaultDocument | null> = {}
  for (const slug of slugs) {
    result[slug] = getFromVault(slug)
  }
  return result
}

export function removeFromVault(anchorSlug: string): void {
  const key = `${VAULT_PREFIX}-${anchorSlug}`
  localStorage.removeItem(key)
}

export const ANCHOR_META: Record<string, { title: string; subtitle: string; icon: string; free: boolean }> = {
  constitution: {
    title: 'Personal Constitution',
    subtitle: 'Who you are and what you stand for',
    icon: '/icons/constitution.png',
    free: true,
  },
  codex: {
    title: 'Writing Codex',
    subtitle: 'How you write and what makes it yours',
    icon: '/icons/codex.png',
    free: false,
  },
  'story-bank': {
    title: 'Story Bank',
    subtitle: 'The moments that shaped you',
    icon: '/icons/story-bank.png',
    free: false,
  },
  sotu: {
    title: 'State of the Union',
    subtitle: 'Where you are right now',
    icon: '/icons/sotu.png',
    free: false,
  },
  timeline: {
    title: 'Timeline',
    subtitle: 'How your life has unfolded',
    icon: '/icons/timeline.png',
    free: false,
  },
  roster: {
    title: 'Influence Roster',
    subtitle: 'The people who shape your decisions',
    icon: '/icons/roster.png',
    free: false,
  },
}

export const ANCHOR_ORDER = ['constitution', 'codex', 'story-bank', 'sotu', 'timeline', 'roster'] as const
