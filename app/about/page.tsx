import Link from 'next/link'

export const metadata = {
  title: 'About — RUMO',
  description: 'RUMO gives your AI the context it needs to actually work for you. Six anchors. One system. Direction before destination.',
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
            Direction Before Destination.
          </h1>
          <div className="w-12 h-[2px] bg-ochre/50 mb-6 sm:mb-8" aria-hidden="true" />
          <p className="font-body text-cream/80 text-lg sm:text-xl leading-relaxed">
            RUMO is the Portuguese word for direction, course, heading. It&apos;s what a navigator sets before leaving port. We chose it because that&apos;s exactly what&apos;s missing from how most people use AI.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="bg-cream">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
          <div className="space-y-6">
            <h2
              className="font-display text-navy font-bold leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
            >
              The Problem
            </h2>

            <p className="font-body text-navy/75 text-base sm:text-lg leading-relaxed">
              AI is powerful. But every conversation starts from zero. You explain yourself, correct the tone, add context that should already be there. The technology is impressive. The output is generic. The gap between the two is always the same missing thing: you.
            </p>

            <p className="font-body text-navy/75 text-base sm:text-lg leading-relaxed">
              This gets worse as AI gets more capable. Agents that can take action on your behalf, manage your calendar, draft your emails, build your content &mdash; they all need to know who they&apos;re working for. Without that context, even the best agent is guessing.
            </p>

            <div className="w-10 h-[2px] bg-ochre/30 my-10" aria-hidden="true" />

            <h2
              className="font-display text-navy font-bold leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
            >
              What RUMO Does
            </h2>

            <p className="font-body text-navy/75 text-base sm:text-lg leading-relaxed">
              RUMO builds the context layer between you and your AI. Through a process we call context mining, you answer questions about who you are, how you write, what you&apos;ve lived, where you are right now, how your life has unfolded, and who matters most. RUMO compiles those answers into Context Anchors &mdash; structured documents your AI can actually use.
            </p>

            <p className="font-body text-navy/75 text-base sm:text-lg leading-relaxed">
              Six anchors. Your Personal Constitution (identity and values), Writing Codex (voice and style), Story Bank (lived experience), State of the Union (current situation), Timeline (life arc), and Influence Roster (key relationships). Together, they give any AI system &mdash; Claude, ChatGPT, Gemini, a custom agent, whatever comes next &mdash; the foundation it needs to work like it actually knows you.
            </p>

            <div className="w-10 h-[2px] bg-ochre/30 my-10" aria-hidden="true" />

            <h2
              className="font-display text-navy font-bold leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
            >
              Why This Matters Now
            </h2>

            <p className="font-body text-navy/75 text-base sm:text-lg leading-relaxed">
              We&apos;re entering the age of personal AI agents. Not chatbots &mdash; agents that act, plan, and execute on your behalf. The people who give their agents real context about who they are will get dramatically better results than those who don&apos;t. RUMO is how you build that context without needing to be a prompt engineer.
            </p>

            <p className="font-body text-navy font-semibold text-base sm:text-lg leading-relaxed">
              Give your AI direction before you give it instructions. That&apos;s the whole idea.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 sm:mt-20 text-center">
            <Link
              href="/anchors/constitution"
              className="shimmer-hover inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-teal text-white font-body font-bold text-sm tracking-[0.12em] shadow-lg shadow-teal/20 hover:bg-teal-light hover:shadow-xl hover:shadow-teal/30 transition-all duration-300 hover:-translate-y-[1px]"
            >
              GET STARTED &mdash; IT&apos;S FREE
            </Link>
            <p className="font-body text-navy/40 text-sm mt-4">
              Build your Personal Constitution in about 15 minutes. No account required.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
