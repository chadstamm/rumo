'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CompassRose } from '@/components/compass-rose'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback',
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-6 relative overflow-hidden">
      {/* Compass rose watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.02]" aria-hidden="true">
        <CompassRose className="w-full h-full text-cream" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src="/rumo-logo.svg"
              alt="RUMO"
              width={160}
              height={47}
              className="h-10 w-auto mx-auto"
            />
          </Link>
        </div>

        <div className="bg-cream border border-cream-dark rounded-xl p-10 shadow-lg shadow-navy/20 flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-display text-2xl text-navy">Sign In</h1>
            <p className="font-body text-muted text-sm">
              We&apos;ll send you a magic link to sign in.
            </p>
          </div>

          {sent ? (
            <div className="flex flex-col gap-3 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-teal/10 flex items-center justify-center mb-1">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 10l3 3 7-7" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-body text-navy text-sm">
                Check your email for a sign-in link.
              </p>
              <p className="font-body text-muted text-xs">
                Didn&apos;t get it? Check your spam folder or{' '}
                <button
                  onClick={() => setSent(false)}
                  className="underline hover:text-navy transition-colors"
                >
                  try again
                </button>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="font-body w-full px-4 py-3 rounded-lg bg-cream text-navy border border-navy/15 placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-ochre/50 focus:border-ochre/30 text-sm disabled:cursor-not-allowed disabled:opacity-60 transition-all duration-200"
              />

              {error && (
                <p className="font-body text-xs text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="font-body w-full py-3 rounded-lg bg-ochre text-cream text-sm font-semibold tracking-wide hover:bg-ochre-light transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Sending...' : 'Send Magic Link'}
              </button>
            </form>
          )}

          <div className="w-8 h-px bg-navy/10 mx-auto" aria-hidden="true" />

          <p className="font-body text-[11px] text-navy/30 text-center">
            By signing in you agree to our{' '}
            <Link href="/privacy" className="underline hover:text-navy/50 transition-colors">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
