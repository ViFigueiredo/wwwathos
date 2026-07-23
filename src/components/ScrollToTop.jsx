import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Handles scroll position on route changes:
 * - No hash: scrolls to the top of the new page.
 * - Hash present (e.g. "/#solucoes"): scrolls to the matching element,
 *   so anchor links keep working when navigating from another route
 *   back to a Home section.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
