import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PRICE_ID, getSiteUrl } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe Checkout Session for the signed-in user and returns
 * the hosted checkout URL. Client redirects to it.
 *
 * Requires: authenticated user, STRIPE_PRICE_ID env var.
 * Stores user_id in session metadata so the webhook can link the
 * payment back to the Supabase profile.
 */
export async function POST(_request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !STRIPE_PRICE_ID) {
      return NextResponse.json(
        { error: 'Stripe not configured on the server.' },
        { status: 503 }
      )
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Sign in required before purchasing.' },
        { status: 401 }
      )
    }

    // Reuse existing Stripe customer_id if we already created one
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, email')
      .eq('id', user.id)
      .maybeSingle()

    const siteUrl = getSiteUrl()

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      customer: profile?.stripe_customer_id ?? undefined,
      customer_email: profile?.stripe_customer_id ? undefined : (profile?.email ?? user.email ?? undefined),
      client_reference_id: user.id,
      metadata: {
        supabase_user_id: user.id,
      },
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
        },
      },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing?canceled=1`,
      allow_promotion_codes: true,
    })

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe did not return a checkout URL.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[stripe/checkout] Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    )
  }
}
