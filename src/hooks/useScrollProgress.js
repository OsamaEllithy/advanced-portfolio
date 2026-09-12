import { useEffect } from 'react'

/**
 * Calls `onProgress(p)` with 0 → 1 as `ref`'s element travels through the
 * viewport. Driven straight off the scroll event and throttled to one frame,
 * so there is no visibility gate that can leave a section frozen.
 * The callback should touch nothing but transforms.
 */
export function useScrollProgress(ref, onProgress) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0

    const measure = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const p = travel > 0 ? -rect.top / travel : -rect.top / rect.height
      onProgress(Math.min(1, Math.max(0, p)), rect)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    // widths settle once the webfont swaps in
    document.fonts?.ready.then(schedule)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ref, onProgress])
}
