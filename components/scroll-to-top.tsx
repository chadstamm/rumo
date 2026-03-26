'use client'

import { useEffect, useLayoutEffect } from 'react'

/**
 * Forces scroll to top on mount. Uses useLayoutEffect to fire before paint,
 * and temporarily disables smooth scrolling so the jump is instant.
 */
export function ScrollToTop() {
  // useLayoutEffect fires synchronously before browser paint
  useLayoutEffect(() => {
    // Disable smooth scroll so the jump is instant
    document.documentElement.style.scrollBehavior = 'auto'

    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Force to top immediately
    window.scrollTo(0, 0)

    // Re-enable smooth scroll after a tick
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = ''
    })
  }, [])

  // Belt and suspenders — also catch any late scroll attempts
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (window.scrollY > 0) {
        document.documentElement.style.scrollBehavior = 'auto'
        window.scrollTo(0, 0)
        requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = ''
        })
      }
    }, 50)

    return () => clearTimeout(timeout)
  }, [])

  return null
}
