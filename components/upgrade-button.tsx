'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'

export function UpgradeButton({
  label = 'Chart Your Course',
  className = '',
}: {
  label?: string
  className?: string
}) {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    if (loading) return
    if (!user) {
      router.push('/auth/login?returnTo=/pricing')
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      const response = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await response.json().catch(() => null)
      if (!response.ok || !data?.url) {
        throw new Error(data?.error ?? 'Checkout failed')
      }
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setSubmitting(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={submitting || loading}
        className={className}
      >
        {submitting ? 'Opening checkout…' : label}
      </button>
      {error && (
        <p className="font-body text-xs text-red-600 mt-3 text-center">{error}</p>
      )}
    </div>
  )
}
