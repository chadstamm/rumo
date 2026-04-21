import Link from 'next/link'

const ANCHOR_LABELS: Record<string, string> = {
  constitution: 'Constitution',
  codex: 'Voice',
  'story-bank': 'Stories',
  sotu: 'Situation',
  timeline: 'Timeline',
  roster: 'Influencers',
}

export function FullBuildCTA({ currentSlug }: { currentSlug?: string }) {
  return (
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <img
              src="/anchor-section-icon.png"
              alt=""
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto opacity-70"
              aria-hidden="true"
            />
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

        <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-12 mb-14">
          {(['constitution', 'codex', 'story-bank', 'sotu', 'timeline', 'roster'] as const).map((slug) => {
            const isCurrent = slug === currentSlug
            return (
              <Link
                key={slug}
                href={`/anchors/${slug}`}
                className="group flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <div
                    className={`absolute inset-0 rounded-full transition-opacity duration-300 blur-xl ${isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    style={{ background: slug === 'constitution' ? 'rgba(30, 190, 177, 0.3)' : 'rgba(196, 148, 58, 0.2)' }}
                    aria-hidden="true"
                  />
                  <img
                    src={`/icons/${slug}.png`}
                    alt={ANCHOR_LABELS[slug]}
                    className={`relative w-10 h-10 sm:w-14 sm:h-14 transition-all duration-300 ${isCurrent ? 'opacity-90' : 'opacity-50 group-hover:opacity-100'}`}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
                <span className={`font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${isCurrent ? 'text-cream/80' : 'text-cream/30 group-hover:text-cream/70'}`}>
                  {ANCHOR_LABELS[slug]}
                </span>
                {slug === 'constitution' && (
                  <span className="font-body text-[9px] tracking-wider uppercase text-teal/60 -mt-1">Free</span>
                )}
              </Link>
            )
          })}
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
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 10h10M12 6.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="h-[2px] bg-gradient-to-r from-transparent via-ochre/50 to-transparent" aria-hidden="true" />
    </section>
  )
}
