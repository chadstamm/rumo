export const metadata = {
  title: 'Terms of Service — RUMO',
  description: 'Terms of Service for RUMO.',
}

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <div className="w-12 h-[2px] bg-ochre/50 mb-6 sm:mb-8" aria-hidden="true" />
          <p className="font-body text-cream/60 text-base">
            Last updated: April 21, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-cream">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
          <div className="space-y-10">
            <Section title="1. Overview">
              <p>
                RUMO (&ldquo;the Service&rdquo;) is a web application operated by Chad Stamm (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;). By using RUMO, you agree to these Terms of Service. If you don&apos;t agree, please don&apos;t use the Service.
              </p>
            </Section>

            <Section title="2. What RUMO Does">
              <p>
                RUMO helps you create structured context documents (&ldquo;Context Anchors&rdquo;) through guided questions. These documents are designed to be used with AI tools to improve the quality of AI-generated output. RUMO does not provide AI-generated content itself &mdash; it helps you build the inputs.
              </p>
            </Section>

            <Section title="3. Your Content">
              <p>
                Everything you write in RUMO belongs to you. Your answers, your documents, your Context Anchors &mdash; all yours. We don&apos;t claim ownership of any content you create through the Service.
              </p>
              <p>
                Your answers are stored locally in your browser by default. If you create an account, your data is stored securely on our servers. You can export or delete your data at any time. If you cancel your subscription, your existing documents remain accessible in read-only mode until you choose to delete them.
              </p>
            </Section>

            <Section title="4. Free and Paid Features">
              <p>
                The Personal Constitution builder is free. Additional Context Anchors and the Chart Your Course guided session require a one-time purchase. Prices are listed on our pricing page and may change. Existing purchases are not affected by price changes.
              </p>
            </Section>

            <Section title="5. Payments and Refunds">
              <p>
                Payments are processed securely through Stripe. We do not store your payment information. If you&apos;re unsatisfied with your purchase, email <a href="mailto:chad@chadstamm.com" className="text-teal hover:text-teal-light underline underline-offset-2">chad@chadstamm.com</a> within 30 days of purchase for a full refund. No questions asked. Refunds are processed within three business days.
              </p>
            </Section>

            <Section title="6. Acceptable Use">
              <p>
                Use RUMO for its intended purpose: building personal context documents. Don&apos;t use the Service to generate harmful, illegal, or misleading content. Don&apos;t attempt to reverse-engineer, scrape, or disrupt the Service.
              </p>
            </Section>

            <Section title="7. Privacy">
              <p>
                Your privacy matters. See our <a href="/privacy" className="text-teal hover:text-teal-light underline underline-offset-2">Privacy Policy</a> for details on how we handle your data. The short version: we don&apos;t sell your data, we don&apos;t use your content to train AI models, and we collect only what&apos;s needed to run the Service.
              </p>
            </Section>

            <Section title="8. Disclaimer">
              <p>
                RUMO is provided &ldquo;as is.&rdquo; We do our best to keep the Service running smoothly, but we can&apos;t guarantee uninterrupted access or that the output will meet every expectation. AI tools are unpredictable &mdash; better context helps, but results vary.
              </p>
            </Section>

            <Section title="9. Changes to These Terms">
              <p>
                We may update these terms as the Service evolves. Significant changes will be communicated through the Service or via email if you have an account. Continued use after changes constitutes acceptance.
              </p>
            </Section>

            <Section title="10. Governing Law">
              <p>
                These terms are governed by the laws of the State of Colorado, USA, without regard to conflict of laws principles. Any disputes arising from your use of RUMO will be resolved in the state or federal courts located in Colorado.
              </p>
            </Section>

            <Section title="11. Contact">
              <p>
                Questions about these terms? Reach out at{' '}
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
