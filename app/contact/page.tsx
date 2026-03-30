import Link from 'next/link'

export const metadata = {
  title: 'Contact — RUMO',
  description: 'Get in touch with RUMO. Questions, feedback, or partnership inquiries.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-16 sm:pb-20">
          <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-6 sm:mb-8">
            Contact
          </p>
          <h1
            className="font-display text-cream font-bold leading-[1.1] tracking-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Get in Touch.
          </h1>
          <div className="w-12 h-[2px] bg-ochre/50 mb-6 sm:mb-8" aria-hidden="true" />
          <p className="font-body text-cream/60 text-lg sm:text-xl leading-relaxed">
            Questions, feedback, partnership ideas, or just want to say hey.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-cream">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Email */}
            <div>
              <h2 className="font-display text-navy text-xl font-bold mb-3">
                Email
              </h2>
              <p className="font-body text-navy/60 text-base mb-4 leading-relaxed">
                The fastest way to reach the person behind RUMO.
              </p>
              <a
                href="mailto:chad@chadstamm.com"
                className="font-body text-teal hover:text-teal-light text-base font-medium transition-colors"
              >
                chad@chadstamm.com
              </a>
            </div>

            {/* Social */}
            <div>
              <h2 className="font-display text-navy text-xl font-bold mb-3">
                Social
              </h2>
              <p className="font-body text-navy/60 text-base mb-4 leading-relaxed">
                Follow along, share feedback, or start a conversation.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://linkedin.com/in/chadstamm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-teal hover:text-teal-light text-base font-medium transition-colors"
                >
                  LinkedIn &rarr;
                </a>
                <a
                  href="https://chadstamm.bsky.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-teal hover:text-teal-light text-base font-medium transition-colors"
                >
                  Bluesky &rarr;
                </a>
                <a
                  href="https://instagram.com/chadstamm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-teal hover:text-teal-light text-base font-medium transition-colors"
                >
                  Instagram &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-16 sm:mt-20 p-8 rounded-2xl border-2 border-navy/[0.08] bg-cream">
            <h2 className="font-display text-navy text-xl font-bold mb-3">
              For Partnerships & Press
            </h2>
            <p className="font-body text-navy/60 text-base leading-relaxed">
              If you&apos;re interested in integrations, collaborations, speaking engagements, or press inquiries, reach out via email. Happy to talk.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
