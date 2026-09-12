import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import Media from '../components/Media'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { PROJECTS } from '../data/projects'
import './Work.css'

export default function Work() {
  const sectionRef = useRef(null)
  const railRef = useRef(null)

  const onProgress = useCallback((p) => {
    const rail = railRef.current
    if (!rail) return
    const travel = rail.scrollWidth - window.innerWidth
    if (travel <= 0) return
    rail.style.transform = `translate3d(${-p * travel}px, 0, 0)`
  }, [])

  useScrollProgress(sectionRef, onProgress)

  return (
    <section className="work" id="work" ref={sectionRef}>
      <div className="work__sticky">
        <header className="work__head">
          <div className="work__headline">
            <h2 className="work__title">
              <span className="reveal" style={{ '--i': 0 }}>selected</span>{' '}
              <span className="reveal" style={{ '--i': 1 }}>work</span>
            </h2>
            <p className="work__note reveal" style={{ '--i': 2 }}>
              Just a few of them. Want to see the real work?{' '}
              <span className="work__chip">Get in touch</span>
            </p>
          </div>
          <p className="work__count eyebrow reveal" style={{ '--i': 3 }}>
            {String(PROJECTS.length).padStart(2, '0')} projects
          </p>
        </header>

        <div className="work__rail" ref={railRef}>
          {PROJECTS.map((project, i) => (
            <Link
              className="card"
              key={project.slug}
              to={`/work/${project.slug}`}
              style={{ '--tilt': `${project.tilt}deg`, '--lift': `${project.lift}px`, '--i': i }}
            >
              <Media src={project.cover} alt={project.title} label={project.title} />
              <span className="card__sticker pill">{project.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
