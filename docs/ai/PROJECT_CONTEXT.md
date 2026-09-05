# Project Context: Automobile Quick / AutoHub

## What this project is
"Automobile Quick" (AutoHub) is the marketing/inventory website for a premium
used-car dealership in Iserlohn-Letmathe, Germany, in business since 1982.
The repo builds and deploys that public site.

- Company: Automobile Quick
- Location: Hagener Str. 126a, 58642 Iserlohn-Letmathe
- Phone: `+49 (0)2374 912912`
- Email: `auto-quick@t-online.de`
- Opening hours: Mon–Fri 09:00–18:00, Sat 09:00–13:00
- Live site: `https://www.automobile-quick.de/`

See `docs/ai/SOURCES.md` for the public sources these facts were verified
against, and `docs/ai/PROJECT_STATUS.md` for the latest verified snapshot.

## Tech stack
- **Framework:** Astro 6.x with the React integration (originates from the
  "Wixstro" Wix Astro template — see root `README.md`)
- **UI:** React 18, Tailwind CSS, Radix UI components
- **Forms/validation:** React Hook Form + Zod
- **Testing:** Vitest
- **Deployment:** Cloudflare (Pages/Workers) via `wrangler.jsonc`,
  project name `automobile-quick`
- **CMS/auth:** Wix integrations under `integrations/` (`cms/`, `members/`)

## Repository layout
```
src/
├── components/   # React components (incl. ui/ for Radix-based primitives)
├── hooks/        # Custom React hooks
├── lib/          # Utility functions
├── pages/        # Astro pages
└── styles/       # Global styles
integrations/     # Wix CMS + member-auth integrations
public/           # Static assets
docs/ai/          # AI agent context (this directory)
```

## Key workflows
- `npm run dev` — local dev server (`http://localhost:4321`)
- `npm run build` — production build
- `npm run check` — Astro/TypeScript type check
- `npm run test:run` — run Vitest suite
- `npm run deploy` — build + `wrangler deploy`

## Related repositories
- `auto-hub1` (`github.com/cherinojoel-lang/auto-hub1`) exists but is
  **empty** (no commits, no branches). It is not a fork, mirror, or backup
  with content — do not treat it as a source of truth or copy anything from
  it. `auto-hub` is the single canonical repository for this project.
- `headblade-germany-commerce` is a separate, unrelated project (a
  Cloudflare Worker with its own preview-domain tooling) and shares no code
  or content with AutoHub.

## Do not assume
- Do not change verified public business data (contact email, hours, review
  counts) without re-checking the sources in `docs/ai/SOURCES.md`.
- Do not add self-serving `review`/`aggregateRating` JSON-LD for the
  dealer's own site (see `docs/ai/PROJECT_STATUS.md`).
