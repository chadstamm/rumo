import { CompassRose } from '@/components/compass-rose'

export const metadata = {
  title: 'Privacy Policy — RUMO',
  description: 'How Rumo handles your data.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <div className="relative bg-navy text-cream overflow-hidden">
        <div className="absolute -bottom-12 -right-12 w-48 h-48 opacity-[0.025]" aria-hidden="true">
          <CompassRose className="w-full h-full text-cream" />
        </div>

        <div className="relative max-w-2xl mx-auto px-6 sm:px-10 pt-28 sm:pt-32 pb-12 sm:pb-16">
          <h1
            className="font-display text-cream font-semibold leading-tight mb-2"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Privacy Policy
          </h1>
          <div className="w-10 h-[2px] bg-ochre/50 mb-4" aria-hidden="true" />
          <p className="font-body text-cream/40 text-sm">Last updated: March 2026</p>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-2xl mx-auto px-6 sm:px-10 py-12 sm:py-16 font-body text-navy">
        <section className="mb-10">
          <h2 className="font-display text-xl text-navy mb-3">What we collect</h2>
          <p className="text-navy/80 leading-relaxed">
            When you use Rumo, we collect the answers you provide to our anchor builder questions, any writing samples you submit for voice analysis, and the context anchor documents we generate on your behalf — including your personal constitution, writing codex, story bank, state of the union, timeline, and roster. We collect your email address for authentication purposes.
          </p>
        </section>

        <div className="w-8 h-px bg-navy/10 mb-10" aria-hidden="true" />

        <section className="mb-10">
          <h2 className="font-display text-xl text-navy mb-3">How we store it</h2>
          <p className="text-navy/80 leading-relaxed">
            Your data is stored in Supabase, a secure cloud database platform. All data is encrypted at rest. Your documents are associated with your account and are not accessible to other users.
          </p>
        </section>

        <div className="w-8 h-px bg-navy/10 mb-10" aria-hidden="true" />

        <section className="mb-10">
          <h2 className="font-display text-xl text-navy mb-3">What we don&apos;t do</h2>
          <p className="text-navy/80 leading-relaxed">
            We do not sell your data. We do not share your information with third parties for marketing or any other purpose. We do not use your writing samples, answers, or generated documents to train AI models — yours or anyone else&apos;s.
          </p>
        </section>

        <div className="w-8 h-px bg-navy/10 mb-10" aria-hidden="true" />

        <section className="mb-10">
          <h2 className="font-display text-xl text-navy mb-3">Cookies</h2>
          <p className="text-navy/80 leading-relaxed">
            Rumo uses cookies only for authentication — to keep you signed in between sessions. We do not use tracking cookies or third-party analytics cookies.
          </p>
        </section>

        <div className="w-8 h-px bg-navy/10 mb-10" aria-hidden="true" />

        <section className="mb-10">
          <h2 className="font-display text-xl text-navy mb-3">Contact</h2>
          <p className="text-navy/80 leading-relaxed">
            Questions about your data or this policy? Email{' '}
            <a
              href="mailto:chad@chadstamm.com"
              className="text-ochre underline underline-offset-2 hover:text-ochre-light transition-colors duration-150"
            >
              chad@chadstamm.com
            </a>
            .
          </p>
        </section>
      </article>
    </main>
  )
}
