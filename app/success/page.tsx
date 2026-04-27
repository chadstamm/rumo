import { SuccessContent } from './content'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { ensureUserIdForEmail } from '@/lib/supabase/ensure-user'
import { sendMagicLink } from '@/lib/supabase/send-magic-link'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Welcome aboard — RUMO',
  description: 'Your RUMO subscription is active.',
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    return <SuccessContent mode="authed" />
  }

  if (!session_id) {
    return <SuccessContent mode="guest-error" />
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
    const isPaid =
      checkoutSession.payment_status === 'paid' || checkoutSession.status === 'complete'

    if (!isPaid) {
      return <SuccessContent mode="guest-error" />
    }

    const email =
      checkoutSession.customer_details?.email ?? checkoutSession.customer_email ?? null

    if (!email) {
      return <SuccessContent mode="guest-error" />
    }

    const userId = await ensureUserIdForEmail(email)

    const customerId =
      typeof checkoutSession.customer === 'string'
        ? checkoutSession.customer
        : checkoutSession.customer?.id ?? null

    // Capture name from Stripe (single string — split on first space).
    const fullName = checkoutSession.customer_details?.name?.trim()
    let firstName: string | null = null
    let lastName: string | null = null
    if (fullName) {
      const idx = fullName.indexOf(' ')
      if (idx === -1) {
        firstName = fullName
      } else {
        firstName = fullName.slice(0, idx)
        lastName = fullName.slice(idx + 1).trim() || null
      }
    }

    const admin = createServiceClient()
    await admin
      .from('profiles')
      .update({
        subscription_status: 'active',
        stripe_customer_id: customerId,
      })
      .eq('id', userId)

    // Backfill name fields only if currently empty (preserves manual edits).
    if (firstName) {
      const { data: existingProfile } = await admin
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', userId)
        .maybeSingle()

      const nameUpdate: { first_name?: string; last_name?: string } = {}
      if (!existingProfile?.first_name) nameUpdate.first_name = firstName
      if (!existingProfile?.last_name && lastName) nameUpdate.last_name = lastName
      if (Object.keys(nameUpdate).length > 0) {
        await admin.from('profiles').update(nameUpdate).eq('id', userId)
      }
    }

    try {
      await sendMagicLink(email, '/vault')
    } catch (e) {
      console.error('[success] Magic link send failed:', e)
    }

    return <SuccessContent mode="guest-link-sent" guestEmail={email} />
  } catch (e) {
    console.error('[success] Failed to provision guest account:', e)
    return <SuccessContent mode="guest-error" />
  }
}
