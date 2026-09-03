# Automobile Quick P0 Foundation Design

## Status
Approved by owner in chat on 2026-09-03 for immediate continuation without additional architecture questions.

## Goal
Turn `cherinojoel-lang/auto-hub` into the single GitHub control-plane for Automobile Quick using Astro 6 + TypeScript + targeted React islands on Cloudflare Workers, with Supabase PostgreSQL as the website read-model and lead database.

## Non-negotiable architecture
- Astro 6 + TypeScript.
- `@astrojs/cloudflare` on Cloudflare Workers.
- React only where interactivity materially needs it; no `client:only` dependency for purchase-relevant core content.
- Dedicated Supabase PostgreSQL for website vehicle read-model, leads, lead events, sync runs and sync errors.
- GitHub is the code control-plane.
- Wix is transitional/reference only.
- Vercel and WordPress are not production targets.

## Source-of-truth rules
- Exactly one authoritative officially usable vehicle source must be selected after dealer-account API/export evidence is verified.
- mobile.de and AutoScout24 are reference/downstream parity systems, never an operational scraping source.
- `src/data/vehiclesData.generated.ts` is historical/preview-only until reconciled; it must never be treated as current authoritative inventory.
- No third manually maintained vehicle database.

## Public routing
Purchase-relevant routes must have server-rendered indexable HTML without JavaScript:
- `/`
- `/fahrzeuge/`
- `/fahrzeuge/[slug]`
- `/ankauf`
- `/finanzierung`
- `/ueber-uns`
- `/kontakt`
- `/impressum`
- `/datenschutz`

Legacy routes may redirect only after redirect mapping is explicitly validated.

## Vehicle contract
Stable website identity is `vehicle_id`; slug is a presentation key and may change independently. Website lifecycle supports `available | reserved | sold | hidden | deleted`. Only `available` and explicitly approved `reserved` records may be publicly rendered. Publishing requires `source_authority=verified` and a successful parity gate.

## Lead contract
Every accepted lead must receive a durable `lead_id` before any success response. Required attribution fields include source, landing page, `vehicle_id` when applicable, channel, UTM values, GCLID/WBRAID/GBRAID when present, consent evidence and lead status.

Lifecycle: `new -> contacted -> qualified -> appointment -> test_drive/offer -> sold | lost`.

Email/Outlook notification is secondary. The durable database write is primary. If the database is unavailable, `/api/leads` fails closed and must not present a false success state.

## Tracking and consent
Target measurement layer: GA4, Search Console, Google Ads/Enhanced Conversions or Data Manager as applicable, UTM/GCLID capture, call tracking, WhatsApp click vs actual lead, Cloudflare Web Analytics and a management dashboard. Non-essential tracking must be consent-gated. Consent implementation is a production P0 gate.

## Business identity and legal content
Address, email, telephone, opening hours and other business master data may be published only from an owner-confirmed canonical source. Historical repository values are not promoted to canonical truth automatically. Conflicts open a conflict gate.

Legal pages must reflect the actual live processors, hosting, analytics and lead stack. Historical ODR/TMG-era language must not be copied forward without current validation.

## Security and operations
- No secrets in Git, Drive or chat.
- Cloudflare runtime secrets only via platform secret bindings.
- Security headers applied server-side.
- No checkout, binding online purchase or binding reservation flow.
- Preview/staging separated from production.
- Rollback and backup/restore evidence required before cutover.

## P0 go-live gates
No production cutover until all are independently verified:
1. authoritative vehicle source + portal parity;
2. end-to-end form, telephone and WhatsApp lead paths;
3. SEO crawl, canonicals, redirects, sitemap and schema;
4. consent + tracking;
5. backup + restore test;
6. rollback procedure;
7. security, accessibility and performance checks;
8. independent readback.

## Delivery sequence
1. Repository governance and SSR route foundation.
2. Vehicle contract and non-authoritative preview guard.
3. Supabase schema and fail-closed lead API.
4. SEO/schema/redirect layer.
5. Consent and attribution instrumentation.
6. Preview deployment and CI verification.
7. Source/parity proof and live-data cutover preparation.
8. Owner-approved production cutover only after all P0 gates pass.
