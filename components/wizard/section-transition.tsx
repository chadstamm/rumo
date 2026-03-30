'use client'

import { useState, useRef } from 'react'
import { SECTION_NAMES, SECTION_SUBTITLES, type Section } from '@/types/wizard'
import { CompassRose } from '@/components/compass-rose'

export function SectionTransition({
  section,
  onBegin,
  totalSections,
  sectionIndex,
  onUploadDocs,
}: {
  section: Section
  onBegin: () => void
  totalSections?: number
  sectionIndex?: number
  onUploadDocs?: (text: string) => void
}) {
  const [animate, setAnimate] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  useState(() => {
    const timer = setTimeout(() => setAnimate(true), 50)
    return () => clearTimeout(timer)
  })

  const showLabel = section !== 0
  const displayIndex = sectionIndex ?? section
  const displayTotal = totalSections ?? 5

  const handleFileUpload = async (files: FileList) => {
    setUploading(true)
    const names: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      names.push(file.name)

      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch('/api/parse-file', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.success && data.text && onUploadDocs) {
          onUploadDocs(data.text)
        }
      } catch {
        // Fallback: read as text
        try {
          const text = await file.text()
          if (text && onUploadDocs) onUploadDocs(text)
        } catch { /* skip unreadable files */ }
      }
    }

    setUploadedFiles((prev) => [...prev, ...names])
    setUploading(false)
  }

  return (
    <div className="w-full max-w-xl mx-auto text-center py-12 sm:py-16">
      {/* Compass rose accent */}
      <div
        className={`mx-auto mb-8 transition-all duration-700 ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <CompassRose className="w-16 h-16 text-teal/30 mx-auto" />
      </div>

      {/* Section label */}
      {showLabel && (
        <div
          className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 delay-100 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-8 h-px bg-ochre/40" aria-hidden="true" />
          <span className="font-body text-xs tracking-[0.25em] uppercase text-ochre font-medium">
            Section {displayIndex} of {displayTotal}
          </span>
          <span className="w-8 h-px bg-ochre/40" aria-hidden="true" />
        </div>
      )}

      {/* Section name */}
      <h1
        className={`font-display text-navy font-semibold leading-tight mb-4 transition-all duration-700 delay-200 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
      >
        {SECTION_NAMES[section]}
      </h1>

      {/* Section subtitle */}
      <p
        className={`font-body text-muted text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-8 transition-all duration-700 delay-300 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {SECTION_SUBTITLES[section]}
      </p>

      {/* Document upload option */}
      {section === 0 && onUploadDocs && (
        <div
          className={`mb-8 transition-all duration-700 delay-350 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="max-w-sm mx-auto">
            <input
              ref={fileRef}
              type="file"
              multiple
              accept=".txt,.md,.doc,.docx,.pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileUpload(e.target.files)
                }
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full border-2 border-dashed border-navy/15 rounded-xl px-6 py-5
                         text-center cursor-pointer
                         hover:border-teal/30 hover:bg-teal/[0.02]
                         transition-all duration-200"
            >
              <p className="font-body text-navy/50 text-sm">
                {uploading ? (
                  <span className="text-teal">Processing...</span>
                ) : (
                  'Have existing documents? Upload them here.'
                )}
              </p>
              <p className="font-body text-navy/30 text-xs mt-1">
                Bios, resumes, writing samples — anything that helps tell your story.
                <br />
                PDF, DOCX, TXT, or Markdown.
              </p>
            </button>

            {uploadedFiles.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                {uploadedFiles.map((name, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 border border-teal/20 font-body text-xs text-teal">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 6l2.5 2.5L9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Begin button */}
      <button
        type="button"
        onClick={onBegin}
        className={`font-body font-semibold text-sm px-8 py-3.5 rounded-lg
                   bg-teal text-white
                   hover:bg-teal-light hover:shadow-lg hover:shadow-teal/20
                   hover:-translate-y-0.5 active:translate-y-0
                   transition-all duration-300 delay-400
                   ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        {section === 0 ? 'LET\'S GO' : 'BEGIN SECTION'}
      </button>
    </div>
  )
}
