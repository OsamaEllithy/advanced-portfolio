import { useRef } from 'react'
import './Services.css'

const ICONS = {
  frontend: 'M3 5.5h18v13H3zM3 9.5h18M8.5 12.5 6.5 14.5l2 2M15.5 12.5l2 2-2 2',
  backend: 'M4 4.5h16v5H4zM4 14.5h16v5H4zM7.5 7h.01M7.5 17h.01',
  cms: 'm12 3 9 4.5-9 4.5-9-4.5L12 3ZM3 12l9 4.5L21 12M3 16.5 12 21l9-4.5',
  stores: 'M5.5 8h13l-1 11.5h-11L5.5 8ZM9 8V6a3 3 0 0 1 6 0v2',
  architecture: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
}

const SERVICES = [
  {
    key: 'frontend',
    title: 'frontend',
    tone: 'navy',
    items: [
      'React & Next.js Builds',
      'Responsive Interfaces',
      'Design System Setup',
      'Motion & Interaction',
      'Performance Tuning',
    ],
  },
  {
    key: 'backend',
    title: 'backend',
    tone: 'blue',
    items: [
      'REST & API Development',
      'Databases & Auth',
      'Admin Dashboards',
      'Payments & Webhooks',
      'Deployment & Hosting',
    ],
  },
  {
    key: 'cms',
    title: 'cms',
    tone: 'green',
    items: [
      'WordPress Custom Themes',
      'Shopify Themes & Sections',
      'Headless Setups',
      'Content Modelling',
      'Handover & Training',
    ],
  },
  {
    key: 'stores',
    title: 'stores',
    tone: 'mist',
    items: [
      'Salla Store Build',
      'Zid Store Build',
      'Lak Store Build',
      'Products & Payment Setup',
      'Launch & Support',
    ],
  },
  {
    key: 'architecture',
    title: 'architecture',
    tone: 'night',
    items: [
      'Project Structure',
      'Component Architecture',
      'State & Data Flow',
      'Code Review & Refactor',
      'Scaling & Maintainability',
    ],
  },
]

export default function Services() {
  const railRef = useRef(null)

  const nudge = (dir) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector('.svc')
    const step = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8
    rail.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="services" id="services">
      <header className="services__head">
        <h2 className="services__title reveal">what we do, exactly</h2>
        <p className="services__lead reveal" style={{ '--i': 1 }}>
          Five things, done properly. Drag the row or use the buttons.
        </p>
      </header>

      <div className="services__rail" ref={railRef}>
        {SERVICES.map((service, i) => (
          <article className={`svc svc--${service.tone} reveal`} key={service.key} style={{ '--i': i }}>
            <span className="svc__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d={ICONS[service.key]}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="svc__title">{service.title}</h3>
            <ul className="svc__list">
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="services__controls">
        <button className="services__btn" onClick={() => nudge(-1)}>
          Previous
        </button>
        <button className="services__btn" onClick={() => nudge(1)}>
          Next
        </button>
      </div>
    </section>
  )
}
