# Automobile Quick Premium Implementation Design

## Status
Approved for implementation by owner on 2026-09-03. Preview-first extension explicitly approved in the 2026-09-03 verified execution handoff.

## Goal
Port the strongest proven visual language of the former Wix premium build into the Astro 6 / Cloudflare Workers target architecture, while improving accessibility, performance, SEO, lead attribution and operational safety. The next milestone is **READY TO SHOW THE OWNER**: a polished, non-production Cloudflare preview. Production cutover remains a separate later gate.

## Binding architecture
- Astro 6 + TypeScript.
- React only for focused interaction islands.
- Cloudflare Workers as target runtime.
- Supabase PostgreSQL as website read-model/lead database, never as a third manually maintained inventory source.
- GitHub is the code control plane.
- Wix is visual/reference history only.

## Design direction
- Preserve recognizable Automobile Quick premium styling: dark navy hero surfaces, real dealer/vehicle imagery, strong orange CTAs, generous whitespace, clear vehicle cards and direct contact paths.
- Use the accessible final CTA orange `#CC4A00` rather than the older `#FF6B00`.
- Keep purchase-relevant content server-rendered in Astro.
- Avoid permanent motion libraries for decorative animation; CSS-only progressive enhancement and `prefers-reduced-motion` are the default.
- Remove internal engineering/go-live copy from the customer-facing surface. Preview status must be compact and unobtrusive.

## Public UX
### Header
Sticky, compact header with brand, desktop navigation, CSS/details mobile menu, inventory CTA and contact CTA. Important interactive targets are at least 48px high.

### Homepage
1. Full-width premium hero using existing project imagery.
2. Local H1 focused on used vehicles in Iserlohn-Letmathe.
3. Primary inventory CTA and secondary consultation/appointment CTA; phone only when canonical business identity is owner-confirmed.
4. Trust strip using only facts cleared by project governance; no stale ratings/counts.
5. Featured inventory preview with discreet `Design-Preview / Beispieldaten` treatment rather than developer warnings.
6. Ankauf and financing entry points.
7. Contact/visit section without inventing unverified business master data.

### Inventory
- 1/2/3-column responsive cards; 4 columns only where card readability remains strong.
- Large images, price hierarchy and scannable vehicle facts.
- Separate semantic actions for details and inquiry.
- URL/query-state filtering and sorting for make, price, first registration, mileage, fuel and transmission where data exists; do not fabricate missing fields.
- Preview inventory remains `noindex` until the authoritative vehicle source and parity gate are verified.

### Vehicle detail
- Large gallery with strong image priority, thumbnails, keyboard support and a lightweight island for gallery interaction where needed.
- Price/vehicle facts and inquiry CTA above the fold.
- Mobile sticky CTA bar.
- No checkout, payment or binding reservation.

### Lead flow
- Durable Supabase write before success response in functional environments.
- Every accepted lead receives a `lead_id`.
- Lifecycle: `new -> contacted -> qualified -> appointment -> test_drive/offer -> sold | lost`.
- Attribution captured with landing page, vehicle id, channel, UTM, GCLID/WBRAID/GBRAID and consent evidence.
- Server-side Supabase secret only; never browser-visible.
- Endpoint fails closed when backend configuration is unavailable.
- In pure design preview mode, submission must be explicitly disabled/fail-closed rather than returning fake success.

### Consent and analytics
- Non-essential analytics/advertising tags are consent-gated.
- Necessary lead submission remains functional without marketing consent when backend is enabled.
- GA4/Ads hooks are interfaces only until IDs/consent policy are verified.

## Preview architecture
- Prefer a dedicated non-production Worker `automobile-quick-preview` on `workers.dev` with no production routes or DNS changes.
- Keep preview configuration separate from production-oriented Wrangler configuration where required by Astro 6 build-time environment selection.
- Preview must be `noindex` and must not expose unverified business identity or live-inventory claims.
- Pure design preview must not be blocked by Supabase/Turnstile runtime secrets; backend functionality may remain fail-closed.
- A Cloudflare version preview alias is acceptable as a fallback share URL, but a dedicated preview Worker is preferred for stable owner review and observability.

## Performance and assets
- Hero/LCP assets must not be globally preloaded on pages that do not use them.
- Prefer Astro-managed responsive images (`Image`/`Picture`) and current Cloudflare/Astro image best practices over `public/` passthrough when practical.
- Use WebP/AVIF where generated safely; preserve explicit dimensions and responsive `sizes`.
- Remove unused Wix externalization, Framewire/dev-only integrations, React Router, Framer Motion and unused Radix packages only after verified usage audit.

## Metadata and SEO
- Unique title/description/canonical per route.
- OpenGraph/Twitter metadata where appropriate.
- Breadcrumb and vehicle structured data only from supported/verified fields.
- Public owner preview is `noindex`; production canonical behavior must not cause preview indexing.

## Quality gates
- Build, type checks and tests green.
- No purchase-relevant JS-only content.
- Mobile touch targets >= 48px.
- WCAG 2.2 AA target for essential text/actions.
- Core Web Vitals target: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at p75.
- Required visual QA widths: 360, 390, 430, tablet, 1366/1440 and large desktop plus 200% zoom.
- Preview remains non-production and non-authoritative until all P0 gates are green.

## Connector/runtime facts for this execution environment
- GitHub connector: read/write and Git data commit/ref actions are available.
- Google Drive connector: read/write is available in this ChatGPT environment; material project-state updates can be written in-place and read back.
- Supabase connector: project-scoped read/write actions are available; the preview database already contains the lead migration/function and must not be re-created blindly.
- Cloudflare app is registered in plugin metadata, but no Cloudflare tool namespace is currently exposed in this chat runtime. Therefore direct account actions cannot be claimed until a callable Cloudflare tool is actually available. GitHub Actions/Wrangler remains the fallback deployment path.

## Production boundary
No merge to `main`, production DNS change, production route change, marketplace mutation, destructive database operation or legal/financial publication without separate scope-specific approval.
