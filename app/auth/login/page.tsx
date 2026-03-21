'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

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
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-cream border border-muted/20 rounded-xl p-10 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-display text-3xl text-navy">Sign in to Rumo</h1>
          <p className="font-body text-muted text-sm">
            We&apos;ll send you a magic link to sign in.
          </p>
        </div>

        {sent ? (
          <div className="flex flex-col gap-3 text-center">
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
              className="font-body w-full px-4 py-3 rounded-lg bg-cream text-navy border border-muted/30 placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-ochre text-sm disabled:cursor-not-allowed disabled:opacity-60"
            />

            {error && (
              <p className="font-body text-xs text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="font-body w-full py-3 rounded-lg bg-ochre text-cream text-sm tracking-wide hover:bg-ochre-light transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
