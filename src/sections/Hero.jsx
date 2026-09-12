import './Hero.css'

/* Two fixed lines, with each word pre-numbered so the reveal can stagger. */
let counter = 0
const LABELS = ['صلِّ', 'على', 'النبي']

/* three steps of the job, stacked like stairs on the left */
const STEPS = ['plan', 'build', 'launch']

const LINES = ['I build digital experiences', 'that stand out and perform.'].map((line) =>
  line.split(' ').map((word) => ({ word, at: counter++ })),
)

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__wash" aria-hidden="true" />

      {/* A real outline rather than shadows stacked behind the photo: dilate the
          cut-out's alpha, fill that ring with white, then lay the photo back on
          top. The white only ever shows outside the silhouette. */}
      <svg className="hero__defs" aria-hidden="true" focusable="false">
        <filter
          id="portrait-outline"
          x="-8%"
          y="-8%"
          width="116%"
          height="116%"
          colorInterpolationFilters="sRGB"
        >
          <feMorphology in="SourceAlpha" operator="dilate" radius="2.5" result="fat" />
          {/* soften then re-harden the ring so the edge keeps its anti-aliasing */}
          <feGaussianBlur in="fat" stdDeviation="0.7" result="soft" />
          <feComponentTransfer in="soft" result="ring">
            <feFuncA type="linear" slope="4" intercept="-0.35" />
          </feComponentTransfer>
          <feFlood floodColor="#ffffff" result="white" />
          <feComposite in="white" in2="ring" operator="in" result="outline" />
          <feMerge>
            <feMergeNode in="outline" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      {/* cut-out portrait, centred in the frame */}
      <div className="hero__portrait">
        <img src="/images/me/portrait.webp" alt="Osama Abdelnaser" />
      </div>

      <ul className="hero__steps" aria-hidden="true">
        {STEPS.map((step, i) => (
          <li key={step} style={{ '--i': i }}>
            {step}
          </li>
        ))}
      </ul>

      <ul className="hero__labels" lang="ar" dir="rtl">
        {LABELS.map((label, i) => (
          <li className="hero__label pill" key={label} style={{ '--i': i }}>
            {label}
          </li>
        ))}
      </ul>

      <p className="hero__tagline">
        {LINES.map((words, i) => (
          <span className="hero__line" key={i}>
            {words.map(({ word, at }) => (
              <span key={at} style={{ '--i': at }}>
                {word}
              </span>
            ))}
          </span>
        ))}
      </p>
    </section>
  )
}
