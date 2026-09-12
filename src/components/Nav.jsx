import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSectionNav } from '../hooks/useSectionNav'
import './Nav.css'

/* section ids, resolved by useSectionNav so no hash ever hits the address bar */
const LINKS = [
  { label: 'work', id: 'work' },
  { label: 'services', id: 'services' },
  { label: 'skills', id: 'skills' },
  { label: 'contact', id: 'contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const goToSection = useSectionNav()

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    return () => document.body.classList.remove('is-locked')
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="nav" data-hidden={open || undefined}>
        <Link className="nav__logo" to="/" aria-label="Home">
          <img src="/images/logos/oa-logo.png" alt="Osama Abdelnaser" />
        </Link>
      </header>

      <button
        className={`burger ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span />
        <span />
      </button>

      <div className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="menu__list">
          {LINKS.map((link, i) => (
            <button
              type="button"
              key={link.id}
              style={{ '--i': i }}
              onClick={() => {
                setOpen(false)
                goToSection(link.id)
              }}
            >
              <span>{link.label}</span>
            </button>
          ))}
        </nav>
        <p className="menu__foot">
          <a href="mailto:osama.abdelnaser.dev@gmail.com">osama.abdelnaser.dev@gmail.com</a>
          <em>·</em>
          <a href="tel:+201203494855">01203494855</a>
        </p>
      </div>
    </>
  )
}
