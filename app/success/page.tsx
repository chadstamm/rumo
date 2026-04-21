import Link from 'next/link'
import { CompassRose } from '@/components/compass-rose'

export const metadata = {
  title: 'Welcome aboard — RUMO',
  description: 'Your RUMO subscription is active.',
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="relative bg-navy text-cream overflow-hidden">
        <div className="absolute -bottom-16 -right-16 w-72 h-72 opacity-[0.04]" aria-hidden="true">
          <CompassRose className="w-full h-full text-cream" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-16 sm:pb-20 text-center">
          <p className="font-body text-teal font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-6 sm:mb-8">
            Welcome aboard
          </p>
          <h1
            className="font-display text-cream font-bold leading-[1.1] tracking-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            You&apos;re in.
          </h1>
          <div className="w-12 h-[2px] bg-teal/60 mx-auto mb-6 sm:mb-8" aria-hidden="true" />
          <p className="font-body text-cream/80 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            All six Context Anchors are unlocked. Start with Chart Your Course for the guided session, or jump straight to any anchor in your Vault.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/start"
            className="inline-flex font-body text-sm font-bold tracking-[0.1em] uppercase px-8 py-3.5 rounded-full
                       bg-teal text-white shadow-md shadow-teal/20
                       hover:bg-teal-light hover:shadow-lg hover:shadow-teal/30
                       transition-all duration-200"
          >
            Chart Your Course
          </Link>
          <Link
            href="/vault"
            className="inline-flex font-body text-sm font-bold tracking-[0.1em] uppercase px-8 py-3.5 rounded-full
                       border-2 border-navy/15 text-navy
                       hover:border-navy/30 hover:bg-navy/5
                       transition-all duration-200"
          >
            Open Your Vault
          </Link>
        </div>

        <p className="font-body text-navy/45 text-sm mt-12 max-w-md mx-auto">
          A receipt is on its way to your email. Your subscription renews annually; you can cancel anytime from your account.
        </p>
      </div>
    </main>
  )
}
