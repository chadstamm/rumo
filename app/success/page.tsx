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

    const admin = createServiceClient()
    await admin
      .from('profiles')
      .update({
        subscription_status: 'active',
        stripe_customer_id: customerId,
      })
      .eq('id', userId)

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
