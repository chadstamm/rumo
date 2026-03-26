'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'

// ── Bold anchor icons ──

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path d="M24 4L6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 4z" fill="currentColor" opacity="0.1" />
      <path d="M24 4L6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M16 24l5 5 10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function QuillIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path d="M38 4c-8 4-16 12-20 22l-2 8 8-2c10-4 18-12 22-20" fill="currentColor" opacity="0.1" />
      <path d="M38 4c-8 4-16 12-20 22l-2 8 8-2c10-4 18-12 22-20" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M16 26l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 42l10-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path d="M24 10C20 8 14 7 8 8v28c6-1 12 0 16 2" fill="currentColor" opacity="0.1" />
      <path d="M24 10c4-2 10-3 16-2v28c-6-1-12 0-16 2" fill="currentColor" opacity="0.1" />
      <path d="M24 10C20 8 14 7 8 8v28c6-1 12 0 16 2" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 10c4-2 10-3 16-2v28c-6-1-12 0-16 2" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 10v28" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="13" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <polygon points="24,6 27,20 24,17 21,20" fill="currentColor" />
      <polygon points="24,42 21,28 24,31 27,28" fill="currentColor" opacity="0.25" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  )
}

function TimelineNodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="2.5" opacity="0.2" />
      <circle cx="12" cy="24" r="4" fill="currentColor" opacity="0.25" />
      <circle cx="24" cy="24" r="5" fill="currentColor" />
      <circle cx="36" cy="24" r="4" fill="currentColor" opacity="0.25" />
      <line x1="12" y1="12" x2="12" y2="19" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <line x1="24" y1="10" x2="24" y2="18" stroke="currentColor" strokeWidth="2.5" />
      <line x1="36" y1="12" x2="36" y2="19" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <path d="M40 21l5 3-5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
    </svg>
  )
}

function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="16" r="6" fill="currentColor" />
      <path d="M14 38c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="currentColor" opacity="0.15" />
      <circle cx="10" cy="22" r="4.5" fill="currentColor" opacity="0.35" />
      <path d="M2 38c0-4.4 3.6-8 8-8" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <circle cx="38" cy="22" r="4.5" fill="currentColor" opacity="0.35" />
      <path d="M46 38c0-4.4-3.6-8-8-8" stroke="currentColor" strokeWidth="2" opacity="0.2" />
    </svg>
  )
}

// ── Small tab icons (compact versions) ──

function SmallShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 6v6c0 5.6 3.8 10.7 9 12 5.2-1.3 9-6.4 9-12V6L12 2z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function SmallQuill({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M20 2c-4 2-8 6-10 11l-1 4 4-1c5-2 9-6 11-10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 21l5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SmallBook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 5C10 4 7 3.5 4 4v14c3-.5 6 0 8 1m0-14c2-1 5-1.5 8-.5v14c-3-.5-6 0-8 1m0-14v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function SmallCompass({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="12,3 13.5,10 12,8.5 10.5,10" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

function SmallTimeline({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="6" cy="12" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <circle cx="18" cy="12" r="2" fill="currentColor" opacity="0.35" />
    </svg>
  )
}

function SmallPeople({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3" fill="currentColor" />
      <path d="M7 19c0-2.8 2.2-5 5-5s5 2.2 5 5" fill="currentColor" opacity="0.15" />
      <circle cx="5" cy="11" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="19" cy="11" r="2" fill="currentColor" opacity="0.35" />
    </svg>
  )
}

// ── Anchor data ──

const ANCHORS: {
  name: string
  desc: string
  detail: string
  slug: string
  number: string
  accent: string
  Icon: (props: { className?: string }) => ReactNode
  SmallIcon: (props: { className?: string }) => ReactNode
}[] = [
  {
    name: 'Personal Constitution',
    desc: 'Who you are always',
    detail: 'Your values, beliefs, non-negotiables, and aspirations — the foundation document that tells AI what you stand for.',
    slug: 'constitution',
    number: '01',
    accent: '#c4943a',
    Icon: ShieldIcon,
    SmallIcon: SmallShield,
  },
  {
    name: 'Writing Codex',
    desc: 'How you write',
    detail: 'Your sentence rhythms, humor, metaphors, and the words you never use. A complete voice fingerprint built from your own patterns.',
    slug: 'codex',
    number: '02',
    accent: '#1ebeb1',
    Icon: QuillIcon,
    SmallIcon: SmallQuill,
  },
  {
    name: 'Story Bank',
    desc: 'What you\'ve lived',
    detail: 'The moments that shaped you — smells, failures, crossroads, places that felt like home. Raw material that makes AI feel lived-in.',
    slug: 'story-bank',
    number: '03',
    accent: '#c4943a',
    Icon: BookIcon,
    SmallIcon: SmallBook,
  },
  {
    name: 'State of the Union',
    desc: 'Where you are right now',
    detail: 'Your current situation, active challenges, and immediate priorities. A living document that evolves as your life does.',
    slug: 'sotu',
    number: '04',
    accent: '#1ebeb1',
    Icon: CompassIcon,
    SmallIcon: SmallCompass,
  },
  {
    name: 'Timeline',
    desc: 'Your arc and trajectory',
    detail: 'Life chapters, milestones, and where you\'re headed. The chronological context that tells AI not just who you are, but how you got here.',
    slug: 'timeline',
    number: '05',
    accent: '#c4943a',
    Icon: TimelineNodeIcon,
    SmallIcon: SmallTimeline,
  },
  {
    name: 'Roster',
    desc: 'The people who matter',
    detail: 'Your inner circle, professional network, and relationship patterns. The people context that helps AI navigate your world.',
    slug: 'roster',
    number: '06',
    accent: '#1ebeb1',
    Icon: PeopleIcon,
    SmallIcon: SmallPeople,
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
        className="reveal relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36 lg:py-44"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
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
                The difference between generic AI output and something that actually sounds like you comes down to one thing: context. Your identity, your voice, your lived experience. When AI has those inputs, it stops guessing and starts collaborating.
              </p>
              <p className="font-body text-cream/70 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed">
                The fix is simple: give AI your context before you give it your questions. The harder part is knowing how to compile that context in a way AI can actually use.
              </p>
            </div>
          </div>

          {/* ── Right: Interactive Anchor Showcase ── */}
          <div className="lg:pt-2">
            {/* Header — centered, white anchor icon + title */}
            <div className="text-center mb-8">
              {/* Anchor icon */}
              <svg className="w-10 h-10 mx-auto mb-3 text-white/80" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="10" r="4" stroke="currentColor" strokeWidth="2.5" />
                <line x1="24" y1="14" x2="24" y2="40" stroke="currentColor" strokeWidth="2.5" />
                <path d="M14 30c0 5.5 4.5 10 10 10s10-4.5 10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="18" y1="24" x2="30" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <h3 className="font-display text-white text-xl sm:text-2xl font-semibold">
                The 6 Context Anchors
              </h3>
            </div>

            {/* Featured anchor card — white background */}
            <Link
              href={`/docs/${active.slug}`}
              className="group block relative rounded-2xl overflow-hidden bg-white shadow-xl shadow-navy/15
                         transition-all duration-500 hover:shadow-2xl hover:shadow-navy/20
                         hover:-translate-y-1"
            >
              {/* Accent top bar */}
              <div
                className="h-1 w-full transition-colors duration-500"
                style={{ background: active.accent }}
              />

              <div className="px-8 py-8 sm:px-10 sm:py-10 text-center">
                {/* Large icon — crossfade */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6">
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

                {/* Number */}
                <span
                  className="font-display text-sm font-bold tracking-[0.3em] uppercase transition-colors duration-500"
                  style={{ color: `${active.accent}80` }}
                >
                  Anchor {active.number}
                </span>

                {/* Title */}
                <h4 className="font-display text-navy text-2xl sm:text-3xl font-semibold mt-2 mb-2 transition-colors duration-200">
                  {active.name}
                </h4>

                {/* Subtitle */}
                <p className="font-body text-navy/40 text-sm font-medium mb-4">
                  {active.desc}
                </p>

                {/* Detail copy */}
                <p className="font-body text-navy/55 text-sm leading-relaxed max-w-sm mx-auto">
                  {active.detail}
                </p>

                {/* Explore CTA — reveals on hover */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300
                                translate-y-2 group-hover:translate-y-0">
                  <span
                    className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-wide uppercase"
                    style={{ color: active.accent }}
                  >
                    Explore this anchor
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

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

                    {/* Icon */}
                    <div
                      className="w-6 h-6 transition-all duration-300"
                      style={{
                        color: isActive ? anchor.accent : 'rgba(255,255,255,0.3)',
                        transform: isActive ? 'scale(1.15)' : 'scale(1)',
                      }}
                    >
                      <anchor.SmallIcon className="w-full h-full" />
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Bottom CTA row */}
            <div className="mt-5 flex items-center justify-between">
              <Link
                href="/anchors"
                className="font-body text-xs font-medium tracking-wide text-white/40 hover:text-white/70 transition-colors duration-300"
              >
                Explore all anchors →
              </Link>
              <Link
                href="/start"
                className="shimmer-hover font-body text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-full
                           bg-ochre/90 text-white hover:bg-ochre transition-all duration-200"
              >
                Chart Your Course
              </Link>
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
