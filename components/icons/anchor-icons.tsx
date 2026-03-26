'use client'

// ── Shared Anchor Icons ──
// Bold, nautical-themed icons for the 6 context anchors.
// Each has a large (48×48) and small (24×24) variant.

// ── Large Icons (48×48 viewBox) ──

export function AnchorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      {/* Ring at top */}
      <circle cx="24" cy="9" r="5" stroke="currentColor" strokeWidth="3" />
      <circle cx="24" cy="9" r="5" fill="currentColor" opacity="0.08" />
      {/* Shank */}
      <line x1="24" y1="14" x2="24" y2="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Arms */}
      <path d="M12 32c0 6.627 5.373 12 12 12s12-5.373 12-12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Stock/crossbar */}
      <line x1="16" y1="22" x2="32" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Fluke tips */}
      <circle cx="12" cy="32" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="36" cy="32" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export function QuillIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      {/* Feather body */}
      <path d="M40 4c-8 4-16 12-20 22l-2 8 8-2c10-4 18-12 22-20" fill="currentColor" opacity="0.08" />
      <path d="M40 4c-8 4-16 12-20 22l-2 8 8-2c10-4 18-12 22-20" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Quill spine */}
      <path d="M16 26l6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Ink trail */}
      <path d="M6 42l10-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Ink dot */}
      <circle cx="6" cy="42" r="2.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export function ShipLogIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      {/* Left page */}
      <path d="M24 10C20 8 14 7 8 8v28c6-1 12 0 16 2" fill="currentColor" opacity="0.08" />
      <path d="M24 10C20 8 14 7 8 8v28c6-1 12 0 16 2" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Right page */}
      <path d="M24 10c4-2 10-3 16-2v28c-6-1-12 0-16 2" fill="currentColor" opacity="0.08" />
      <path d="M24 10c4-2 10-3 16-2v28c-6-1-12 0-16 2" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* Spine */}
      <path d="M24 10v28" stroke="currentColor" strokeWidth="3" />
      {/* Page lines (left) */}
      <line x1="12" y1="16" x2="20" y2="17" stroke="currentColor" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      <line x1="12" y1="21" x2="20" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      <line x1="12" y1="26" x2="18" y2="27" stroke="currentColor" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
    </svg>
  )
}

export function CompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      {/* Outer ring */}
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" />
      <circle cx="24" cy="24" r="20" fill="currentColor" opacity="0.05" />
      {/* Inner ring */}
      <circle cx="24" cy="24" r="13" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
      {/* Cardinal ticks */}
      <line x1="24" y1="4" x2="24" y2="8" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="24" y1="40" x2="24" y2="44" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="4" y1="24" x2="8" y2="24" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="40" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      {/* North needle */}
      <polygon points="24,6 27.5,20 24,17 20.5,20" fill="currentColor" />
      {/* South needle */}
      <polygon points="24,42 20.5,28 24,31 27.5,28" fill="currentColor" opacity="0.2" />
      {/* Center */}
      <circle cx="24" cy="24" r="3.5" fill="currentColor" />
    </svg>
  )
}

export function ChronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      {/* Main timeline line */}
      <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="3" opacity="0.2" strokeLinecap="round" />
      {/* Past node */}
      <circle cx="10" cy="24" r="4.5" fill="currentColor" opacity="0.2" />
      <circle cx="10" cy="24" r="4.5" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      {/* Present node — bold, you are here */}
      <circle cx="24" cy="24" r="6" fill="currentColor" />
      {/* Future node */}
      <circle cx="38" cy="24" r="4.5" fill="currentColor" opacity="0.2" />
      <circle cx="38" cy="24" r="4.5" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      {/* Vertical ticks */}
      <line x1="10" y1="12" x2="10" y2="18" stroke="currentColor" strokeWidth="2" opacity="0.2" strokeLinecap="round" />
      <line x1="24" y1="10" x2="24" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="12" x2="38" y2="18" stroke="currentColor" strokeWidth="2" opacity="0.2" strokeLinecap="round" />
      {/* Forward arrow */}
      <path d="M41 20.5l5 3.5-5 3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
    </svg>
  )
}

export function HelmIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      {/* Central person — the captain */}
      <circle cx="24" cy="14" r="7" fill="currentColor" />
      {/* Captain's body arc */}
      <path d="M13 38c0-6.075 4.925-11 11-11s11 4.925 11 11" fill="currentColor" opacity="0.12" />
      <path d="M13 38c0-6.075 4.925-11 11-11s11 4.925 11 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Port crew */}
      <circle cx="8" cy="21" r="5" fill="currentColor" opacity="0.3" />
      <path d="M1 38c0-3.866 3.134-7 7-7" stroke="currentColor" strokeWidth="2" opacity="0.2" strokeLinecap="round" />
      {/* Starboard crew */}
      <circle cx="40" cy="21" r="5" fill="currentColor" opacity="0.3" />
      <path d="M47 38c0-3.866-3.134-7-7-7" stroke="currentColor" strokeWidth="2" opacity="0.2" strokeLinecap="round" />
    </svg>
  )
}

// ── Small Icons (24×24 viewBox) ──

export function SmallAnchorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="7.5" x2="12" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 16c0 2.761 2.239 5 5 5s5-2.239 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function SmallQuillIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M20 2c-4 2-8 6-10 11l-1 4 4-1c5-2 9-6 11-10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 21l5-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function SmallShipLogIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 5C10 4 7 3.5 4 4v14c3-.5 6 0 8 1m0-14c2-1 5-1.5 8-.5v14c-3-.5-6 0-8 1m0-14v14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export function SmallCompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <polygon points="12,3 14,10 12,8 10,10" fill="currentColor" />
      <polygon points="12,21 10,14 12,16 14,14" fill="currentColor" opacity="0.2" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

export function SmallChronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
      <circle cx="6" cy="12" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="18" cy="12" r="2.5" fill="currentColor" opacity="0.3" />
      <path d="M20 9.5l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    </svg>
  )
}

export function SmallHelmIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="7" r="3.5" fill="currentColor" />
      <path d="M7 19c0-2.761 2.239-5 5-5s5 2.239 5 5" fill="currentColor" opacity="0.12" />
      <circle cx="5" cy="10.5" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="19" cy="10.5" r="2.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

// ── Anchor metadata mapping ──

export const ANCHOR_ICON_MAP = {
  constitution: { Icon: AnchorIcon, SmallIcon: SmallAnchorIcon },
  codex: { Icon: QuillIcon, SmallIcon: SmallQuillIcon },
  'story-bank': { Icon: ShipLogIcon, SmallIcon: SmallShipLogIcon },
  sotu: { Icon: CompassIcon, SmallIcon: SmallCompassIcon },
  timeline: { Icon: ChronIcon, SmallIcon: SmallChronIcon },
  roster: { Icon: HelmIcon, SmallIcon: SmallHelmIcon },
} as const

export type AnchorSlug = keyof typeof ANCHOR_ICON_MAP
