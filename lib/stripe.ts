import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('[stripe] STRIPE_SECRET_KEY not set — Stripe features disabled')
}

// Server-side Stripe client. Uses env STRIPE_SECRET_KEY.
// API version pinned; upgrade deliberately.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_missing', {
  apiVersion: '2026-03-25.dahlia',
  typescript: true,
})

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID ?? ''
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? ''

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  )
}
