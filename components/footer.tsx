import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* ── Ocean background ── */}
      <Image
        src="/footer-ocean.jpg"
        alt=""
        fill
        className="object-cover"
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to bottom, rgba(14, 42, 48, 0.90) 0%, rgba(16, 38, 52, 0.88) 100%)',
        }}
      />

      {/* ── Thin ochre divider at top ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to right, transparent, #c4943a 30%, #c4943a 70%, transparent)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-20">
        {/* ── Top: Logo + Nav columns ── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-16 mb-12 sm:mb-14">
          {/* Logo — large */}
          <div className="flex-shrink-0">
            <Link href="/" aria-label="RUMO home">
              <Image
                src="/rumo-logo-teal.svg"
                alt="RUMO"
                width={170}
                height={50}
                className="h-[50px] w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
              />
            </Link>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-12 sm:gap-16">
            {/* Product */}
            <div>
              <h4 className="font-body text-cream/60 text-sm font-bold tracking-[0.2em] uppercase mb-4">
                Product
              </h4>
              <nav className="flex flex-col gap-3">
                <FooterLink href="/docs/constitution">Constitution</FooterLink>
                <FooterLink href="/anchors">Anchors</FooterLink>
                <FooterLink href="/vault">Vault</FooterLink>
              </nav>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-body text-cream/60 text-sm font-bold tracking-[0.2em] uppercase mb-4">
                Company
              </h4>
              <nav className="flex flex-col gap-3">
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-body text-cream/60 text-sm font-bold tracking-[0.2em] uppercase mb-4">
                Legal
              </h4>
              <nav className="flex flex-col gap-3">
                <FooterLink href="/privacy">Privacy</FooterLink>
                <FooterLink href="/terms">Terms</FooterLink>
              </nav>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t border-cream/10">
          <p className="font-body text-cream/40 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} Rumo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-body text-sm text-cream/60 hover:text-cream/90 underline underline-offset-2 decoration-cream/20 hover:decoration-cream/50 tracking-wide transition-colors duration-200"
    >
      {children}
    </Link>
  )
}
