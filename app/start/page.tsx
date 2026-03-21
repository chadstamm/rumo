import { CompassRose } from '@/components/compass-rose'

export default function StartPage() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-lg gap-8">
        <CompassRose className="w-40 h-40 text-navy opacity-60" />

        <div className="flex flex-col gap-3">
          <h1 className="font-display text-4xl text-navy">The Path</h1>
          <p className="font-body text-muted text-lg leading-relaxed">
            Build your personal AI foundation — identity, voice, and stories. All in one journey.
          </p>
        </div>

        <button
          disabled
          className="font-body px-8 py-3 rounded bg-cream-dark text-muted border border-muted/30 cursor-not-allowed text-sm tracking-wide"
          aria-label="Coming soon"
        >
          Begin Your Journey
        </button>
      </div>
    </main>
  )
}
