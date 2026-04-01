'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'
import { useState } from 'react'

export function CTASection() {
  const sectionRef = useScrollReveal(0.08)

  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Atmospheric glow */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(30, 190, 177, 0.06) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(196, 148, 58, 0.06) 0%, transparent 70%)' }}
      />

      <div
        ref={sectionRef}
        className="reveal relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32 lg:py-40"
      >
        {/* Header */}
        <div className="text-center mb-14 sm:mb-18">
          <p className="font-body text-ochre font-bold text-sm sm:text-base tracking-[0.25em] uppercase mb-6 sm:mb-8">
            Ready?
          </p>
          <h2
            className="font-display text-cream font-bold leading-[1.1] tracking-tight
                       text-[clamp(1.75rem,4.5vw,3.25rem)] mb-6"
          >
            Choose Your Starting Point
          </h2>
          <div className="w-12 h-[2px] bg-ochre/50 mx-auto" aria-hidden="true" />
        </div>

        {/* Two CTA cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <CTACard
            href="/docs/constitution"
            accent="teal"
            eyebrow="Free"
            title="Build Your Personal Constitution"
            description="Start with the foundation — who you are, what you stand for, and what you believe. Takes about 15 minutes."
            cta="Start Building"
            icon="/icons/constitution.png"
            featured
          />
          <CTACard
            href="/start"
            accent="ochre"
            eyebrow="Full Journey"
            title="Chart Your Course Through All Six Anchors"
            description="Identity, voice, stories, situation, timeline, and roster — everything your AI needs to know you. The result is personalized AI that helps you succeed across everything you do."
            cta="Chart Your Course"
            icon="/anchor-section-icon.png"
            price="$49"
          />
        </div>
      </div>

      <style>{`
        @keyframes shimmer-border {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .cta-card-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

function CTACard({
  href,
  accent,
  eyebrow,
  title,
  description,
  cta,
  icon,
  featured,
  price,
}: {
  href: string
  accent: 'teal' | 'ochre'
  eyebrow: string
  title: string
  description: string
  cta: string
  icon: string
  featured?: boolean
  price?: string
}) {
  const [hovered, setHovered] = useState(false)

  const isTeal = accent === 'teal'
  const accentHex = isTeal ? '#1ebeb1' : '#c4943a'
  const accentGlow = isTeal ? 'rgba(30, 190, 177, 0.12)' : 'rgba(196, 148, 58, 0.12)'
  const accentGlowStrong = isTeal ? 'rgba(30, 190, 177, 0.25)' : 'rgba(196, 148, 58, 0.25)'

  return (
    <Link
      href={href}
      className="group relative block rounded-2xl overflow-hidden transition-all duration-500 ease-out
                 hover:-translate-y-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(160deg, ${accentGlow} 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.02) 100%)`
          : 'rgba(255, 255, 255, 0.03)',
        border: `1px solid ${hovered ? `${accentHex}40` : 'rgba(255, 255, 255, 0.06)'}`,
        boxShadow: hovered
          ? `0 24px 64px rgba(0, 0, 0, 0.3), 0 0 40px ${accentGlow}, inset 0 1px 0 ${accentGlowStrong}`
          : '0 2px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Animated top accent bar */}
      <div className="relative h-[4px] w-full overflow-hidden">
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: accentHex,
            opacity: hovered ? 1 : 0.4,
          }}
        />
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${isTeal ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.3)'} 50%, transparent 100%)`,
            backgroundSize: '200% 100%',
            animation: hovered ? 'shimmer-border 1.5s ease-in-out infinite' : 'none',
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      {/* Corner glow on hover */}
      <div
        className="absolute top-0 right-0 w-48 h-48 pointer-events-none transition-opacity duration-700"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle at top right, ${accentGlowStrong} 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative px-8 py-10 sm:px-10 sm:py-12">
        {/* Eyebrow + Icon row */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center px-3.5 py-1.5 rounded-full font-body text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                background: hovered ? `${accentHex}20` : `${accentHex}10`,
                border: `1px solid ${hovered ? `${accentHex}40` : `${accentHex}20`}`,
                color: accentHex,
              }}
            >
              {eyebrow}
            </span>
            {price && (
              <span className="font-body text-cream/50 text-sm font-medium">
                {price} <span className="text-cream/30 text-xs">one-time</span>
              </span>
            )}
          </div>

          <div
            className="transition-all duration-500 ease-out"
            style={{
              transform: hovered ? 'scale(1.15) rotate(-6deg)' : 'scale(1) rotate(0deg)',
            }}
          >
            <Image
              src={icon}
              alt=""
              width={52}
              height={52}
              className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              style={icon.includes('constitution') ? { filter: 'brightness(0) invert(1) opacity(0.8)' } : undefined}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-display text-cream text-2xl sm:text-[1.75rem] font-semibold mb-4 leading-tight transition-colors duration-300"
          style={{ color: hovered ? accentHex : undefined }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="font-body text-cream/45 text-sm sm:text-base leading-relaxed mb-8 group-hover:text-cream/65 transition-colors duration-300">
          {description}
        </p>

        {/* CTA button */}
        <div
          className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-body text-sm font-bold tracking-wide transition-all duration-300"
          style={{
            background: hovered ? accentHex : `${accentHex}15`,
            color: hovered ? '#fff' : accentHex,
            boxShadow: hovered ? `0 8px 24px ${accentGlow}` : 'none',
          }}
        >
          {cta}
          <svg
            width="18" height="18" viewBox="0 0 18 18" fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M4 9h10M10 5.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
