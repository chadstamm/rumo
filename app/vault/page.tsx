'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CompassRose } from '@/components/compass-rose'
import { useAuth } from '@/components/auth-provider'
import {
  getAllVaultDocuments,
  saveToVault,
  removeFromVault,
  ANCHOR_META,
  ANCHOR_ORDER,
  type VaultDocument,
} from '@/lib/vault-storage'

export default function VaultPage() {
  const { isSubscribed } = useAuth()
  const [docs, setDocs] = useState<Record<string, VaultDocument | null>>({})
  const [loaded, setLoaded] = useState(false)
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  // Refine-with-AI state
  const [refiningSlug, setRefiningSlug] = useState<string | null>(null)
  const [revisionInstruction, setRevisionInstruction] = useState('')
  const [revisionResult, setRevisionResult] = useState('')
  const [isRevising, setIsRevising] = useState(false)
  const [revisionError, setRevisionError] = useState<string | null>(null)

  // Manual-edit state — direct text edit, no AI involved.
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [isSavingEdit, setIsSavingEdit] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    getAllVaultDocuments().then((d) => {
      if (!mounted) return
      setDocs(d)
      setLoaded(true)
    })
    return () => { mounted = false }
  }, [])

  const generatedCount = Object.values(docs).filter(Boolean).length

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content).catch(() => {
      const textarea = document.createElement('textarea')
      textarea.value = content
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    })
  }

  const handleDownload = (slug: string, content: string) => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${slug}-${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDelete = async (slug: string) => {
    await removeFromVault(slug)
    const fresh = await getAllVaultDocuments()
    setDocs(fresh)
    setConfirmDelete(null)
    setExpandedSlug(null)
  }

  // ── Refine with AI ──

  const handleStartRefine = (slug: string) => {
    // Close edit panel if open — one transform at a time.
    setEditingSlug(null)
    setEditContent('')
    setEditError(null)
    setIsSavingEdit(false)
    setRefiningSlug(slug)
    setRevisionInstruction('')
    setRevisionResult('')
    setRevisionError(null)
  }

  const handleCancelRefine = () => {
    setRefiningSlug(null)
    setRevisionInstruction('')
    setRevisionResult('')
    setRevisionError(null)
    setIsRevising(false)
  }

  const handleRevise = async () => {
    if (!refiningSlug || !revisionInstruction.trim()) return
    const doc = docs[refiningSlug]
    if (!doc) return

    setIsRevising(true)
    setRevisionResult('')
    setRevisionError(null)

    try {
      const response = await fetch('/api/revise-anchor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          anchorSlug: refiningSlug,
          anchorTitle: ANCHOR_META[refiningSlug]?.title ?? refiningSlug,
          currentContent: doc.content,
          revisionInstruction: revisionInstruction.trim(),
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Request failed' }))
        throw new Error(err.error ?? `HTTP ${response.status}`)
      }

      if (!response.body) throw new Error('No response body')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setRevisionResult(accumulated)
      }
    } catch (error) {
      setRevisionError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsRevising(false)
    }
  }

  // ── Direct upload to vault ──

  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleUpload = async (slug: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null)
    const file = e.target.files?.[0]
    if (!file) return

    const isMarkdown = /\.(md|markdown|txt)$/i.test(file.name) ||
                      ['text/markdown', 'text/plain'].includes(file.type)
    if (!isMarkdown) {
      setUploadError('Please upload a .md or .txt file.')
      e.target.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadError('File too large. Maximum 2MB.')
      e.target.value = ''
      return
    }

    try {
      const text = await file.text()
      if (!text.trim()) {
        setUploadError('File is empty.')
        e.target.value = ''
        return
      }

      await saveToVault({
        content: text,
        anchorSlug: slug,
        anchorTitle: ANCHOR_META[slug].title,
        generatedAt: new Date().toISOString(),
        answeredCount: 0, // 0 = uploaded (not wizard-generated)
      })

      const fresh = await getAllVaultDocuments()
      setDocs(fresh)
      e.target.value = ''
    } catch {
      setUploadError('Could not read that file.')
      e.target.value = ''
    }
  }

  // ── Manual edit ──

  const handleStartEdit = (slug: string) => {
    const doc = docs[slug]
    if (!doc) return
    // Close refine panel if open — one transform at a time.
    setRefiningSlug(null)
    setRevisionInstruction('')
    setRevisionResult('')
    setRevisionError(null)
    setIsRevising(false)
    setEditingSlug(slug)
    setEditContent(doc.content)
    setEditError(null)
  }

  const handleCancelEdit = () => {
    setEditingSlug(null)
    setEditContent('')
    setEditError(null)
    setIsSavingEdit(false)
  }

  const handleSaveEdit = async () => {
    if (!editingSlug) return
    const existing = docs[editingSlug]
    if (!existing) return
    const trimmed = editContent.trim()
    if (!trimmed) {
      setEditError('Cannot save an empty document.')
      return
    }
    if (trimmed === existing.content.trim()) {
      // No actual change — just close.
      handleCancelEdit()
      return
    }

    setIsSavingEdit(true)
    setEditError(null)
    try {
      await saveToVault({
        content: trimmed,
        anchorSlug: editingSlug,
        anchorTitle: existing.anchorTitle,
        generatedAt: new Date().toISOString(),
        answeredCount: existing.answeredCount,
      })
      const fresh = await getAllVaultDocuments()
      setDocs(fresh)
      handleCancelEdit()
    } catch (e) {
      setEditError(e instanceof Error ? e.message : 'Could not save changes.')
      setIsSavingEdit(false)
    }
  }

  const handleAcceptRevision = async () => {
    if (!refiningSlug || !revisionResult.trim()) return
    const existing = docs[refiningSlug]
    if (!existing) return

    await saveToVault({
      content: revisionResult.trim(),
      anchorSlug: refiningSlug,
      anchorTitle: existing.anchorTitle,
      generatedAt: new Date().toISOString(),
      answeredCount: existing.answeredCount,
    })

    const fresh = await getAllVaultDocuments()
    setDocs(fresh)
    handleCancelRefine()
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <div className="relative bg-navy text-cream overflow-hidden">
        <div className="absolute -bottom-16 -right-16 w-64 h-64 opacity-[0.025]" aria-hidden="true">
          <CompassRose className="w-full h-full text-cream" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
          <CompassRose className="w-8 h-8 text-teal/40 mb-5" />
          <h1
            className="font-display text-cream font-semibold leading-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Your Vault
          </h1>
          <div className="w-12 h-[2px] bg-ochre/50 mb-4" aria-hidden="true" />
          <p className="font-body text-cream/50 text-base max-w-lg">
            {generatedCount === 0
              ? 'Build your context anchors and they\'ll appear here.'
              : `${generatedCount} of 6 anchors built. ${generatedCount < 6 ? 'Keep going.' : 'All six anchors complete.'}`}
          </p>
        </div>
      </div>

      {/* Upload error banner */}
      {uploadError && (
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-6">
          <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200">
            <span className="font-body text-sm text-red-700">{uploadError}</span>
            <button
              type="button"
              onClick={() => setUploadError(null)}
              className="font-body text-xs text-red-600/70 hover:text-red-800"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Anchor Cards */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        {!loaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {ANCHOR_ORDER.map((slug) => (
              <div key={slug} className="h-64 rounded-2xl bg-navy/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {ANCHOR_ORDER.map((slug) => {
              const meta = ANCHOR_META[slug]
              const doc = docs[slug]
              const isExpanded = expandedSlug === slug

              return (
                <div
                  key={slug}
                  className={`relative rounded-2xl border transition-all duration-300 ${
                    doc
                      ? 'bg-white border-navy/10 shadow-md shadow-navy/5 hover:shadow-lg hover:shadow-navy/8'
                      : meta.free
                        ? 'bg-white border-dashed border-navy/15 hover:border-teal/40'
                        : 'bg-navy/[0.02] border-dashed border-navy/10'
                  }`}
                >
                  {/* Card header */}
                  <div className="px-7 pt-7 pb-5">
                    <div className="flex items-start justify-between mb-5">
                      <img
                        src={meta.icon}
                        alt=""
                        className="w-12 h-12"
                        style={{ filter: doc ? 'none' : 'grayscale(0.5) opacity(0.4)' }}
                        aria-hidden="true"
                      />
                      {doc && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-teal/10 font-body text-[10px] font-bold tracking-[0.15em] uppercase text-teal">
                          Built
                        </span>
                      )}
                      {!doc && meta.free && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-teal/10 border border-teal/20 font-body text-[10px] font-bold tracking-[0.15em] uppercase text-teal">
                          Free
                        </span>
                      )}
                      {!doc && !meta.free && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-ochre/10 font-body text-[10px] font-bold tracking-[0.15em] uppercase text-ochre/60">
                          Pro
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-navy font-bold text-lg mb-1.5">
                      {meta.title}
                    </h3>
                    <p className="font-body text-navy/45 text-sm leading-relaxed">
                      {meta.subtitle}
                    </p>
                  </div>

                  {/* Card body — depends on state */}
                  <div className="px-7 pb-7">
                    {doc ? (
                      <>
                        {/* Stats */}
                        <div className="flex items-center gap-2 mb-5 text-[11px] font-body text-navy/40 uppercase tracking-wider">
                          <span>v{doc.version}</span>
                          <span className="text-navy/15">·</span>
                          <span>{doc.answeredCount > 0 ? `${doc.answeredCount} answers` : 'Uploaded'}</span>
                          <span className="text-navy/15">·</span>
                          <span>{new Date(doc.generatedAt).toLocaleDateString()}</span>
                        </div>

                        {/* Preview */}
                        <button
                          type="button"
                          onClick={() => setExpandedSlug(isExpanded ? null : slug)}
                          className="w-full text-left mb-6 group"
                        >
                          <div className={`bg-cream rounded-lg border border-navy/5 px-4 py-3.5 transition-all duration-300 ${
                            isExpanded ? 'max-h-[50vh] overflow-y-auto' : 'max-h-24 overflow-hidden'
                          }`}>
                            <pre className="font-body text-xs text-navy/70 leading-relaxed whitespace-pre-wrap break-words" style={{ fontFamily: 'inherit' }}>
                              {doc.content}
                            </pre>
                          </div>
                          <p className="font-body text-[11px] text-teal/80 group-hover:text-teal mt-2 inline-flex items-center gap-1 uppercase tracking-wider font-medium">
                            {isExpanded ? 'Collapse' : 'Preview full'}
                            <svg className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"/>
                            </svg>
                          </p>
                        </button>

                        {/* Primary actions */}
                        <div className="flex items-center gap-2 mb-4">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(slug)}
                            className="flex-1 font-body text-xs font-semibold px-4 py-2.5 rounded-full border-2 border-navy/15 text-navy/80 hover:border-navy/35 hover:text-navy hover:bg-navy/5 transition-all duration-200 text-center"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStartRefine(slug)}
                            className="flex-1 font-body text-xs font-semibold px-4 py-2.5 rounded-full bg-ochre text-white hover:bg-ochre-light transition-all duration-200 text-center"
                          >
                            Refine with AI
                          </button>
                          <Link
                            href={`/anchors/${slug}`}
                            className="flex-1 font-body text-xs font-semibold px-4 py-2.5 rounded-full bg-teal text-white hover:bg-teal-light transition-all duration-200 text-center"
                          >
                            Regenerate
                          </Link>
                        </div>

                        {/* Secondary actions — subtle utility row */}
                        <div className="flex items-center justify-between pt-3 border-t border-navy/5">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleCopy(doc.content)}
                              title="Copy to clipboard"
                              className="inline-flex items-center gap-1.5 font-body text-[11px] font-medium text-navy/50 hover:text-navy px-2 py-1 transition-colors duration-200"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                              </svg>
                              Copy
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownload(slug, doc.content)}
                              title="Download as Markdown"
                              className="inline-flex items-center gap-1.5 font-body text-[11px] font-medium text-navy/50 hover:text-navy px-2 py-1 transition-colors duration-200"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                              </svg>
                              Download
                            </button>
                          </div>
                          {confirmDelete === slug ? (
                            <div className="flex items-center gap-2">
                              <span className="font-body text-[11px] text-navy/50">Delete?</span>
                              <button
                                type="button"
                                onClick={() => handleDelete(slug)}
                                className="font-body text-[11px] text-red-500 hover:text-red-600 font-semibold px-2"
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDelete(null)}
                                className="font-body text-[11px] text-navy/40 hover:text-navy/60 px-2"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDelete(slug)}
                              title="Delete this anchor"
                              className="inline-flex items-center gap-1.5 font-body text-[11px] font-medium text-navy/30 hover:text-red-500 px-2 py-1 transition-colors duration-200"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                              </svg>
                              Delete
                            </button>
                          )}
                        </div>

                        {/* Manual edit panel */}
                        {editingSlug === slug && (
                          <div className="mt-5 pt-5 border-t border-navy/10">
                            <label className="block font-body text-xs font-bold tracking-[0.15em] uppercase text-navy/70 mb-2">
                              Edit Manually
                            </label>
                            <p className="font-body text-xs text-navy/45 mb-3">
                              Direct edits to the document — no AI. Save to overwrite the current version.
                            </p>
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              disabled={isSavingEdit}
                              className="w-full px-3 py-2 rounded-lg border border-navy/15 bg-white font-body text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy/40 focus:ring-1 focus:ring-navy/20 resize-y min-h-[400px] leading-relaxed"
                            />
                            <div className="flex items-center gap-2 mt-3 flex-wrap">
                              <button
                                type="button"
                                onClick={handleSaveEdit}
                                disabled={isSavingEdit || !editContent.trim()}
                                className="font-body text-xs font-semibold px-4 py-2 rounded-full bg-navy text-white hover:bg-navy/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                              >
                                {isSavingEdit ? 'Saving…' : 'Save'}
                              </button>
                              <button
                                type="button"
                                onClick={handleCancelEdit}
                                disabled={isSavingEdit}
                                className="font-body text-xs text-navy/50 hover:text-navy/80 disabled:opacity-40 transition-colors duration-200"
                              >
                                Cancel
                              </button>
                              <span className="font-body text-xs text-navy/40 ml-auto">
                                {editContent.length.toLocaleString()} chars
                              </span>
                            </div>
                            {editError && (
                              <div className="mt-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 font-body text-xs text-red-700">
                                {editError}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Refine-with-AI panel */}
                        {refiningSlug === slug && (
                          <div className="mt-5 pt-5 border-t border-navy/10">
                            <label className="block font-body text-xs font-bold tracking-[0.15em] uppercase text-ochre mb-2">
                              Refine with AI
                            </label>
                            <p className="font-body text-xs text-navy/45 mb-3">
                              Tell RUMO what to change. It'll rewrite the full document, keeping everything else intact.
                            </p>
                            <textarea
                              value={revisionInstruction}
                              onChange={(e) => setRevisionInstruction(e.target.value)}
                              placeholder="e.g., make it more concise · add more about my time in Lisbon · soften the tone in Article III"
                              className="w-full px-3 py-2 rounded-lg border border-navy/15 bg-white font-body text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-ochre focus:ring-1 focus:ring-ochre/30 resize-y min-h-[80px]"
                              disabled={isRevising}
                              maxLength={2000}
                            />
                            <div className="flex items-center gap-2 mt-3 flex-wrap">
                              <button
                                type="button"
                                onClick={handleRevise}
                                disabled={isRevising || !revisionInstruction.trim()}
                                className="font-body text-xs font-semibold px-4 py-2 rounded-full bg-ochre text-white hover:bg-ochre-light disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                              >
                                {isRevising ? 'Revising…' : 'Revise'}
                              </button>
                              <button
                                type="button"
                                onClick={handleCancelRefine}
                                disabled={isRevising}
                                className="font-body text-xs text-navy/50 hover:text-navy/80 disabled:opacity-40 transition-colors duration-200"
                              >
                                Cancel
                              </button>
                              {revisionInstruction.length > 1500 && (
                                <span className="font-body text-xs text-navy/40 ml-auto">
                                  {revisionInstruction.length}/2000
                                </span>
                              )}
                            </div>

                            {revisionError && (
                              <div className="mt-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 font-body text-xs text-red-700">
                                {revisionError}
                              </div>
                            )}

                            {(isRevising || revisionResult) && (
                              <div className="mt-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-body text-xs font-bold tracking-[0.15em] uppercase text-teal">
                                    {isRevising ? 'Revising…' : 'Revised Version'}
                                  </span>
                                  {!isRevising && revisionResult && (
                                    <span className="font-body text-xs text-navy/40">
                                      {revisionResult.length.toLocaleString()} chars
                                    </span>
                                  )}
                                </div>
                                <div className="bg-cream rounded-lg border border-teal/30 px-4 py-3 max-h-[40vh] overflow-y-auto">
                                  <pre className="font-body text-xs text-navy/80 leading-relaxed whitespace-pre-wrap break-words" style={{ fontFamily: 'inherit' }}>
                                    {revisionResult || (isRevising ? '…' : '')}
                                  </pre>
                                </div>

                                {!isRevising && revisionResult && (
                                  <div className="flex items-center gap-2 mt-3">
                                    <button
                                      type="button"
                                      onClick={handleAcceptRevision}
                                      className="font-body text-xs font-semibold px-4 py-2 rounded-full bg-teal text-white hover:bg-teal-light transition-all duration-200"
                                    >
                                      Replace original
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setRevisionResult('')}
                                      className="font-body text-xs font-semibold px-4 py-2 rounded-full border border-navy/15 text-navy/60 hover:border-navy/30 hover:text-navy transition-all duration-200"
                                    >
                                      Discard
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleRevise}
                                      className="font-body text-xs text-navy/50 hover:text-navy/80 transition-colors duration-200 ml-auto"
                                    >
                                      Try again
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ) : meta.free || isSubscribed ? (
                      /* Empty buildable anchor — CTA to build OR upload */
                      <div className="pt-2">
                        <p className="font-body text-navy/35 text-sm mb-4">
                          Start here. Answer {slug === 'constitution' ? '10' : 'a few'} questions and RUMO builds your {meta.title.toLowerCase()}.
                        </p>
                        <Link
                          href={`/anchors/${slug}`}
                          className="inline-flex font-body text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-wide
                                     bg-teal text-white shadow-sm shadow-teal/20
                                     hover:bg-teal-light hover:shadow-md hover:shadow-teal/30
                                     transition-all duration-200"
                        >
                          Build Now
                        </Link>

                        <div className="mt-4 pt-4 border-t border-navy/10">
                          <p className="font-body text-navy/40 text-xs mb-2">
                            Already have a {meta.title.toLowerCase()}?
                          </p>
                          <label className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-teal hover:text-teal-dark cursor-pointer transition-colors duration-200">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="17 8 12 3 7 8"/>
                              <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            Upload .md to vault
                            <input
                              type="file"
                              accept=".md,.markdown,.txt,text/markdown,text/plain"
                              className="hidden"
                              onChange={(e) => handleUpload(slug, e)}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      /* Locked pro anchor — teaser with upload option */
                      <div className="pt-2">
                        <p className="font-body text-navy/30 text-sm mb-4">
                          Unlock this anchor to give your AI even deeper context.
                        </p>
                        <Link
                          href="/pricing"
                          className="inline-flex font-body text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-wide
                                     bg-ochre/10 text-ochre border border-ochre/20
                                     hover:bg-ochre/20 hover:border-ochre/30
                                     transition-all duration-200"
                        >
                          Unlock with Pro
                        </Link>

                        <div className="mt-4 pt-4 border-t border-navy/10">
                          <p className="font-body text-navy/40 text-xs mb-2">
                            Already have a {meta.title.toLowerCase()}?
                          </p>
                          <label className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-teal hover:text-teal-dark cursor-pointer transition-colors duration-200">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="17 8 12 3 7 8"/>
                              <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            Upload .md to vault
                            <input
                              type="file"
                              accept=".md,.markdown,.txt,text/markdown,text/plain"
                              className="hidden"
                              onChange={(e) => handleUpload(slug, e)}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
