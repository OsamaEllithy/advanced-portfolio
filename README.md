# Osama Abdelnaser — Portfolio

Personal portfolio of a full-stack web developer. Built with React 19 and Vite,
with no animation library: every transition, marquee, reveal and scroll effect in
here is plain CSS and a few small hooks.

**Live:** _coming soon_

---

## What is in it

**Home** — a hero with a cut-out portrait outlined by an SVG filter, a sentence
that sweeps across the viewport as you scroll, an about section with counters that
run from zero, a rail of work cards, a services carousel, a tools marquee and the
footer.

**Project pages** — one template at `/work/:slug` renders all nine case studies
from a single data file. Four of them include a draggable before/after slider that
plays an intro sweep when the section comes into view.

## Stack

| | |
|---|---|
| Framework | React 19 (with the React Compiler babel plugin) |
| Build | Vite 8 (rolldown) |
| Routing | react-router-dom 7 |
| Styling | Vanilla CSS, custom properties as design tokens |
| Linting | ESLint 10 |

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the build locally
npm run lint
```

Node 20 or newer.

## Structure

```
public/
  images/          project covers, skill logos, portrait
  fonts/           Degular woff2 files go here (see the README inside)
  _redirects       SPA fallback for Netlify
  .htaccess        SPA fallback for Apache
src/
  components/      Nav, Layout, BeforeAfter, Media, ScrollToTop
  sections/        Hero, ScrollSentence, About, ArrowCue, Work, Services, Skills, Footer
  pages/           Home, Project
  hooks/           useReveal, useScrollProgress, useSectionNav
  data/projects.js every project: copy, images, stack, case study
  index.css        design tokens and the global reset
vercel.json        SPA fallback for Vercel
```

### Adding or editing a project

Everything on a project page comes from one entry in
[`src/data/projects.js`](src/data/projects.js) — title, cover, year, role, stack
chips, the case-study sections and the summary. Add an object to `PROJECTS` and
the card on the home page, the route at `/work/<slug>` and the "more work" grid
all pick it up. Include a `beforeAfter` key only when there is an old design to
compare against; leave it out and the slider does not render.

## Notes

- **Fonts.** The display face is Degular, which is licensed. The `.woff2` files
  are deliberately not in this repo; drop them into `public/fonts/` following the
  README there. Until then the site falls back to Figtree, which shares Degular's
  proportions.
- **No animation library.** Reveals use a scroll listener plus
  `getBoundingClientRect` rather than IntersectionObserver, because observers with
  a threshold never fire for elements shorter than the trigger area.
- **Deployment.** It is a single-page app, so the host needs a rewrite to
  `index.html`. Configs for Vercel, Netlify and Apache are all included.

## Licence

Code is MIT (see [LICENSE](LICENSE)). The content — copy, photography, project
imagery and branding — is not; please do not reuse it.
