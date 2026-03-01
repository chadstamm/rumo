export function Hero() {
  const handleScrollDown = () => {
    const target = document.getElementById('problem');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

      {/* ── Cinematic Overlay ──
          Multi-stop gradient: subtle top vignette, heavy bottom for text legibility.
          Layered with a slight overall navy tint for color grading. */}
      <div
        className="absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(26, 39, 68, 0.35) 0%,
              rgba(26, 39, 68, 0.10) 25%,
              rgba(26, 39, 68, 0.05) 40%,
              rgba(26, 39, 68, 0.15) 55%,
              rgba(26, 39, 68, 0.45) 70%,
              rgba(26, 39, 68, 0.75) 85%,
              rgba(26, 39, 68, 0.92) 100%
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
              transparent 50%,
              rgba(26, 39, 68, 0.4) 100%
            )
          `,
        }}
      />

      {/* ── Top Navigation / Logo ── */}
      <header className="relative z-10 flex items-center px-6 pt-6 sm:px-10 sm:pt-8 lg:px-16 lg:pt-10 hero-fade-in">
        <a
          href="#hero"
          className="flex items-center gap-3 group"
          aria-label="Rumo — back to top"
        >
          {/* Compass Rose SVG */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 drop-shadow-lg transition-transform duration-500 group-hover:rotate-45"
            aria-hidden="true"
          >
            {/* Outer ring */}
            <circle cx="20" cy="20" r="18.5" stroke="#c4943a" strokeWidth="1.2" opacity="0.5" />
            <circle cx="20" cy="20" r="16" stroke="#c4943a" strokeWidth="0.6" opacity="0.3" />

            {/* Cardinal points — N/S elongated, E/W shorter, classic compass rose */}
            {/* North */}
            <polygon points="20,2 22.8,16 20,13 17.2,16" fill="#c4943a" />
            {/* South */}
            <polygon points="20,38 17.2,24 20,27 22.8,24" fill="#c4943a" opacity="0.55" />
            {/* East */}
            <polygon points="38,20 24,17.2 27,20 24,22.8" fill="#c4943a" opacity="0.7" />
            {/* West */}
            <polygon points="2,20 16,22.8 13,20 16,17.2" fill="#c4943a" opacity="0.7" />

            {/* Intercardinal points — smaller, decorative */}
            {/* NE */}
            <polygon points="32.7,7.3 23.5,15 24.8,13.7 26.5,15.4" fill="#c4943a" opacity="0.35" />
            {/* SE */}
            <polygon points="32.7,32.7 24.8,26.3 26.5,24.6 23.5,25" fill="#c4943a" opacity="0.35" />
            {/* SW */}
            <polygon points="7.3,32.7 15,23.5 13.7,24.8 15.4,26.5" fill="#c4943a" opacity="0.35" />
            {/* NW */}
            <polygon points="7.3,7.3 15.4,13.5 13.7,15.2 15,15" fill="#c4943a" opacity="0.35" />

            {/* Center dot */}
            <circle cx="20" cy="20" r="2.2" fill="#c4943a" />
            <circle cx="20" cy="20" r="1" fill="#1a2744" />
          </svg>

          {/* Brand wordmark */}
          <span
            className="font-display text-cream text-xl tracking-[0.25em] font-semibold uppercase drop-shadow-lg select-none"
            style={{ letterSpacing: '0.25em' }}
          >
            RUMO
          </span>
        </a>
      </header>

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-28 sm:pb-32 lg:pb-36 px-6 sm:px-10 lg:px-16">
        {/* Headline — StoryBrand: customer as hero, aspiration-focused */}
        <h1
          className="font-display text-white font-semibold leading-[1.08] tracking-tight
                     text-[clamp(2.4rem,7vw,5.5rem)]
                     max-w-4xl
                     hero-fade-in-up hero-delay-1"
        >
          AI Is Powerful.
          <br />
          <span className="text-ochre-light">Direction</span> Makes It Yours.
        </h1>

        {/* Subtext — empathy + authority positioning */}
        <p
          className="font-body text-white/70 mt-5 sm:mt-6 lg:mt-7
                     text-base sm:text-lg lg:text-xl
                     max-w-xl leading-relaxed
                     hero-fade-in-up hero-delay-2"
        >
          Most people open AI and get generic answers.
          You deserve a starting point built around who you actually are.
        </p>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="relative z-10 flex flex-col items-center pb-8 sm:pb-10 hero-fade-in hero-delay-3">
        <button
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-2 cursor-pointer
                     text-white/40 hover:text-white/70 transition-colors duration-300
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

      {/* ── Inline Styles for Animations ──
          Using a <style> tag for keyframe animations that can't be done
          purely with Tailwind utility classes. */}
      <style>{`
        /* ── Entrance Animations ── */
        .hero-fade-in {
          opacity: 0;
          animation: heroFadeIn 1s ease-out forwards;
        }

        .hero-fade-in-up {
          opacity: 0;
          transform: translateY(28px);
          animation: heroFadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Staggered delays */
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
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes heroFadeInUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ── Scroll Indicator Bounce ── */
        .hero-bounce {
          animation: heroBounce 2s ease-in-out infinite;
          animation-delay: 2s;
        }

        @keyframes heroBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }

        /* ── Video poster fallback for older browsers ── */
        video::-webkit-media-controls {
          display: none !important;
        }
      `}</style>
    </section>
  );
}
