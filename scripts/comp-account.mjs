#!/usr/bin/env node
/**
 * Provision a comp account: creates the Supabase user if needed, marks
 * subscription_status='active' on their profile, and sends a magic link.
 *
 * Usage:
 *   node --env-file=.env.local scripts/comp-account.mjs <email>
 *
 * Reads from .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   NEXT_PUBLIC_SITE_URL  (optional — falls back to https://www.withrumo.com)
 *
 * The recipient should open the magic-link email in the SAME browser they
 * used previously, so any local wizard answers and saved Constitution
 * migrate to their account on sign-in.
 */
import { createClient } from '@supabase/supabase-js'

const email = process.argv[2]
if (!email) {
  console.error('Usage: node --env-file=.env.local scripts/comp-account.mjs <email>')
  process.exit(1)
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.withrumo.com'

if (!url || !serviceKey || !anonKey) {
  console.error(
    '[comp] Missing env vars. Need NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY.'
  )
  process.exit(1)
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

console.log(`[comp] Provisioning ${email}…`)

const { data: existing, error: lookupError } = await admin
  .from('profiles')
  .select('id, subscription_status')
  .eq('email', email)
  .maybeSingle()

if (lookupError) {
  console.error('[comp] Profile lookup failed:', lookupError)
  process.exit(1)
}

let userId
if (existing?.id) {
  userId = existing.id
  console.log(`[comp] Found existing profile ${userId} (status: ${existing.subscription_status})`)
} else {
  const { data, error } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
  })
  if (error) {
    console.error('[comp] createUser failed:', error)
    process.exit(1)
  }
  userId = data.user.id
  console.log(`[comp] Created new user ${userId}`)
}

const { error: updateError } = await admin
  .from('profiles')
  .update({
    subscription_status: 'active',
    subscription_started_at: new Date().toISOString(),
    subscription_expires_at: null,
  })
  .eq('id', userId)

if (updateError) {
  console.error('[comp] Profile update failed:', updateError)
  process.exit(1)
}
console.log('[comp] subscription_status set to active.')

const anon = createClient(url, anonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const { error: magicLinkError } = await anon.auth.signInWithOtp({
  email,
  options: {
    shouldCreateUser: false,
    emailRedirectTo: `${siteUrl}/auth/callback?next=/vault`,
  },
})

if (magicLinkError) {
  console.error('[comp] Magic link send failed:', magicLinkError)
  process.exit(1)
}

console.log(`[comp] Magic link sent to ${email} → /vault`)
console.log('[comp] Done. Tell the recipient to open the email in the same browser they used previously so localStorage answers migrate.')
