'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { CompassRose } from '@/components/compass-rose'

/* ─────────────────────────────────────────────────────
   Horizon — Section 4: The Success Moment

   StoryBrand: This is the "End Result" — life after the
   plan works. The hero has built their foundation. Now
   the horizon is open. Aspirational, not salesy.
   ───────────────────────────────────────────────────── */

/* ── Horizon Line — decorative SVG flourish ── */
function HorizonLine() {
  return (
    <div className="relative w-full max-w-2xl mx-auto my-10 sm:my-12" aria-hidden="true">
      <svg
        viewBox="0 0 600 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Main horizon line — tapers at both ends */}
        <line
          x1="0"
          y1="12"
          x2="600"
          y2="12"
          stroke="url(#horizonGrad)"
          strokeWidth="0.8"
        />

        {/* Center diamond accent */}
        <polygon
          points="300,4 308,12 300,20 292,12"
          fill="none"
          stroke="#c4943a"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <polygon
          points="300,7 305,12 300,17 295,12"
          fill="#c4943a"
          opacity="0.2"
        />

        {/* Small tick marks flanking center */}
        <line x1="270" y1="9" x2="270" y2="15" stroke="#c4943a" strokeWidth="0.5" opacity="0.3" />
        <line x1="330" y1="9" x2="330" y2="15" stroke="#c4943a" strokeWidth="0.5" opacity="0.3" />
        <line x1="240" y1="10" x2="240" y2="14" stroke="#c4943a" strokeWidth="0.4" opacity="0.2" />
        <line x1="360" y1="10" x2="360" y2="14" stroke="#c4943a" strokeWidth="0.4" opacity="0.2" />

        <defs>
          <linearGradient id="horizonGrad" x1="0" y1="12" x2="600" y2="12">
            <stop offset="0%" stopColor="#c4943a" stopOpacity="0" />
            <stop offset="20%" stopColor="#c4943a" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#c4943a" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#c4943a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#c4943a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   Horizon — Main Component
   ───────────────────────────────────────────────────── */

export function Horizon() {
  const sectionRef = useScrollReveal(0.1)
  const emailRef = useScrollReveal(0.15)

  return (
    <section
      id="horizon"
      className="relative w-full overflow-hidden bg-navy"
    >
      {/* ── Atmospheric Background ──
          Deep ocean gradient with a subtle warm glow at the
          horizon line — suggesting dawn on the water. */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Base gradient — deep navy to slightly warmer navy-light at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to bottom,
                #1a2744 0%,
                #1e2d4a 40%,
                #1f3050 65%,
                #243352 85%,
                #28384e 100%
              )
            `,
          }}
        />

        {/* Warm horizon glow — ochre tint along the lower third */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 120% 40% at 50% 95%,
                rgba(196, 148, 58, 0.06) 0%,
                rgba(196, 148, 58, 0.02) 40%,
                transparent 70%
              )
            `,
          }}
        />

        {/* Subtle ocean-blue atmospheric haze — mid-section */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 80% 50% at 50% 50%,
                rgba(42, 100, 150, 0.05) 0%,
                transparent 60%
              )
            `,
          }}
        />

        {/* Star field — sparse, hand-placed for realism */}
        <div className="absolute inset-0">
          {[
            { x: '8%', y: '12%', size: 1.5, opacity: 0.25 },
            { x: '15%', y: '28%', size: 1, opacity: 0.15 },
            { x: '23%', y: '8%', size: 2, opacity: 0.3 },
            { x: '35%', y: '18%', size: 1, opacity: 0.2 },
            { x: '42%', y: '6%', size: 1.5, opacity: 0.18 },
            { x: '55%', y: '14%', size: 1, opacity: 0.22 },
            { x: '62%', y: '24%', size: 1.5, opacity: 0.15 },
            { x: '70%', y: '10%', size: 2, opacity: 0.28 },
            { x: '78%', y: '20%', size: 1, opacity: 0.17 },
            { x: '85%', y: '8%', size: 1.5, opacity: 0.23 },
            { x: '92%', y: '16%', size: 1, opacity: 0.14 },
            { x: '48%', y: '32%', size: 1, opacity: 0.12 },
            { x: '18%', y: '35%', size: 1, opacity: 0.1 },
            { x: '75%', y: '30%', size: 1, opacity: 0.11 },
          ].map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cream"
              style={{
                left: star.x,
                top: star.y,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Compass Rose Watermark — positioned off-center right ── */}
      <div
        className="absolute pointer-events-none select-none text-ochre/[0.04]
                   w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[440px] lg:h-[440px]
                   -right-10 sm:-right-6 lg:right-8
                   top-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <CompassRose className="w-full h-full horizon-compass" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 py-24 sm:py-28 lg:py-32">
        {/* Aspirational Copy Block */}
        <div
          ref={sectionRef}
          className="reveal max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center"
        >
          {/* Overline */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-8 h-px bg-ochre/30" aria-hidden="true" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-ochre-light/70 font-medium">
              The Horizon
            </span>
            <span className="w-8 h-px bg-ochre/30" aria-hidden="true" />
          </div>

          {/* Heading — Source Serif 4, aspirational */}
          <h2
            className="font-display text-cream font-semibold leading-[1.12] tracking-tight mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)' }}
          >
            Once You Have Your Foundation,
            <br className="hidden sm:inline" />
            {' '}the Horizon Opens.
          </h2>

          {/* Supporting copy — short, forward-looking */}
          <p className="font-body text-cream/55 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            You know who you are. Your AI knows it too. Every conversation, every
            draft, every decision starts from a place that&apos;s actually yours.
            That&apos;s the shift.
          </p>

          {/* Decorative Horizon Line */}
          <HorizonLine />
        </div>

        {/* ── Email Capture Block ── */}
        <div
          ref={emailRef}
          className="reveal max-w-xl mx-auto px-6 sm:px-10 lg:px-16 text-center"
        >
          {/* Email prompt copy */}
          <p className="font-display text-cream/80 text-lg sm:text-xl leading-snug mb-8">
            What&apos;s next: a personal AI vault, curated updates as AI evolves, and live workshops to go deeper.
          </p>

          {/* Email input + button */}
          <form
            className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email address"
              className="flex-1 px-5 py-3.5 rounded-lg sm:rounded-r-none
                         bg-navy-light/80 border border-cream/[0.08]
                         text-cream placeholder:text-cream/30
                         font-body text-sm
                         focus:outline-none focus:border-teal/40 focus:bg-navy-light
                         transition-colors duration-200"
            />
            <button
              type="submit"
              className="horizon-cta group
                         px-6 py-3.5 rounded-lg sm:rounded-l-none
                         bg-teal text-white
                         font-body font-semibold text-sm tracking-wide
                         transition-all duration-300
                         hover:bg-teal-light hover:shadow-lg hover:shadow-teal/20
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy
                         active:scale-[0.98]
                         whitespace-nowrap"
            >
              <span className="flex items-center justify-center gap-2">
                Stay on Course
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4.5L13 8l-4 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </form>

          {/* Muted note beneath */}
          <p className="font-body text-cream/25 text-xs tracking-wide mt-5">
            More is coming. Stay on course.
          </p>
        </div>
      </div>

      {/* ── Bottom edge — faint divider before next section ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-cream/[0.04]"
        style={{ width: '70%' }}
        aria-hidden="true"
      />

      {/* ── Inline Styles ── */}
      <style>{`
        /* Compass rose slow rotation — very subtle, barely perceptible */
        .horizon-compass {
          animation: horizonCompassDrift 120s linear infinite;
        }

        @keyframes horizonCompassDrift {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* CTA button glow on hover */
        .horizon-cta {
          position: relative;
        }

        .horizon-cta::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            rgba(30, 190, 177, 0.3),
            rgba(30, 190, 177, 0.1),
            rgba(30, 190, 177, 0.3)
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .horizon-cta:hover::before {
          opacity: 1;
        }

        /* Star twinkle — applied to a few stars via nth-child */
        @keyframes starTwinkle {
          0%, 100% { opacity: var(--star-base-opacity, 0.2); }
          50% { opacity: calc(var(--star-base-opacity, 0.2) * 2.5); }
        }
      `}</style>
    </section>
  )
}
