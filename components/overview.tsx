'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { useState, useEffect, useRef, useCallback } from 'react'

// ── SVG Icons (clean stroke style matching anchor section icon) ──

function ScrollPenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Scroll */}
      <path d="M12 14c0-3.3 2.7-6 6-6h2c3.3 0 6 2.7 6 6" />
      <path d="M12 14v32c0 3.3 2.7 6 6 6h2" />
      <rect x="20" y="8" width="20" height="44" rx="2" />
      <path d="M40 52h2c3.3 0 6-2.7 6-6V14" />
      <path d="M40 14c0-3.3-2.7-6-6-6" />
      {/* Feather pen */}
      <path d="M46 18l-8 8" />
      <path d="M50 8c-4 0-8 4-12 10l2 2c6-4 10-8 10-12z" />
      <path d="M38 26l-2 6 6-2" />
    </svg>
  )
}

function TypewriterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="28" width="44" height="24" rx="3" />
      <path d="M16 28V18a2 2 0 012-2h28a2 2 0 012 2v10" />
      <path d="M22 16h20v8H22z" />
      {/* Keys */}
      <circle cx="22" cy="38" r="2" />
      <circle cx="30" cy="38" r="2" />
      <circle cx="38" cy="38" r="2" />
      <circle cx="26" cy="45" r="2" />
      <circle cx="34" cy="45" r="2" />
      <circle cx="42" cy="38" r="2" />
      {/* Paper */}
      <path d="M24 16V10h16v6" />
      <line x1="28" y1="12" x2="36" y2="12" />
    </svg>
  )
}

function VaultIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="12" width="44" height="40" rx="4" />
      {/* Door frame */}
      <rect x="16" y="18" width="32" height="28" rx="2" />
      {/* Dial */}
      <circle cx="32" cy="32" r="8" />
      <circle cx="32" cy="32" r="3" />
      {/* Dial marks */}
      <line x1="32" y1="24" x2="32" y2="26" />
      <line x1="32" y1="38" x2="32" y2="40" />
      <line x1="24" y1="32" x2="26" y2="32" />
      <line x1="38" y1="32" x2="40" y2="32" />
      {/* Handle */}
      <path d="M42 28v8" />
      {/* Hinges */}
      <line x1="14" y1="22" x2="14" y2="26" />
      <line x1="14" y1="38" x2="14" y2="42" />
    </svg>
  )
}

function PulseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Heartbeat line */}
      <polyline points="6,34 16,34 20,22 26,46 32,18 38,42 42,28 46,34 58,34" />
      {/* Subtle circle frame */}
      <circle cx="32" cy="32" r="26" strokeWidth="1.5" opacity="0.3" />
    </svg>
  )
}

function PathIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Winding path */}
      <path d="M12 52c8-4 8-12 16-12s8 8 16 8 8-12 16-16" strokeWidth="2.5" />
      {/* Milestone markers */}
      <circle cx="12" cy="52" r="3" fill="currentColor" />
      <circle cx="28" cy="40" r="3" fill="currentColor" />
      <circle cx="44" cy="48" r="3" fill="currentColor" />
      <circle cx="56" cy="32" r="3" fill="currentColor" />
      {/* Flag at end */}
      <line x1="56" y1="32" x2="56" y2="16" />
      <path d="M56 16h-8v6h8" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Center person */}
      <circle cx="32" cy="20" r="6" />
      <path d="M22 44c0-5.5 4.5-10 10-10s10 4.5 10 10" />
      {/* Left person */}
      <circle cx="14" cy="24" r="5" />
      <path d="M6 46c0-4.5 3.5-8 8-8s8 3.5 8 8" />
      {/* Right person */}
      <circle cx="50" cy="24" r="5" />
      <path d="M42 46c0-4.5 3.5-8 8-8s8 3.5 8 8" />
    </svg>
  )
}

// ── Anchor data ──

const ANCHORS = [
  {
    name: 'Personal Constitution',
    question: 'Who am I, and what do I stand for?',
    detail: 'Your values, beliefs, non-negotiables, and aspirations — the foundation document that tells AI what you stand for.',
    slug: 'constitution',
    accent: '#c4943a',
    Icon: ScrollPenIcon,
  },
  {
    name: 'Writing Codex',
    question: 'How do I write?',
    detail: 'Your sentence rhythms, humor, metaphors, and the words you never use. A complete voice fingerprint built from your own patterns.',
    slug: 'codex',
    accent: '#1ebeb1',
    Icon: TypewriterIcon,
  },
  {
    name: 'Story Bank',
    question: 'What stories do I always tell?',
    detail: 'The moments that shaped you — smells, failures, crossroads, places that felt like home. Raw material that makes AI feel lived-in.',
    slug: 'story-bank',
    accent: '#c4943a',
    Icon: VaultIcon,
  },
  {
    name: 'State of the Union',
    question: 'What matters to me right now?',
    detail: 'Your current situation, active challenges, and immediate priorities. A living document that evolves as your life does.',
    slug: 'sotu',
    accent: '#1ebeb1',
    Icon: PulseIcon,
  },
  {
    name: 'Timeline',
    question: 'How has my life unfolded?',
    detail: 'Life chapters, milestones, and where you\'re headed. The chronological context that tells AI not just who you are, but how you got here.',
    slug: 'timeline',
    accent: '#c4943a',
    Icon: PathIcon,
  },
  {
    name: 'Roster',
    question: 'Who are the people that matter?',
    detail: 'Your inner circle, professional network, and relationship patterns. The people context that helps AI navigate your world.',
    slug: 'roster',
    accent: '#1ebeb1',
    Icon: PeopleIcon,
  },
]

// ── Main Component ──

export function Overview() {
  const sectionRef = useScrollReveal(0.1)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const active = ANCHORS[activeIndex]

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % ANCHORS.length)
    }, 4000)
  }, [])

  useEffect(() => {
    if (isAutoPlaying) startAutoPlay()
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isAutoPlaying, startAutoPlay])

  const handleSelect = (index: number) => {
    setActiveIndex(index)
    setIsAutoPlaying(false)
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const handlePrev = () => {
    handleSelect((activeIndex - 1 + ANCHORS.length) % ANCHORS.length)
  }

  const handleNext = () => {
    handleSelect((activeIndex + 1) % ANCHORS.length)
  }

  return (
    <section className="relative overflow-hidden">
      {/* ── Background image ── */}
      <Image
        src="/overview-bg.jpg"
        alt=""
        fill
        className="object-cover"
        priority={false}
        aria-hidden="true"
      />

      {/* Overlays */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to bottom,
            rgba(26, 39, 68, 0.93) 0%, rgba(26, 39, 68, 0.90) 40%,
            rgba(26, 39, 68, 0.82) 70%, rgba(30, 35, 44, 0.72) 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to bottom,
            rgba(196, 148, 58, 0.03) 0%, rgba(196, 148, 58, 0.06) 40%,
            rgba(196, 148, 58, 0.14) 75%, rgba(196, 148, 58, 0.25) 100%)`,
        }}
      />

      <div
        ref={sectionRef}
        className="reveal relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36 lg:py-44"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16 items-start">
          {/* ── Left: Editorial text ── */}
          <div>
            <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-8 sm:mb-10">
              The Missing Ingredient
            </p>

            <h2
              className="font-display text-cream font-bold leading-[1.1] tracking-tight
                         text-[clamp(2rem,5.5vw,3.75rem)] mb-10 sm:mb-14"
            >
              AI Is Only As Good
              <br />
              <span className="text-ochre-light">As What You Give It.</span>
            </h2>

            <div className="w-12 h-[2px] bg-ochre/50 mb-10 sm:mb-14" aria-hidden="true" />

            <div className="space-y-5 sm:space-y-6">
              <p className="font-body text-cream/70 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
                The difference between generic AI output and something that actually works for you comes down to one thing: context. Your identity, your voice, your lived experience. When AI has those inputs, it stops guessing and starts collaborating.
              </p>
              <p className="font-body text-cream/70 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
                The fix is simple: give AI your context before you give it your questions. The harder part is compiling that context in a way AI can actually use.
              </p>
            </div>
          </div>

          {/* ── Right: Interactive Anchor Showcase ── */}
          <div className="lg:pt-2">
            {/* Header — anchor icon + script title */}
            <div className="text-center mb-8">
              <Image
                src="/anchor-section-icon.png"
                alt=""
                width={40}
                height={40}
                className="mx-auto mb-3 opacity-80"
                aria-hidden="true"
              />
              <h3 className="font-script text-white text-2xl sm:text-3xl">
                The 6 Context Anchors
              </h3>
            </div>

            {/* Arrow + Card row */}
            <div className="flex items-center gap-3">
              {/* Left arrow */}
              <button
                onClick={handlePrev}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full
                           bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25
                           text-white/50 hover:text-white transition-all duration-200"
                aria-label="Previous anchor"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Featured anchor card */}
              <Link
                href={`/docs/${active.slug}`}
                className="group block flex-1 relative rounded-2xl overflow-hidden bg-white shadow-xl shadow-navy/15
                           transition-all duration-500 hover:shadow-2xl hover:shadow-navy/20
                           hover:-translate-y-1"
              >
                {/* Accent top bar */}
                <div
                  className="h-1 w-full transition-colors duration-500"
                  style={{ background: active.accent }}
                />

                <div className="px-6 py-8 sm:px-8 sm:py-10 text-center">
                  {/* Large icon — crossfade */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5">
                    {ANCHORS.map((anchor, i) => (
                      <div
                        key={anchor.slug}
                        className="absolute inset-0 transition-all duration-500"
                        style={{
                          opacity: i === activeIndex ? 1 : 0,
                          transform: i === activeIndex ? 'scale(1)' : 'scale(0.85)',
                          color: anchor.accent,
                        }}
                      >
                        <anchor.Icon className="w-full h-full" />
                      </div>
                    ))}
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-navy text-xl sm:text-2xl font-semibold mb-2 transition-colors duration-200">
                    {active.name}
                  </h4>

                  {/* Question subtitle */}
                  <p className="font-body text-navy/50 text-sm sm:text-base italic mb-4">
                    {active.question}
                  </p>

                  {/* Detail copy */}
                  <p className="font-body text-navy/65 text-sm sm:text-base font-medium leading-relaxed max-w-sm mx-auto">
                    {active.detail}
                  </p>
                </div>
              </Link>

              {/* Right arrow */}
              <button
                onClick={handleNext}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full
                           bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25
                           text-white/50 hover:text-white transition-all duration-200"
                aria-label="Next anchor"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Icon selector strip */}
            <div className="grid grid-cols-6 gap-2 mt-4">
              {ANCHORS.map((anchor, i) => {
                const isActive = i === activeIndex
                return (
                  <button
                    key={anchor.slug}
                    onClick={() => handleSelect(i)}
                    onMouseEnter={() => handleSelect(i)}
                    className="group relative rounded-xl py-3 flex flex-col items-center justify-center gap-1.5
                               transition-all duration-300"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                      border: isActive ? `1px solid ${anchor.accent}50` : '1px solid rgba(255,255,255,0.06)',
                    }}
                    aria-label={anchor.name}
                  >
                    {/* Progress bar */}
                    {isActive && isAutoPlaying && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl overflow-hidden">
                        <div className="h-full anchor-progress" style={{ background: anchor.accent }} />
                      </div>
                    )}
                    {isActive && !isAutoPlaying && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl" style={{ background: anchor.accent }} />
                    )}

                    {/* Small icon */}
                    <div
                      className="w-6 h-6 transition-all duration-300"
                      style={{
                        color: isActive ? anchor.accent : 'rgba(255,255,255,0.3)',
                        transform: isActive ? 'scale(1.15)' : 'scale(1)',
                      }}
                    >
                      <anchor.Icon className="w-full h-full" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes anchorProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .anchor-progress {
          animation: anchorProgress 4s linear forwards;
        }
      `}</style>
    </section>
  )
}
