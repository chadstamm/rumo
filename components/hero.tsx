'use client'

import Image from 'next/image'

export function Hero() {
  const handleScrollDown = () => {
    const target = document.getElementById('problem')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
    >
      {/* ── Video Background ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover object-[30%_center]"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Cinematic Overlay ── */}
      <div
        className="absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(26, 39, 68, 0.50) 0%,
              rgba(26, 39, 68, 0.25) 25%,
              rgba(26, 39, 68, 0.20) 40%,
              rgba(26, 39, 68, 0.30) 55%,
              rgba(26, 39, 68, 0.55) 70%,
              rgba(26, 39, 68, 0.80) 85%,
              rgba(26, 39, 68, 0.95) 100%
            )
          `,
        }}
      />

      {/* Subtle side vignettes for cinematic framing */}
      <div
        className="absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 40%,
              rgba(26, 39, 68, 0.5) 100%
            )
          `,
        }}
      />

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-start justify-center px-10 sm:px-16 lg:px-24">
        {/* Logo */}
        <div className="hero-fade-in mb-2 sm:mb-3">
          <Image
            src="/rumo-logo.svg"
            alt="RUMO"
            width={500}
            height={147}
            className="w-[240px] sm:w-[320px] lg:w-[400px] h-auto drop-shadow-lg"
            priority
          />
        </div>

        {/* Descriptor — between logo and headline */}
        <p
          className="font-body text-white/60 font-semibold mb-5 sm:mb-6
                     text-xs sm:text-base lg:text-lg tracking-[0.35em] sm:tracking-[0.45em] uppercase
                     w-[240px] sm:w-[320px] lg:w-[400px]
                     hero-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          AI Navigation System
        </p>

        {/* Headline */}
        <h1
          className="font-display text-white font-semibold leading-[1.08] tracking-tight
                     text-[clamp(2rem,6vw,4.5rem)]
                     max-w-3xl
                     hero-fade-in-up hero-delay-1"
        >
          FIND YOUR DIRECTION
          <br />
          <span className="text-ochre-light">WITH RUMO.</span>
        </h1>

        {/* CTA Button */}
        <div className="mt-8 sm:mt-10 hero-fade-in-up hero-delay-2" style={{ animationDelay: '1s' }}>
          <a
            href="#the-path"
            className="group inline-flex items-center gap-2.5
                       px-8 py-4 rounded-lg
                       bg-teal text-white font-body font-bold text-sm tracking-wide
                       shadow-lg shadow-teal/25
                       transition-all duration-300
                       hover:bg-teal-light hover:shadow-xl hover:shadow-teal/30
                       hover:-translate-y-0.5 active:translate-y-0
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            BEGIN YOUR JOURNEY
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                d="M4 9h10M10 5l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="relative z-10 flex flex-col items-center pb-8 sm:pb-10 hero-fade-in hero-delay-3">
        <button
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-2 cursor-pointer
                     text-white/40 hover:text-teal-light transition-colors duration-300
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
          aria-label="Scroll to next section"
        >
          <span className="font-body text-xs tracking-[0.2em] uppercase">
            LEARN MORE
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="hero-bounce"
            aria-hidden="true"
          >
            <path
              d="M4 7l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* ── Inline Styles for Animations ── */}
      <style>{`
        .hero-fade-in {
          opacity: 0;
          animation: heroFadeIn 1s ease-out forwards;
        }

        .hero-fade-in-up {
          opacity: 0;
          transform: translateY(28px);
          animation: heroFadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .hero-delay-1 {
          animation-delay: 0.4s;
        }
        .hero-delay-2 {
          animation-delay: 0.8s;
        }
        .hero-delay-3 {
          animation-delay: 1.3s;
        }

        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes heroFadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-bounce {
          animation: heroBounce 2s ease-in-out infinite;
          animation-delay: 2s;
        }

        @keyframes heroBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        video::-webkit-media-controls {
          display: none !important;
        }
      `}</style>
    </section>
  )
}
