'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '28rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0a1628', marginBottom: '1rem' }}>
              Something went wrong
            </h2>
            <p style={{ color: '#0a162899', fontSize: '1rem', marginBottom: '1.5rem' }}>
              An unexpected error occurred. Your progress is saved automatically.
            </p>
            <button
              onClick={reset}
              style={{
                fontWeight: 700,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                backgroundColor: '#1ebeb1',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
