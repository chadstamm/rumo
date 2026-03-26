'use client'

import { useEffect } from 'react'

/**
 * Forces scroll to top on mount. Prevents browser scroll restoration
 * from pulling users to the middle of the homepage on refresh.
 */
export function ScrollToTop() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return null
}
