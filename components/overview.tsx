'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { useState, useEffect, useRef, useCallback } from 'react'

// ── Anchor showcase data ──

const ANCHORS = [
  {
    name: 'Personal Constitution',
    desc: 'Who you are always',
    detail: 'Your values, beliefs, non-negotiables, and aspirations — the foundation document that tells AI what you stand for.',
    slug: 'constitution',
    image: '/anchors/constitution.jpg',
    number: '01',
    accent: '#c4943a',
  },
  {
    name: 'Writing Codex',
    desc: 'How you write',
    detail: 'Your sentence rhythms, humor, metaphors, and the words you never use. A complete voice fingerprint built from your own patterns.',
    slug: 'codex',
    image: '/anchors/codex.jpg',
    number: '02',
    accent: '#1ebeb1',
  },
  {
    name: 'Story Bank',
    desc: 'What you\'ve lived',
    detail: 'The moments that shaped you — smells, failures, crossroads, places that felt like home. Raw material that makes AI feel lived-in.',
    slug: 'story-bank',
    image: '/anchors/story-bank.jpg',
    number: '03',
    accent: '#c4943a',
  },
  {
    name: 'State of the Union',
    desc: 'Where you are right now',
    detail: 'Your current situation, active challenges, and immediate priorities. A living document that evolves as your life does.',
    slug: 'sotu',
    image: '/anchors/sotu.jpg',
    number: '04',
    accent: '#1ebeb1',
  },
  {
    name: 'Timeline',
    desc: 'Your arc and trajectory',
    detail: 'Life chapters, milestones, and where you\'re headed. The chronological context that tells AI not just who you are, but how you got here.',
    slug: 'timeline',
    image: '/anchors/timeline.jpg',
    number: '05',
    accent: '#c4943a',
  },
  {
    name: 'Roster',
    desc: 'The people who matter',
    detail: 'Your inner circle, professional network, and relationship patterns. The people context that helps AI navigate your world.',
    slug: 'roster',
    image: '/anchors/roster.jpg',
    number: '06',
    accent: '#1ebeb1',
  },
]

// ── Main Component ──

export function Overview() {
  const sectionRef = useScrollReveal(0.1)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const active = ANCHORS[activeIndex]

  // Auto-cycle through anchors
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
    // Resume auto-play after 8 seconds of inactivity
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

      {/* Darker overlay */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(26, 39, 68, 0.93) 0%,
              rgba(26, 39, 68, 0.90) 40%,
              rgba(26, 39, 68, 0.82) 70%,
              rgba(30, 35, 44, 0.72) 100%
            )
          `,
        }}
      />

      {/* Ochre wash */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(196, 148, 58, 0.03) 0%,
              rgba(196, 148, 58, 0.06) 40%,
              rgba(196, 148, 58, 0.14) 75%,
              rgba(196, 148, 58, 0.25) 100%
            )
          `,
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
                         text-[clamp(2rem,5.5vw,3.75rem)]
                         mb-10 sm:mb-14"
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
            {/* Featured anchor — large image card */}
            <Link
              href={`/docs/${active.slug}`}
              className="group block relative rounded-2xl overflow-hidden mb-4
                         aspect-[4/3] cursor-pointer"
            >
              {/* All images stacked, only active visible */}
              {ANCHORS.map((anchor, i) => (
                <img
                  key={anchor.slug}
                  src={anchor.image}
                  alt={anchor.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                  style={{ opacity: i === activeIndex ? 1 : 0 }}
                />
              ))}

              {/* Gradient overlay for text readability */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: `
                    linear-gradient(to top,
                      rgba(26, 39, 68, 0.95) 0%,
                      rgba(26, 39, 68, 0.6) 35%,
                      rgba(26, 39, 68, 0.15) 65%,
                      rgba(26, 39, 68, 0.05) 100%
                    )
                  `,
                }}
              />

              {/* Hover shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${active.accent}10, transparent 70%)`,
                }}
              />

              {/* Content overlay — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                {/* Number + accent line */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-display text-3xl sm:text-4xl font-bold leading-none transition-all duration-500"
                    style={{ color: `${active.accent}60` }}
                  >
                    {active.number}
                  </span>
                  <div
                    className="h-[2px] flex-1 max-w-[40px] rounded-full transition-all duration-500"
                    style={{ background: active.accent }}
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-white text-xl sm:text-2xl font-semibold leading-tight mb-2
                               group-hover:text-white transition-colors duration-200">
                  {active.name}
                </h3>

                {/* Description — crossfades with content */}
                <p className="font-body text-white/60 text-sm sm:text-base leading-relaxed max-w-md transition-opacity duration-500">
                  {active.detail}
                </p>

                {/* Explore link */}
                <div className="mt-4 flex items-center gap-2 font-body text-xs font-semibold tracking-wide uppercase
                                opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                  style={{ color: active.accent }}
                >
                  Explore this anchor
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Top-right: subtle anchor indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full
                              bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: active.accent }} />
                <span className="font-body text-[10px] text-white/60 tracking-wide uppercase">
                  Context Anchor
                </span>
              </div>
            </Link>

            {/* Anchor selector tabs — horizontal strip */}
            <div className="grid grid-cols-6 gap-1.5">
              {ANCHORS.map((anchor, i) => {
                const isActive = i === activeIndex
                return (
                  <button
                    key={anchor.slug}
                    onClick={() => handleSelect(i)}
                    onMouseEnter={() => handleSelect(i)}
                    className="group relative rounded-lg overflow-hidden transition-all duration-300"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                      border: isActive ? `1px solid ${anchor.accent}40` : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* Progress bar — shows auto-play timing */}
                    {isActive && isAutoPlaying && (
                      <div className="absolute top-0 left-0 right-0 h-[2px]">
                        <div
                          className="h-full rounded-full anchor-progress"
                          style={{ background: anchor.accent }}
                        />
                      </div>
                    )}

                    {/* Static accent bar when not auto-playing */}
                    {isActive && !isAutoPlaying && (
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: anchor.accent }}
                      />
                    )}

                    <div className="px-2 py-3 text-center">
                      <p className={`font-body text-[10px] sm:text-[11px] font-semibold leading-tight transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                      }`}>
                        {anchor.name.split(' ').slice(-1)[0]}
                      </p>
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
                           bg-ochre/90 text-white
                           hover:bg-ochre transition-all duration-200"
              >
                Chart Your Course
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Animation styles ── */}
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
