'use client'

import { useEffect } from 'react'

/**
 * Forces scroll to top on mount. Prevents browser scroll restoration
 * from pulling users to the middle of the homepage on refresh or navigation.
 */
export function ScrollToTop() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Always start at top
    window.scrollTo(0, 0)

    // Clean up navigation flag if set
    sessionStorage.removeItem('rumo-scroll-top')
  }, [])

  return null
}
