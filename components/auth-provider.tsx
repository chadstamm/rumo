'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { migrateLocalToSupabase } from '@/lib/vault-storage'
import type { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const prevUserIdRef = useRef<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
      prevUserIdRef.current = user?.id ?? null
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const nextUser = session?.user ?? null
        const prevId = prevUserIdRef.current
        setUser(nextUser)

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
  }, [])

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
