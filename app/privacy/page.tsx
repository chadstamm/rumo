export const metadata = {
  title: 'Privacy Policy — RUMO',
  description: 'How RUMO handles your data.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-16 sm:pb-20">
          <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-6 sm:mb-8">
            Legal
          </p>
          <h1
            className="font-display text-cream font-bold leading-[1.1] tracking-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Privacy Policy
          </h1>
          <div className="w-12 h-[2px] bg-ochre/50 mb-6 sm:mb-8" aria-hidden="true" />
          <p className="font-body text-cream/60 text-base">
            Last updated: March 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-cream">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
          <div className="space-y-10">
            <Section title="What we collect">
              <p>
                When you use RUMO, we collect the answers you provide to our anchor builder questions, any writing samples you submit for voice analysis, and the context anchor documents we generate on your behalf &mdash; including your Personal Constitution, Writing Codex, Story Bank, State of the Union, Timeline, and Influence Roster. We collect your name and email address when you generate a document.
              </p>
            </Section>

            <Section title="How we store it">
              <p>
                Your answers are stored locally in your browser by default. If you create an account, your data is stored securely in Supabase, a cloud database platform. All data is encrypted at rest. Your documents are associated with your account and are not accessible to other users.
              </p>
            </Section>

            <Section title="What we don&apos;t do">
              <p>
                We do not sell your data. We do not share your information with third parties for marketing or any other purpose. We do not use your writing samples, answers, or generated documents to train AI models &mdash; yours or anyone else&apos;s.
              </p>
            </Section>

            <Section title="Cookies &amp; Analytics">
              <p>
                RUMO uses cookies for authentication and analytics. We use Google Analytics and HubSpot to understand how visitors use the site. These tools collect anonymized usage data. We do not use tracking cookies for advertising.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions about your data or this policy? Email{' '}
                <a href="mailto:chad@chadstamm.com" className="text-teal hover:text-teal-light underline underline-offset-2">
                  chad@chadstamm.com
                </a>.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-navy text-xl font-bold mb-4">
        {title}
      </h2>
      <div className="space-y-3 font-body text-navy/70 text-base leading-relaxed">
        {children}
      </div>
    </div>
  )
}
