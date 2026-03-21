import { CompassRose } from '@/components/compass-rose'

export default function InstructionsPage() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-lg gap-8">
        <CompassRose className="w-40 h-40 text-navy opacity-60" />

        <div className="flex flex-col gap-3">
          <h1 className="font-display text-4xl text-navy">Custom AI Instructions</h1>
          <p className="font-body text-muted text-lg leading-relaxed">
            Generate personalized instructions for ChatGPT, Claude, Gemini, and more.
          </p>
        </div>

        <button
          disabled
          className="font-body px-8 py-3 rounded bg-cream-dark text-muted border border-muted/30 cursor-not-allowed text-sm tracking-wide"
          aria-label="Coming soon"
        >
          Create Instructions
        </button>
      </div>
    </main>
  )
}
