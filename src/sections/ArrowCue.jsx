import './ArrowCue.css'

export default function ArrowCue() {
  return (
    <section className="cue" aria-hidden="true">
      <div className="cue__inner reveal">
        <svg className="cue__arrow" viewBox="0 0 260 200">
          <path
            className="cue__line"
            pathLength="1"
            d="M12 26C86 6 196 20 214 92c6 24 4 48 0 74"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            className="cue__head"
            pathLength="1"
            d="M188 140l26 30 28-32"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
