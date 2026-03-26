import Link from 'next/link'

export function Footer() {
  return (
    <footer className="relative bg-navy">
      {/* ── Thin ochre divider at top ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to right, transparent, #c4943a 30%, #c4943a 70%, transparent)',
        }}
      />

      {/* ── Footer Content ── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-12">
        {/* Top row — nav links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8">
          <Link href="/anchors" className="font-body text-xs text-cream/30 hover:text-cream/60 tracking-wide transition-colors duration-200">
            Anchors
          </Link>
          <Link href="/instructions" className="font-body text-xs text-cream/30 hover:text-cream/60 tracking-wide transition-colors duration-200">
            Configure
          </Link>
          <Link href="/vault" className="font-body text-xs text-cream/30 hover:text-cream/60 tracking-wide transition-colors duration-200">
            Vault
          </Link>
          <Link href="/start" className="font-body text-xs text-cream/30 hover:text-cream/60 tracking-wide transition-colors duration-200">
            Chart Your Course
          </Link>
          <Link href="/privacy" className="font-body text-xs text-cream/30 hover:text-cream/60 tracking-wide transition-colors duration-200">
            Privacy
          </Link>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pt-6 border-t border-cream/[0.06]">
          <p className="font-body text-cream/25 text-xs tracking-wide">
            &copy; 2026 Rumo. All rights reserved.
          </p>

          <p className="font-body text-cream/25 text-xs tracking-wide">
            Built by{' '}
            <a
              href="https://chadstamm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/40 hover:text-teal transition-colors duration-300"
            >
              Chad Stamm
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
