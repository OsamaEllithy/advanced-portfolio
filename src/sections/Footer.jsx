import './Footer.css'

/* Share-tracking query strings (Instagram's ?igsh=, Facebook's ?rdid=) are
   left off on purpose: they are tied to one share session and the plain
   profile URLs are what stay working. */
const COLUMNS = [
  {
    label: 'available for work',
    lines: [{ text: 'Open to freelance' }, { text: '& full-time roles' }],
  },
  {
    label: 'socials',
    lines: [
      { text: 'LinkedIn', href: 'https://www.linkedin.com/in/osama-abd-elnasser' },
      { text: 'GitHub', href: 'https://github.com/OsamaEllithy' },
      { text: 'Instagram', href: 'https://www.instagram.com/osama_abdelnaser12' },
      { text: 'Facebook', href: 'https://www.facebook.com/osama.abdelnaser.92' },
    ],
  },
  {
    label: 'contact',
    lines: [
      { text: 'osama.abdelnaser.dev@gmail.com', href: 'mailto:osama.abdelnaser.dev@gmail.com' },
      { text: '01203494855', href: 'https://wa.me/201203494855' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__top">
        <h2 className="footer__headline reveal">
          let&rsquo;s make
          <br />
          something loud.
        </h2>
        <a className="footer__cta reveal" style={{ '--i': 1 }} href="mailto:osama.abdelnaser.dev@gmail.com">
          <span>start a project</span>
          <i className="footer__cta-arrow">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 18 18 6M8 6h10v10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
        </a>
      </div>

      <div className="footer__cols">
        {COLUMNS.map((col, i) => (
          <div className="footer__col reveal" key={col.label} style={{ '--i': i }}>
            <span className="footer__label pill">{col.label}</span>
            <div className={`footer__lines ${col.label === 'socials' ? 'footer__lines--stack' : ''}`}>
              {col.lines.map((line) =>
                line.href ? (
                  <a
                    key={line.text}
                    href={line.href}
                    target={line.href.startsWith('http') ? '_blank' : undefined}
                    rel={line.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {line.text}
                  </a>
                ) : (
                  <p key={line.text}>{line.text}</p>
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="footer__bar">
        <button
          className="footer__credits pill"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          back to top
        </button>
        <p>© {new Date().getFullYear()} osama abdelnaser, built by me</p>
      </div>
    </footer>
  )
}
