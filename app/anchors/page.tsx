import Link from 'next/link'
import { DOCUMENTS } from '@/data/documents'
import { CompassRose } from '@/components/compass-rose'
import {
  AnchorIcon, QuillIcon, ShipLogIcon, CompassIcon, ChronIcon, HelmIcon,
  type AnchorSlug,
} from '@/components/icons/anchor-icons'

export const metadata = {
  title: 'Context Anchors — RUMO',
  description: 'Six context anchors that give your AI agent the foundation it needs. Identity, voice, stories, situation, timeline, and roster.',
}

const ANCHOR_ICONS: Record<string, (props: { className?: string }) => React.ReactNode> = {
  constitution: AnchorIcon,
  codex: QuillIcon,
  'story-bank': ShipLogIcon,
  sotu: CompassIcon,
  timeline: ChronIcon,
  roster: HelmIcon,
}

const ANCHOR_ACCENTS: Record<string, string> = {
  constitution: 'ochre',
  codex: 'teal',
  'story-bank': 'ochre',
  sotu: 'teal',
  timeline: 'ochre',
  roster: 'teal',
}

export default function AnchorsPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero header */}
      <div className="relative bg-navy text-cream overflow-hidden">
        {/* Compass rose watermark */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 opacity-[0.025]" aria-hidden="true">
          <CompassRose className="w-full h-full text-cream" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 pb-16 sm:pb-20">
          <CompassRose className="w-8 h-8 text-teal/40 mb-5" />
          <h1
            className="font-display text-cream font-semibold leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Context Anchors
          </h1>
          <div className="w-12 h-[2px] bg-ochre/50 mb-5" aria-hidden="true" />
          <p className="font-body text-cream/50 text-base sm:text-lg leading-relaxed max-w-xl">
            Six documents that hold your AI steady. Each one answers a question
            your agent needs — who you are, how you sound, what you&apos;ve lived,
            where you&apos;ve been, and who matters. Build them one at a time,
            or chart the full course.
          </p>
        </div>
      </div>

      {/* Anchor grid */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {DOCUMENTS.map((doc, i) => {
            const Icon = ANCHOR_ICONS[doc.slug]
            const accent = ANCHOR_ACCENTS[doc.slug] || 'teal'
            return (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="group relative rounded-2xl border border-navy/[0.08] bg-white
                           p-6 sm:p-7 transition-all duration-300
                           hover:border-teal/20 hover:shadow-lg hover:shadow-teal/5
                           hover:-translate-y-1"
              >
                {/* Number + Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display text-4xl font-bold text-navy/[0.06] leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {Icon && (
                    <div className={`w-10 h-10 rounded-xl bg-${accent}/[0.06] flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${accent}`} />
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 className="font-display text-navy text-xl font-semibold mb-1 group-hover:text-teal transition-colors duration-200">
                  {doc.title}
                </h2>

                {/* Subtitle */}
                <p className="font-body text-sm text-ochre font-medium mb-3">
                  {doc.subtitle}
                </p>

                {/* Description */}
                <p className="font-body text-sm text-navy/45 leading-relaxed">
                  {doc.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-5 flex items-center gap-2 font-body text-xs font-semibold tracking-wide uppercase
                                text-teal/0 group-hover:text-teal transition-all duration-300">
                  Build this anchor
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Accent color indicator */}
                <div
                  className={`absolute top-0 left-6 right-6 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
                              ${accent === 'teal' ? 'bg-teal' : 'bg-ochre'}`}
                />
              </Link>
            )
          })}
        </div>

        {/* CTA section */}
        <div className="mt-14 sm:mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-8 rounded-2xl bg-navy/[0.02] border border-navy/[0.06]">
            <p className="font-body text-navy/50 text-sm max-w-md">
              Want all six? Chart Your Course walks you through every anchor in one guided session.
            </p>
            <Link
              href="/start"
              className="shimmer-hover font-body text-sm font-semibold tracking-wide px-7 py-3 rounded-full
                         bg-ochre text-white shadow-md shadow-ochre/20
                         hover:bg-ochre-light hover:shadow-lg hover:shadow-ochre/30
                         transition-all duration-200 hover:-translate-y-[1px]"
            >
              Chart Your Course
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
