import { CompassRose } from '@/components/compass-rose'
import Link from 'next/link'

export default function VaultPage() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-lg gap-8">
        <CompassRose className="w-40 h-40 text-navy opacity-60" />

        <div className="flex flex-col gap-3">
          <h1 className="font-display text-4xl text-navy">Your Vault</h1>
          <p className="font-body text-muted text-lg leading-relaxed">
            Your personal context documents will live here. Complete The Path to start building your vault.
          </p>
        </div>

        <Link
          href="/start"
          className="font-body px-8 py-3 rounded bg-ochre text-cream text-sm tracking-wide hover:bg-ochre-light transition-colors duration-200"
        >
          Start The Path
        </Link>
      </div>
    </main>
  )
}
