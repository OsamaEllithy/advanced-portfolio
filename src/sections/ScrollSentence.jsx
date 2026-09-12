import { useCallback, useEffect, useRef } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import './ScrollSentence.css'

/* Words marked with a tone get a colour swipe as they settle. */
const WORDS = [
  { text: 'You’re' },
  { text: 'about' },
  { text: 'to' },
  { text: 'see' },
  { text: 'one' },
  { text: 'of' },
  { text: 'the' },
  { text: 'best', tone: 'blue' },
  { text: 'portfolios' },
  { text: 'you’ve' },
  { text: 'ever' },
  { text: 'come' },
  { text: 'across.' },
  { text: 'Get' },
  { text: 'ready', tone: 'green' },
  { text: 'for' },
  { text: 'what’s' },
  { text: 'coming', tone: 'blue' },
]

export default function ScrollSentence() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const lettersRef = useRef([])
  const metricsRef = useRef({ centers: [], width: 0 })

  /* Letter centres are measured once — they only change on resize. */
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      metricsRef.current = {
        width: track.scrollWidth,
        centers: lettersRef.current.map((el) =>
          el ? el.offsetLeft + el.offsetWidth / 2 : 0,
        ),
      }
    }

    measure()
    // fonts land after first paint and shift every offset
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const onProgress = useCallback((p) => {
    const track = trackRef.current
    const { centers, width } = metricsRef.current
    if (!track || !width) return

    const vw = window.innerWidth
    // p = 0 → sentence waits off the right edge; p = 1 → it has left to the west
    const tx = vw - p * (vw + width)
    track.style.transform = `translate3d(${tx}px, 0, 0)`

    for (let i = 0; i < lettersRef.current.length; i += 1) {
      const el = lettersRef.current[i]
      if (!el) continue

      const u = (tx + centers[i]) / vw // 0 at the left edge, 1 at the right
      // letters stay scattered on the right and drop into line past 32% of the screen
      const s = Math.min(1, Math.max(0, (u - 0.32) / 0.68))
      const ease = s * s

      el.style.transform =
        `translate3d(0, ${-ease * 120}px, 0) rotate(${ease * 26}deg) scale(${1 - ease * 0.12})`
      el.style.opacity = `${1 - ease * 0.15}`
      el.style.setProperty('--fill', `${(1 - ease) * 100}%`)
    }
  }, [])

  useScrollProgress(sectionRef, onProgress)

  let index = 0

  return (
    <section className="sentence" id="sentence" ref={sectionRef}>
      <div className="sentence__sticky">
        <div className="sentence__track" ref={trackRef}>
          {WORDS.map((word, w) => (
            <span className="sentence__word" key={`${word.text}-${w}`} data-tone={word.tone}>
              {[...word.text].map((char) => {
                const at = index
                index += 1
                return (
                  <span
                    className="sentence__char"
                    key={at}
                    ref={(el) => {
                      lettersRef.current[at] = el
                    }}
                  >
                    {char}
                  </span>
                )
              })}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
