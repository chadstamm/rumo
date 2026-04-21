import { createClient } from '@supabase/supabase-js'

/**
 * Service-role Supabase client — bypasses RLS. Use ONLY on the server
 * (webhooks, admin tasks). Never import from client components.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY (not the public anon key).
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error(
      '[supabase/service] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
    )
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
