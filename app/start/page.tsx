import Image from 'next/image'
import Link from 'next/link'
import { DOCUMENTS, FULL_BUILD_SECTIONS } from '@/data/documents'
import { getQuestionsForSection } from '@/data/questions'

export const metadata = {
  title: 'Chart Your Course — RUMO',
  description: 'Build all six context anchors in one session. Identity, voice, stories, situation, timeline, and roster — everything your AI needs to know you.',
}

const ANCHOR_ICONS: Record<string, string> = {
  constitution: '/icons/constitution.png',
  codex: '/icons/codex.png',
  'story-bank': '/icons/story-bank.png',
  sotu: '/icons/sotu.png',
  timeline: '/icons/timeline.png',
  roster: '/icons/roster.png',
}

const ANCHOR_QUESTIONS: Record<string, string> = {
  constitution: 'Who am I? What do I stand for?',
  codex: 'How do I write?',
  'story-bank': 'What stories do I always tell?',
  sotu: 'What matters to me right now?',
  timeline: 'How has my life unfolded?',
  roster: 'Who are the people that matter?',
}

const ANCHOR_SHORT_LABELS: Record<string, string> = {
  constitution: 'Identity',
  codex: 'Voice',
  'story-bank': 'Stories',
  sotu: 'Situation',
  timeline: 'Timeline',
  roster: 'Influence',
}

export default function ChartYourCoursePage() {
  const totalQuestions = FULL_BUILD_SECTIONS.reduce<number>(
    (sum, s) => sum + getQuestionsForSection(s).length,
    0
  )

  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <Image
          src="/heroes/chart-your-course.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: 'center 15%' }}
          priority
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background: `linear-gradient(to bottom,
              rgba(26, 39, 68, 0.65) 0%,
              rgba(26, 39, 68, 0.75) 50%,
              rgba(26, 39, 68, 0.92) 85%,
              rgba(26, 39, 68, 1) 100%)`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-16 sm:pb-20">
          <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-6 sm:mb-8">
            The Full Journey
          </p>
          <h1
            className="font-display text-cream font-bold leading-[1.1] tracking-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Chart Your Course
          </h1>
          <div className="w-12 h-[2px] bg-ochre/50 mb-6 sm:mb-8" aria-hidden="true" />
          <p className="font-body text-cream/85 text-lg sm:text-xl leading-relaxed max-w-2xl mb-8">
            Build all six context anchors in one session &mdash; {totalQuestions}&nbsp;questions that cover who you are, how you write, what you&apos;ve lived, where you are now, where you&apos;ve been, and who matters. When you&apos;re done, your AI has the full picture and knows how to best work with you.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-3 font-body font-bold text-sm sm:text-base tracking-[0.1em] uppercase
                         px-10 py-4 sm:py-5 rounded-full
                         bg-ochre text-white shadow-lg shadow-ochre/25
                         hover:bg-ochre-light hover:shadow-xl hover:shadow-ochre/35
                         hover:-translate-y-1 active:translate-y-0
                         transition-all duration-300"
            >
              GET STARTED
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10h10M12 6.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <span className="font-body text-cream/30 text-sm self-center">
              $49/year <span className="text-cream/20">·</span> all six anchors <span className="text-cream/20">·</span> unlimited updates
            </span>
          </div>
        </div>
      </div>

      {/* ── How it works ── */}
      <div className="bg-cream">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
          <p className="font-body text-ochre font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-4">
            How It Works
          </p>
          <h2
            className="font-display text-navy font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            One Session. Six Documents. The Full Picture.
          </h2>
          <div className="w-10 h-[2px] bg-ochre/30 mb-8" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div>
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center mb-4">
                <span className="font-display text-teal font-bold text-sm">1</span>
              </div>
              <h3 className="font-display text-navy font-semibold text-lg mb-2">Answer the questions</h3>
              <p className="font-body text-navy/50 text-sm leading-relaxed">
                {totalQuestions}&nbsp;questions across six categories. Skip any you want. Upload existing documents to get a head start. Use your microphone if you think better out loud.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center mb-4">
                <span className="font-display text-teal font-bold text-sm">2</span>
              </div>
              <h3 className="font-display text-navy font-semibold text-lg mb-2">We generate your anchors</h3>
              <p className="font-body text-navy/50 text-sm leading-relaxed">
                AI analyzes your answers and builds six personalized context documents. Your Constitution, Writing Codex, Story Bank, State of the Union, Timeline, and Influence Roster.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center mb-4">
                <span className="font-display text-teal font-bold text-sm">3</span>
              </div>
              <h3 className="font-display text-navy font-semibold text-lg mb-2">Give your AI direction</h3>
              <p className="font-body text-navy/50 text-sm leading-relaxed">
                Upload your documents to Claude, ChatGPT, Gemini, or any AI you use. It stops guessing and starts responding like it actually knows you.
              </p>
            </div>
          </div>

          {/* ── The six anchors ── */}
          <p className="font-body text-ochre font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-4">
            What You Get
          </p>
          <h2
            className="font-display text-navy font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            Six Context Anchors
          </h2>
          <div className="w-10 h-[2px] bg-ochre/30 mb-10" aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {DOCUMENTS.map((doc) => {
              const isFree = doc.slug === 'constitution'
              const accent = isFree ? '#1ebeb1' : '#c4943a'
              const icon = ANCHOR_ICONS[doc.slug]
              const question = ANCHOR_QUESTIONS[doc.slug]

              return (
                <div
                  key={doc.slug}
                  className="relative rounded-2xl overflow-hidden bg-cream border-2 border-navy/10"
                >
                  {/* Accent top bar */}
                  <div
                    className="h-[3px] w-full"
                    style={{ background: accent, opacity: isFree ? 1 : 0.6 }}
                  />

                  <div className="px-7 py-8 sm:px-8 sm:py-9">
                    <div className="flex items-start justify-between mb-5">
                      {icon && (
                        <Image
                          src={icon}
                          alt=""
                          width={40}
                          height={40}
                          className="opacity-85"
                          aria-hidden="true"
                        />
                      )}
                      {isFree && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full
                                         bg-teal/10 border border-teal/25
                                         font-body text-[11px] font-bold tracking-[0.15em] uppercase text-teal">
                          Free
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-semibold text-navy mb-2">
                      {doc.title}
                    </h3>

                    {question && (
                      <p
                        className="font-body text-sm italic font-semibold mb-4"
                        style={{ color: accent }}
                      >
                        &ldquo;{question}&rdquo;
                      </p>
                    )}

                    <p className="font-body text-navy/50 text-sm leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── CTA section ── */}
      <section className="relative bg-navy overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 50%, rgba(30, 190, 177, 0.08) 0%, transparent 70%),
              radial-gradient(ellipse 60% 60% at 80% 30%, rgba(196, 148, 58, 0.06) 0%, transparent 70%),
              radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0, 0, 0, 0.3) 0%, transparent 50%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <Image src="/anchor-section-icon.png" alt="" width={80} height={80} className="mx-auto opacity-70" aria-hidden="true" />
            </div>

            <h2
              className="font-display text-cream font-bold leading-[1.1] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
            >
              Ready to Chart Your Course?
            </h2>

            <p className="font-body text-cream/50 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-4">
              {totalQuestions}&nbsp;questions. Six documents. One session that changes how your AI works with you.
            </p>

            <p className="font-body text-cream/30 text-sm mb-10">
              $49/year <span className="text-cream/20">·</span> all six anchors <span className="text-cream/20">·</span> unlimited updates <span className="text-cream/20">·</span> vault access
            </p>
          </div>

          {/* Anchor icon row */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-12 mb-14">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.slug}
                className="flex flex-col items-center gap-2"
              >
                {ANCHOR_ICONS[doc.slug] && (
                  <Image
                    src={ANCHOR_ICONS[doc.slug]}
                    alt={doc.title}
                    width={48}
                    height={48}
                    className="opacity-50"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                )}
                <span className="font-body text-[10px] sm:text-xs tracking-[0.15em] uppercase text-cream/30">
                  {ANCHOR_SHORT_LABELS[doc.slug] || doc.title}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-3 font-body font-bold text-sm sm:text-base tracking-[0.1em] uppercase
                         px-10 sm:px-14 py-4 sm:py-5 rounded-full
                         bg-ochre text-white shadow-lg shadow-ochre/25
                         hover:bg-ochre-light hover:shadow-xl hover:shadow-ochre/35
                         hover:-translate-y-1 active:translate-y-0
                         transition-all duration-300"
            >
              GET STARTED
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10h10M12 6.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Or build one at a time */}
          <div className="text-center mt-8">
            <Link
              href="/anchors/constitution"
              className="font-body text-sm text-teal/60 hover:text-teal transition-colors duration-200"
            >
              Or start with the free Personal Constitution →
            </Link>
          </div>
        </div>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-ochre/50 to-transparent" aria-hidden="true" />
      </section>
    </main>
  )
}
