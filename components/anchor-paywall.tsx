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

const ANCHOR_QUESTIONS: Record<string, string> = {
  codex: 'How do I write?',
  'story-bank': 'What stories do I always tell?',
  sotu: 'What matters to me right now?',
  timeline: 'How has my life unfolded?',
  roster: 'Who are the people that matter?',
}

export function AnchorPaywall({
  doc,
  authed,
}: {
  doc: DocumentConfig
  authed: boolean
}) {
  const icon = ANCHOR_ICONS[doc.slug]
  const question = ANCHOR_QUESTIONS[doc.slug]
  const ctaHref = authed ? '/pricing' : `/auth/login?returnTo=/pricing`

  return (
    <main className="min-h-screen bg-cream">
      {/* ── Navy hero ── */}
      <section className="relative bg-navy text-cream overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 w-[640px] h-[640px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
        >
          <CompassRose className="w-full h-full text-cream" />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, rgba(26, 39, 68, 0.55) 85%)',
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-16 sm:pb-20 text-center">
          {icon && (
            <div className="w-20 h-20 mx-auto mb-6 relative opacity-90">
              <Image src={icon} alt="" fill sizes="80px" className="object-contain" />
            </div>
          )}

          <p className="font-body text-ochre font-bold text-xs sm:text-sm tracking-[0.35em] uppercase mb-6">
            Context Anchor
          </p>

          <h1
            className="font-display text-cream font-bold leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {doc.title}
          </h1>

          <div className="w-10 h-[2px] bg-ochre/60 mx-auto mb-6" aria-hidden="true" />

          <p className="font-body text-cream/75 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-4">
            {doc.subtitle}
          </p>

          {question && (
            <p className="font-display text-cream/90 italic text-lg sm:text-xl">
              &ldquo;{question}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* ── Body: what this anchor does + paywall ── */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 text-center">
        <p className="font-body text-navy/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          {doc.description}
        </p>

        <div className="bg-white/50 border border-navy/10 rounded-3xl p-8 sm:p-12 max-w-xl mx-auto mb-8">
          <p className="font-body text-ochre font-bold text-xs tracking-[0.25em] uppercase mb-4">
            Pro Anchor
          </p>
          <h2
            className="font-display text-navy font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            Unlock all six anchors for $49/year.
          </h2>
          <p className="font-body text-navy/60 text-sm sm:text-base leading-relaxed mb-8">
            The Personal Constitution is free. The other five &mdash; including this one &mdash; are part of RUMO Annual. All yours, forever, renews yearly.
          </p>
          <Link
            href={ctaHref}
            className="inline-flex font-body text-sm font-bold tracking-[0.12em] uppercase px-8 py-3.5 rounded-full
                       bg-teal text-white shadow-md shadow-teal/25
                       hover:bg-teal-light hover:shadow-lg hover:shadow-teal/35 hover:-translate-y-0.5
                       transition-all duration-200"
          >
            {authed ? 'Chart Your Course' : 'Sign in to unlock'}
          </Link>
        </div>

        <p className="font-body text-navy/45 text-sm">
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
