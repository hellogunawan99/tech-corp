# AXION — Technology Corporation Website

A modern, fast-loading marketing site for a fictional AI infrastructure company. Built with vanilla HTML, CSS, and JS — no framework, no build step, no dependencies.

![Stack](https://img.shields.io/badge/stack-vanilla-0a0a0f?style=flat-square) ![Size](https://img.shields.io/badge/total-748KB-6366f1?style=flat-square) ![FCP](https://img.shields.io/badge/FCP-96ms-06b6d4?style=flat-square)

## Live preview

Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
tech-corp/
├── index.html        # Single page, semantic & accessible
├── css/
│   └── styles.css    # Design tokens, bento, glass, animations
├── js/
│   └── main.js       # Sticky nav, scroll reveal, counters
└── assets/           # 9 WebP images, ~700KB total
    ├── hero-bg.webp
    ├── cta-bg.webp
    ├── product-{cloud,edge,data}.webp
    └── feature-{dashboard,security,network,speed}.webp
```

## Performance

Measured on Chromium (localhost):

| Metric | Value |
| --- | --- |
| First Contentful Paint | **96 ms** |
| DOMContentLoaded | **15 ms** |
| Initial transfer | **24 KB** |
| Total site weight | **748 KB** |
| External dependencies | **0** |
| HTTP requests | 14 |

## Design system

All colors, radii, and motion timing live as CSS variables in `:root` at the top of `styles.css`. To re-theme, change the variables — every component follows.

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#0a0a0f` | Page background |
| `--text` | `#fafafa` | Primary text |
| `--text-muted` | `#a1a1aa` | Secondary text |
| `--indigo` | `#6366f1` | Brand accent |
| `--cyan` | `#06b6d4` | Highlight accent |
| `--grad-text` | indigo → violet → cyan | Headline gradients |

## Sections

1. **Sticky nav** — glass-morphism on scroll
2. **Hero** — gradient mesh + bokeh background, animated headline
3. **Logos** — "trusted by" strip
4. **Products bento** — Cloud (XL) + Edge + Data + stat card
5. **Features** — 4 alternating image + text rows
6. **Stats** — 4 large animated counters
7. **Testimonial** — single quote card with glow
8. **CTA** — full-width gradient bg + email form
9. **Footer** — multi-column with social + status

## Customizing

- **Brand name** — search & replace `AXION` in `index.html`
- **Copy** — every section is its own `<section>` with a clear heading
- **Images** — drop replacements into `assets/` (use `.webp` for best size)
- **Colors / type** — edit `:root` in `styles.css`

## License

MIT — use it for whatever you want.
