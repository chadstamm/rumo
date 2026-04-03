'use client'

import { useState } from 'react'
import { CompassRose } from '@/components/compass-rose'

const HUBSPOT_PORTAL_ID = '148185112'
const HUBSPOT_FORM_ID = 'c5d9eef0-1915-4b61-9216-14a1505a5f36'
const HUBSPOT_REGION = 'eu1'
const STORAGE_KEY = 'rumo-lead-captured'

export function hasLeadBeenCaptured(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

interface LeadGateFormProps {
  onComplete: () => void
  totalAnswered: number
}

export function LeadGateForm({ onComplete, totalAnswered }: LeadGateFormProps) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isValid = firstName.trim().length > 0 && email.trim().includes('@')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || submitting) return

    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api-${HUBSPOT_REGION}.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              { name: 'firstname', value: firstName.trim() },
              { name: 'email', value: email.trim() },
            ],
            context: {
              pageUri: window.location.href,
              pageName: 'RUMO — Personal Constitution',
            },
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      localStorage.setItem(STORAGE_KEY, 'true')
      onComplete()
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-cream">
      <div className="max-w-lg mx-auto px-6 py-16 sm:py-24">
        <div className="text-center">
          <CompassRose className="w-16 h-16 text-teal/30 mx-auto mb-8" />

          <h2
            className="font-display text-navy font-semibold leading-tight mb-3"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            Almost There
          </h2>

          <p className="font-body text-navy/60 text-base leading-relaxed mb-10">
            You answered {totalAnswered} questions. Enter your name and email and
            we&apos;ll generate your Personal Constitution.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label
                htmlFor="lead-first-name"
                className="block font-body text-sm font-semibold text-navy/70 mb-1.5"
              >
                First Name
              </label>
              <input
                id="lead-first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your first name"
                autoComplete="given-name"
                className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-white
                           font-body text-navy text-base
                           placeholder:text-navy/30
                           focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50
                           transition-all duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="lead-email"
                className="block font-body text-sm font-semibold text-navy/70 mb-1.5"
              >
                Email
              </label>
              <input
                id="lead-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-white
                           font-body text-navy text-base
                           placeholder:text-navy/30
                           focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50
                           transition-all duration-200"
              />
            </div>

            {error && (
              <p className="font-body text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={!isValid || submitting}
              className="w-full font-body font-bold text-sm tracking-[0.1em] uppercase
                         px-8 py-4 rounded-full
                         bg-teal text-white shadow-md shadow-teal/20
                         hover:bg-teal-light hover:shadow-lg hover:shadow-teal/30
                         hover:-translate-y-[1px] active:translate-y-0
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0
                         transition-all duration-200"
            >
              {submitting ? 'Generating...' : 'Generate My Constitution'}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}
