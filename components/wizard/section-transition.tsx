'use client'

import { useState } from 'react'
import { SECTION_NAMES, SECTION_SUBTITLES, type Section } from '@/types/wizard'

// Per-anchor copy for the Getting Started section
const ANCHOR_INTRO: Record<string, { howItWorks: string; beThorough: string; upload: string; uploadTitle?: string; whatYouGet: string }> = {
  constitution: {
    howItWorks: 'We mine your context through guided questions about who you are, what you value, and how you see the world. Your answers become your Personal Constitution.',
    beThorough: 'The more detail you give, the better your AI will understand you. No wrong answers — just honest ones.',
    upload: 'Have a bio, resume, or personal mission statement? Upload them early on to give RUMO a head start.',
    whatYouGet: 'Critical context you can upload to Claude, ChatGPT, Gemini, or any AI agent — so it works more effectively on your behalf.',
  },
  codex: {
    howItWorks: 'We mine your writing voice through questions about how you communicate, your stylistic preferences, and what makes your words yours. Your answers become your Writing Codex.',
    beThorough: 'Include examples. The more specific you are about your voice — phrases you love, patterns you avoid — the sharper your codex will be.',
    upload: 'Have writing samples, blog posts, or emails that sound like you? Upload them to give RUMO your voice in action.',
    whatYouGet: 'A structured voice profile you can paste into Claude, ChatGPT, Gemini, or any AI — capturing your tone, rhythm, rules, and the patterns that make your writing yours.',
  },
  'story-bank': {
    howItWorks: 'We map your lived experience through questions about the moments that shaped you, the language you carry, and the stories you always tell. Your answers become your Story Bank.',
    beThorough: 'Real stories with real details. The messy ones are often the most useful — they give AI texture, not just facts.',
    upload: 'Have journal entries, speeches, or personal essays? Upload them to seed your Story Bank with lived material.',
    whatYouGet: 'A structured document of your stories, phrases, and defining moments — paste it into any AI so its output feels grounded in your actual life, not generic filler.',
  },
  sotu: {
    howItWorks: 'We map your current season through questions about where you are right now — your priorities, constraints, and what you\'re navigating. Your answers become your State of the Union.',
    beThorough: 'Be honest about what\'s hard, not just what\'s going well. AI needs to understand your real situation to give you useful advice.',
    upload: 'Have a recent journal entry, goals doc, or life plan? Upload it to give RUMO your current context.',
    whatYouGet: 'A State of the Union document that keeps your AI current — so it knows what you\'re dealing with right now, not just who you are in general.',
  },
  timeline: {
    howItWorks: 'We map your life arc through questions about milestones, turning points, chapters, and where you\'re headed. Your answers become your Timeline.',
    beThorough: 'Include the pivots and the detours. The non-obvious chapters often reveal more about your trajectory than the highlights.',
    upload: 'Have a resume, CV, or personal timeline? Upload it to give RUMO your chronological foundation.',
    whatYouGet: 'A structured chronological narrative — your life story organized by chapters, milestones, and turning points. Paste it into any AI so it understands not just where you are, but how you got here.',
  },
  roster: {
    howItWorks: 'We\'ll ask about the people who matter — family, collaborators, mentors, and the relationships that shape your decisions. Then we\'ll explore how you function in relationships. Your answers become your Influence Roster.',
    beThorough: 'Don\'t just list names. For each person, describe the dynamic, the role they play, and anything your AI should know when helping you communicate with or about them.',
    uploadTitle: 'YOUR ANSWERS ARE PRIVATE',
    upload: 'You\'ll be naming real people and describing honest dynamics. Everything here is private to you. Named individuals are never contacted, and your descriptions are only used to give your AI context.',
    whatYouGet: 'An Influence Roster that gives your AI relationship context — so when you ask it to draft an email to your boss, it already knows the dynamic. When you mention a name, it knows who that person is to you.',
  },
}

export function SectionTransition({
  section,
  onBegin,
  anchorSlug,
  totalSections,
  sectionIndex,
  sectionOverview,
}: {
  section: Section
  onBegin: () => void
  anchorSlug?: string
  totalSections?: number
  sectionIndex?: number
  sectionOverview?: { name: string; questionCount: number }[]
}) {
  const [animate, setAnimate] = useState(false)

  useState(() => {
    const timer = setTimeout(() => setAnimate(true), 50)
    return () => clearTimeout(timer)
  })

  const contentSections = (totalSections ?? 5)
  const showLabel = section !== 0 && contentSections > 1
  const displayIndex = sectionIndex ?? section
  const displayTotal = totalSections ?? 5

  const intro = ANCHOR_INTRO[anchorSlug || 'constitution'] || ANCHOR_INTRO.constitution

  if (section === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto py-2">
        {/* Header — left-aligned, editorial */}
        <div
          className={`mb-8 transition-all duration-700 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-ochre/60" aria-hidden="true" />
            <span className="font-body text-xs tracking-[0.25em] uppercase text-ochre font-bold">
              Getting Started
            </span>
          </div>
          <h1 className="font-display text-navy font-bold leading-tight" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)' }}>
            Before You Begin
          </h1>
        </div>

        {/* Instructions — two-column grid, bold subheads */}
        <div
          className={`transition-all duration-700 delay-200 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 mb-10">
            <InstructionItem
              icon={
                <svg width="38" height="38" viewBox="0 0 20 20" fill="none">
                  {/* Post */}
                  <line x1="10" y1="4" x2="10" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Top sign — pointing right */}
                  <polygon points="6,5 16,5 17,6.5 16,8 6,8" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.15" strokeLinejoin="round" />
                  {/* Bottom sign — pointing left */}
                  <polygon points="14,10 4,10 3,11.5 4,13 14,13" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.08" strokeLinejoin="round" />
                  {/* Base */}
                  <line x1="7" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
              title="HOW IT WORKS"
              body={intro.howItWorks}
            />
            <InstructionItem
              icon={
                <svg width="38" height="38" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3a3 3 0 0 0-3 3v3a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 9v.5a5 5 0 0 0 10 0V9M10 14.5V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
              title="SPEAK YOUR ANSWERS"
              body="Every question has a microphone button. Talk naturally — no time limits. Your words get transcribed automatically."
            />
            <InstructionItem
              icon={
                intro.uploadTitle ? (
                  <svg width="38" height="38" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 9h6M7 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="14" cy="4" r="3" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
                    <path d="M14 3v2M13 4h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="38" height="38" viewBox="0 0 20 20" fill="none">
                    <path d="M4 17V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8 7h4M8 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )
              }
              title={intro.uploadTitle || 'UPLOAD EXISTING DOCS'}
              body={intro.upload}
            />
            <InstructionItem
              icon={
                <svg width="38" height="38" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
              title="BE THOROUGH"
              body={intro.beThorough}
            />
            <InstructionItem
              icon={
                <svg width="38" height="38" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              title="TAKE YOUR TIME"
              body="Every question can be skipped. Your progress saves automatically. Come back anytime."
            />
            <InstructionItem
              icon={
                <svg width="38" height="38" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1l1.5 4.5L16 7l-4.5 1.5L10 13l-1.5-4.5L4 7l4.5-1.5L10 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M16 13l.75 2.25L19 16l-2.25.75L16 19l-.75-2.25L13 16l2.25-.75L16 13Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                  <path d="M4 14l.5 1.5L6 16l-1.5.5L4 18l-.5-1.5L2 16l1.5-.5L4 14Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
                </svg>
              }
              title="WHAT YOU GET"
              body={intro.whatYouGet}
            />
          </div>
        </div>

        {/* CTA — centered */}
        <div
          className={`text-center transition-all duration-700 delay-400 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-body text-navy/40 text-sm mb-4">
            About 15 minutes if you&apos;re thorough. Faster if you skip.
          </p>
          <button
            type="button"
            onClick={onBegin}
            className="font-body font-bold text-sm tracking-[0.1em] uppercase px-10 py-4 rounded-full
                       bg-teal text-white shadow-lg shadow-teal/20
                       hover:bg-teal-light hover:shadow-xl hover:shadow-teal/30
                       hover:-translate-y-0.5 active:translate-y-0
                       transition-all duration-300"
          >
            LET&apos;S GO
          </button>
        </div>
      </div>
    )
  }

  // Non-zero sections — compact transition
  return (
    <div className="w-full max-w-3xl mx-auto text-center py-6 sm:py-8">
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

      <h1
        className={`font-display text-navy font-semibold leading-tight mb-3 transition-all duration-700 delay-200 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
      >
        {SECTION_NAMES[section]}
      </h1>

      <p
        className={`font-body text-muted text-base leading-relaxed max-w-md mx-auto mb-6 transition-all duration-700 delay-300 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {SECTION_SUBTITLES[section]}
      </p>

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
        BEGIN SECTION
      </button>
    </div>
  )
}

// ── Instruction Item ──

function InstructionItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 mt-0.5 flex-shrink-0 text-ochre">
        {icon}
      </div>
      <div>
        <p className="font-body text-navy font-black text-sm tracking-[0.08em] mb-1.5">{title}</p>
        <p className="font-body text-navy/55 text-[15px] leading-relaxed">{body}</p>
      </div>
    </div>
  )
}
