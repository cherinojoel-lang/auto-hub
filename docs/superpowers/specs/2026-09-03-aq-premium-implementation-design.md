# Automobile Quick Premium Implementation Design

## Status
Approved for implementation by owner on 2026-09-03.

## Goal
Port the strongest proven visual language of the former Wix premium build into the Astro 6 / Cloudflare Workers target architecture, while improving accessibility, performance, SEO, lead attribution and operational safety.

## Design direction
- Preserve recognizable Automobile Quick premium styling: dark navy hero surfaces, real dealer/vehicle imagery, strong orange CTAs, generous whitespace, clear vehicle cards and direct contact paths.
- Use the accessible final CTA orange `#CC4A00` rather than the older `#FF6B00`.
- Keep purchase-relevant content server-rendered in Astro.
- Use React only for genuinely interactive islands such as consent and asynchronous lead submission.
- Avoid permanent motion libraries for decorative animation; CSS-only progressive enhancement and `prefers-reduced-motion` are the default.

## Public UX
### Header
Sticky, compact header with brand, desktop navigation, CSS/details mobile menu, inventory CTA and contact CTA.

### Homepage
1. Full-width premium hero using existing verified project imagery.
2. Clear local H1 and concise value proposition.
3. Three primary actions: inventory, contact/besichtigung, phone only when canonical business identity is owner-confirmed.
4. Trust strip using only facts cleared by project governance.
5. Featured inventory preview, but clearly marked non-authoritative until source/parity gate is green.
6. Ankauf and financing entry points.
7. Contact/visit section without inventing unverified business master data.

### Inventory
- 1/2/3-column responsive cards.
- Large images, price hierarchy, scannable vehicle facts, financing line only when sourced.
- Preview inventory remains `noindex` until the authoritative vehicle source and parity gate are verified.

### Vehicle detail
- Large gallery with strong image priority.
- Price/vehicle facts and inquiry CTA above the fold.
- Mobile sticky CTA bar.
- No checkout, payment or binding reservation.

### Lead flow
- Durable Supabase write before success response.
- Every accepted lead receives a `lead_id`.
- Lifecycle: `new -> contacted -> qualified -> appointment -> test_drive/offer -> sold | lost`.
- Attribution captured with landing page, vehicle id, channel, UTM, GCLID/WBRAID/GBRAID and consent evidence.
- Server-side Supabase secret only; never browser-visible.
- Endpoint fails closed when backend configuration is unavailable.

### Consent and analytics
- Non-essential analytics/advertising tags are consent-gated.
- Necessary lead submission remains functional without marketing consent.
- GA4/Ads hooks are added as interfaces, not silently activated without IDs/consent verification.
- Cloudflare Web Analytics may be added only under the project consent/privacy decision.

## Quality gates
- Build, type checks and tests green.
- No purchase-relevant JS-only content.
- Mobile touch targets >= 48px.
- WCAG AA contrast target for essential text/actions.
- Core Web Vitals target: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at p75.
- Preview remains non-production and non-authoritative until all P0 gates are green.
