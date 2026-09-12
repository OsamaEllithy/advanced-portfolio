import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * A new route opens at its top, with no scroll animation: the page has smooth
 * scrolling on, which would otherwise sweep the whole document upwards.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const root = document.documentElement
    const previous = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    root.style.scrollBehavior = previous
  }, [pathname])

  return null
}
