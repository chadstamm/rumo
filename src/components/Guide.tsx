import { useState } from 'react';
import { Globe, BookOpen } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ─────────────────────────────────────────────────────
   Social Links
   ───────────────────────────────────────────────────── */

const LINKS = [
  {
    label: 'Website',
    href: 'https://chadstamm.com',
    icon: <Globe className="w-[18px] h-[18px]" />,
  },
  {
    label: 'Cultural Currents',
    href: 'https://culturalcurrents.substack.com',
    icon: <BookOpen className="w-[18px] h-[18px]" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/chadstamm',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/chadstamm',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────
   Guide Photo — with elegant fallback
   ───────────────────────────────────────────────────── */

function GuidePhoto() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="guide-photo-wrapper relative">
      {/* Decorative offset frame — subtle depth cue */}
      <div
        className="absolute -inset-3 sm:-inset-4 rounded-2xl border border-ochre/15 pointer-events-none"
        style={{ transform: 'rotate(-2deg)' }}
        aria-hidden="true"
      />

      {/* Secondary thin frame, slight opposite rotation */}
      <div
        className="absolute -inset-1.5 sm:-inset-2 rounded-2xl border border-navy/[0.06] pointer-events-none"
        style={{ transform: 'rotate(0.5deg)' }}
        aria-hidden="true"
      />

      {/* Main photo container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl guide-photo-container">
        {/* Inner glow overlay */}
        <div
          className="absolute inset-0 z-10 rounded-2xl pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 80px rgba(26, 39, 68, 0.06), inset 0 -40px 60px rgba(196, 148, 58, 0.04)',
          }}
          aria-hidden="true"
        />

        {!imgError ? (
          <img
            src="/guide-photo.jpg"
            alt="Chad Stamm — Founder of TMC Digital Media"
            loading="lazy"
            className="relative z-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback — a warm, abstract pattern with initials */
          <div className="relative z-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-cream-dark via-cream to-cream-dark">
            {/* Subtle compass watermark */}
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full opacity-[0.04] p-8"
              aria-hidden="true"
            >
              <circle cx="100" cy="100" r="90" stroke="#1a2744" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="75" stroke="#1a2744" strokeWidth="0.8" />
              <polygon points="100,10 114,80 100,65 86,80" fill="#1a2744" />
              <polygon points="100,190 86,120 100,135 114,120" fill="#1a2744" />
              <polygon points="10,100 80,86 65,100 80,114" fill="#1a2744" />
              <polygon points="190,100 120,114 135,100 120,86" fill="#1a2744" />
              <circle cx="100" cy="100" r="10" fill="#1a2744" />
              <circle cx="100" cy="100" r="4" fill="#faf6f1" />
            </svg>

            {/* Decorative diagonal lines */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.025]" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-navy origin-left"
                  style={{
                    width: '200%',
                    top: `${8 + i * 8}%`,
                    left: '-20%',
                    transform: 'rotate(-25deg)',
                  }}
                />
              ))}
            </div>

            {/* Monogram */}
            <span
              className="relative font-display text-navy/[0.12] font-semibold select-none"
              style={{ fontSize: 'clamp(4rem, 10vw, 6rem)' }}
              aria-hidden="true"
            >
              CS
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Guide Section — StoryBrand: The Guide
   The customer is the hero. Chad is the guide with
   empathy (understands the struggle) and authority
   (has walked the path).
   ───────────────────────────────────────────────────── */

export function Guide() {
  const sectionRef = useScrollReveal(0.1);

  return (
    <section
      id="guide"
      className="relative bg-cream overflow-hidden"
    >
      {/* ── Atmospheric Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Warm radial glow — top-right, editorial feel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 75% 20%, rgba(196, 148, 58, 0.04) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(42, 100, 150, 0.03) 0%, transparent 45%)',
          }}
        />

        {/* Top separator — elegant thin rule */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-navy/[0.06]" />
      </div>

      {/* ── Content ── */}
      <div
        ref={sectionRef}
        className="reveal relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32 lg:py-40"
      >
        {/* ── Section Eyebrow ── */}
        <div className="flex items-center gap-4 mb-14 sm:mb-16 lg:mb-20">
          <span className="w-10 sm:w-14 h-px bg-ochre/50" aria-hidden="true" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-ochre font-medium">
            Your Guide
          </span>
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="flex flex-col lg:flex-row items-start gap-14 lg:gap-20 xl:gap-24">

          {/* ── Photo Column ── */}
          <div className="w-full lg:w-5/12 xl:w-[38%] flex-shrink-0">
            <div className="max-w-sm mx-auto lg:mx-0 lg:max-w-none lg:pr-4">
              <GuidePhoto />

              {/* Identity badge beneath photo — "The Possiblist" */}
              <div className="mt-8 sm:mt-10 text-center lg:text-left">
                <p className="font-display text-navy text-lg sm:text-xl font-semibold tracking-tight">
                  Chad Stamm
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-2.5 mt-1.5">
                  <span className="w-5 h-px bg-ochre/50" aria-hidden="true" />
                  <p className="font-body text-ochre text-xs sm:text-sm tracking-[0.15em] uppercase font-medium">
                    The Possiblist
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Text Column ── */}
          <div className="w-full lg:w-7/12 xl:w-[62%]">
            {/* Display heading */}
            <h2
              className="font-display text-navy font-semibold leading-[1.1] tracking-tight mb-8 sm:mb-10"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
            >
              Everyone Deserves Better
              <br className="hidden sm:inline" />
              {' '}From AI.{' '}
              <span className="text-ochre">I Build the Bridge.</span>
            </h2>

            {/* Bio — 3-4 sentences, conversational, third-person but warm */}
            <div className="space-y-5 mb-10 sm:mb-12">
              <p className="font-body text-navy/75 text-base sm:text-lg leading-relaxed">
                Chad calls himself a Possiblist — someone who believes the gap between where people are with AI and where they could be isn't a talent problem, it's a direction problem. He's spent years in Lisbon translating complexity into clarity, first as a writer, then as a builder, and now as the founder of TMC Digital Media.
              </p>

              <p className="font-body text-navy/75 text-base sm:text-lg leading-relaxed">
                Five shipped apps. A book in progress. A Substack called Cultural Currents. All built on one conviction: the people who will thrive with AI aren't the most technical — they're the ones who know themselves well enough to point it in the right direction.
              </p>

              <p className="font-body text-navy font-medium text-base sm:text-lg leading-relaxed">
                That's what Rumo is for. Not to impress you with technology — to hand you the tools so the technology actually works for you.
              </p>
            </div>

            {/* ── Generation Possible callout ── */}
            <div className="relative mb-10 sm:mb-12 pl-5 border-l-2 border-ochre/30">
              <p className="font-display text-navy/60 text-sm sm:text-base italic leading-relaxed">
                "I believe in Generation Possible — the idea that this moment in technology belongs to everyone willing to show up with intention."
              </p>
            </div>

            {/* ── Links ── */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guide-link group inline-flex items-center gap-2.5
                             px-4 py-2.5 rounded-lg
                             text-navy/60 font-body text-sm font-medium
                             bg-navy/[0.03] border border-navy/[0.06]
                             transition-all duration-300
                             hover:text-navy hover:bg-navy/[0.06] hover:border-navy/[0.1]
                             hover:-translate-y-0.5 hover:shadow-sm
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                  aria-label={label}
                >
                  <span className="transition-colors duration-300 text-navy/40 group-hover:text-ochre">
                    {icon}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Decorative compass rose watermark — bottom-left ── */}
      <div
        className="absolute -bottom-16 -left-16 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] opacity-[0.018] pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="200" cy="200" r="180" stroke="#1a2744" strokeWidth="2" />
          <circle cx="200" cy="200" r="155" stroke="#1a2744" strokeWidth="1" />
          <circle cx="200" cy="200" r="130" stroke="#1a2744" strokeWidth="0.5" />
          {/* Cardinal points */}
          <polygon points="200,20 225,155 200,125 175,155" fill="#1a2744" />
          <polygon points="200,380 175,245 200,275 225,245" fill="#1a2744" />
          <polygon points="380,200 245,175 275,200 245,225" fill="#1a2744" />
          <polygon points="20,200 155,225 125,200 155,175" fill="#1a2744" />
          {/* Intercardinals */}
          <polygon points="327,73 235,150 248,137 262,150" fill="#1a2744" opacity="0.4" />
          <polygon points="327,327 248,262 262,248 235,250" fill="#1a2744" opacity="0.4" />
          <polygon points="73,327 150,235 137,248 150,262" fill="#1a2744" opacity="0.4" />
          <polygon points="73,73 150,150 137,137 150,150" fill="#1a2744" opacity="0.4" />
          {/* Center */}
          <circle cx="200" cy="200" r="20" fill="#1a2744" />
          <circle cx="200" cy="200" r="8" fill="#faf6f1" />
        </svg>
      </div>

      {/* ── Inline Styles ── */}
      <style>{`
        /* Photo container — warm shadow and subtle background */
        .guide-photo-container {
          background: linear-gradient(145deg, #f5ede3, #faf6f1, #f0e8dd);
          box-shadow:
            0 25px 60px -15px rgba(26, 39, 68, 0.1),
            0 10px 25px -8px rgba(26, 39, 68, 0.06),
            0 0 0 1px rgba(26, 39, 68, 0.04);
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .guide-photo-container:hover {
          transform: translateY(-3px);
          box-shadow:
            0 35px 80px -15px rgba(26, 39, 68, 0.14),
            0 15px 35px -8px rgba(26, 39, 68, 0.08),
            0 0 0 1px rgba(196, 148, 58, 0.1);
        }

        /* Photo wrapper — animate the decorative frames on hover */
        .guide-photo-wrapper:hover .guide-photo-container {
          transform: translateY(-3px);
        }

        /* Link pill hover refinement */
        .guide-link {
          backdrop-filter: blur(4px);
        }
      `}</style>
    </section>
  );
}
