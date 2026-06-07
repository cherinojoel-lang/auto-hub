# Current Handoff: Automobile Quick / AutoHub

## Start Here
Use `/Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub` as the working directory.

## Current Correction Pass
On 2026-06-07 the repo was audited against current public sources and corrected for:
- Saturday hours: `09:00-13:00`.
- Contact email: `auto-quick@t-online.de`.
- Review counts: mobile.de `157`, AutoScout24 `48`, combined visible total `205`.
- Homepage rich data: removed self-serving review JSON-LD from the rendered homepage.
- Embedded maps: replaced brittle placeholder `pb` embed URLs with address-query embeds.

Additional Gemini/Codex-reviewed hardening in the same pass:
- Homepage hero uses the existing smaller JPG asset instead of the 2.9 MB PNG.
- Google Maps iframe in `ContactSection` now has `title` and `aria-label`.
- The initial SSR canonical URL now uses the production domain and normalized route path.
- `MobileFloatingActionBar` is mounted globally on mobile routes, but remains hidden on vehicle detail pages because those have their own CTA bar.

## Immediate Safe Next Steps
1. Run `git status --short`.
2. Run `npm run test:run`, `npm run check`, and `npm run build` after any code changes.
3. Keep visible review claims source-linked and avoid adding LocalBusiness `aggregateRating`.
4. Use `docs/ai/SOURCES.md` for current public-source references.

## Do Not Assume
- Do not reuse the old `/Users/joelcherinodiaz/Developer/auto-hub` path unless the user explicitly switches context.
- Do not change contact email, Saturday hours, or review counts without re-checking public sources.
- Do not add Google/LocalBusiness review rich snippets for the dealer's own website.
