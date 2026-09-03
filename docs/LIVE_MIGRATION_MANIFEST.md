# Preproduction Live-Migration Manifest & Cutover Runbook

**Project:** Automobile Quick
**Target:** Production-Grade 10/10 Live Readiness
**Date:** 2026-09-03
**Working Branch:** `feat/aq-p0-foundation-2026-09-03`
**Approved Production SHA:** `bedf894` (verified preproduction HEAD)
* **Active Preview Version ID:** `994a5c80-84e2-43f2-8985-9c8a977618be`
* **Authoritative Vehicle Inventory:** 47 total records (31 active available matching 100% of live mobile.de dealer listings + 16 historical sold records preserved)
* **Gallery Asset Count:** 649 physical WebP images = 649 manifest entries across all 47 vehicles (0 broken, 0 missing)

---

## 1. Environment & Runtime Specifications

* **Node Version:** `v22.23.2` (Homebrew `/opt/homebrew/opt/node@22/bin`)
* **Package Manager:** `npm` (v10.x)
* **Astro Runtime Version:** `v6.4.2`
* **Wrangler Version:** `4.95.0`
* **Build Command:** `npm run build` (`astro build`)
* **Build Artifact Directory:** `dist/` (`dist/server/index.js`, `dist/client/`)
* **Adapter:** `@astrojs/cloudflare`

---

## 2. Cloudflare Worker Architecture & Bindings

* **Worker Name (Production):** `automobile-quick`
* **Worker Name (Preview):** `automobile-quick-preview`
* **Compatibility Date:** `2026-05-31`
* **Compatibility Flags:** `["nodejs_compat"]`
* **Observability:** Enabled (`observability: { enabled: true }`)
* **KV Namespaces:**
  * `binding`: `SESSION`
  * `id`: `4aaf6d82144f414aa070c03e06df8f8e`

### Required Secret Names (Stored securely in Cloudflare):
1. `SUPABASE_URL`
2. `SUPABASE_SECRET_KEY`
3. `TURNSTILE_SITE_KEY`
4. `TURNSTILE_SECRET_KEY`

---

## 3. Routing & URL Compatibility Matrix

| Request Path | Handling Engine | Target / Action | Status Code |
| :--- | :--- | :--- | :--- |
| `/` | Astro Catch-All Shell (`[...slug].astro`) | `<AppRouter client:only="react" />` -> `HomePage.tsx` | `200` |
| `/fahrzeugbestand` | Astro Catch-All Shell (`[...slug].astro`) | `<AppRouter client:only="react" />` -> `VehiclesPage.tsx` | `200` |
| `/fahrzeugdetail/:id` | Astro Catch-All Shell (`[...slug].astro`) | `<AppRouter client:only="react" />` -> `VehicleDetailPage.tsx` | `200` |
| `/ueber-uns` | Astro Catch-All Shell (`[...slug].astro`) | `<AppRouter client:only="react" />` -> `AboutPage.tsx` | `200` |
| `/kontakt` | Astro Catch-All Shell (`[...slug].astro`) | `<AppRouter client:only="react" />` -> `ContactPage.tsx` | `200` |
| `/autoankauf` | Astro Catch-All Shell (`[...slug].astro`) | `<AppRouter client:only="react" />` -> `TradeInPage.tsx` | `200` |
| `/finanzierung` | Astro Catch-All Shell (`[...slug].astro`) | `<AppRouter client:only="react" />` -> `FinancingPage.tsx` | `200` |
| `/impressum` | Astro Catch-All Shell (`[...slug].astro`) | `<AppRouter client:only="react" />` -> `ImprintPage.tsx` | `200` |
| `/datenschutz` | Astro Catch-All Shell (`[...slug].astro`) | `<AppRouter client:only="react" />` -> `PrivacyPage.tsx` | `200` |
| `/api/leads` | Astro SSR Route (`src/pages/api/leads.ts`) | Server-side Lead Ingestion (Turnstile + Supabase) | `201` / `400` / `503` |
| `/robots.txt` | Astro Route (`src/pages/robots.txt.ts`) | Dynamic Robots file | `200` |
| `/sitemap.xml` | Astro Route (`src/pages/sitemap.xml.ts`) | Dynamic Sitemap | `200` |
| `/fahrzeuge` | Astro Frontmatter Redirect | `/fahrzeugbestand` | `301` |
| `/ankauf` | Astro Frontmatter Redirect | `/autoankauf` | `301` |
| `/fahrzeuge/:slug` | Astro Dynamic Matcher | Extract ID and 301 to `/fahrzeugdetail/:id` | `301` |

---

## 4. Supabase Database Migration Status

* **Migration Folder:** `supabase/migrations/`
* **Lead Table:** `leads` (Columns: `id`, `created_at`, `name`, `email`, `phone`, `message`, `intent`, `vehicle_id`, `source`, `channel`, `consent_*`, `privacy_acknowledged_at`)
* **Status:** Verified schema and contracts preserved.

---

## 5. Production Cutover Runbook

> [!WARNING]
> DO NOT EXECUTE PRODUCTION CUTOVER UNTIL EXPLICIT OWNER SIGN-OFF (`PRODUCTION_GO`).

### Phase 1: T - 24 Hours
1. **Backup:** Snapshot current DNS records for `automobile-quick.de` at domain registrar.
2. **DNS TTL:** Reduce TTL on `automobile-quick.de` A/CNAME records to 300 seconds (5 minutes).
3. **Freeze Git SHA:** Ensure `main` or release tag matches the verified preproduction commit.
4. **Cloudflare Snapshot:** Record all existing Workers, KV namespaces, and account routes.

### Phase 2: T - 1 Hour
1. **Clean Build:** Run fresh `npm ci && npm run test:run && npm run check && npm run build`.
2. **Preview Smoke Test:** Verify owner-review preview URL responds with HTTP 200 and passes smoke tests.
3. **Vehicle Parity:** Verify `node scripts/final-vehicle-gallery-audit.mjs` returns 23 vehicles, 609 images, 0 missing.
4. **Secret Validation:** Confirm all 4 production secrets (`SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`) exist in the production environment.

### Phase 3: CUTOVER (Zero Downtime)
1. **Deploy Worker:**
   ```bash
   npx wrangler deploy --env production
   ```
2. **Route Attachment:**
   Add Custom Domain / Route in Cloudflare:
   - `automobile-quick.de/*` -> Worker `automobile-quick`
   - `www.automobile-quick.de/*` -> Worker `automobile-quick`
3. **Verify TLS:** Confirm Cloudflare Edge Certificate is Active (SSL/TLS Full or Strict).

### Phase 4: T + 5 Minutes (Immediate Post-Deploy Verification)
1. Check `https://automobile-quick.de` -> `200 OK`, Title "Automobile Quick", Hero present.
2. Check `https://www.automobile-quick.de` -> `200 OK` or `301` canonical redirect.
3. Check `https://automobile-quick.de/fahrzeugbestand` -> 20 active vehicles render with 4:3 cards and images.
4. Check `https://automobile-quick.de/fahrzeuge` -> `301 Moved Permanently` to `/fahrzeugbestand`.
5. Check `https://automobile-quick.de/robots.txt` -> `Allow: /`, `Disallow: /api/`, `Sitemap: ...`.
6. Check `https://automobile-quick.de/sitemap.xml` -> XML header present, all 23 vehicles included.
7. Submit 1 test lead with Turnstile token -> Check Supabase database entry created.

### Phase 5: T + 30 Minutes
1. Inspect Cloudflare Worker tail logs: `npx wrangler tail automobile-quick`.
2. Verify 0 uncaught exceptions or 500 error spikes.
3. Check Core Web Vitals (LCP <= 2.5s, CLS <= 0.1).

---

## 6. Instant Rollback Procedure

If any critical failure occurs during cutover:
1. **Immediate Worker Rollback:**
   ```bash
   npx wrangler rollback --env production
   ```
2. **DNS Fallback (if required):**
   Re-point `automobile-quick.de` DNS to legacy server IP/CNAME.
3. **Post-Rollback Inspection:** Confirm legacy site resumes traffic serving immediately.
