'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'The Path', href: '/start' },
  { label: 'Instructions', href: '/instructions' },
  { label: 'Vault', href: '/vault' },
]

export function Nav() {
  const pathname = usePathname()
  const { user, loading, signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    if (!isHome) return

    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.7)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  // On home page: only show after scrolling past hero
  // On other pages: always show
  if (isHome && !scrolled) return null

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHome
          ? 'animate-slide-down bg-cream/95 backdrop-blur-sm border-b border-cream-dark'
          : 'bg-cream/90 backdrop-blur-sm border-b border-cream-dark'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity duration-200"
        >
          <Image
            src="/rumo-logo-dark.svg"
            alt="RUMO"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
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
                    ? 'text-teal font-medium'
                    : 'text-navy opacity-70 hover:opacity-100 hover:text-teal'
                }`}
              >
                {label}
              </Link>
            )
          })}

          {!loading && (
            user ? (
              <button
                onClick={() => signOut()}
                className="font-body text-sm tracking-wide text-navy opacity-50 hover:opacity-80 transition-opacity duration-200"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="font-body text-sm tracking-wide text-navy opacity-50 hover:opacity-80 transition-opacity duration-200"
              >
                Sign in
              </Link>
            )
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  )
}
