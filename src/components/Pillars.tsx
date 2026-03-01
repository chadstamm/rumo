import { useScrollReveal } from '../hooks/useScrollReveal';

/* ─────────────────────────────────────────────────────
   Pillar Data
   ───────────────────────────────────────────────────── */

const PILLARS = [
  {
    id: 'know-yourself',
    step: '01',
    title: 'Know Yourself',
    app: 'WeTheMe',
    url: 'https://we-the-me.vercel.app',
    image: '/pillars/compass.png',
    bg: 'dark' as const,
    description:
      'AI gives everyone the same generic answers because it doesn\u2019t know who you are. Your values, your priorities, how you think\u2009\u2014\u2009that\u2019s the foundation everything else is built on. Start there.',
    cta: 'Build Your Constitution',
  },
  {
    id: 'find-your-voice',
    step: '02',
    title: 'Find Your Voice',
    app: 'WriteLikeMe',
    url: 'https://writelikeme.coach',
    image: '/pillars/quill.png',
    bg: 'light' as const,
    description:
      'AI writes like AI until it learns to write like you. Your rhythms. Your instincts. Your tone. Capture your writing DNA so every word it produces sounds like it came from your hand.',
    cta: 'Capture Your Voice',
  },
  {
    id: 'set-up-your-ai',
    step: '03',
    title: 'Set Up Your AI',
    app: 'CustomizedAI',
    url: 'https://customizedai.app',
    image: '/pillars/starmap.png',
    bg: 'dark' as const,
    description:
      'This is where foundation becomes function. Generate custom instructions so every AI tool you use actually knows you\u2009\u2014\u2009not a generic user, but you. The real payoff starts here.',
    cta: 'Configure Your AI',
  },
];

/* ─────────────────────────────────────────────────────
   Fallback SVGs for when images aren't loaded yet
   ───────────────────────────────────────────────────── */

function CompassFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="100" r="90" stroke="#c4943a" strokeWidth="2" opacity="0.3" />
      <circle cx="100" cy="100" r="75" stroke="#c4943a" strokeWidth="1" opacity="0.2" />
      <polygon points="100,15 112,85 100,70 88,85" fill="#c4943a" opacity="0.8" />
      <polygon points="100,185 88,115 100,130 112,115" fill="#c4943a" opacity="0.4" />
      <polygon points="15,100 85,88 70,100 85,112" fill="#c4943a" opacity="0.5" />
      <polygon points="185,100 115,112 130,100 115,88" fill="#c4943a" opacity="0.5" />
      <circle cx="100" cy="100" r="8" fill="#c4943a" opacity="0.6" />
      <circle cx="100" cy="100" r="3" fill="#1a2744" />
    </svg>
  );
}

function QuillFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M155 25C135 45 115 85 95 125C85 145 75 165 70 175L65 180L72 178C82 170 100 145 120 115C140 85 155 55 160 35L155 25Z"
        fill="#1a2744"
        opacity="0.15"
        stroke="#1a2744"
        strokeWidth="1.5"
      />
      <path d="M70 175L65 180L60 195" stroke="#1a2744" strokeWidth="1.5" opacity="0.4" />
      <line x1="85" y1="140" x2="140" y2="55" stroke="#c4943a" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function StarmapFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Stars */}
      {[
        [40, 35], [160, 40], [100, 20], [30, 100], [170, 110],
        [60, 160], [140, 170], [100, 100], [80, 70], [130, 80],
        [50, 130], [150, 140], [90, 50], [110, 150], [70, 90],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 3 : 1.5} fill="#c4943a" opacity={0.3 + (i % 4) * 0.15} />
      ))}
      {/* Constellation lines */}
      <path d="M40 35L80 70L100 100L130 80L160 40" stroke="#c4943a" strokeWidth="0.8" opacity="0.25" />
      <path d="M100 100L110 150L140 170" stroke="#c4943a" strokeWidth="0.8" opacity="0.25" />
      <path d="M100 100L50 130L60 160" stroke="#c4943a" strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

const FALLBACKS: Record<string, React.FC<{ className?: string }>> = {
  'know-yourself': CompassFallback,
  'find-your-voice': QuillFallback,
  'set-up-your-ai': StarmapFallback,
};

/* ─────────────────────────────────────────────────────
   PillarImage — handles loading state + fallback
   ───────────────────────────────────────────────────── */

function PillarImage({
  pillarId,
  src,
  alt,
  isDark,
}: {
  pillarId: string;
  src: string;
  alt: string;
  isDark: boolean;
}) {
  const Fallback = FALLBACKS[pillarId];

  return (
    <div className="pillar-image-wrap relative">
      {/* Decorative ring behind image */}
      <div
        className={`absolute inset-0 rounded-2xl ${
          isDark
            ? 'bg-gradient-to-br from-ochre/10 via-transparent to-ocean/10'
            : 'bg-gradient-to-br from-navy/5 via-transparent to-ochre/8'
        }`}
        style={{ transform: 'rotate(-3deg) scale(1.05)' }}
        aria-hidden="true"
      />

      <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-2xl pillar-image-container">
        {/* Subtle inner glow */}
        <div
          className={`absolute inset-0 z-10 rounded-2xl pointer-events-none ${
            isDark
              ? 'shadow-[inset_0_0_60px_rgba(196,148,58,0.08)]'
              : 'shadow-[inset_0_0_60px_rgba(26,39,68,0.06)]'
          }`}
          aria-hidden="true"
        />

        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="relative z-0 w-full h-full object-contain p-8 pillar-img"
          onError={(e) => {
            // Hide the broken image, show fallback
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            const fallbackEl = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallbackEl) fallbackEl.style.display = 'flex';
          }}
        />

        {/* Fallback — hidden by default, shown on image error */}
        <div
          className="absolute inset-0 z-0 items-center justify-center p-12"
          style={{ display: 'none' }}
        >
          {Fallback && (
            <Fallback
              className={`w-full h-full ${isDark ? 'opacity-40' : 'opacity-30'}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Pillar Section — one full-width cinematic moment
   ───────────────────────────────────────────────────── */

function PillarSection({
  pillar,
  index,
}: {
  pillar: (typeof PILLARS)[number];
  index: number;
}) {
  const ref = useScrollReveal(0.12);
  const isDark = pillar.bg === 'dark';
  const imageFirst = index % 2 === 0; // left-right-left pattern

  return (
    <section
      id={pillar.id}
      className={`relative w-full overflow-hidden ${
        isDark ? 'bg-navy text-cream' : 'bg-cream text-navy'
      }`}
    >
      {/* ── Atmospheric Background Texture ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle radial gradient for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 30% 50%, rgba(42,100,150,0.08) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at 70% 50%, rgba(196,148,58,0.06) 0%, transparent 60%)',
          }}
        />
        {/* Horizontal divider line — thin, elegant */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 h-px ${
            isDark ? 'bg-cream/[0.06]' : 'bg-navy/[0.06]'
          }`}
          style={{ width: '80%' }}
        />
      </div>

      {/* ── Large Step Number — watermark style ── */}
      <div
        className={`absolute pointer-events-none select-none font-display font-bold leading-none pillar-step-number ${
          imageFirst ? 'right-6 lg:right-16' : 'left-6 lg:left-16'
        } ${isDark ? 'text-cream/[0.03]' : 'text-navy/[0.04]'}`}
        style={{
          fontSize: 'clamp(10rem, 25vw, 22rem)',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        aria-hidden="true"
      >
        {pillar.step}
      </div>

      {/* ── Content Grid ── */}
      <div
        ref={ref}
        className="reveal relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-28"
      >
        <div
          className={`flex flex-col ${
            imageFirst ? 'lg:flex-row' : 'lg:flex-row-reverse'
          } items-center gap-12 lg:gap-20`}
        >
          {/* ── Image Side ── */}
          <div className="w-full lg:w-5/12 pillar-image-side">
            <PillarImage
              pillarId={pillar.id}
              src={pillar.image}
              alt={`${pillar.title} illustration`}
              isDark={isDark}
            />
          </div>

          {/* ── Text Side ── */}
          <div className="w-full lg:w-7/12 flex flex-col">
            {/* Step label */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className={`inline-block w-10 h-px ${
                  isDark ? 'bg-ochre/60' : 'bg-ochre/50'
                }`}
                aria-hidden="true"
              />
              <span
                className={`font-body text-xs tracking-[0.3em] uppercase font-medium ${
                  isDark ? 'text-ochre-light' : 'text-ochre'
                }`}
              >
                Step {pillar.step}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-display font-semibold leading-[1.1] tracking-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              {pillar.title}
            </h2>

            {/* App badge */}
            <div className="mb-6">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium tracking-wide uppercase ${
                  isDark
                    ? 'bg-cream/[0.08] text-cream/70 border border-cream/[0.08]'
                    : 'bg-navy/[0.06] text-navy/60 border border-navy/[0.06]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isDark ? 'bg-ochre-light' : 'bg-ochre'
                  }`}
                  aria-hidden="true"
                />
                {pillar.app}
              </span>
            </div>

            {/* Description */}
            <p
              className={`font-body text-base sm:text-lg leading-relaxed max-w-lg mb-8 ${
                isDark ? 'text-cream/70' : 'text-navy/70'
              }`}
            >
              {pillar.description}
            </p>

            {/* CTA Button */}
            <div>
              <a
                href={pillar.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pillar-cta group inline-flex items-center gap-2
                           px-7 py-3.5 rounded-lg
                           bg-ochre text-white font-body font-semibold text-sm tracking-wide
                           shadow-lg shadow-ochre/20
                           transition-all duration-300
                           hover:bg-ochre-light hover:shadow-xl hover:shadow-ochre/30
                           hover:-translate-y-0.5
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre focus-visible:ring-offset-2
                           active:translate-y-0"
                style={
                  { '--tw-ring-offset-color': isDark ? '#1a2744' : '#faf6f1' } as React.CSSProperties
                }
              >
                {pillar.cta}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
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
        </div>
      </div>

      {/* ── Decorative corner accents ── */}
      <div className="absolute bottom-0 left-0 pointer-events-none" aria-hidden="true">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          className={isDark ? 'text-cream/[0.03]' : 'text-navy/[0.03]'}
        >
          <path d="M0 120V60C0 26.9 26.9 0 60 0" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* ── Inline Pillar Styles ── */}
      <style>{`
        /* Image hover lift */
        .pillar-image-container {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: ${
            isDark
              ? '0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(250, 246, 241, 0.05)'
              : '0 25px 60px -15px rgba(26, 39, 68, 0.12), 0 0 0 1px rgba(26, 39, 68, 0.04)'
          };
          background: ${
            isDark
              ? 'linear-gradient(135deg, rgba(36, 51, 82, 0.8), rgba(26, 39, 68, 0.95))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240, 232, 221, 0.6))'
          };
        }

        .pillar-image-container:hover {
          transform: translateY(-4px);
          box-shadow: ${
            isDark
              ? '0 35px 80px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(196, 148, 58, 0.1)'
              : '0 35px 80px -15px rgba(26, 39, 68, 0.18), 0 0 0 1px rgba(196, 148, 58, 0.12)'
          };
        }

        /* Subtle parallax feel on the step number */
        .pillar-step-number {
          transition: opacity 0.6s ease;
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   Pillars — the Three-Step Plan
   ───────────────────────────────────────────────────── */

export function Pillars() {
  return (
    <div id="pillars">
      {/* Section header — introduces the plan */}
      <SectionIntro />

      {/* The three pillar sections */}
      {PILLARS.map((pillar, index) => (
        <PillarSection key={pillar.id} pillar={pillar} index={index} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   SectionIntro — brief intro above the pillars
   ───────────────────────────────────────────────────── */

function SectionIntro() {
  const ref = useScrollReveal();

  return (
    <section className="bg-navy text-cream py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(196,148,58,0.06) 0%, transparent 50%)',
        }}
      />

      <div
        ref={ref}
        className="reveal relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center"
      >
        {/* Overline */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="w-8 h-px bg-ochre/40" aria-hidden="true" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-ochre-light font-medium">
            The Plan
          </span>
          <span className="w-8 h-px bg-ochre/40" aria-hidden="true" />
        </div>

        <h2
          className="font-display font-semibold leading-[1.12] tracking-tight text-cream mb-5"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}
        >
          Three Steps to AI
          <br className="hidden sm:inline" />
          {' '}That Actually Knows You
        </h2>

        <p className="font-body text-cream/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Most people skip straight to the tools. But without self-knowledge and voice, every AI interaction starts from zero. This is the better way.
        </p>
      </div>
    </section>
  );
}
