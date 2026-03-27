'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { useEffect, useState, useRef } from 'react'
import {
  SmallAnchorIcon, SmallQuillIcon, SmallShipLogIcon,
  SmallCompassIcon, SmallChronIcon, SmallHelmIcon,
} from '@/components/icons/anchor-icons'

const ANCHOR_ITEMS = [
  { label: 'Personal Constitution', subtitle: 'Who am I? What do I stand for?', href: '/docs/constitution', accent: 'teal', Icon: SmallAnchorIcon },
  { label: 'Writing Codex', subtitle: 'How do I write?', href: '/docs/codex', accent: 'teal', Icon: SmallQuillIcon },
  { label: 'Story Bank', subtitle: 'What stories do I always tell?', href: '/docs/story-bank', accent: 'ochre', Icon: SmallShipLogIcon },
  { label: 'State of the Union', subtitle: 'What matters to me right now?', href: '/docs/sotu', accent: 'ochre', Icon: SmallCompassIcon },
  { label: 'Timeline', subtitle: 'How has my life unfolded?', href: '/docs/timeline', accent: 'teal', Icon: SmallChronIcon },
  { label: 'Influence Roster', subtitle: 'Who are the people that matter?', href: '/docs/roster', accent: 'ochre', Icon: SmallHelmIcon },
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
            : 'text-navy/70 hover:text-teal'
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
          : active ? 'text-teal font-medium' : 'text-navy/70 hover:text-teal'
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
        {ANCHOR_ITEMS.map(({ label, subtitle, href, accent, Icon }) => {
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
                <div className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: accentColor, opacity: isActive ? 1 : 0.5 }}>
                  <Icon className="w-full h-full" />
                </div>
                <div>
                  <h4 className={`font-body text-sm font-semibold mb-0.5 ${
                    glass
                      ? isActive ? 'text-teal-light' : 'text-white/90'
                      : isActive ? 'text-teal' : 'text-navy'
                  }`}>
                    {label}
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

      {/* Bottom bar — Full Build CTA */}
      <div className={`px-5 py-3 flex items-center justify-between ${
        glass ? 'bg-white/[0.03] border-t border-white/[0.06]' : 'bg-cream/60 border-t border-navy/[0.04]'
      }`}>
        <span className={`font-body text-xs ${glass ? 'text-white/60' : 'text-navy/50'}`}>
          Build all six anchors at once.
        </span>
        <Link
          href="/start"
          onClick={onSelect}
          className={`font-body text-xs font-semibold tracking-wide uppercase transition-all duration-200 hover:gap-2 flex items-center gap-1 ${
            glass ? 'text-teal-light hover:text-white' : 'text-teal hover:text-teal-light'
          }`}
        >
          Chart Your Course
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
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

  const isAnchorsActive = pathname.startsWith('/docs/')

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

            <NavLink href="/instructions" label="Configure" active={false} light />
            <NavLink href="/vault" label="Vault" active={false} light />

            <Link
              href="/start"
              className="shimmer-hover font-body text-sm font-semibold tracking-wide px-5 py-2 rounded-full
                         bg-ochre text-white shadow-md shadow-ochre/20
                         hover:bg-ochre-light hover:shadow-lg hover:shadow-ochre/30
                         transition-all duration-200 hover:-translate-y-[1px]"
            >
              Chart Your Course
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

            <NavLink href="/instructions" label="Configure" active={pathname === '/instructions'} />
            <NavLink href="/vault" label="Vault" active={pathname === '/vault'} />

            {!loading && (
              user ? (
                <button
                  onClick={() => signOut()}
                  className="font-body text-sm tracking-wide text-navy opacity-40 hover:opacity-70 transition-opacity duration-200"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="font-body text-sm tracking-wide text-navy opacity-40 hover:opacity-70 transition-opacity duration-200"
                >
                  Sign in
                </Link>
              )
            )}

            <Link
              href="/start"
              className={`shimmer-hover font-body text-sm font-semibold tracking-wide px-5 py-2 rounded-full
                         transition-all duration-200 hover:-translate-y-[1px] ${
                pathname === '/start'
                  ? 'bg-ochre-light text-white shadow-md shadow-ochre/20'
                  : 'bg-ochre text-white shadow-md shadow-ochre/20 hover:bg-ochre-light hover:shadow-lg hover:shadow-ochre/30'
              }`}
            >
              Chart Your Course
            </Link>
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
      active ? 'text-teal font-semibold' : 'text-navy/80 hover:text-teal'
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
              {ANCHOR_ITEMS.map(({ label, subtitle, href, accent, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`flex items-center gap-3 py-2.5 transition-colors duration-150 ${
                    pathname === href ? 'text-teal' : 'text-navy/60 hover:text-navy'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${
                    pathname === href
                      ? 'text-teal'
                      : accent === 'teal' ? 'text-teal/40' : 'text-ochre/40'
                  }`} />
                  <div>
                    <span className="font-body text-base font-medium">{label}</span>
                    <span className="font-body text-xs text-navy/30 ml-2">{subtitle}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <Link href="/instructions" onClick={onClose} className={`${mobileLinkClass(pathname === '/instructions')} py-3`}>
            Configure
          </Link>
          <Link href="/vault" onClick={onClose} className={`${mobileLinkClass(pathname === '/vault')} py-3`}>
            Vault
          </Link>

          <Link
            href="/start"
            onClick={onClose}
            className="shimmer-hover block text-center font-body text-base font-semibold tracking-wide
                       px-6 py-3.5 mt-4 rounded-full
                       bg-ochre text-white shadow-md shadow-ochre/20
                       hover:bg-ochre-light transition-all duration-200"
          >
            Chart Your Course
          </Link>

          <div className="pt-4 mt-4 border-t border-navy/[0.08]">
            {!loading && (
              user ? (
                <button
                  onClick={() => { signOut(); onClose() }}
                  className="font-body text-base text-navy/50 hover:text-navy/80 transition-colors duration-200"
                >
                  Sign out
                </button>
              ) : (
                <Link href="/auth/login" onClick={onClose}
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
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards }
        @keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }
        .animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards }
      `}</style>
    </div>
  )
}
