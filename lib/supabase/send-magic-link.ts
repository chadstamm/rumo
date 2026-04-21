import { createClient } from '@supabase/supabase-js'
import { getSiteUrl } from '@/lib/stripe'

export async function sendMagicLink(email: string, next = '/vault'): Promise<void> {
  const anon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    }
  )

  const { error } = await anon.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  })

  if (error) throw error
}
