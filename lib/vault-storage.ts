/**
 * Vault Storage — dual-mode persistence.
 *
 * Signed-in users: Supabase `documents` table (durable, cross-device, RLS-gated).
 * Anonymous users: localStorage (browser-local).
 *
 * On sign-in: `migrateLocalToSupabase()` pushes any pre-existing local docs
 * into Supabase (without overwriting anything already there).
 *
 * localStorage is kept as a read-cache mirror even for signed-in users, so
 * first paint is fast and offline reads work.
 */

import { createClient } from './supabase/client'

const VAULT_PREFIX = 'rumo-vault'

export interface VaultDocument {
  content: string
  anchorSlug: string
  anchorTitle: string
  generatedAt: string
  answeredCount: number
  version: number
}

// ──────────────────────────────────────────────────────────────────────────
// ANCHOR METADATA
// ──────────────────────────────────────────────────────────────────────────

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

// ──────────────────────────────────────────────────────────────────────────
// Internal helpers
// ──────────────────────────────────────────────────────────────────────────

async function getUserId(): Promise<string | null> {
  if (typeof window === 'undefined') return null
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user?.id ?? null
  } catch {
    return null
  }
}

// ── localStorage ──

function lsRead(slug: string): VaultDocument | null {
  if (typeof window === 'undefined') return null
  const key = `${VAULT_PREFIX}-${slug}`
  const raw = localStorage.getItem(key)
  if (!raw) return null
  try {
    return JSON.parse(raw) as VaultDocument
  } catch {
    return null
  }
}

function lsWrite(doc: VaultDocument): void {
  if (typeof window === 'undefined') return
  try {
    const key = `${VAULT_PREFIX}-${doc.anchorSlug}`
    localStorage.setItem(key, JSON.stringify(doc))
  } catch {
    // Quota exceeded, storage disabled, etc. — non-fatal.
  }
}

function lsRemove(slug: string): void {
  if (typeof window === 'undefined') return
  try {
    const key = `${VAULT_PREFIX}-${slug}`
    localStorage.removeItem(key)
  } catch {
    // Non-fatal.
  }
}

// ── Supabase ──

interface DocumentRow {
  anchor_slug: string
  content: string
  version: number
  answer_count: number | null
  generated_at: string
}

function rowToDoc(row: DocumentRow): VaultDocument {
  return {
    content: row.content,
    anchorSlug: row.anchor_slug,
    anchorTitle: ANCHOR_META[row.anchor_slug]?.title ?? row.anchor_slug,
    generatedAt: row.generated_at,
    answeredCount: row.answer_count ?? 0,
    version: row.version,
  }
}

async function sbRead(userId: string, slug: string): Promise<VaultDocument | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('documents')
    .select('anchor_slug, content, version, answer_count, generated_at')
    .eq('user_id', userId)
    .eq('anchor_slug', slug)
    .maybeSingle()

  if (error || !data) return null
  return rowToDoc(data as DocumentRow)
}

async function sbReadAll(userId: string): Promise<Record<string, VaultDocument | null>> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('documents')
    .select('anchor_slug, content, version, answer_count, generated_at')
    .eq('user_id', userId)

  const result: Record<string, VaultDocument | null> = {}
  for (const slug of ANCHOR_ORDER) {
    result[slug] = null
  }
  if (error || !data) return result
  for (const row of data as DocumentRow[]) {
    if (row.anchor_slug in result) {
      result[row.anchor_slug] = rowToDoc(row)
    }
  }
  return result
}

async function sbUpsert(userId: string, doc: VaultDocument): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('documents')
    .upsert(
      {
        user_id: userId,
        anchor_slug: doc.anchorSlug,
        content: doc.content,
        version: doc.version,
        answer_count: doc.answeredCount,
        generated_at: doc.generatedAt,
      },
      { onConflict: 'user_id,anchor_slug' },
    )
  if (error) {
    console.warn('[vault-storage] Supabase upsert failed:', error.message)
    throw error
  }
}

async function sbDelete(userId: string, slug: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('user_id', userId)
    .eq('anchor_slug', slug)
  if (error) {
    console.warn('[vault-storage] Supabase delete failed:', error.message)
    throw error
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Public API (async)
// ──────────────────────────────────────────────────────────────────────────

export async function saveToVault(doc: Omit<VaultDocument, 'version'>): Promise<VaultDocument> {
  const userId = await getUserId()

  // Determine next version from existing record (Supabase first if signed in).
  const existing = userId ? await sbRead(userId, doc.anchorSlug) : lsRead(doc.anchorSlug)
  const version = existing ? existing.version + 1 : 1

  const entry: VaultDocument = { ...doc, version }

  if (userId) {
    try {
      await sbUpsert(userId, entry)
    } catch {
      // Fall through — localStorage still receives the write so the user
      // doesn't lose their content on a transient Supabase failure.
    }
  }
  lsWrite(entry)
  return entry
}

export async function getFromVault(slug: string): Promise<VaultDocument | null> {
  const userId = await getUserId()
  if (userId) {
    const sbDoc = await sbRead(userId, slug)
    if (sbDoc) {
      lsWrite(sbDoc)
      return sbDoc
    }
  }
  return lsRead(slug)
}

export async function getAllVaultDocuments(): Promise<Record<string, VaultDocument | null>> {
  const userId = await getUserId()

  if (userId) {
    const docs = await sbReadAll(userId)
    for (const slug of ANCHOR_ORDER) {
      if (docs[slug]) lsWrite(docs[slug] as VaultDocument)
    }
    return docs
  }

  const result: Record<string, VaultDocument | null> = {}
  for (const slug of ANCHOR_ORDER) {
    result[slug] = lsRead(slug)
  }
  return result
}

export async function removeFromVault(slug: string): Promise<void> {
  const userId = await getUserId()
  if (userId) {
    try {
      await sbDelete(userId, slug)
    } catch {
      // Non-fatal; still clear local cache.
    }
  }
  lsRemove(slug)
}

// ──────────────────────────────────────────────────────────────────────────
// Migration helper — push localStorage docs into Supabase on sign-in.
// Called from AuthProvider when a null → user auth transition is detected.
// Never overwrites a Supabase doc that already exists.
// ──────────────────────────────────────────────────────────────────────────

export async function migrateLocalToSupabase(userId: string): Promise<{ migrated: number; skipped: number }> {
  let migrated = 0
  let skipped = 0
  for (const slug of ANCHOR_ORDER) {
    const local = lsRead(slug)
    if (!local) continue
    const existing = await sbRead(userId, slug)
    if (existing) {
      skipped += 1
      continue
    }
    try {
      await sbUpsert(userId, local)
      migrated += 1
    } catch {
      // Non-fatal; try the next slug.
    }
  }
  return { migrated, skipped }
}
