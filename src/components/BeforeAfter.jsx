import { useCallback, useEffect, useRef, useState } from 'react'
import './BeforeAfter.css'

/**
 * Two shots of the same screen, split by a draggable handle. Pointer drag,
 * arrow keys once the handle has focus, and one automatic pass the first time
 * it scrolls into view so the comparison shows itself.
 */
export default function BeforeAfter({ before, after, beforeLabel = 'before', afterLabel = 'after' }) {
  const frameRef = useRef(null)
  const [split, setSplit] = useState(50)
  const [sweeping, setSweeping] = useState(false)
  const draggingRef = useRef(false)
  const playedRef = useRef(false)

  const setFromClientX = useCallback((clientX) => {
    const frame = frameRef.current
    if (!frame) return
    const rect = frame.getBoundingClientRect()
    setSplit(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }, [])

  useEffect(() => {
    const onMove = (e) => draggingRef.current && setFromClientX(e.clientX)
    const onUp = () => {
      draggingRef.current = false
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [setFromClientX])

  /* One pass across the frame the first time it scrolls into view: hold at the
     centre, open to the before side, wipe across to the after side, then
     settle back. It runs once per mount, and the slider is remounted for each
     project, so every project page plays it. */
  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timeline = [
      { at: 260, to: 88 },
      { at: 1360, to: 14 },
      { at: 2460, to: 50 },
      { at: 3520, to: null },
    ]
    const timers = []

    const play = () => {
      if (playedRef.current) return
      playedRef.current = true
      setSweeping(true)
      for (const step of timeline) {
        timers.push(
          setTimeout(() => (step.to === null ? setSweeping(false) : setSplit(step.to)), step.at),
        )
      }
    }

    /* Three ways in, because any one of them can miss: the observer catches
       the normal scroll, the scroll/resize listeners cover layout shifts, and
       the timeout covers a block that is already on screen at mount. */
    const inView = () => {
      const rect = frame.getBoundingClientRect()
      return rect.top < window.innerHeight * 0.85 && rect.bottom > 0
    }

    const check = () => {
      if (inView()) play()
    }

    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && play(),
      { rootMargin: '0px 0px -15% 0px', threshold: 0 },
    )
    io.observe(frame)

    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    timers.push(setTimeout(check, 600))
    check()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      timers.forEach(clearTimeout)
    }
  }, [])

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') setSplit((v) => Math.max(0, v - step))
    if (e.key === 'ArrowRight') setSplit((v) => Math.min(100, v + step))
  }

  const stopSweep = () => {
    playedRef.current = true
    setSweeping(false)
  }

  return (
    <div className={`ba ${sweeping ? 'is-sweeping' : ''}`} style={{ '--split': `${split}%` }}>
      <div
        className="ba__frame"
        ref={frameRef}
        onPointerDown={(e) => {
          stopSweep()
          draggingRef.current = true
          setFromClientX(e.clientX)
        }}
      >
        {/* after fills the frame; before is clipped over it up to the split */}
        <img className="ba__img" src={after} alt={afterLabel} draggable="false" />

        <div className="ba__clip">
          <img className="ba__img" src={before} alt={beforeLabel} draggable="false" />
        </div>

        <span className="ba__line" aria-hidden="true" />

        <span className="ba__tag ba__tag--before">{beforeLabel}</span>
        <span className="ba__tag ba__tag--after">{afterLabel}</span>

        <button
          className="ba__handle"
          type="button"
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(split)}
          onFocus={stopSweep}
          onKeyDown={onKeyDown}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="m10 8-4 4 4 4M14 8l4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
