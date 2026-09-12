import { useEffect } from 'react'

/**
 * Adds `is-in` to every `.reveal` element once it reaches the viewport.
 *
 * Deliberately not an IntersectionObserver: the observer kept failing to fire
 * for short targets here, which left the arrow and the work heading stuck at
 * opacity 0. A plain rect check on scroll is boringly reliable.
 */
export function useReveal() {
  useEffect(() => {
    let frame = 0

    const scan = () => {
      frame = 0
      const nodes = document.querySelectorAll('.reveal:not(.is-in)')
      if (!nodes.length) return
      const h = window.innerHeight
      for (const node of nodes) {
        const rect = node.getBoundingClientRect()
        // fire once the element is well inside the frame, not at the very
        // bottom edge, so its animation plays where you can watch it
        if (rect.top < h * 0.78 && rect.bottom > -h) {
          node.classList.add('is-in')
        }
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(scan)
    }

    scan()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    document.fonts?.ready.then(schedule)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
}
