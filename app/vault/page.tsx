import { CompassRose } from '@/components/compass-rose'
import Link from 'next/link'

export default function VaultPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <div className="relative bg-navy text-cream overflow-hidden">
        <div className="absolute -bottom-16 -right-16 w-64 h-64 opacity-[0.025]" aria-hidden="true">
          <CompassRose className="w-full h-full text-cream" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
          <CompassRose className="w-8 h-8 text-teal/40 mb-5" />
          <h1
            className="font-display text-cream font-semibold leading-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Your Vault
          </h1>
          <div className="w-12 h-[2px] bg-ochre/50 mb-4" aria-hidden="true" />
          <p className="font-body text-cream/50 text-base max-w-lg">
            Everything you build with RUMO, in one place.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-ochre/10 flex items-center justify-center">
            <CompassRose className="w-8 h-8 text-ochre/40" />
          </div>

          <h2
            className="font-display text-navy font-semibold leading-tight mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            Coming Soon
          </h2>

          <p className="font-body text-navy/50 text-base leading-relaxed max-w-md mx-auto mb-8">
            Your vault will store all six context anchor documents, track your progress, and let you update and regenerate anytime.
          </p>

          <Link
            href="/anchors/constitution"
            className="inline-flex font-body font-bold text-sm px-8 py-3.5 rounded-full uppercase tracking-wide
                       bg-teal text-white shadow-md shadow-teal/20
                       hover:bg-teal-light hover:shadow-lg hover:shadow-teal/30
                       transition-all duration-200"
          >
            Start with Your Constitution
          </Link>
        </div>
      </div>
    </main>
  )
}
