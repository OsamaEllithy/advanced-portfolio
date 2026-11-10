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
  const { midImage, testimonial } = project
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
            <dd className="project__year">{year}</dd>
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

      {/* a second still from the build, sized exactly like the cover */}
      {midImage && (
        <figure className="project__still">
          <img src={midImage.src} alt={midImage.alt} loading="lazy" />
          {midImage.caption && <figcaption>{midImage.caption}</figcaption>}
        </figure>
      )}

      {beforeAfter && (
        <section className="project__compare">
          {/* keyed on the slug: navigating between projects remounts the
              slider, so the handle starts centred and the intro plays again */}
          <BeforeAfter key={slug} before={beforeAfter.before} after={beforeAfter.after} />
        </section>
      )}

      {/* the client's own words, in their own words */}
      {testimonial && (
        <aside className="project__quote">
          <blockquote>
            <p>{testimonial.quote}</p>
          </blockquote>
          <footer className="project__quote-by">
            <span className="project__quote-name">{testimonial.author}</span>
            {testimonial.role && <span className="project__quote-role">{testimonial.role}</span>}

            {testimonial.source && (
              <span className="project__quote-src">
                <span className="project__quote-where">on {testimonial.source.label}</span>
                <a
                  className="project__quote-link"
                  href={testimonial.source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  View the post
                </a>
              </span>
            )}
          </footer>
        </aside>
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
