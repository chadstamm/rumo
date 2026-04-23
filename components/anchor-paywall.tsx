import Link from 'next/link'
import Image from 'next/image'
import { CompassRose } from '@/components/compass-rose'
import { FullBuildCTA } from '@/components/full-build-cta'
import { UpgradeButton } from '@/components/upgrade-button'
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

// First-person question per anchor — shown in the hero.
const ANCHOR_QUESTIONS: Record<string, string> = {
  codex: 'How do I write?',
  'story-bank': 'What stories do I always tell?',
  sotu: 'What matters to me right now?',
  timeline: 'How has my life unfolded?',
  roster: 'Who are the people that matter?',
}

// SoundByte-style promise per anchor. The "Change" step of PEACE —
// what life looks like after. Short, bumper-sticker clear.
// `highlight` marks the high-value phrase rendered in ochre.
const ANCHOR_HEADLINES: Record<string, { text: string; highlight: string }> = {
  codex: { text: 'Your Voice, in Every AI.', highlight: 'Voice' },
  'story-bank': { text: 'Your Stories. In Every Output.', highlight: 'Stories' },
  sotu: { text: 'Where You Actually Are.', highlight: 'Actually' },
  timeline: { text: 'Your Arc, Not Your Resume.', highlight: 'Arc' },
  roster: { text: 'The People Come with You.', highlight: 'People' },
}

function renderHeadline({ text, highlight }: { text: string; highlight: string }) {
  const idx = text.indexOf(highlight)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-ochre">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </>
  )
}

// StoryBrand-framed teaser: problem → answer → end result.
// Tight, pitchy, hero-centric. Zero mental calories.
const ANCHOR_TEASERS: Record<string, string> = {
  codex:
    'AI writes like AI — no matter how you prompt it. The Codex captures your real voice and hands it to every model you use. So the words finally sound like you.',
  'story-bank':
    'AI outputs feel generic because they are — AI doesn’t know the stories that made you. Drop the ones you keep returning to into the Story Bank. Every output after sounds lived-in, because it is.',
  sotu:
    'Who you are doesn’t change. Where you are changes every season. The State of the Union tells AI what’s loud in your life right now — so every answer meets you where you actually are.',
  timeline:
    'AI treats you like a blank slate. You’re not — you’ve earned a path. The Timeline gives AI your arc, so its recommendations fit where you’ve been, not just where you are.',
  roster:
    'You live inside a web of people — spouse, kids, mentors, rivals. AI doesn’t know them. The Roster maps who sits at your table, so every answer respects your actual relationships, not hypothetical ones.',
}

export function AnchorPaywall({
  doc,
}: {
  doc: DocumentConfig
  authed?: boolean
}) {
  const heroImage = HERO_IMAGES[doc.slug]
  const icon = ANCHOR_ICONS[doc.slug]
  const question = ANCHOR_QUESTIONS[doc.slug]
  const headline = ANCHOR_HEADLINES[doc.slug]
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
              ? 'linear-gradient(to bottom, rgba(40,32,18,0.35) 0%, rgba(30,28,20,0.55) 40%, rgba(12,35,64,0.88) 80%, rgba(12,35,64,1) 100%)'
              : '#0c2340',
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
                  className="font-display text-cream font-bold leading-tight mb-4"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
                >
                  {doc.title}
                </h1>

                <div className="w-10 h-[2px] bg-ochre/50 mb-5" aria-hidden="true" />

                {question && (
                  <p
                    className="font-display italic text-cream/90 leading-tight"
                    style={{ fontSize: 'clamp(1.125rem, 2.2vw, 1.5rem)' }}
                  >
                    &ldquo;{question}&rdquo;
                  </p>
                )}
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

      {/* ── Teaser body ── */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        {headline && (
          <h2
            className="font-display text-navy font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            {renderHeadline(headline)}
          </h2>
        )}
        <p className="font-body text-navy/85 text-lg sm:text-xl leading-relaxed mb-10 sm:mb-12">
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
            The Personal Constitution is free. The other five &mdash; including this one &mdash; come with RUMO Annual. Yours to keep. Cancel anytime.
          </p>
          <UpgradeButton
            label="Chart Your Course · $49/year"
            className="inline-flex font-body text-sm font-bold tracking-[0.12em] uppercase px-8 py-3.5 rounded-full
                       bg-teal text-white shadow-md shadow-teal/25
                       hover:bg-teal-light hover:shadow-lg hover:shadow-teal/35 hover:-translate-y-0.5
                       disabled:opacity-60 disabled:cursor-wait
                       transition-all duration-200"
          />
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

      <FullBuildCTA currentSlug={doc.slug} />
    </main>
  )
}
