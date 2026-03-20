import { Coffee } from 'lucide-react'

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
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Copyright */}
          <p className="font-body text-cream/50 text-xs sm:text-sm tracking-wide order-2 sm:order-1">
            &copy; 2026 Rumo
          </p>

          {/* Built-by credit */}
          <p className="font-body text-cream/40 text-xs sm:text-sm tracking-wide order-1 sm:order-2">
            Built by{' '}
            <a
              href="https://chadstamm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/60 hover:text-ochre transition-colors duration-300"
            >
              Chad Stamm
            </a>
          </p>

          {/* Donate / Buy me a coffee */}
          <a
            href="https://buymeacoffee.com/chadn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-body text-xs sm:text-sm text-cream/50
                       hover:text-ochre transition-colors duration-300 order-3"
          >
            <Coffee size={14} strokeWidth={1.5} aria-hidden="true" />
            <span>Buy me a coffee</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
