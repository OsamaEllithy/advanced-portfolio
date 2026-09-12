import { useState } from 'react'
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
          onError={() => setBroken(true)}
        />
      ) : (
        <span className="skill__name">{name}</span>
      )}
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
          <div className="skills__row" key={r} data-dir={r % 2 ? 'right' : 'left'}>
            {/* the row is rendered twice; the track slides exactly one copy,
                so the loop restarts on an identical frame - no seam, no gap */}
            <div className="skills__track">
              {[...row, ...row].map((tool, i) => (
                <Tool key={`${tool.name}-${i}`} {...tool} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
