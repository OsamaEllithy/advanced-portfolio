# Image assets

```
images/
  me/portrait.webp        hero cut-out (transparent background)
  projects/*.webp         work cards and project pages — the filename is set
                          per project by `cover` in src/data/projects.js
  skills/*.svg            skills marquee, named after the tool, lowercased
                          with dots and spaces as dashes (next-js.svg, react.svg)
  logos/oa-logo.png       the OA mark used in the nav (recoloured to white in CSS)
  logos/flair.jpg         unused
  logos/logo.webp         unused
```

To add a project: drop the image in `projects/` and add a row to `CARDS` in
[`src/sections/Work.jsx`](../../src/sections/Work.jsx). The card count in the
header updates itself.

Every slot falls back to a coloured placeholder if a file is missing, so the
layout never collapses.

Filenames are matched exactly, including case (`Portfolio.webp`). Most hosts
serve files case-sensitively even though Windows does not, so rename a file
and its `cover` path together.
