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
  { label: 'Timeline', href: '/docs/timeline' },
  { label: 'Roster', href: '/docs/roster' },
]

export function Nav() {
  const pathname = usePathname()
  const { user, loading, signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [anchorsOpen, setAnchorsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAnchorsOpen, setMobileAnchorsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > (isHome ? window.innerHeight * 0.15 : 0))
    }

    handleScroll() // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAnchorsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setMobileAnchorsOpen(false)
    setAnchorsOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isAnchorsActive = pathname.startsWith('/docs/')
  const navLinkClass = (active: boolean) =>
    `font-body text-sm tracking-wide transition-colors duration-200 ${
      active
        ? 'text-teal font-medium'
        : 'text-navy opacity-70 hover:opacity-100 hover:text-teal'
    }`

  // ── Phase 1: Hamburger floating over hero (homepage, not scrolled) ──
  if (isHome && !scrolled) {
    return (
      <>
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-5 right-6 z-50 w-11 h-11 rounded-xl
                     bg-white/10 backdrop-blur-md border border-white/20
                     flex items-center justify-center
                     hover:bg-white/20 transition-all duration-200
                     hero-fade-in"
          style={{ animationDelay: '1.2s' }}
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Mobile overlay menu */}
        {mobileOpen && <MobileMenu
          anchorsOpen={mobileAnchorsOpen}
          setAnchorsOpen={setMobileAnchorsOpen}
          isAnchorsActive={isAnchorsActive}
          pathname={pathname}
          user={user}
          loading={loading}
          signOut={signOut}
          onClose={() => setMobileOpen(false)}
        />}
      </>
    )
  }

  // ── Phase 2: Full sticky banner (scrolled on homepage, always on other pages) ──
  return (
    <>
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

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Anchors dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setAnchorsOpen(!anchorsOpen)}
                className={`${navLinkClass(isAnchorsActive)} flex items-center gap-1.5`}
              >
                Anchors
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className={`transition-transform duration-200 ${anchorsOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {anchorsOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 py-2 rounded-xl bg-white border border-navy/10 shadow-lg shadow-navy/5">
                  {ANCHOR_ITEMS.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setAnchorsOpen(false)}
                      className={`block px-4 py-2.5 font-body text-sm transition-colors duration-150 ${
                        pathname === href
                          ? 'text-teal font-medium bg-teal/5'
                          : 'text-navy/70 hover:text-navy hover:bg-cream-dark/50'
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Full Build */}
            <Link href="/start" className={navLinkClass(pathname === '/start')}>
              Full Build
            </Link>

            {/* Instructions */}
            <Link href="/instructions" className={navLinkClass(pathname === '/instructions')}>
              Instructions
            </Link>

            {/* Vault */}
            <Link href="/vault" className={navLinkClass(pathname === '/vault')}>
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center
                       hover:bg-navy/5 transition-colors duration-200"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-navy" />
            </svg>
          </button>
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

      {/* Mobile overlay */}
      {mobileOpen && <MobileMenu
        anchorsOpen={mobileAnchorsOpen}
        setAnchorsOpen={setMobileAnchorsOpen}
        isAnchorsActive={isAnchorsActive}
        pathname={pathname}
        user={user}
        loading={loading}
        signOut={signOut}
        onClose={() => setMobileOpen(false)}
      />}
    </>
  )
}

// ── Mobile Overlay Menu ──

interface MobileMenuProps {
  anchorsOpen: boolean
  setAnchorsOpen: (open: boolean) => void
  isAnchorsActive: boolean
  pathname: string
  user: ReturnType<typeof useAuth>['user']
  loading: boolean
  signOut: () => void
  onClose: () => void
}

function MobileMenu({
  anchorsOpen,
  setAnchorsOpen,
  isAnchorsActive,
  pathname,
  user,
  loading,
  signOut,
  onClose,
}: MobileMenuProps) {
  const mobileLinkClass = (active: boolean) =>
    `block font-body text-lg transition-colors duration-150 ${
      active ? 'text-teal font-semibold' : 'text-navy/80 hover:text-teal'
    }`

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-cream shadow-2xl animate-slide-in-right">
        {/* Close button */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-navy/[0.06]">
          <Image
            src="/rumo-logo-dark.svg"
            alt="RUMO"
            width={120}
            height={35}
            className="h-8 w-auto"
          />
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg flex items-center justify-center
                       hover:bg-navy/5 transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-navy" />
            </svg>
          </button>
        </div>

        {/* Menu items */}
        <div className="px-6 py-8 space-y-1">
          {/* Anchors accordion */}
          <button
            onClick={() => setAnchorsOpen(!anchorsOpen)}
            className={`w-full flex items-center justify-between py-3 font-body text-lg transition-colors duration-150 ${
              isAnchorsActive ? 'text-teal font-semibold' : 'text-navy/80 hover:text-teal'
            }`}
          >
            Anchors
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              className={`transition-transform duration-200 ${anchorsOpen ? 'rotate-180' : ''}`}
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {anchorsOpen && (
            <div className="pl-4 pb-2 space-y-0.5">
              {ANCHOR_ITEMS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`block py-2.5 font-body text-base transition-colors duration-150 ${
                    pathname === href
                      ? 'text-teal font-medium'
                      : 'text-navy/60 hover:text-navy'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          <Link href="/start" onClick={onClose} className={`${mobileLinkClass(pathname === '/start')} py-3`}>
            Full Build
          </Link>

          <Link href="/instructions" onClick={onClose} className={`${mobileLinkClass(pathname === '/instructions')} py-3`}>
            AI Instructions
          </Link>

          <Link href="/vault" onClick={onClose} className={`${mobileLinkClass(pathname === '/vault')} py-3`}>
            Vault
          </Link>

          {/* Divider */}
          <div className="pt-4 mt-4 border-t border-navy/[0.08]">
            {!loading && (
              user ? (
                <button
                  onClick={() => { signOut(); onClose(); }}
                  className="font-body text-base text-navy/50 hover:text-navy/80 transition-colors duration-200"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={onClose}
                  className="font-body text-base text-navy/50 hover:text-navy/80 transition-colors duration-200"
                >
                  Sign in
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  )
}
