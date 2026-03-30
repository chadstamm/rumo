import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About — RUMO',
  description: 'RUMO means direction in Portuguese. Built in Lisbon by Chad Stamm to solve a problem he kept running into: AI that didn\'t know who it was talking to.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-16 sm:pb-20">
          <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-6 sm:mb-8">
            About
          </p>
          <h1
            className="font-display text-cream font-bold leading-[1.1] tracking-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Rumo Means Direction.
          </h1>
          <div className="w-12 h-[2px] bg-ochre/50 mb-6 sm:mb-8" aria-hidden="true" />
          <p className="font-body text-cream/60 text-lg sm:text-xl leading-relaxed">
            In Portuguese, <em>rumo</em> is the word for direction, course, heading. It&apos;s what a navigator sets before leaving port. It&apos;s what you need before the wind matters.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="bg-cream">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
          <div className="space-y-6">
            <p className="font-body text-navy/80 text-lg sm:text-xl leading-relaxed">
              RUMO was built in Lisbon by Chad Stamm to solve a problem he kept running into: AI that didn&apos;t know who it was talking to.
            </p>

            <p className="font-body text-navy/80 text-lg sm:text-xl leading-relaxed">
              Every tool, every model, every conversation started from zero. Explain yourself. Correct the tone. Add context that should have already been there. The technology was impressive. The output was generic. The gap between the two was always the same missing thing: you.
            </p>

            <p className="font-body text-navy/80 text-lg sm:text-xl leading-relaxed">
              RUMO exists because that gap shouldn&apos;t require a computer science degree to close. You answer questions about who you are, how you write, what you&apos;ve lived, where you are right now, how your life has unfolded, and who matters most. RUMO compiles those answers into Context Anchors &mdash; structured documents your AI can actually use.
            </p>

            <p className="font-body text-navy/80 text-lg sm:text-xl leading-relaxed">
              The result is AI that works for your life. Not a template. Not a prompt hack. A foundation built from your own words, your own experience, your own direction.
            </p>

            <p className="font-body text-navy font-semibold text-lg sm:text-xl leading-relaxed">
              Give AI your context before you give it your questions. That&apos;s the whole idea.
            </p>
          </div>

          {/* Founder */}
          <div className="mt-16 sm:mt-20 pt-10 border-t border-navy/[0.08]">
            <h2 className="font-display text-navy text-2xl font-bold mb-6">
              The Builder
            </h2>
            <div className="space-y-4">
              <p className="font-body text-navy/70 text-base leading-relaxed">
                Chad Stamm is a writer, creative director, and AI integrator based in Lisbon, Portugal. He works at the intersection of storytelling, business strategy, and artificial intelligence &mdash; building tools that help people work with AI the way they actually think.
              </p>
              <p className="font-body text-navy/70 text-base leading-relaxed">
                Before RUMO, he spent a decade leading digital strategy for B2B brands as Executive Creative Director at TMC Digital Media. He&apos;s also a novelist, a past Rotary president, and a father raising a bilingual kid in a city built on seven hills.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href="https://linkedin.com/in/chadstamm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-teal hover:text-teal-light transition-colors"
                >
                  LinkedIn &rarr;
                </a>
                <a
                  href="https://chadstamm.bsky.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-teal hover:text-teal-light transition-colors"
                >
                  Bluesky &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 sm:mt-20 text-center">
            <Link
              href="/docs/constitution"
              className="shimmer-hover inline-flex items-center gap-2.5
                         px-8 py-4 rounded-full
                         bg-teal text-white font-body font-bold text-sm tracking-[0.12em]
                         shadow-lg shadow-teal/20
                         hover:bg-teal-light hover:shadow-xl hover:shadow-teal/30
                         transition-all duration-300 hover:-translate-y-[1px]"
            >
              GET STARTED &mdash; IT&apos;S FREE
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
