import { createServiceClient } from './service'

/**
 * Look up a Supabase user id by email, creating one if it doesn't exist.
 * Used by the Stripe webhook and /success route to bootstrap guest checkout
 * buyers into real accounts.
 *
 * Service-role only. Never call from a client component.
 */
export async function ensureUserIdForEmail(email: string): Promise<string> {
  const admin = createServiceClient()

  const { data: existing } = await admin
    .from('profiles')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  if (existing?.id) return existing.id

  const { data, error } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
  })

  if (error) {
    const { data: retry } = await admin
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle()
    if (retry?.id) return retry.id
    throw error
  }

  return data.user.id
}
