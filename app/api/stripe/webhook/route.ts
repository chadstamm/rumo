import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/service'
import type Stripe from 'stripe'

export const dynamic = 'force-dynamic'

/**
 * POST /api/stripe/webhook
 *
 * Receives Stripe webhook events. Verifies the signature against the
 * webhook secret, then writes subscription state to Supabase using the
 * service-role client (bypasses RLS).
 *
 * Handled events:
 *  - checkout.session.completed  -> first-time subscription creation
 *  - customer.subscription.updated -> renewals, status changes
 *  - customer.subscription.deleted -> cancellations / expirations
 *  - invoice.payment_failed      -> mark as past_due
 */
export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Stripe webhook not configured.' },
      { status: 503 }
    )
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  const body = await request.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('[stripe/webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createServiceClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.supabase_user_id ?? session.client_reference_id
        const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id
        const subscriptionId =
          typeof session.subscription === 'string' ? session.subscription : session.subscription?.id

        if (!userId) {
          console.warn('[stripe/webhook] No supabase_user_id on checkout.session.completed')
          break
        }

        // Fetch subscription to get period boundaries
        let startsAt: string | null = null
        let expiresAt: string | null = null
        let status = 'active'
        if (subscriptionId) {
          const sub = await stripe.subscriptions.retrieve(subscriptionId)
          const periodStart = (sub as unknown as { current_period_start?: number }).current_period_start
          const periodEnd = (sub as unknown as { current_period_end?: number }).current_period_end
          startsAt = periodStart ? new Date(periodStart * 1000).toISOString() : null
          expiresAt = periodEnd ? new Date(periodEnd * 1000).toISOString() : null
          status = sub.status === 'active' || sub.status === 'trialing' ? 'active' : sub.status
        }

        // Insert subscription row
        await supabase.from('subscriptions').upsert(
          {
            user_id: userId,
            stripe_customer_id: customerId ?? '',
            stripe_subscription_id: subscriptionId ?? null,
            stripe_session_id: session.id,
            stripe_payment_intent_id:
              typeof session.payment_intent === 'string' ? session.payment_intent : null,
            status: status === 'active' ? 'active' : 'pending',
            amount_cents: session.amount_total ?? null,
            currency: session.currency ?? 'usd',
            starts_at: startsAt,
            expires_at: expiresAt,
            raw_event: event as unknown as Record<string, unknown>,
          },
          { onConflict: 'stripe_session_id' }
        )

        // Update profile to active
        await supabase
          .from('profiles')
          .update({
            subscription_status: 'active',
            subscription_started_at: startsAt,
            subscription_expires_at: expiresAt,
            stripe_customer_id: customerId ?? null,
          })
          .eq('id', userId)

        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const userId = sub.metadata?.supabase_user_id
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id

        const periodStart = (sub as unknown as { current_period_start?: number }).current_period_start
        const periodEnd = (sub as unknown as { current_period_end?: number }).current_period_end
        const startsAt = periodStart ? new Date(periodStart * 1000).toISOString() : null
        const expiresAt = periodEnd ? new Date(periodEnd * 1000).toISOString() : null

        // Map Stripe status -> our profile status
        let profileStatus: 'active' | 'expired' | 'past_due' | 'refunded' = 'active'
        if (event.type === 'customer.subscription.deleted') {
          profileStatus = 'expired'
        } else if (sub.status === 'active' || sub.status === 'trialing') {
          profileStatus = 'active'
        } else if (sub.status === 'past_due' || sub.status === 'unpaid') {
          profileStatus = 'past_due'
        } else if (sub.status === 'canceled' || sub.status === 'incomplete_expired') {
          profileStatus = 'expired'
        }

        // Find user via metadata (first) or customer_id (fallback)
        let targetUserId = userId
        if (!targetUserId && customerId) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('stripe_customer_id', customerId)
            .maybeSingle()
          targetUserId = profile?.id
        }

        if (!targetUserId) {
          console.warn('[stripe/webhook] Could not resolve user for subscription event')
          break
        }

        await supabase
          .from('profiles')
          .update({
            subscription_status: profileStatus,
            subscription_started_at: startsAt,
            subscription_expires_at: expiresAt,
            stripe_customer_id: customerId ?? null,
          })
          .eq('id', targetUserId)

        // Log a subscription row for the update event too
        await supabase.from('subscriptions').insert({
          user_id: targetUserId,
          stripe_customer_id: customerId ?? '',
          stripe_subscription_id: sub.id,
          status: profileStatus === 'active' ? 'active' : profileStatus,
          amount_cents: null,
          currency: sub.currency ?? 'usd',
          starts_at: startsAt,
          expires_at: expiresAt,
          raw_event: event as unknown as Record<string, unknown>,
        })

        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
        if (!customerId) break

        await supabase
          .from('profiles')
          .update({ subscription_status: 'past_due' })
          .eq('stripe_customer_id', customerId)
        break
      }

      default:
        // Ignore other events for MVP
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[stripe/webhook] Handler error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
