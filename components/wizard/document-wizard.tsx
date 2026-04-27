'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { DocumentConfig } from '@/data/documents'
import { getQuestionsForSection } from '@/data/questions'
import { CompassRose } from '@/components/compass-rose'
import { WizardProvider } from '@/context/wizard-context'
import { useWizard } from '@/context/wizard-context'
import { LeadGateForm, hasLeadBeenCaptured } from './lead-gate-form'
import { ProgressBar } from './progress-bar'
import { QuestionStep } from './question-step'
import { SectionTransition } from './section-transition'
import Image from 'next/image'
import { ANCHOR_ICON_MAP, type AnchorSlug } from '@/components/icons/anchor-icons'
import { saveToVault } from '@/lib/vault-storage'
import { FullBuildCTA } from '@/components/full-build-cta'

const ANCHOR_PNG_ICONS: Record<string, string> = {
  constitution: '/icons/constitution.png',
  codex: '/icons/codex.png',
  'story-bank': '/icons/story-bank.png',
  sotu: '/icons/sotu.png',
  timeline: '/icons/timeline.png',
  roster: '/icons/roster.png',
}

// ── Hero backgrounds per document ──

const HERO_IMAGES: Record<string, string> = {
  constitution: '/heroes/constitution.jpg',
  sotu: '/heroes/sotu.jpg',
  codex: '/heroes/codex.jpg',
  'story-bank': '/heroes/story-bank.jpg',
  timeline: '/heroes/timeline.jpg',
  roster: '/heroes/roster.jpg',
}

// Focal point overrides — shift object-position for specific hero images
const HERO_FOCUS: Record<string, string> = {
  codex: 'center 70%', // Show typewriter keys, not top of machine
  timeline: 'center 40%', // Focus on the ornate black and white calçada pattern
}

// ── Anchor-specific taglines ──

const ANCHOR_TAGLINES: Record<string, string> = {
  constitution: '',
  sotu: 'A living document that evolves as your life does',
  codex: 'Your voice, extracted and preserved',
  'story-bank': 'Raw material that makes AI feel lived-in',
  timeline: 'The chronological arc that tells AI how you got here',
  roster: 'The relationship context your agent needs to navigate your world',
}

// ── Document Hero (full-width, immersive) ──

function DocumentHero({ config }: { config: DocumentConfig }) {
  const heroImage = HERO_IMAGES[config.slug]
  const tagline = ANCHOR_TAGLINES[config.slug]
  const questionCount = config.sections.reduce<number>(
    (sum, s) => sum + getQuestionsForSection(s).length,
    0
  )
  const iconEntry = ANCHOR_ICON_MAP[config.slug as AnchorSlug]

  return (
    <div className="relative min-h-[40vh] sm:min-h-[35vh] w-full overflow-hidden flex items-end">
      {/* Background image */}
      {heroImage && (
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={HERO_FOCUS[config.slug] ? { objectPosition: HERO_FOCUS[config.slug] } : undefined}
        />
      )}

      {/* Overlay — warm gold tint over all hero images */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: heroImage
            ? `linear-gradient(to bottom, rgba(40,32,18,0.35) 0%, rgba(30,28,20,0.55) 40%, rgba(12,35,64,0.88) 80%, rgba(12,35,64,1) 100%)`
            : '#0c2340',
        }}
      />

      {/* Compass rose watermark */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 opacity-[0.02]" aria-hidden="true">
        <CompassRose className="w-full h-full text-cream" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 pt-24 sm:pt-28">
          <div className="flex items-end justify-between gap-8">
            {/* Left: text */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-body text-sm tracking-[0.2em] uppercase text-ochre font-bold">
                  Context Anchor
                </span>
                {config.slug === 'constitution' && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-teal border border-teal font-body text-[10px] font-bold tracking-[0.15em] uppercase text-white">
                    Free
                  </span>
                )}
              </div>

              <h1
                className="font-display text-cream font-bold leading-tight mb-3"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
              >
                {config.title}
              </h1>

              <div className="w-10 h-[2px] bg-ochre/50 mb-4" aria-hidden="true" />

              <p className="font-body text-cream/70 text-base sm:text-lg leading-relaxed font-medium">
                {config.description}
              </p>
            </div>

            {/* Right: large icon */}
            {ANCHOR_PNG_ICONS[config.slug] && (
              <div className="hidden lg:block flex-shrink-0">
                <Image
                  src={ANCHOR_PNG_ICONS[config.slug]}
                  alt=""
                  width={180}
                  height={180}
                  className="opacity-100 -ml-8"
                  style={{ filter: 'brightness(0) invert(1)' }}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Anchor-Specific Completion ──

// ── Rotating loading messages ──

const LOADING_MESSAGES = [
  'Reading between the lines...',
  'Finding what makes you, you...',
  'Connecting the threads...',
  'Crafting your document...',
  'Mining your context...',
  'Building something personal...',
  'Almost there...',
  'Putting the pieces together...',
]

function AnchorComplete({ config }: { config: DocumentConfig }) {
  const { state, totalAnswered, reset, generateDocument } = useWizard()
  const router = useRouter()
  const iconEntry = ANCHOR_ICON_MAP[config.slug as AnchorSlug]
  const hasTriggered = useRef(false)
  const outputRef = useRef<HTMLDivElement>(null)
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0)
  const [copied, setCopied] = useState(false)
  const [savedToVault, setSavedToVault] = useState(false)

  // Auto-trigger generation on mount
  useEffect(() => {
    if (!hasTriggered.current && state.generationPhase === 'idle') {
      hasTriggered.current = true
      generateDocument(config.slug, config.title)
    }
  }, [config.slug, config.title, generateDocument, state.generationPhase])

  // Auto-scroll as text streams
  useEffect(() => {
    if (outputRef.current && state.generationPhase === 'streaming') {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [state.streamedText, state.generationPhase])

  // Rotate loading messages every 3 seconds during analysis/generation
  useEffect(() => {
    if (state.generationPhase === 'analyzing' || state.generationPhase === 'generating' || state.generationPhase === 'idle') {
      const interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [state.generationPhase])

  // Copy with confirmation
  const handleCopy = () => {
    navigator.clipboard.writeText(state.streamedText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }).catch(() => {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = state.streamedText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  const isPreGen = ['idle', 'analyzing', 'generating'].includes(state.generationPhase)
  const isStreaming = state.generationPhase === 'streaming'
  const isGenerating = isPreGen || isStreaming
  const isDone = state.generationPhase === 'complete'
  const isError = state.generationPhase === 'error'

  return (
    <div className="bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">

        {/* ── Pre-generation: loading state ── */}
        {isPreGen && !state.streamedText && (
          <div className="text-center py-16">
            {/* Animated icon */}
            <div className="relative w-20 h-20 mx-auto mb-8">
              {iconEntry ? (
                <div className="w-20 h-20 text-teal/40 animate-pulse">
                  <iconEntry.Icon className="w-full h-full" />
                </div>
              ) : (
                <CompassRose className="w-20 h-20 text-teal/40 animate-pulse" />
              )}
              {/* Shimmer ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, rgba(30, 190, 177, 0.2) 25%, transparent 50%)',
                  animation: 'spin 2s linear infinite',
                }}
              />
            </div>

            <h2
              className="font-display text-navy font-semibold leading-tight mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              Building Your {config.title}
            </h2>

            {/* Rotating message with fade */}
            <div className="h-8 flex items-center justify-center">
              <p
                key={loadingMsgIdx}
                className="font-body text-navy/50 text-base animate-fade-in"
              >
                {LOADING_MESSAGES[loadingMsgIdx]}
              </p>
            </div>

            {/* Phase indicator */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                state.generationPhase === 'idle' ? 'bg-teal animate-pulse' : 'bg-teal/30'
              }`} />
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                state.generationPhase === 'analyzing' ? 'bg-teal animate-pulse' : state.generationPhase === 'generating' ? 'bg-teal/30' : 'bg-navy/10'
              }`} />
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                state.generationPhase === 'generating' ? 'bg-teal animate-pulse' : 'bg-navy/10'
              }`} />
            </div>
            <p className="font-body text-navy/30 text-xs mt-2 tracking-wide uppercase">
              {state.generationPhase === 'idle' ? 'Preparing' : state.generationPhase === 'analyzing' ? 'Analyzing answers' : 'Generating document'}
            </p>
          </div>
        )}

        {/* ── Streaming: live text ── */}
        {isStreaming && (
          <div className="text-center mb-8">
            <h2
              className="font-display text-navy font-semibold leading-tight mb-2"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)' }}
            >
              Writing your {config.title.toLowerCase()}
              <span className="inline-block w-1.5 h-5 bg-teal ml-1 animate-pulse rounded-sm" />
            </h2>
            <p className="font-body text-navy/40 text-sm">Watch it come together in real time</p>
          </div>
        )}

        {/* ── Complete: header ── */}
        {isDone && (
          <div className="text-center mb-8">
            {/* Success checkmark */}
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-teal/10 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#1ebeb1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2
              className="font-display text-navy font-semibold leading-tight mb-3"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              Your {config.title}
            </h2>
            <p className="font-body text-navy/60 text-base leading-relaxed">
              Generated from {totalAnswered} answers. Copy it, download it, or upload it to your AI.
            </p>
          </div>
        )}

        {/* ── Error state ── */}
        {isError && (
          <div className="text-center py-16">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-red-50 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4M12 17h.01" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" stroke="#dc2626" strokeWidth="2" />
              </svg>
            </div>
            <h2
              className="font-display text-navy font-semibold leading-tight mb-3"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              Generation Failed
            </h2>
            <p className="font-body text-red-600/80 text-base leading-relaxed mb-6 max-w-md mx-auto">
              {state.generationError || 'Something went wrong. Your answers are saved — try again.'}
            </p>
            <button
              type="button"
              onClick={() => {
                hasTriggered.current = false
                generateDocument(config.slug, config.title)
              }}
              className="font-body font-semibold text-sm px-7 py-3 rounded-full
                         bg-teal text-white shadow-md shadow-teal/20
                         hover:bg-teal-light transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ── Streamed document output ── */}
        {(isStreaming || isDone) && state.streamedText && (
          <div
            ref={outputRef}
            className="relative bg-white rounded-2xl border border-navy/10 shadow-lg shadow-navy/5 mb-10 max-h-[70vh] overflow-y-auto"
          >
            {/* Document header accent */}
            <div className="h-1 bg-gradient-to-r from-teal via-ochre/50 to-teal rounded-t-2xl" />

            <div className="px-8 py-10 sm:px-12 sm:py-14">
              <pre className="font-body text-base text-navy/85 leading-relaxed whitespace-pre-wrap break-words" style={{ fontFamily: 'inherit' }}>
                {state.streamedText}
                {isStreaming && (
                  <span className="inline-block w-1.5 h-5 bg-teal ml-0.5 animate-pulse rounded-sm" />
                )}
              </pre>
            </div>
          </div>
        )}

        {/* ── Actions ── */}
        {isDone && (
          <div className="space-y-6">
            {/* Primary: Save to Vault */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={async () => {
                  setSavedToVault(true)
                  try {
                    await saveToVault({
                      content: state.streamedText,
                      anchorSlug: config.slug,
                      anchorTitle: config.title,
                      generatedAt: new Date().toISOString(),
                      answeredCount: totalAnswered,
                    })
                  } catch (e) {
                    console.warn('Save to vault failed', e)
                  }
                  setTimeout(() => router.push('/vault'), 800)
                }}
                disabled={savedToVault}
                className={`font-body font-bold text-sm tracking-[0.1em] uppercase px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-[1px] ${
                  savedToVault
                    ? 'bg-teal/20 text-teal border border-teal/30 cursor-default'
                    : 'bg-teal text-white shadow-teal/20 hover:bg-teal-light hover:shadow-xl hover:shadow-teal/30'
                }`}
              >
                {savedToVault ? 'Saved — Opening Vault...' : 'Save to Vault'}
              </button>
            </div>

            {/* Secondary: Copy, Download, Build Another */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleCopy}
                className={`font-body font-semibold text-sm px-7 py-3 rounded-full shadow-md transition-all duration-200 hover:-translate-y-[1px] ${
                  copied
                    ? 'bg-teal/20 text-teal border border-teal/30'
                    : 'bg-white text-navy border border-navy/15 hover:border-navy/30 hover:shadow-lg'
                }`}
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([state.streamedText], { type: 'text/markdown' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `${config.slug}-${new Date().toISOString().split('T')[0]}.md`
                  a.click()
                  URL.revokeObjectURL(url)
                }}
                className="font-body font-semibold text-sm px-7 py-3 rounded-full
                           bg-white text-navy border border-navy/15
                           hover:border-navy/30 hover:shadow-lg
                           transition-all duration-200 hover:-translate-y-[1px]"
              >
                Download .md
              </button>
              <Link
                href="/anchors"
                className="font-body text-sm text-navy/60 hover:text-navy px-5 py-2.5 transition-colors duration-200"
              >
                Build Another Anchor →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* What to Do With This — full-width navy section */}
      {isDone && (
        <section className="relative bg-navy overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 20% 50%, rgba(30, 190, 177, 0.08) 0%, transparent 70%),
                radial-gradient(ellipse 60% 60% at 80% 30%, rgba(196, 148, 58, 0.06) 0%, transparent 70%),
                radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0, 0, 0, 0.3) 0%, transparent 50%)
              `,
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
            <h3
              className="font-display text-cream font-bold leading-tight text-center mb-10"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
            >
              What to Do With This
            </h3>

            <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-teal font-bold text-sm">1</span>
                </div>
                <p className="font-body text-white/80 text-base leading-relaxed">
                  Copy your document using the button above, or download it as a markdown file. This is your {config.title} — keep it somewhere you can find it.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-teal font-bold text-sm">2</span>
                </div>
                <p className="font-body text-white/80 text-base leading-relaxed">
                  Upload it to your AI assistant — Claude, ChatGPT, Gemini, or whichever tool you use. Paste it into the custom instructions, project files, or system prompt. This is what gives your AI real context about who you are.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-teal font-bold text-sm">3</span>
                </div>
                <p className="font-body text-white/80 text-base leading-relaxed">
                  Start a conversation and see the difference. Your AI will stop guessing and start responding like it actually knows you — because now it does.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-ochre/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-ochre font-bold text-sm">4</span>
                </div>
                <div>
                  <p className="font-body text-white/80 text-base leading-relaxed">
                    Ready for more? Your {config.title} is just the first anchor. Build out your Writing Codex, Story Bank, State of the Union, Timeline, and Influence Roster to give your AI the full picture.
                  </p>
                  <Link
                    href="/anchors"
                    className="inline-flex items-center gap-2 mt-3 font-body font-semibold text-sm text-teal hover:text-teal-light transition-colors duration-200"
                  >
                    Explore all six anchors →
                  </Link>
                </div>
              </div>
            </div>

            {/* Start over */}
            <div className="text-center mt-14 pt-8 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={reset}
                className="font-body text-sm text-white/50 hover:text-white/80 px-6 py-3 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                Start Over — Build a New {config.title}
              </button>
            </div>
          </div>

          {/* Gold line before footer */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-ochre/50 to-transparent" aria-hidden="true" />
        </section>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

// ── Full Build Complete (Chart Your Course — generates all 6 anchors) ──

const FULL_BUILD_ORDER: Array<{ slug: string; title: string }> = [
  { slug: 'constitution', title: 'Personal Constitution' },
  { slug: 'codex', title: 'Writing Codex' },
  { slug: 'story-bank', title: 'Story Bank' },
  { slug: 'sotu', title: 'State of the Union' },
  { slug: 'timeline', title: 'Timeline' },
  { slug: 'roster', title: 'Influence Roster' },
]

function FullBuildComplete() {
  const { state, generateAllAnchors, resetFullBuild } = useWizard()
  const router = useRouter()
  const hasTriggered = useRef(false)
  const hasHydratedFromVault = useRef(false)
  const [navigating, setNavigating] = useState(false)

  // On mount, hydrate any anchors already saved to vault (handles mid-build reloads
  // where the user lost anchorGenerations state but their docs are still saved).
  // We dispatch one-time via the wizard's reducer by calling generateAllAnchors,
  // which now skips vault-existing anchors and hydrates their state inline.
  useEffect(() => {
    if (hasTriggered.current) return
    const anyInProgress = Object.values(state.anchorGenerations).some(
      (a) => a.phase === 'analyzing' || a.phase === 'generating' || a.phase === 'streaming'
    )
    const allDone =
      FULL_BUILD_ORDER.length > 0 &&
      FULL_BUILD_ORDER.every((a) => state.anchorGenerations[a.slug]?.phase === 'complete')
    if (!anyInProgress && !allDone) {
      hasTriggered.current = true
      hasHydratedFromVault.current = true
      generateAllAnchors()
    } else if (allDone) {
      hasTriggered.current = true
    }
  }, [generateAllAnchors, state.anchorGenerations])

  const completedCount = FULL_BUILD_ORDER.filter(
    (a) => state.anchorGenerations[a.slug]?.phase === 'complete'
  ).length
  const erroredCount = FULL_BUILD_ORDER.filter(
    (a) => state.anchorGenerations[a.slug]?.phase === 'error'
  ).length
  const allDone = completedCount === FULL_BUILD_ORDER.length
  const allFinished = completedCount + erroredCount === FULL_BUILD_ORDER.length

  const handleGoToVault = () => {
    setNavigating(true)
    setTimeout(() => router.push('/vault'), 400)
  }

  const handleRetryAll = () => {
    hasTriggered.current = false
    resetFullBuild()
    // useEffect will re-trigger on next render since anchorGenerations is empty
  }

  return (
    <div className="bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-10">
          {allDone ? (
            <>
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-teal/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#1ebeb1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2
                className="font-display text-navy font-semibold leading-tight mb-3"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
              >
                Your Six Anchors Are Ready
              </h2>
              <p className="font-body text-navy/60 text-base leading-relaxed max-w-xl mx-auto">
                Every anchor is built and saved to your vault. Open the vault to read, copy, download, or upload them to your AI.
              </p>
            </>
          ) : (
            <>
              <h2
                className="font-display text-navy font-semibold leading-tight mb-3"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
              >
                Generating Your Anchors
              </h2>
              <p className="font-body text-navy/55 text-base leading-relaxed max-w-xl mx-auto">
                Building one at a time. Each anchor takes a couple of minutes. {completedCount} of {FULL_BUILD_ORDER.length} done.
              </p>
            </>
          )}
        </div>

        {/* Progress grid */}
        <div className="space-y-3 mb-12">
          {FULL_BUILD_ORDER.map((anchor) => {
            const gen = state.anchorGenerations[anchor.slug]
            const phase = gen?.phase ?? 'idle'
            const isCurrent = state.currentGeneratingSlug === anchor.slug
            const isDone = phase === 'complete'
            const isError = phase === 'error'
            const isWorking =
              phase === 'analyzing' || phase === 'generating' || phase === 'streaming'

            const statusLabel = (() => {
              if (isDone) return 'Built'
              if (isError) return 'Failed'
              if (phase === 'analyzing') return 'Reading your answers...'
              if (phase === 'generating') return 'Writing...'
              if (phase === 'streaming') return 'Writing...'
              if (isCurrent) return 'Starting...'
              return 'Waiting'
            })()

            return (
              <div
                key={anchor.slug}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-300 ${
                  isDone
                    ? 'bg-teal/[0.04] border-teal/20'
                    : isError
                    ? 'bg-red-50 border-red-200'
                    : isWorking
                    ? 'bg-white border-ochre/30 shadow-md shadow-ochre/10'
                    : 'bg-cream border-navy/[0.08]'
                }`}
              >
                {/* Status icon */}
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center">
                  {isDone ? (
                    <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ) : isError ? (
                    <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M6 18L18 6" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  ) : isWorking ? (
                    <div className="w-9 h-9 rounded-full border-2 border-ochre/30 border-t-ochre animate-spin" />
                  ) : (
                    <div className="w-9 h-9 rounded-full border-2 border-navy/15" />
                  )}
                </div>

                {/* Anchor name + status */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-body text-navy font-semibold text-sm sm:text-base">
                      {anchor.title}
                    </p>
                    <p
                      className={`font-body text-xs tracking-wide ${
                        isDone
                          ? 'text-teal font-semibold'
                          : isError
                          ? 'text-red-600 font-semibold'
                          : isWorking
                          ? 'text-ochre font-semibold'
                          : 'text-navy/40'
                      }`}
                    >
                      {statusLabel}
                    </p>
                  </div>
                  {isError && gen?.error && (
                    <p className="font-body text-red-700/80 text-xs mt-1 leading-relaxed">
                      {gen.error}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        {allFinished && (
          <div className="space-y-5">
            {completedCount > 0 && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleGoToVault}
                  disabled={navigating}
                  className={`font-body font-bold text-sm tracking-[0.1em] uppercase px-12 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-[1px] ${
                    navigating
                      ? 'bg-teal/30 text-teal cursor-default'
                      : 'bg-teal text-white shadow-teal/25 hover:bg-teal-light hover:shadow-xl hover:shadow-teal/30'
                  }`}
                >
                  {navigating ? 'Opening Vault…' : 'Open Your Vault'}
                </button>
              </div>
            )}

            {erroredCount > 0 && (
              <div className="text-center">
                <p className="font-body text-navy/60 text-sm mb-3">
                  {erroredCount} of {FULL_BUILD_ORDER.length} anchor{erroredCount === 1 ? '' : 's'} didn&apos;t build. Your answers are saved — try again.
                </p>
                <button
                  type="button"
                  onClick={handleRetryAll}
                  className="font-body font-semibold text-sm px-7 py-3 rounded-full
                             bg-white text-navy border border-navy/15
                             hover:border-navy/30 hover:shadow-md
                             transition-all duration-200"
                >
                  Retry All Anchors
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Anchor Wizard Body (inside WizardProvider) ──

function AnchorWizardBody({ config }: { config: DocumentConfig }) {
  const { state, activeSections, isComplete, totalAnswered, reset } = useWizard()
  // Skip intro on resume if user already has answers (bug fix: refresh shows intro again)
  const [showingSectionIntro, setShowingSectionIntro] = useState(() => totalAnswered === 0)
  const [lastSection, setLastSection] = useState(state.currentSection)
  const [leadGatePassed, setLeadGatePassed] = useState(() => hasLeadBeenCaptured())
  const questionCount = config.sections.reduce<number>(
    (sum, s) => sum + getQuestionsForSection(s).length,
    0
  )

  // Detect section changes to show transition
  // Skip intro when navigating backward (user already saw it)
  if (state.currentSection !== lastSection) {
    const oldIdx = activeSections.indexOf(lastSection)
    const newIdx = activeSections.indexOf(state.currentSection)
    const isGoingBack = newIdx < oldIdx
    setLastSection(state.currentSection)
    setShowingSectionIntro(!isGoingBack)
  }

  // Gate: show lead capture form after last question, before generation (Constitution only)
  const needsLeadGate = config.slug === 'constitution' && !leadGatePassed

  if (isComplete && needsLeadGate) {
    return (
      <>
        <DocumentHero config={config} />
        <LeadGateForm
          totalAnswered={totalAnswered}
          onComplete={() => setLeadGatePassed(true)}
          onStartOver={reset}
        />
      </>
    )
  }

  if (isComplete) {
    const isFullBuild = config.slug === 'chart-your-course'
    return (
      <>
        <DocumentHero config={config} />
        {isFullBuild ? <FullBuildComplete /> : <AnchorComplete config={config} />}
      </>
    )
  }

  const contentSections = activeSections.filter(s => s !== 0) as number[]
  const currentIdx = contentSections.indexOf(state.currentSection as number)

  // Suppress the "Build All Six" upsell when the user is already on the all-in-one journey.
  const showFullBuildCTA =
    showingSectionIntro && state.currentSection === 0 && config.slug !== 'chart-your-course'

  return (
    <div className="min-h-screen bg-cream">
      <DocumentHero config={config} />


      {/* Progress bar */}
      <div className="sticky top-0 z-20 bg-cream/95 backdrop-blur-sm border-b border-navy/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <ProgressBar />
        </div>
      </div>

      {/* Questions */}
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
        {showingSectionIntro ? (
          <SectionTransition
            section={state.currentSection}
            onBegin={() => setShowingSectionIntro(false)}
            anchorSlug={config.slug}
            totalSections={contentSections.length}
            sectionIndex={currentIdx >= 0 ? currentIdx + 1 : undefined}
          />
        ) : (
          <QuestionStep />
        )}
      </main>

      {/* Full-width upsell — only on Getting Started intro */}
      {showFullBuildCTA && <FullBuildCTA currentSlug={config.slug} />}
    </div>
  )
}

// ── Main Export ──

export function DocumentWizard({ config }: { config: DocumentConfig }) {
  return (
    <WizardProvider
      filterSections={config.sections}
      storageKey={config.slug}
    >
      <AnchorWizardBody config={config} />
    </WizardProvider>
  )
}
