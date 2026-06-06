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

## Immediate Safe Next Steps
1. Run `git status --short`.
2. Run `npm run test:run`, `npm run check`, and `npm run build` after any code changes.
3. Keep visible review claims source-linked and avoid adding LocalBusiness `aggregateRating`.
4. Use `docs/ai/SOURCES.md` for current public-source references.

## Do Not Assume
- Do not reuse the old `/Users/joelcherinodiaz/Developer/auto-hub` path unless the user explicitly switches context.
- Do not change contact email, Saturday hours, or review counts without re-checking public sources.
- Do not add Google/LocalBusiness review rich snippets for the dealer's own website.
