# Degular

Drop the licensed woff2 files here — the names must match exactly:

```
Degular-Regular.woff2
Degular-Medium.woff2
Degular-Semibold.woff2
Degular-Bold.woff2
Degular-Black.woff2
DegularDisplay-Semibold.woff2
DegularDisplay-Bold.woff2
```

No code change needed; `src/fonts.css` already points at them. Until they
exist the site falls back to Figtree, which shares Degular's proportions.

Using the Adobe Fonts web project instead? Delete the `@font-face` rules in
`src/fonts.css` and paste the kit `<link>` into `index.html`.
