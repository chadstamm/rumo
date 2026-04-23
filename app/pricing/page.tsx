import Link from 'next/link'
import { UpgradeButton } from '@/components/upgrade-button'

export const metadata = {
  title: 'Pricing — RUMO',
  description: 'Build your free Personal Constitution or get all six Context Anchors for $49/year. Unlimited generation, vault access, and updates.',
}

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <div className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-16 sm:pb-20 text-center">
          <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-6 sm:mb-8">
            Pricing
          </p>
          <h1
            className="font-display text-cream font-bold leading-[1.1] tracking-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Start Free.
            <br />
            <span className="text-ochre-light">Go Further When You&apos;re Ready.</span>
          </h1>
          <div className="w-12 h-[2px] bg-ochre/50 mx-auto mb-6 sm:mb-8" aria-hidden="true" />
          <p className="font-body text-cream/70 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Build your Personal Constitution for free. When you want the full picture, unlock all six Context Anchors for $49/year. Your documents are yours to keep and update anytime.
          </p>
        </div>
      </div>

      {/* ── Pricing cards ── */}
      <div className="bg-cream">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

            {/* Free tier */}
            <div className="rounded-2xl border-2 border-navy/10 bg-cream p-8 sm:p-10 flex flex-col">
              <div className="mb-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-ochre/10 border border-ochre/25 font-body text-[11px] font-bold tracking-[0.15em] uppercase text-ochre mb-4">
                  Free
                </span>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-display text-navy text-5xl font-bold">$0</span>
                </div>
                <p className="font-body text-navy/75 text-sm leading-relaxed">
                  Start with the foundation. No account required.
                </p>
              </div>

              <div className="space-y-3 mb-10 flex-1">
                <PricingFeature included>Personal Constitution builder</PricingFeature>
                <PricingFeature included>Guided questions with considerations</PricingFeature>
                <PricingFeature included>Save progress locally</PricingFeature>
                <PricingFeature included>Export your document</PricingFeature>
                <PricingFeature>Writing Codex</PricingFeature>
                <PricingFeature>Story Bank</PricingFeature>
                <PricingFeature>State of the Union</PricingFeature>
                <PricingFeature>Timeline</PricingFeature>
                <PricingFeature>Influence Roster</PricingFeature>
                <PricingFeature>Chart Your Course (all-in-one)</PricingFeature>
              </div>

              <Link
                href="/anchors/constitution"
                className="block text-center font-body text-sm font-bold tracking-[0.1em] uppercase px-7 py-3.5 rounded-full
                           border-2 border-ochre text-ochre
                           hover:bg-ochre hover:text-white
                           transition-all duration-200"
              >
                Get Started
              </Link>
            </div>

            {/* Full Journey */}
            <div className="rounded-2xl border-2 border-teal/30 bg-cream p-8 sm:p-10 flex flex-col relative overflow-hidden">
              {/* Recommended badge */}
              <div className="absolute top-0 right-0 bg-teal text-white font-body text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-bl-xl">
                Recommended
              </div>

              <div className="mb-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal/10 border border-teal/25 font-body text-[11px] font-bold tracking-[0.15em] uppercase text-teal mb-4">
                  Full Journey
                </span>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-display text-navy text-5xl font-bold">$49</span>
                  <span className="font-body text-navy/60 text-sm">/year</span>
                </div>
                <p className="font-body text-navy/75 text-sm leading-relaxed">
                  All six Context Anchors. Everything your AI needs to know you.
                </p>
              </div>

              <div className="space-y-3 mb-10 flex-1">
                <PricingFeature included>Personal Constitution builder</PricingFeature>
                <PricingFeature included>Writing Codex</PricingFeature>
                <PricingFeature included>Story Bank</PricingFeature>
                <PricingFeature included>State of the Union</PricingFeature>
                <PricingFeature included>Timeline</PricingFeature>
                <PricingFeature included>Influence Roster</PricingFeature>
                <PricingFeature included>Chart Your Course (all-in-one guided session)</PricingFeature>
                <PricingFeature included>Export all documents</PricingFeature>
                <PricingFeature included>Save progress with account</PricingFeature>
              </div>

              <UpgradeButton
                label="Chart Your Course · $49/year"
                className="block w-full text-center font-body text-sm font-bold tracking-[0.1em] uppercase px-7 py-3.5 rounded-full
                           bg-teal text-white shadow-md shadow-teal/20
                           hover:bg-teal-light hover:shadow-lg hover:shadow-teal/30
                           disabled:opacity-60 disabled:cursor-wait
                           transition-all duration-200"
              />
            </div>
          </div>

          {/* ── FAQ / Trust signals ── */}
          <div className="mt-16 sm:mt-20 max-w-2xl mx-auto">
            <h2 className="font-display text-navy text-2xl font-bold mb-8 text-center">
              Common Questions
            </h2>

            <div className="space-y-6">
              <FAQ
                question="Do I need to pay to try RUMO?"
                answer="No. The Personal Constitution is completely free. Build it, export it, use it. If you want the other five anchors, upgrade whenever you're ready."
              />
              <FAQ
                question="How does the subscription work?"
                answer="$49/year gives you unlimited access to all six anchors, the Chart Your Course guided session, and your personal vault. Regenerate and update your documents anytime."
              />
              <FAQ
                question="What do I get at the end?"
                answer="Structured context documents you can drop into any AI tool — Claude, ChatGPT, Gemini, or whatever comes next. Your documents are yours to keep and use however you want."
              />
              <FAQ
                question="How long does it take?"
                answer="The Personal Constitution takes about 15 minutes. The full six-anchor build takes about an hour, depending on how deep you go."
              />
              <FAQ
                question="What if I already have a bio or writing samples?"
                answer="You can upload existing documents at the start of each builder. RUMO will use them as context alongside your answers."
              />
            </div>
          </div>

          {/* ── End Result repeat ── */}
          <div className="mt-16 sm:mt-20 text-center">
            <p className="font-body text-navy font-semibold text-lg sm:text-xl max-w-lg mx-auto">
              The result is AI that stops guessing who you are.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

function PricingFeature({ children, included }: { children: React.ReactNode; included?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      {included ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
          <path d="M4 9l3.5 3.5L14 5" stroke="#1ebeb1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5 opacity-20">
          <path d="M5 9h8" stroke="#0c2340" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      <span className={`font-body text-sm ${included ? 'text-navy/90' : 'text-navy/35'}`}>
        {children}
      </span>
    </div>
  )
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-navy/[0.08] pb-6">
      <h3 className="font-body text-navy font-semibold text-base mb-2">
        {question}
      </h3>
      <p className="font-body text-navy/75 text-sm leading-relaxed">
        {answer}
      </p>
    </div>
  )
}
