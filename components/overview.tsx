'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
  AnchorIcon, QuillIcon, ShipLogIcon, CompassIcon, ChronIcon, HelmIcon,
  SmallAnchorIcon, SmallQuillIcon, SmallShipLogIcon, SmallCompassIcon, SmallChronIcon, SmallHelmIcon,
} from '@/components/icons/anchor-icons'

// ── Anchor data ──

const ANCHORS = [
  {
    name: 'Personal Constitution',
    desc: 'Who you are always',
    detail: 'Your values, beliefs, non-negotiables, and aspirations — the foundation document that tells AI what you stand for.',
    slug: 'constitution',
    number: '01',
    accent: '#c4943a',
    Icon: AnchorIcon,
    SmallIcon: SmallAnchorIcon,
  },
  {
    name: 'Writing Codex',
    desc: 'How you write',
    detail: 'Your sentence rhythms, humor, metaphors, and the words you never use. A complete voice fingerprint built from your own patterns.',
    slug: 'codex',
    number: '02',
    accent: '#1ebeb1',
    Icon: QuillIcon,
    SmallIcon: SmallQuillIcon,
  },
  {
    name: 'Story Bank',
    desc: 'What you\'ve lived',
    detail: 'The moments that shaped you — smells, failures, crossroads, places that felt like home. Raw material that makes AI feel lived-in.',
    slug: 'story-bank',
    number: '03',
    accent: '#c4943a',
    Icon: ShipLogIcon,
    SmallIcon: SmallShipLogIcon,
  },
  {
    name: 'State of the Union',
    desc: 'Where you are right now',
    detail: 'Your current situation, active challenges, and immediate priorities. A living document that evolves as your life does.',
    slug: 'sotu',
    number: '04',
    accent: '#1ebeb1',
    Icon: CompassIcon,
    SmallIcon: SmallCompassIcon,
  },
  {
    name: 'Timeline',
    desc: 'Your arc and trajectory',
    detail: 'Life chapters, milestones, and where you\'re headed. The chronological context that tells AI not just who you are, but how you got here.',
    slug: 'timeline',
    number: '05',
    accent: '#c4943a',
    Icon: ChronIcon,
    SmallIcon: SmallChronIcon,
  },
  {
    name: 'Roster',
    desc: 'The people who matter',
    detail: 'Your inner circle, professional network, and relationship patterns. The people context that helps AI navigate your world.',
    slug: 'roster',
    number: '06',
    accent: '#1ebeb1',
    Icon: HelmIcon,
    SmallIcon: SmallHelmIcon,
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
