'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CompassRose } from '@/components/compass-rose'

const ANCHORS = [
  { slug: 'constitution', label: 'Constitution', icon: '/icons/constitution.png' },
  { slug: 'codex', label: 'Voice', icon: '/icons/codex.png' },
  { slug: 'story-bank', label: 'Stories', icon: '/icons/story-bank.png' },
  { slug: 'sotu', label: 'Situation', icon: '/icons/sotu.png' },
  { slug: 'timeline', label: 'Timeline', icon: '/icons/timeline.png' },
  { slug: 'roster', label: 'Roster', icon: '/icons/roster.png' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export type SuccessMode = 'authed' | 'guest-link-sent' | 'guest-error'

export function SuccessContent({
  mode = 'authed',
  guestEmail = null,
}: {
  mode?: SuccessMode
  guestEmail?: string | null
}) {
  return (
    <main className="min-h-screen bg-cream">
      {/* ── Navy hero: arrival moment ── */}
      <section className="relative bg-navy text-cream overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-1/2 w-[680px] h-[680px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
          initial={{ opacity: 0, rotate: -4, scale: 0.96 }}
          animate={{ opacity: 0.09, rotate: 0, scale: 1 }}
          transition={{ duration: 2.2, ease: [0.2, 0.65, 0.3, 1] }}
        >
          <CompassRose className="w-full h-full text-cream" />
        </motion.div>

        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, rgba(12, 35, 64, 0.6) 85%)',
          }}
        />

        <motion.div
          className="relative max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 sm:pt-40 pb-20 sm:pb-28 text-center"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-body text-ochre font-bold text-xs sm:text-sm tracking-[0.35em] uppercase mb-8"
          >
            {mode === 'guest-error' ? 'Payment confirmed' : 'Welcome aboard'}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 1] }}
            className="font-display text-cream font-bold leading-[1.05] tracking-tight mb-8"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            You&apos;re in.
          </motion.h1>

          <motion.div
            aria-hidden="true"
            className="h-[2px] bg-teal/70 mx-auto mb-8 origin-center"
            initial={{ scaleX: 0, width: '3rem' }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
          />

          {mode === 'authed' && (
            <>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="font-body text-cream/75 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto mb-12"
              >
                The map is yours now. Six anchors, one course &mdash; everything you need to give AI the context that makes it yours.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <Link
                  href="/start"
                  className="inline-flex font-body text-sm font-bold tracking-[0.12em] uppercase px-10 py-4 rounded-full
                             bg-teal text-white shadow-lg shadow-teal/25
                             hover:bg-teal-light hover:shadow-xl hover:shadow-teal/35 hover:-translate-y-0.5
                             transition-all duration-200"
                >
                  Chart Your Course
                </Link>
              </motion.div>
            </>
          )}

          {mode === 'guest-link-sent' && (
            <>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="font-body text-cream/75 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto mb-10"
              >
                Your course is paid and waiting. Check your inbox for a link to unlock your vault.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="max-w-md mx-auto"
              >
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-cream/8 border border-cream/15">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
                    <path d="M3 6l7 5 7-5M3 6v8a2 2 0 002 2h10a2 2 0 002-2V6M3 6a2 2 0 012-2h10a2 2 0 012 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ochre" />
                  </svg>
                  <span className="font-body text-cream/90 text-sm sm:text-base">
                    Sent to <span className="font-semibold text-cream">{guestEmail}</span>
                  </span>
                </div>
                <p className="font-body text-cream/50 text-xs sm:text-sm mt-5 leading-relaxed">
                  Didn&apos;t get it? Check spam, or{' '}
                  <Link href="/auth/login" className="underline underline-offset-2 hover:text-cream transition-colors">
                    request a new link
                  </Link>
                  .
                </p>
              </motion.div>
            </>
          )}

          {mode === 'guest-error' && (
            <>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="font-body text-cream/75 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto mb-10"
              >
                Your payment went through, but we hit a snag setting up your account. Request a sign-in link below and we&apos;ll get you into your vault.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <Link
                  href="/auth/login?next=/vault"
                  className="inline-flex font-body text-sm font-bold tracking-[0.12em] uppercase px-10 py-4 rounded-full
                             bg-teal text-white shadow-lg shadow-teal/25
                             hover:bg-teal-light hover:shadow-xl hover:shadow-teal/35 hover:-translate-y-0.5
                             transition-all duration-200"
                >
                  Sign In
                </Link>
                <p className="font-body text-cream/50 text-xs sm:text-sm mt-5">
                  Or email <a href="mailto:chad@chadstamm.com" className="underline underline-offset-2 hover:text-cream transition-colors">chad@chadstamm.com</a> and we&apos;ll sort it out directly.
                </p>
              </motion.div>
            </>
          )}
        </motion.div>
      </section>

      {/* ── Cream band: the vault, revealed (authed only) ── */}
      {mode === 'authed' && (
        <section className="relative">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-center mb-12 sm:mb-16"
            >
              <p className="font-body text-ochre font-bold text-xs sm:text-sm tracking-[0.35em] uppercase mb-4">
                Your Vault
              </p>
              <h2
                className="font-display text-navy font-bold leading-tight tracking-tight"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}
              >
                Six anchors, unlocked.
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 max-w-3xl mx-auto"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              {ANCHORS.map((anchor) => (
                <motion.div
                  key={anchor.slug}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <Link
                    href={`/anchors/${anchor.slug}`}
                    className="group flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl
                               bg-white/40 border border-navy/8
                               hover:bg-white hover:border-navy/15 hover:shadow-md hover:-translate-y-1
                               transition-all duration-200"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 relative shrink-0">
                      <Image
                        src={anchor.icon}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-contain group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <span className="font-body text-navy/80 text-xs sm:text-sm font-semibold text-center leading-tight">
                      {anchor.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="text-center mt-14 sm:mt-16"
            >
              <p className="font-body text-navy/50 text-sm italic max-w-md mx-auto mb-8">
                Jump straight to any anchor, or take the guided course above.
              </p>
              <Link
                href="/vault"
                className="inline-flex font-body text-xs font-bold tracking-[0.15em] uppercase px-7 py-3 rounded-full
                           border border-navy/15 text-navy/70
                           hover:border-navy/35 hover:text-navy hover:bg-navy/5
                           transition-all duration-200"
              >
                Open the Vault
              </Link>
            </motion.div>
          </div>

          <div className="border-t border-navy/8">
            <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-10 text-center">
              <p className="font-body text-navy/40 text-xs sm:text-sm leading-relaxed">
                A receipt is on its way to your inbox. Your course renews annually &mdash; you can cancel anytime from your account.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Receipt footer for guest modes ── */}
      {mode !== 'authed' && (
        <section className="relative">
          <div className="border-t border-navy/8">
            <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-10 text-center">
              <p className="font-body text-navy/40 text-xs sm:text-sm leading-relaxed">
                A receipt is on its way to your inbox. Your course renews annually &mdash; you can cancel anytime from your account.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
