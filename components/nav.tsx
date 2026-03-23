'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { useEffect, useState, useRef } from 'react'

const ANCHOR_ITEMS = [
  { label: 'Personal Constitution', href: '/docs/constitution' },
  { label: 'State of the Union', href: '/docs/sotu' },
  { label: 'Writing Codex', href: '/docs/codex' },
  { label: 'Story Bank', href: '/docs/story-bank' },
]

export function Nav() {
  const pathname = usePathname()
  const { user, loading, signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [anchorsOpen, setAnchorsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isHome = pathname === '/'

  useEffect(() => {
    if (!isHome) return

    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.7)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAnchorsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // On home page: only show after scrolling past hero
  if (isHome && !scrolled) return null

  const isAnchorsActive = pathname.startsWith('/docs/')

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
        <a
          href="/"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setScrolled(false)
            }
          }}
          className="flex items-center hover:opacity-80 transition-opacity duration-200"
        >
          <Image
            src="/rumo-logo-dark.svg"
            alt="RUMO"
            width={200}
            height={59}
            className="h-10 w-auto"
          />
        </a>

        {/* Links */}
        <div className="flex items-center gap-6 sm:gap-8">
          {/* Anchors dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setAnchorsOpen(!anchorsOpen)}
              className={`font-body text-sm tracking-wide transition-colors duration-200 flex items-center gap-1.5 ${
                isAnchorsActive
                  ? 'text-teal font-medium'
                  : 'text-navy opacity-70 hover:opacity-100 hover:text-teal'
              }`}
            >
              Anchors
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform duration-200 ${anchorsOpen ? 'rotate-180' : ''}`}
              >
                <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dropdown */}
            {anchorsOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-56 py-2 rounded-xl bg-white border border-navy/10 shadow-lg shadow-navy/5"
              >
                {ANCHOR_ITEMS.map(({ label, href }) => {
                  const isActive = pathname === href
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setAnchorsOpen(false)}
                      className={`block px-4 py-2.5 font-body text-sm transition-colors duration-150 ${
                        isActive
                          ? 'text-teal font-medium bg-teal/5'
                          : 'text-navy/70 hover:text-navy hover:bg-cream-dark/50'
                      }`}
                    >
                      {label}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Instructions */}
          <Link
            href="/instructions"
            className={`font-body text-sm tracking-wide transition-colors duration-200 ${
              pathname === '/instructions'
                ? 'text-teal font-medium'
                : 'text-navy opacity-70 hover:opacity-100 hover:text-teal'
            }`}
          >
            Instructions
          </Link>

          {/* Vault */}
          <Link
            href="/vault"
            className={`font-body text-sm tracking-wide transition-colors duration-200 ${
              pathname === '/vault'
                ? 'text-teal font-medium'
                : 'text-navy opacity-70 hover:opacity-100 hover:text-teal'
            }`}
          >
            Vault
          </Link>

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
