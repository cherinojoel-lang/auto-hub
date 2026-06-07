# Project Status: Automobile Quick / AutoHub

Last verified: 2026-06-07

## Current State
- Local canonical path: `/Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub`
- Git branch: `main`
- Last observed commit before current fixes: `4ac3930 Merge pull request #217 from cherinojoel-lang/feat/final-best-practice-hardening`
- Worktree state at start of 2026-06-07 audit: clean.
- Deployment target: Cloudflare Pages/Workers via `wrangler.jsonc` project name `automobile-quick`.
- Remote: `https://github.com/cherinojoel-lang/auto-hub.git`

## Verified Public Business Data
- Company: Automobile Quick
- Location: Hagener Str. 126a, 58642 Iserlohn-Letmathe
- Telephone: `+49 (0)2374 912912`
- Email: `auto-quick@t-online.de`
- Opening hours: Monday-Friday `09:00-18:00`, Saturday `09:00-13:00`
- Founded/positioning: since 1982 in Iserlohn-Letmathe

## Verified Public Review Data
- mobile.de: 157 reviews, 5-star profile.
- AutoScout24: 48 reviews, 4.9 rating, 100% recommendation.
- Site-visible combined rating data: 205 publicly visible reviews, weighted rating 4.98.
- LocalBusiness/AutoDealer JSON-LD must not include self-serving `review`, `aggregateRating`, or `reviewCount`.

## Current Work Scope
1. Keep this repo as the active AutoHub code truth unless the user explicitly switches projects.
2. Keep contact, opening-hours, review, and schema data aligned with current public sources.
3. Use reviews as visible trust proof with external source links, but avoid unsupported rich-result claims.
4. Continue design optimization through a copy-paste master prompt after this correction pass.

## Additional Local Hardening Under Review
- Hero image source changed from `/images/hero-bg.png` to existing `/images/hero-bg.jpg`.
- `ContactSection` map iframe accessibility attributes added.
- Initial canonical link now uses production-domain route canonical before React hydration.
- Mobile floating CTA bar mounted globally and excluded from vehicle detail pages.

## Known Open Decisions
- Confirm final production routing and whether both `www.automobile-quick.de` and `automobile-quick.de` should be maintained.
- Confirm whether a real domain email should replace `auto-quick@t-online.de` later; do not change it without source confirmation.
- Confirm whether a live CRM/form backend should replace the current simulated inquiry flow.
