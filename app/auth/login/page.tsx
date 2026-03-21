'use client'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-cream border border-muted/20 rounded-xl p-10 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-display text-3xl text-navy">Sign in to Rumo</h1>
          <p className="font-body text-muted text-sm">
            We&apos;ll send you a magic link to sign in.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="you@example.com"
            disabled
            className="font-body w-full px-4 py-3 rounded-lg bg-cream text-navy border border-muted/30 placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-ochre text-sm cursor-not-allowed"
          />

          <button
            disabled
            className="font-body w-full py-3 rounded-lg bg-ochre text-cream text-sm tracking-wide cursor-not-allowed opacity-70"
          >
            Send Magic Link
          </button>
        </div>

        <p className="font-body text-center text-xs text-muted">
          Authentication coming soon
        </p>
      </div>
    </main>
  )
}
