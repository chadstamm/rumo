'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CompassRose } from './compass-rose'

const navLinks = [
  { label: 'The Path', href: '/start' },
  { label: 'Instructions', href: '/instructions' },
  { label: 'Vault', href: '/vault' },
]

export function Nav() {
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-cream-dark">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-navy hover:text-ochre transition-colors duration-200"
        >
          <CompassRose className="w-7 h-7 text-ochre" />
          <span className="font-display text-lg font-semibold tracking-widest uppercase">
            RUMO
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`font-body text-sm tracking-wide transition-colors duration-200 ${
                  isActive
                    ? 'text-ochre font-medium'
                    : 'text-navy opacity-70 hover:opacity-100 hover:text-navy'
                }`}
              >
                {label}
              </Link>
            )
          })}

          <Link
            href="/auth/login"
            className="font-body text-sm tracking-wide text-navy opacity-50 hover:opacity-80 transition-opacity duration-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  )
}
