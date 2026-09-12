import { useEffect, useRef, useState } from 'react'
import './About.css'

/* Edit the copy and the numbers here; the layout follows whatever is listed. */
const INTRO = [
  "I'm a Full-Stack Web Developer with over 3 years of experience building modern and "
  + 'scalable web applications.',
  'I have worked as a freelancer on various projects and currently work at Pinkish Yellow '
  + 'in Saudi Arabia.',
]

const STATS = [
  { prefix: '+', value: 3, label: 'Years Experience' },
  { prefix: '+', value: 30, label: 'Happy Clients' },
  { prefix: '+', value: 45, label: 'Projects Completed' },
]

const DURATION = 1400

/** Counts up to `value` once `active` flips true, easing out at the end. */
function useCountUp(value, active) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!active) return

    // reduced motion runs the same path with no duration, so the first frame
    // lands on the final number
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : DURATION

    const start = Date.now()
    const id = setInterval(() => {
      const t = duration === 0 ? 1 : Math.min(1, (Date.now() - start) / duration)
      const eased = 1 - (1 - t) ** 3
      setShown(Math.round(value * eased))
      if (t >= 1) clearInterval(id)
    }, 16)

    return () => clearInterval(id)
  }, [value, active])

  return shown
}

function Stat({ prefix, value, label, active, index }) {
  const shown = useCountUp(value, active)

  return (
    <div className="about__stat reveal" style={{ '--i': index + 1 }}>
      <dt>
        {prefix}
        {shown}
      </dt>
      <dd>{label}</dd>
    </div>
  )
}

export default function About() {
  const statsRef = useRef(null)
  const [counting, setCounting] = useState(false)

  /* Same belt-and-braces trigger as the before/after slider: an observer for
     the usual scroll, plus listeners and a timeout for the cases where the
     block is already on screen or the layout shifts under it. */
  useEffect(() => {
    const el = statsRef.current
    if (!el) return

    let done = false
    const start = () => {
      if (done) return
      done = true
      setCounting(true)
    }

    const check = () => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) start()
    }

    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && start(),
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    )
    io.observe(el)

    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    const timer = setTimeout(check, 600)
    check()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      clearTimeout(timer)
    }
  }, [])

  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__lead">
          <h2 className="about__title reveal">who I am</h2>

          <dl className="about__stats" ref={statsRef}>
            {STATS.map((stat, i) => (
              <Stat key={stat.label} {...stat} index={i} active={counting} />
            ))}
          </dl>
        </div>

        <div className="about__text">
          {INTRO.map((paragraph, i) => (
            <p className="reveal" key={i} style={{ '--i': i + 1 }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
