import { useState } from 'react'
import './Media.css'

/**
 * Image slot that degrades to a coloured placeholder until the real asset is
 * dropped into /public/images. Keeps the layout honest while art is missing.
 */
export default function Media({ src, alt = '', tone = 'mist', label, className = '' }) {
  const [failed, setFailed] = useState(!src)

  return (
    <div className={`media media--${tone} ${className}`.trim()} data-empty={failed || undefined}>
      {!failed && <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
      {failed && (
        <span className="media__ghost">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M3 17.5 8.4 11l4.1 4.6 3-3.2L21 17.5M4.5 4h15A1.5 1.5 0 0 1 21 5.5v13A1.5 1.5 0 0 1 19.5 20h-15A1.5 1.5 0 0 1 3 18.5v-13A1.5 1.5 0 0 1 4.5 4Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          {label && <em>{label}</em>}
        </span>
      )}
    </div>
  )
}
