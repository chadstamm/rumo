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

const ANCHOR_CTA_LABELS: Record<string, string> = {
  constitution: 'Constitution',
  codex: 'Voice',
  'story-bank': 'Stories',
  sotu: 'Situation',
  timeline: 'Timeline',
  roster: 'Influencers',
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
            Context Anchors are the documents you give AI so it can give you personalized results. Each one answers a question your AI needs to know &mdash; about your identity, your voice, your stories, your situation, your arc, and the people who matter. Start with one or build them all.
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
      <section className="relative bg-navy overflow-hidden">
        {/* Atmospheric layers */}
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

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <Image src="/anchor-section-icon.png" alt="" width={80} height={80} className="mx-auto opacity-70" aria-hidden="true" />
            </div>
            <p className="font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-ochre font-bold mb-4">
              Want the full picture?
            </p>
            <h2
              className="font-display text-cream font-bold leading-[1.1] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
            >
              Build All Six Anchors
            </h2>
            <p className="font-body text-cream/50 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-4">
              Your Constitution is the foundation. Add your Voice, Stories, Situation, Timeline,
              and Influence Roster — then store and update your documents anytime in your personal vault.
            </p>
            <p className="font-body text-cream/30 text-sm mb-10">
              $49/year <span className="text-cream/20">·</span> all six anchors <span className="text-cream/20">·</span> unlimited updates <span className="text-cream/20">·</span> vault access
            </p>
          </div>

          {/* Anchor icon row */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-12 mb-14">
            {DOCUMENTS.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{ background: doc.slug === 'constitution' ? 'rgba(30, 190, 177, 0.3)' : 'rgba(196, 148, 58, 0.2)' }}
                    aria-hidden="true"
                  />
                  {ANCHOR_ICONS[doc.slug] && (
                    <Image
                      src={ANCHOR_ICONS[doc.slug]}
                      alt={doc.title}
                      width={56}
                      height={56}
                      className="relative opacity-50 group-hover:opacity-100 transition-all duration-300"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  )}
                </div>
                <span className="font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase text-cream/30 group-hover:text-cream/70 transition-colors duration-300">
                  {ANCHOR_CTA_LABELS[doc.slug] || doc.title}
                </span>
                {doc.slug === 'constitution' && (
                  <span className="font-body text-[9px] tracking-wider uppercase text-teal/60 -mt-1">Free</span>
                )}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-3 font-body font-bold text-sm sm:text-base tracking-[0.1em] uppercase
                         px-10 sm:px-14 py-4 sm:py-5 rounded-full
                         bg-ochre text-white shadow-lg shadow-ochre/25
                         hover:bg-ochre-light hover:shadow-xl hover:shadow-ochre/35
                         hover:-translate-y-1 active:translate-y-0
                         transition-all duration-300"
            >
              BUILD ALL SIX
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10h10M12 6.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Gold line before footer */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-ochre/50 to-transparent" aria-hidden="true" />
      </section>
    </main>
  )
}
