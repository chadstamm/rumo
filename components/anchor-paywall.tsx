import Link from 'next/link'
import Image from 'next/image'
import { CompassRose } from '@/components/compass-rose'
import type { DocumentConfig } from '@/data/documents'

const ANCHOR_ICONS: Record<string, string> = {
  constitution: '/icons/constitution.png',
  codex: '/icons/codex.png',
  'story-bank': '/icons/story-bank.png',
  sotu: '/icons/sotu.png',
  timeline: '/icons/timeline.png',
  roster: '/icons/roster.png',
}

const HERO_IMAGES: Record<string, string> = {
  constitution: '/heroes/constitution.jpg',
  sotu: '/heroes/sotu.jpg',
  codex: '/heroes/codex.jpg',
  'story-bank': '/heroes/story-bank.jpg',
  timeline: '/heroes/timeline.jpg',
  roster: '/heroes/roster.jpg',
}

const HERO_FOCUS: Record<string, string> = {
  codex: 'center 70%',
  timeline: 'center 40%',
}

// Per-anchor teaser: 2-3 sentences, punchy, Chad's voice.
// Sells the value, not the mechanics.
const ANCHOR_TEASERS: Record<string, string> = {
  codex:
    'AI that writes in your voice — not a generic one. The Codex captures the rhythm, the cadence, the moves you make and the ones you never would. Extracted from how you actually write, not guessed at. Feed it to Claude, ChatGPT, Gemini, and watch the outputs finally sound like you.',
  'story-bank':
    'The anchor that makes your AI feel lived-in. Every story you return to — the close call, the summer that changed everything, the line you still quote from your grandfather. Not prompts. Not a profile. Raw material. The kind of context that turns AI outputs from plausible to unmistakably yours.',
  sotu:
    'Who you are doesn’t change much. Where you are changes every season. The State of the Union is the living document AI needs to understand your current situation — what you’re grinding on, what you’re letting go of, what’s loud right now. Update it monthly. Feed it to every AI that matters.',
  timeline:
    'The chronological arc — your map, not your resume. When AI knows where you’ve been, it understands why you’d say yes to one thing and no to another. Context that turns a general-purpose model into your model.',
  roster:
    'The people shape you. Your mentors, your rivals, your kids, the ones who made you, the ones you’re trying to make proud. When AI knows who sits at your table — and who doesn’t — it stops answering in hypotheticals and starts answering for your actual life.',
}

export function AnchorPaywall({
  doc,
}: {
  doc: DocumentConfig
  authed?: boolean
}) {
  const heroImage = HERO_IMAGES[doc.slug]
  const icon = ANCHOR_ICONS[doc.slug]
  const teaser = ANCHOR_TEASERS[doc.slug] ?? doc.description

  return (
    <main className="min-h-screen bg-cream">
      {/* ── Hero: matches wizard hero style ── */}
      <div className="relative min-h-[40vh] sm:min-h-[35vh] w-full overflow-hidden flex items-end">
        {heroImage && (
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={HERO_FOCUS[doc.slug] ? { objectPosition: HERO_FOCUS[doc.slug] } : undefined}
          />
        )}

        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background: heroImage
              ? 'linear-gradient(to bottom, rgba(40,32,18,0.35) 0%, rgba(30,28,20,0.55) 40%, rgba(26,39,68,0.88) 80%, rgba(26,39,68,1) 100%)'
              : '#1a2744',
          }}
        />

        <div className="absolute -bottom-16 -right-16 w-64 h-64 opacity-[0.02]" aria-hidden="true">
          <CompassRose className="w-full h-full text-cream" />
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 pt-24 sm:pt-28">
            <div className="flex items-end justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-body text-sm tracking-[0.2em] uppercase text-ochre font-bold">
                    Context Anchor
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-ochre/15 border border-ochre/40 font-body text-[10px] font-bold tracking-[0.15em] uppercase text-ochre">
                    Pro
                  </span>
                </div>

                <h1
                  className="font-display text-cream font-bold leading-tight mb-3"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
                >
                  {doc.title}
                </h1>

                <div className="w-10 h-[2px] bg-ochre/50 mb-4" aria-hidden="true" />

                <p className="font-body text-cream/70 text-base sm:text-lg leading-relaxed font-medium">
                  {doc.subtitle}
                </p>
              </div>

              {icon && (
                <div className="hidden lg:block flex-shrink-0">
                  <Image
                    src={icon}
                    alt=""
                    width={180}
                    height={180}
                    className="opacity-100 -ml-8"
                    style={{ filter: 'brightness(0) invert(1)' }}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Teaser body + paywall card ── */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <p className="font-body text-navy/85 text-lg sm:text-xl leading-relaxed mb-12 sm:mb-16">
          {teaser}
        </p>

        <div className="bg-white/60 border border-navy/10 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
          <p className="font-body text-ochre font-bold text-xs tracking-[0.25em] uppercase mb-4">
            Unlock the Vault
          </p>
          <h2
            className="font-display text-navy font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            All six anchors. $49/year.
          </h2>
          <p className="font-body text-navy/60 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
            The Personal Constitution is free. The other five &mdash; including this one &mdash; come with RUMO Annual. Yours to keep. Renews yearly, cancel anytime.
          </p>
          <Link
            href="/pricing"
            className="inline-flex font-body text-sm font-bold tracking-[0.12em] uppercase px-8 py-3.5 rounded-full
                       bg-teal text-white shadow-md shadow-teal/25
                       hover:bg-teal-light hover:shadow-lg hover:shadow-teal/35 hover:-translate-y-0.5
                       transition-all duration-200"
          >
            Chart Your Course · $49/year
          </Link>
        </div>

        <p className="font-body text-navy/45 text-sm text-center mt-10">
          Want to start free?{' '}
          <Link
            href="/anchors/constitution"
            className="font-semibold text-teal hover:text-teal-dark underline underline-offset-2 transition-colors"
          >
            Build your Personal Constitution
          </Link>
          .
        </p>
      </section>
    </main>
  )
}
