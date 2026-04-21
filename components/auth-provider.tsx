'use client'

import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { migrateLocalToSupabase } from '@/lib/vault-storage'
import type { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  loading: boolean
  isSubscribed: boolean
  refreshSubscription: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isSubscribed: false,
  refreshSubscription: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const prevUserIdRef = useRef<string | null>(null)

  const fetchSubscription = useCallback(async (userId: string) => {
    const supabase = createClient()
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_status, subscription_expires_at')
      .eq('id', userId)
      .maybeSingle()

    const active =
      profile?.subscription_status === 'active' &&
      (!profile?.subscription_expires_at ||
        new Date(profile.subscription_expires_at) > new Date())

    setIsSubscribed(Boolean(active))
  }, [])

  const refreshSubscription = useCallback(async () => {
    if (user?.id) await fetchSubscription(user.id)
  }, [user?.id, fetchSubscription])

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
      prevUserIdRef.current = user?.id ?? null
      if (user?.id) fetchSubscription(user.id)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const nextUser = session?.user ?? null
        const prevId = prevUserIdRef.current
        setUser(nextUser)

        if (nextUser?.id) {
          fetchSubscription(nextUser.id)
        } else {
          setIsSubscribed(false)
        }

        // null -> user transition: migrate any anonymous localStorage vault docs into Supabase.
        if (!prevId && nextUser?.id) {
          migrateLocalToSupabase(nextUser.id)
            .then((r) => {
              if (r.migrated > 0) {
                console.log(`[vault] Migrated ${r.migrated} local doc(s) to Supabase (skipped ${r.skipped})`)
              }
            })
            .catch((e) => console.warn('[vault] Migration failed:', e))
        }
        prevUserIdRef.current = nextUser?.id ?? null
      }
    )

    return () => subscription.unsubscribe()
  }, [fetchSubscription])

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setIsSubscribed(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isSubscribed, refreshSubscription, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
