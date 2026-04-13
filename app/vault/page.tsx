'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CompassRose } from '@/components/compass-rose'
import {
  getAllVaultDocuments,
  removeFromVault,
  ANCHOR_META,
  ANCHOR_ORDER,
  type VaultDocument,
} from '@/lib/vault-storage'

export default function VaultPage() {
  const [docs, setDocs] = useState<Record<string, VaultDocument | null>>({})
  const [loaded, setLoaded] = useState(false)
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  useEffect(() => {
    setDocs(getAllVaultDocuments())
    setLoaded(true)
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

  const handleDelete = (slug: string) => {
    removeFromVault(slug)
    setDocs(getAllVaultDocuments())
    setConfirmDelete(null)
    setExpandedSlug(null)
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

      {/* Anchor Cards */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        {!loaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANCHOR_ORDER.map((slug) => (
              <div key={slug} className="h-64 rounded-2xl bg-navy/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="px-6 pt-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
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

                    <h3 className="font-display text-navy font-bold text-lg mb-1">
                      {meta.title}
                    </h3>
                    <p className="font-body text-navy/45 text-sm leading-relaxed">
                      {meta.subtitle}
                    </p>
                  </div>

                  {/* Card body — depends on state */}
                  <div className="px-6 pb-6">
                    {doc ? (
                      <>
                        {/* Stats */}
                        <div className="flex items-center gap-4 mb-4 text-xs font-body text-navy/40">
                          <span>v{doc.version}</span>
                          <span>{doc.answeredCount} answers</span>
                          <span>{new Date(doc.generatedAt).toLocaleDateString()}</span>
                        </div>

                        {/* Preview */}
                        <button
                          type="button"
                          onClick={() => setExpandedSlug(isExpanded ? null : slug)}
                          className="w-full text-left mb-4"
                        >
                          <div className={`bg-cream rounded-lg border border-navy/5 px-4 py-3 transition-all duration-300 ${
                            isExpanded ? 'max-h-[50vh] overflow-y-auto' : 'max-h-24 overflow-hidden'
                          }`}>
                            <pre className="font-body text-xs text-navy/70 leading-relaxed whitespace-pre-wrap break-words" style={{ fontFamily: 'inherit' }}>
                              {doc.content}
                            </pre>
                          </div>
                          <p className="font-body text-xs text-teal mt-2">
                            {isExpanded ? 'Collapse' : 'Preview full document'}
                          </p>
                        </button>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            href={`/anchors/${slug}`}
                            className="font-body text-xs font-semibold px-4 py-2 rounded-full bg-teal text-white hover:bg-teal-light transition-all duration-200"
                          >
                            Regenerate
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleCopy(doc.content)}
                            className="font-body text-xs font-semibold px-4 py-2 rounded-full border border-navy/15 text-navy/60 hover:border-navy/30 hover:text-navy transition-all duration-200"
                          >
                            Copy
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDownload(slug, doc.content)}
                            className="font-body text-xs font-semibold px-4 py-2 rounded-full border border-navy/15 text-navy/60 hover:border-navy/30 hover:text-navy transition-all duration-200"
                          >
                            Download
                          </button>
                          {confirmDelete === slug ? (
                            <div className="flex items-center gap-2 ml-auto">
                              <span className="font-body text-xs text-navy/40">Delete?</span>
                              <button
                                type="button"
                                onClick={() => handleDelete(slug)}
                                className="font-body text-xs text-red-500 hover:text-red-600 font-medium"
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDelete(null)}
                                className="font-body text-xs text-navy/40 hover:text-navy/60"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDelete(slug)}
                              className="font-body text-xs text-navy/30 hover:text-red-400 ml-auto transition-colors duration-200"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </>
                    ) : meta.free ? (
                      /* Empty free anchor — CTA to build */
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
                      </div>
                    ) : (
                      /* Locked pro anchor — teaser */
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
