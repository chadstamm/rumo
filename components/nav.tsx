'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { useEffect, useState, useRef } from 'react'
const ANCHOR_ITEMS = [
  { label: 'Personal Constitution', subtitle: 'Who am I? What do I stand for?', href: '/anchors/constitution', accent: 'teal', icon: '/icons/constitution.png', isFree: true },
  { label: 'Writing Codex', subtitle: 'How do I write?', href: '/anchors/codex', accent: 'ochre', icon: '/icons/codex.png' },
  { label: 'Story Bank', subtitle: 'What stories do I always tell?', href: '/anchors/story-bank', accent: 'ochre', icon: '/icons/story-bank.png' },
  { label: 'State of the Union', subtitle: 'What matters to me right now?', href: '/anchors/sotu', accent: 'ochre', icon: '/icons/sotu.png' },
  { label: 'Timeline', subtitle: 'How has my life unfolded?', href: '/anchors/timeline', accent: 'ochre', icon: '/icons/timeline.png' },
  { label: 'Influence Roster', subtitle: 'Who are the people that matter?', href: '/anchors/roster', accent: 'ochre', icon: '/icons/roster.png' },
]

// ── Animated nav link with sliding underline ──

function NavLink({ href, label, active, light }: { href: string; label: string; active: boolean; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative font-body text-sm tracking-wide transition-all duration-200 py-1 ${
        light
          ? active
            ? 'text-white font-medium'
            : 'text-white/70 hover:text-white'
          : active
            ? 'text-teal font-medium'
            : 'text-navy font-bold hover:text-teal'
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ease-out bg-teal ${
          active ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  )
}

// ── Anchors dropdown trigger ──

function AnchorsButton({ active, light }: {
  active: boolean; light?: boolean
}) {
  return (
    <Link
      href="/anchors"
      className={`group relative font-body text-sm tracking-wide transition-all duration-200 py-1 ${
        light
          ? active ? 'text-white font-medium' : 'text-white/70 hover:text-white'
          : active ? 'text-teal font-medium' : 'text-navy font-bold hover:text-teal'
      }`}
    >
      Anchors
      <span
        className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ease-out bg-teal ${
          active ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  )
}

// ── Rich mega-dropdown for anchors ──

function AnchorsMegaDropdown({ pathname, onSelect, glass }: {
  pathname: string; onSelect: () => void; glass?: boolean
}) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[520px] animate-dropdown-in">
      <div className={`rounded-2xl overflow-hidden shadow-xl ${
        glass
          ? 'bg-navy/80 backdrop-blur-xl border border-white/10 shadow-navy/30'
          : 'bg-white border border-navy/10 shadow-navy/5'
      }`}>
      <div className="grid grid-cols-2 gap-px" style={{ background: glass ? 'rgba(255,255,255,0.05)' : 'rgba(26,39,68,0.04)' }}>
        {ANCHOR_ITEMS.map(({ label, subtitle, href, accent, icon, isFree }) => {
          const isActive = pathname === href
          const accentColor = accent === 'teal' ? 'var(--teal)' : 'var(--ochre)'
          return (
            <Link
              key={href}
              href={href}
              onClick={onSelect}
              className={`group relative px-5 py-4 transition-all duration-200 ${
                glass
                  ? `bg-navy/40 hover:bg-white/10 ${isActive ? 'bg-white/10' : ''}`
                  : `bg-white hover:bg-cream ${isActive ? 'bg-cream' : ''}`
              }`}
            >
              {/* Accent bar */}
              <div
                className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: accentColor }}
              />
              <div className={`flex items-start gap-3 transition-transform duration-200 group-hover:translate-x-1 ${isActive ? 'translate-x-1' : ''}`}>
                <Image
                  src={icon}
                  alt=""
                  width={20}
                  height={20}
                  className="flex-shrink-0 mt-0.5"
                  style={{
                    opacity: isActive ? 0.9 : 0.6,
                    filter: glass ? 'brightness(0) invert(1) opacity(0.8)' : undefined,
                  }}
                  aria-hidden="true"
                />
                <div>
                  <h4 className={`font-body text-sm font-semibold mb-0.5 flex items-center gap-2 ${
                    glass
                      ? isActive ? 'text-teal-light' : 'text-white/90'
                      : isActive ? 'text-teal' : 'text-navy'
                  }`}>
                    {label}
                    {isFree && (
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-[0.1em] uppercase leading-none ${
                        glass
                          ? 'bg-teal/20 text-teal-light border border-teal/30'
                          : 'bg-teal/10 text-teal border border-teal/20'
                      }`}>
                        Free
                      </span>
                    )}
                  </h4>
                  <p className={`font-body text-xs ${
                    glass ? 'text-white/40' : 'text-navy/40'
                  }`}>
                    {subtitle}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      </div>
    </div>
  )
}

// ── Main Nav Component ──

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
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAnchorsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileAnchorsOpen(false)
    setAnchorsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isAnchorsActive = pathname.startsWith('/anchors/')

  // ── Phase 1: Floating glass nav over hero (desktop) + hamburger (mobile) ──
  if (isHome && !scrolled) {
    return (
      <>
        {/* Desktop: floating glass pill nav */}
        <nav className="fixed top-5 right-6 z-50 hidden md:block hero-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="flex items-center gap-7 px-7 py-3 rounded-2xl
                          bg-navy/30 backdrop-blur-xl border border-white/[0.08]
                          shadow-lg shadow-navy/20">
            {/* Anchors — hover to open */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setAnchorsOpen(true)}
              onMouseLeave={() => setAnchorsOpen(false)}
            >
              <AnchorsButton active={isAnchorsActive} light />
              {anchorsOpen && (
                <AnchorsMegaDropdown
                  pathname={pathname}
                  onSelect={() => setAnchorsOpen(false)}
                  glass
                />
              )}
            </div>

            <NavLink href="/vault" label="Vault" active={false} light />

            {!loading && (
              user ? (
                <button
                  onClick={() => signOut()}
                  className="font-body text-sm tracking-wide text-white/70 hover:text-white transition-colors duration-200"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="font-body text-sm tracking-wide text-white/70 hover:text-white transition-colors duration-200"
                >
                  Sign in
                </Link>
              )
            )}

            <Link
              href="/anchors/constitution"
              className="shimmer-hover font-body text-sm font-semibold tracking-wide px-5 py-2 rounded-full
                         bg-teal text-white shadow-md shadow-teal/20
                         hover:bg-teal-light hover:shadow-lg hover:shadow-teal/30
                         transition-all duration-200 hover:-translate-y-[1px]"
            >
              Build Your Constitution
            </Link>
          </div>
        </nav>

        {/* Mobile: floating hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-5 right-6 z-50 md:hidden w-11 h-11 rounded-xl
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

  // ── Phase 2: Solid sticky banner ──
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
              e.preventDefault()
              if (pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              } else {
                window.location.href = '/'
                // Force top on navigation
                sessionStorage.setItem('rumo-scroll-top', '1')
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
          <div className="hidden md:flex items-center gap-7">
            <div
              ref={!isHome || scrolled ? dropdownRef : undefined}
              className="relative"
              onMouseEnter={() => setAnchorsOpen(true)}
              onMouseLeave={() => setAnchorsOpen(false)}
            >
              <AnchorsButton active={isAnchorsActive} />
              {anchorsOpen && (
                <AnchorsMegaDropdown
                  pathname={pathname}
                  onSelect={() => setAnchorsOpen(false)}
                />
              )}
            </div>

            <NavLink href="/vault" label="Vault" active={pathname === '/vault'} />
            <NavLink href="/pricing" label="Pricing" active={pathname === '/pricing'} />

            {!loading && (
              user ? (
                <button
                  onClick={() => signOut()}
                  className="font-body text-sm tracking-wide text-navy opacity-75 hover:opacity-100 transition-opacity duration-200"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="font-body text-sm tracking-wide text-teal hover:text-teal-light transition-colors duration-200"
                >
                  Sign in
                </Link>
              )
            )}

            {pathname !== '/start' && (
              <Link
                href="/start"
                className="shimmer-hover font-body text-sm font-semibold tracking-wide px-5 py-2 rounded-full
                           bg-ochre text-white shadow-md shadow-ochre/20
                           hover:bg-ochre-light hover:shadow-lg hover:shadow-ochre/30
                           transition-all duration-200 hover:-translate-y-[1px]"
              >
                Chart Your Full Course
              </Link>
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
      active ? 'text-teal font-semibold' : 'text-navy font-bold hover:text-teal'
    }`

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-cream shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between px-6 h-16 border-b border-navy/[0.06]">
          <Image src="/rumo-logo-dark.svg" alt="RUMO" width={120} height={35} className="h-8 w-auto" />
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-navy/5 transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-navy" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-8 space-y-1">
          <button
            onClick={() => setAnchorsOpen(!anchorsOpen)}
            className={`w-full flex items-center justify-between py-3 font-body text-lg transition-colors duration-150 ${
              isAnchorsActive ? 'text-teal font-semibold' : 'text-navy font-bold hover:text-teal'
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
              {ANCHOR_ITEMS.map(({ label, subtitle, href, accent, icon, isFree }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`flex items-center gap-3 py-2.5 transition-colors duration-150 ${
                    pathname === href ? 'text-teal' : 'text-navy/80 hover:text-navy'
                  }`}
                >
                  <Image
                    src={icon}
                    alt=""
                    width={16}
                    height={16}
                    className="flex-shrink-0"
                    style={{ opacity: pathname === href ? 0.9 : 0.5 }}
                    aria-hidden="true"
                  />
                  <div>
                    <span className="flex items-center gap-2">
                      <span className="font-body text-base font-medium">{label}</span>
                      {isFree && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-teal/10 text-teal border border-teal/20 text-[9px] font-bold tracking-[0.1em] uppercase leading-none">
                          Free
                        </span>
                      )}
                    </span>
                    <span className="font-body text-xs text-navy/30">{subtitle}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <Link href="/vault" onClick={onClose} className={`${mobileLinkClass(pathname === '/vault')} py-3`}>
            Vault
          </Link>

          <Link
            href="/anchors/constitution"
            onClick={onClose}
            className="shimmer-hover block text-center font-body text-base font-semibold tracking-wide
                       px-6 py-3.5 mt-4 rounded-full
                       bg-teal text-white shadow-md shadow-teal/20
                       hover:bg-teal-light transition-all duration-200"
          >
            Build Your Constitution
          </Link>

          <div className="pt-4 mt-4 border-t border-navy/[0.08]">
            {!loading && (
              user ? (
                <button
                  onClick={() => { signOut(); onClose() }}
                  className="font-body text-base text-navy/75 hover:text-navy transition-colors duration-200"
                >
                  Sign out
                </button>
              ) : (
                <Link href="/auth/login" onClick={onClose}
                  className="font-body text-base text-navy/75 hover:text-navy transition-colors duration-200"
                >
                  Sign in
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards }
        @keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }
        .animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards }
      `}</style>
    </div>
  )
}
