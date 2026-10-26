# Lunge- og Allergiklinikken Aabenraa

A modern, single-page static website for Lunge- og Allergiklinikken Aabenraa — built to be hosted on GitHub Pages. No ads, no cookies, no tracking.

## Structure

```
.
├── index.html              # The whole site (single page)
├── favicon.svg
├── sitemap.xml
├── CNAME                   # Custom domain (lungelaegen.dk)
└── assets/
    ├── css/style.css       # Design system + layout
    ├── js/main.js          # Open-now status, map loader, nav, scroll reveal
    ├── fonts/              # Self-hosted Newsreader + Public Sans (latin subset)
    └── images/hero.svg     # (no longer used)
```

## Design

- **Fonts:** Newsreader (headings) + Public Sans (body), self-hosted — no requests to Google
- **Palette:** "Klinisk hvid": white (`#ffffff`), navy ink (`#0d1b2a`), petrol-blue accent (`#0b6e99`)
- **Map:** Google Maps loads only when the visitor clicks "Vis kort" (no cookies by default)
- **Opening hours** live in two places: the tables in `index.html` and the top of `assets/js/main.js` — update both
- Fully responsive, accessible, and honours `prefers-reduced-motion`

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a public repo and push these files to `main`.
2. **Settings → Pages → Source:** `main` branch, root.
3. Live at `https://<username>.github.io/<repo>/`.

### Custom domain (lungelaegen.dk)

The `CNAME` file is already included. Add DNS records at your registrar:

- A records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- (optional) `www` CNAME → `<username>.github.io`

Then enable **Enforce HTTPS** in Settings → Pages.

## Updating content

Everything is in `index.html`. Edit the text, commit, and push — changes go live within ~1 minute.
