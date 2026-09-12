import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import BeforeAfter from '../components/BeforeAfter'
import { getNextProjects, getProject } from '../data/projects'
import './Project.css'

/**
 * One template for every project. Everything on the page comes from the entry
 * in src/data/projects.js, so a new project needs no new component.
 */
export default function Project() {
  const { slug } = useParams()
  const project = getProject(slug)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  if (!project) {
    return (
      <main className="project project--missing">
        <h1>Project not found</h1>
        <Link className="project__back" to="/">
          Back to the work
        </Link>
      </main>
    )
  }

  const { title, tagline, cover, year, role, stack, intro, sections, beforeAfter, summary } = project
  const nextProjects = getNextProjects(slug, 3)

  return (
    <main className="project">
      {/* blue band: the nav is white, so the top of the page has to be dark */}
      <header className="project__head">
        <h1 className="project__title">{title}</h1>
        <p className="project__tagline">{tagline}</p>

        <dl className="project__meta">
          <div>
            <dt>Year</dt>
            <dd>{year}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{role}</dd>
          </div>
          <div className="project__meta-stack">
            <dt>Built with</dt>
            <dd>
              {stack.map((item) => (
                <span className="project__chip" key={item}>
                  {item}
                </span>
              ))}
            </dd>
          </div>
        </dl>
        
        <div className="project__actions">
          {project.previewLink ? (
            <a href={project.previewLink} target="_blank" rel="noreferrer" className="project__preview-btn">
              Live Preview
            </a>
          ) : (
            <button onClick={() => setShowToast(true)} className="project__preview-btn">
              Live Preview
            </button>
          )}
        </div>
        
        {showToast && (
          <div className="project__toast">
            Link will be available soon
          </div>
        )}
      </header>

      {/* the cover straddles the band and the page below it */}
      <div className="project__cover">
        <img src={cover} alt={title} />
      </div>

      <div className="project__body">
        <p className="project__intro">{intro}</p>

        {sections.map((section) => (
          <section className="project__section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      {beforeAfter && (
        <section className="project__compare">
          {/* keyed on the slug: navigating between projects remounts the
              slider, so the handle starts centred and the intro plays again */}
          <BeforeAfter key={slug} before={beforeAfter.before} after={beforeAfter.after} />
        </section>
      )}

      <section className="project__summary">
        <h2>In short</h2>
        <div className="project__summary-grid">
          <div className="project__summary-body">
            {summary.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {summary.highlights?.length > 0 && (
            <ul className="project__highlights">
              {summary.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {nextProjects.length > 0 && (
        <section className="project__more">
          <h2 className="eyebrow">More work</h2>
          <div className="project__more-grid">
            {nextProjects.map((item) => (
              <Link className="project__more-card" key={item.slug} to={`/work/${item.slug}`}>
                <img src={item.cover} alt={item.title} loading="lazy" />
                </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
