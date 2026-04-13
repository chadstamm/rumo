'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h2 className="font-display text-navy text-2xl font-bold mb-4">
          Something went wrong
        </h2>
        <p className="font-body text-navy/60 text-base mb-6">
          An unexpected error occurred. Your progress is saved automatically.
        </p>
        <button
          onClick={reset}
          className="font-body font-bold text-sm tracking-[0.1em] uppercase px-8 py-3 rounded-full
                     bg-teal text-white hover:bg-teal-light transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
