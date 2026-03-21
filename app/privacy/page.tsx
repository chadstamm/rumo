export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream px-6 py-20">
      <article className="max-w-2xl mx-auto font-body text-navy">
        <h1 className="font-display text-4xl text-navy mb-2">Privacy Policy</h1>
        <p className="text-muted text-sm mb-12">Last updated: March 2026</p>

        <section className="mb-10">
          <h2 className="font-display text-xl text-navy mb-3">What we collect</h2>
          <p className="text-navy/80 leading-relaxed">
            When you use Rumo, we collect the answers you provide to questions in The Path, any writing samples you submit for voice analysis, and the documents we generate on your behalf — your identity profile, writing codex, and story bank. We collect your email address for authentication purposes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl text-navy mb-3">How we store it</h2>
          <p className="text-navy/80 leading-relaxed">
            Your data is stored in Supabase, a secure cloud database platform. All data is encrypted at rest. Your documents are associated with your account and are not accessible to other users.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl text-navy mb-3">What we don&apos;t do</h2>
          <p className="text-navy/80 leading-relaxed">
            We do not sell your data. We do not share your information with third parties for marketing or any other purpose. We do not use your writing samples, answers, or generated documents to train AI models — yours or anyone else&apos;s.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl text-navy mb-3">Cookies</h2>
          <p className="text-navy/80 leading-relaxed">
            Rumo uses cookies only for authentication — to keep you signed in between sessions. We do not use tracking cookies or third-party analytics cookies.
          </p>
        </section>

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
