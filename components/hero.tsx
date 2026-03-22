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
        className="absolute inset-0 w-full h-full object-cover"
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
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-28 sm:pb-32 lg:pb-36 px-6 sm:px-10 lg:px-16">
        {/* Logo — centered above headline */}
        <div className="hero-fade-in mb-8 sm:mb-10 lg:mb-12">
          <Image
            src="/rumo-logo-teal.svg"
            alt="RUMO"
            width={500}
            height={147}
            className="w-[300px] sm:w-[420px] lg:w-[540px] h-auto drop-shadow-lg"
            priority
          />
        </div>

        {/* Headline */}
        <h1
          className="font-display text-white font-semibold leading-[1.08] tracking-tight
                     text-[clamp(2.4rem,7vw,5.5rem)]
                     max-w-4xl
                     hero-fade-in-up hero-delay-1"
        >
          FIND YOUR DIRECTION
          <br />
          <span className="text-ochre-light">WITH RUMO</span>
        </h1>

        {/* Descriptor — prevents travel-brand confusion */}
        <p
          className="font-body text-white/50 mt-3 sm:mt-4
                     text-xs sm:text-sm tracking-[0.2em] uppercase
                     hero-fade-in-up hero-delay-1"
          style={{ animationDelay: '0.6s' }}
        >
          Personal AI Foundation System
        </p>

        {/* Subtext */}
        <p
          className="font-body text-white/70 mt-5 sm:mt-6 lg:mt-7
                     text-base sm:text-lg lg:text-xl
                     max-w-xl leading-relaxed
                     hero-fade-in-up hero-delay-2"
        >
          Most people use AI without telling it who they are.
          Rumo fixes that in one journey.
        </p>
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
            Start Here
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
