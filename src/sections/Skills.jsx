import { useEffect, useRef, useState } from 'react'
import './Skills.css'

/**
 * Icons are served by Simple Icons over their CDN, in each brand's own colour.
 *
 * To add or change a tool: edit a row in TOOLS below.
 *   name  - used as the image alt text and the fallback label
 *   slug  - the Simple Icons slug (look it up at https://simpleicons.org,
 *           it is the last part of the icon's URL). Omit it and the tile
 *           falls back to showing the name.
 *   color - hex override, no '#'. Only the marks that are too light to read
 *           on white carry one; the hue is kept and only the lightness is
 *           shifted, so each still reads as its brand colour.
 */
const ICON_CDN = 'https://cdn.simpleicons.org'

const TOOLS = [
  // top row - travels left
  [
    { name: 'React', slug: 'react', color: '0592b8' },
    { name: 'Next.js', slug: 'nextdotjs' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'Node.js', slug: 'nodedotjs', color: '5a974a' },
    { name: 'Tailwind CSS', slug: 'tailwindcss', color: '0595ae' },
    { name: 'MySQL', slug: 'mysql' },
  ],
  // bottom row - travels right
  [
    { name: 'WordPress', slug: 'wordpress' },
    { name: 'Git', slug: 'git' },
    { name: 'PostgreSQL', slug: 'postgresql' },
    { name: 'Figma', slug: 'figma' },
    { name: 'NestJS', slug: 'nestjs' },
    { name: 'Shopify', slug: 'shopify', color: '5e9343' },
    { name: 'Salla', slug: 'salla', color: '1a987b' },
  ],
]

/** how fast a row drifts on its own, in pixels per second */
const DRIFT = 34
/** a flick cannot throw the row faster than this, in pixels per second */
const MAX_FLING = 1800
/** seconds for a flick to lose most of its speed */
const FLING_DECAY = 0.35

/** no colour segment means Simple Icons serves the official brand colour */
function iconUrl({ slug, color }) {
  return color ? `${ICON_CDN}/${slug}/${color}` : `${ICON_CDN}/${slug}`
}

function Tool({ name, slug, color }) {
  const [broken, setBroken] = useState(false)

  return (
    <div className="skill">
      {slug && !broken ? (
        <img
          className="skill__icon"
          src={iconUrl({ slug, color })}
          alt={name}
          title={name}
          loading="lazy"
          draggable="false"
          onError={() => setBroken(true)}
        />
      ) : (
        <span className="skill__name">{name}</span>
      )}
    </div>
  )
}

/**
 * One row of the marquee. The drift used to be a CSS animation, but a CSS
 * animation owns `transform` outright, so there is nowhere for a drag to add
 * its own offset. Driving the offset from a frame loop instead lets the two
 * share it: the row keeps drifting on its own, a pointer can push it either
 * way, and a flick carries on for a moment after the finger leaves.
 */
function Row({ tools, dir }) {
  const rowRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const row = rowRef.current
    const track = trackRef.current
    if (!row || !track) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const drift = dir === 'right' ? DRIFT : -DRIFT

    let half = 0 // the width of one copy of the doubled list
    let x = 0 // current offset, always kept inside one copy
    let fling = 0 // leftover speed from a flick, px/s
    let dragging = false
    let lastX = 0
    let lastAt = 0
    let prev = 0
    let frame = 0

    const measure = () => {
      half = track.scrollWidth / 2
    }

    /* keep the offset inside (-half, 0]: the second copy sits exactly one
       `half` along, so any wrap lands on an identical frame */
    const wrap = (value) => {
      if (!half) return value
      const n = value % half
      return n > 0 ? n - half : n
    }

    const tick = (now) => {
      const dt = prev ? Math.min(64, now - prev) / 1000 : 0
      prev = now

      if (!dragging) {
        if (!still.matches) x += drift * dt
        x += fling * dt
        fling *= Math.exp(-dt / FLING_DECAY)
        if (Math.abs(fling) < 1) fling = 0
      }

      x = wrap(x)
      track.style.transform = `translate3d(${x}px, 0, 0)`
      frame = requestAnimationFrame(tick)
    }

    const onDown = (event) => {
      dragging = true
      fling = 0
      lastX = event.clientX
      lastAt = event.timeStamp
      row.setPointerCapture(event.pointerId)
      row.classList.add('is-dragging')
    }

    const onMove = (event) => {
      if (!dragging) return
      const dx = event.clientX - lastX
      const dt = event.timeStamp - lastAt
      x = wrap(x + dx)
      track.style.transform = `translate3d(${x}px, 0, 0)`
      if (dt > 0) {
        const speed = (dx / dt) * 1000
        fling = Math.max(-MAX_FLING, Math.min(MAX_FLING, speed))
      }
      lastX = event.clientX
      lastAt = event.timeStamp
    }

    const onUp = (event) => {
      if (!dragging) return
      dragging = false
      /* a pointer that stopped before it lifted should not keep going */
      if (event.timeStamp - lastAt > 120) fling = 0
      row.releasePointerCapture?.(event.pointerId)
      row.classList.remove('is-dragging')
    }

    measure()
    frame = requestAnimationFrame(tick)

    const observer = new ResizeObserver(measure)
    observer.observe(track)

    row.addEventListener('pointerdown', onDown)
    row.addEventListener('pointermove', onMove)
    row.addEventListener('pointerup', onUp)
    row.addEventListener('pointercancel', onUp)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      row.removeEventListener('pointerdown', onDown)
      row.removeEventListener('pointermove', onMove)
      row.removeEventListener('pointerup', onUp)
      row.removeEventListener('pointercancel', onUp)
    }
  }, [dir])

  return (
    <div className="skills__row" ref={rowRef}>
      {/* the row is rendered twice; the offset wraps after exactly one copy,
          so the loop restarts on an identical frame - no seam, no gap */}
      <div className="skills__track" ref={trackRef}>
        {[...tools, ...tools].map((tool, i) => (
          <Tool key={`${tool.name}-${i}`} {...tool} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <header className="skills__head">
        <h2 className="skills__title reveal">tools I build with</h2>
      </header>

      <div className="skills__marquee">
        {TOOLS.map((row, r) => (
          <Row key={r} tools={row} dir={r % 2 ? 'right' : 'left'} />
        ))}
      </div>
    </section>
  )
}
