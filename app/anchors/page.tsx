import Image from 'next/image'
import Link from 'next/link'
import { DOCUMENTS } from '@/data/documents'

export const metadata = {
  title: 'Context Anchors — RUMO',
  description: 'Six context anchors that give your AI agent the foundation it needs. Identity, voice, stories, situation, timeline, and roster.',
}

const ANCHOR_ICONS: Record<string, string> = {
  constitution: '/icons/constitution.png',
  codex: '/icons/codex.png',
  'story-bank': '/icons/story-bank.png',
  sotu: '/icons/sotu.png',
  timeline: '/icons/timeline.png',
  roster: '/icons/roster.png',
}

const ANCHOR_QUESTIONS: Record<string, string> = {
  constitution: 'Who am I? What do I stand for?',
  codex: 'How do I write?',
  'story-bank': 'What stories do I always tell?',
  sotu: 'What matters to me right now?',
  timeline: 'How has my life unfolded?',
  roster: 'Who are the people that matter?',
}

export default function AnchorsPage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero with anchor image ── */}
      <div className="relative overflow-hidden">
        <Image
          src="/anchors-hero.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background: 'linear-gradient(to bottom, rgba(26, 39, 68, 0.72) 0%, rgba(26, 39, 68, 0.82) 100%)',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-16 sm:pb-20">
          <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-6 sm:mb-8">
            The Foundation
          </p>
          <h1
            className="font-display text-cream font-bold leading-[1.1] tracking-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Context Anchors
          </h1>
          <div className="w-12 h-[2px] bg-ochre/50 mb-6 sm:mb-8" aria-hidden="true" />
          <p className="font-body text-cream/60 text-lg sm:text-xl leading-relaxed max-w-2xl">
            Context Anchors are the documents you give AI to help it give you personalized results. Each document answers a different question your AI needs to know — who you are, how you write, what you&apos;ve lived, where you are right now, how your life has unfolded, and who matters most. Build them one at a time, or chart the full course.
          </p>
        </div>
      </div>

      {/* ── Anchor cards on cream ── */}
      <div className="bg-cream">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {DOCUMENTS.map((doc) => {
              const isFree = doc.slug === 'constitution'
              const accent = isFree ? '#1ebeb1' : '#c4943a'
              const icon = ANCHOR_ICONS[doc.slug]
              const question = ANCHOR_QUESTIONS[doc.slug]

              return (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className={`group relative block rounded-2xl overflow-hidden
                             bg-cream border-2 border-navy/15
                             transition-all duration-500 ease-out
                             hover:-translate-y-3 hover:scale-[1.02]
                             hover:border-navy/30 hover:shadow-xl hover:shadow-navy/10
                             ${isFree ? 'ring-1 ring-teal/30' : ''}`}
                  style={{
                    // @ts-expect-error CSS custom property
                    '--anchor-accent': accent,
                  }}
                >
                  {/* Accent top bar */}
                  <div
                    className={`h-[3px] group-hover:h-[5px] w-full transition-all duration-500 ${isFree ? 'opacity-100' : 'opacity-60'} group-hover:opacity-100`}
                    style={{ background: accent }}
                  />

                  <div className="px-7 py-8 sm:px-8 sm:py-9">
                    {/* Icon + Free badge */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="transition-all duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3">
                        {icon && (
                          <Image
                            src={icon}
                            alt=""
                            width={44}
                            height={44}
                            className="opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      {isFree && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full
                                         bg-teal/10 border border-teal/25
                                         font-body text-[11px] font-bold tracking-[0.15em] uppercase text-teal
                                         transition-all duration-300 group-hover:bg-teal/20 group-hover:border-teal/40">
                          Free
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2
                      className="font-display text-2xl sm:text-[1.7rem] font-semibold mb-3 transition-colors duration-300
                                 text-navy group-hover:text-[--anchor-accent]"
                    >
                      {doc.title}
                    </h2>

                    {/* Question */}
                    {question && (
                      <p
                        className="font-body text-sm sm:text-base italic font-semibold mb-5 transition-all duration-300 group-hover:translate-x-1"
                        style={{ color: accent }}
                      >
                        &ldquo;{question}&rdquo;
                      </p>
                    )}

                    {/* Description */}
                    <p className="font-body text-navy/50 text-sm sm:text-[0.95rem] font-medium leading-relaxed group-hover:text-navy/70 transition-colors duration-300">
                      {doc.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-6 flex items-center gap-2
                                    opacity-0 group-hover:opacity-100
                                    -translate-x-3 group-hover:translate-x-0
                                    transition-all duration-400 ease-out">
                      <span
                        className="font-body text-xs font-bold tracking-[0.15em] uppercase"
                        style={{ color: accent }}
                      >
                        {isFree ? 'Start Here' : 'Build This Anchor'}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1.5">
                        <path d="M3 8h10M9 4.5l4 3.5-4 3.5" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

        </div>
      </div>

      {/* ── Full journey CTA ── */}
      <div className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 text-center">
          <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-6 sm:mb-8">
            The Full Journey
          </p>
          <h2
            className="font-display text-cream font-bold leading-[1.1] tracking-tight
                       text-[clamp(1.75rem,4.5vw,3rem)] mb-6 sm:mb-8"
          >
            Build All Six Anchors
            <br />
            <span className="text-ochre-light">In One Guided Session.</span>
          </h2>
          <div className="w-12 h-[2px] bg-ochre/50 mx-auto mb-8 sm:mb-10" aria-hidden="true" />
          <p className="font-body text-cream/50 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12">
            Chart Your Course walks you through every anchor — identity, voice, stories, situation, timeline, and roster — in one focused session. Everything your AI agent needs to truly know you, built in one sitting.
          </p>
          <Link
            href="/start"
            className="shimmer-hover inline-flex items-center gap-2.5
                       px-8 py-4 rounded-full
                       bg-ochre text-white font-body font-bold text-sm tracking-wide
                       shadow-lg shadow-ochre/20
                       hover:bg-ochre-light hover:shadow-xl hover:shadow-ochre/30
                       transition-all duration-300 hover:-translate-y-[1px]"
          >
            Chart Your Course
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 9h10M10 5.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}
