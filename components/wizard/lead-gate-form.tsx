'use client'

import { useState } from 'react'

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
  onStartOver: () => void
}

export function LeadGateForm({ onComplete, totalAnswered, onStartOver }: LeadGateFormProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isValid = firstName.trim().length > 0 && lastName.trim().length > 0 && email.trim().includes('@')

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
              { name: 'lastname', value: lastName.trim() },
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
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24">

        {/* Success state — what they accomplished */}
        <div className="text-center mb-12">
          {/* Animated checkmark ring */}
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-teal/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#1ebeb1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <p className="font-body text-teal font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-4">
            Questions Complete
          </p>

          <h2
            className="font-display text-navy font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            Your Answers Are In
          </h2>

          <div className="w-10 h-[2px] bg-ochre/40 mx-auto mb-6" aria-hidden="true" />

          <p className="font-body text-navy/55 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
            You just answered {totalAnswered}&nbsp;questions about who you are and
            what you stand for. That&apos;s the raw material for your Personal Constitution.
          </p>
        </div>

        {/* The form card — elevated, distinct */}
        <div className="relative bg-white rounded-2xl border border-navy/10 shadow-xl shadow-navy/5 overflow-hidden">
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-teal via-ochre/40 to-teal" />

          <div className="px-8 py-10 sm:px-12 sm:py-12">
            <div className="text-center mb-8">
              <h3 className="font-display text-navy font-semibold text-xl sm:text-2xl mb-2">
                One Last Step
              </h3>
              <p className="font-body text-navy/45 text-sm sm:text-base">
                Enter your name and email to generate your document.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="lead-first-name"
                    className="block font-body text-xs font-bold tracking-[0.1em] uppercase text-navy/50 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    id="lead-first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First"
                    autoComplete="given-name"
                    autoFocus
                    className="w-full px-5 py-3.5 rounded-xl border border-navy/12 bg-cream/50
                               font-body text-navy text-base
                               placeholder:text-navy/25
                               focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/40 focus:bg-white
                               transition-all duration-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lead-last-name"
                    className="block font-body text-xs font-bold tracking-[0.1em] uppercase text-navy/50 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    id="lead-last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last"
                    autoComplete="family-name"
                    className="w-full px-5 py-3.5 rounded-xl border border-navy/12 bg-cream/50
                               font-body text-navy text-base
                               placeholder:text-navy/25
                               focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/40 focus:bg-white
                               transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lead-email"
                  className="block font-body text-xs font-bold tracking-[0.1em] uppercase text-navy/50 mb-2"
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
                  className="w-full px-5 py-3.5 rounded-xl border border-navy/12 bg-cream/50
                             font-body text-navy text-base
                             placeholder:text-navy/25
                             focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/40 focus:bg-white
                             transition-all duration-200"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="9" stroke="#dc2626" strokeWidth="2" />
                    <path d="M12 9v4M12 17h.01" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p className="font-body text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!isValid || submitting}
                className="w-full font-body font-bold text-sm tracking-[0.1em] uppercase
                           px-8 py-4 rounded-full mt-2
                           bg-teal text-white shadow-lg shadow-teal/20
                           hover:bg-teal-light hover:shadow-xl hover:shadow-teal/30
                           hover:-translate-y-[1px] active:translate-y-0
                           disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none
                           transition-all duration-200"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="15" strokeLinecap="round" />
                    </svg>
                    Generating...
                  </span>
                ) : 'Generate My Constitution'}
              </button>
            </form>
          </div>
        </div>

        {/* Start over */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={onStartOver}
            className="font-body text-xs text-navy/30 hover:text-navy/50 px-4 py-2 transition-colors duration-200"
          >
            Start Over
          </button>
        </div>


      </div>
    </div>
  )
}
