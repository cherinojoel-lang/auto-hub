# Automobile Quick P0 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing AutoHub repository deployable as a verified Astro 6 / Cloudflare Workers website with server-rendered purchase routes, guarded inventory, durable lead contracts, SEO/consent hooks and CI evidence.

**Architecture:** Keep `cherinojoel-lang/auto-hub` as the single code control-plane. Move purchase-relevant rendering away from the React `client:only` catch-all into Astro routes, retain React only as targeted islands, treat current generated vehicle data as preview-only until an official dealer source is verified, and use Supabase PostgreSQL as the dedicated website read-model and lead store.

**Tech Stack:** Astro 6, TypeScript, React islands, Cloudflare Workers, Supabase PostgreSQL, Vitest, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-03-aq-p0-foundation-design.md`

## Global Constraints
- No production DNS, Wix, marketplace listing, production DB or `main` mutation during implementation.
- No secrets in Git, Drive or chat.
- No historic inventory may be published as authoritative.
- No checkout, online purchase or binding reservation flow.
- Work only on `feat/aq-p0-foundation-2026-09-03` until review.
- Every task must have automated verification and an explicit external gate where live credentials/data are required.

---

### Task 1: Governance contract
**Files:**
- Create `src/domain/p0-contract.ts`
- Create `src/domain/p0-contract.test.ts`
- Modify `docs/ai/PROJECT_STATUS.md`
- Modify `docs/ai/CURRENT_HANDOFF.md`

**Produces:** `PUBLIC_REQUIRED_ROUTES`, `LEAD_STATUSES`, `VEHICLE_STATUSES`, `canPublishVehicle()`.

- [ ] Write failing tests for required routes, complete lead lifecycle, allowed vehicle states and fail-closed preview inventory.
- [ ] Run CI and confirm the new tests fail before implementation.
- [ ] Implement readonly contracts and `canPublishVehicle()`.
- [ ] Re-run CI and require green tests/check/build.
- [ ] Update status/handoff with the approved architecture and unresolved external gates.

### Task 2: Server-rendered public routes
**Files:**
- Create `src/layouts/PublicLayout.astro`
- Create `src/pages/index.astro`
- Create `src/pages/fahrzeuge/index.astro`
- Create `src/pages/fahrzeuge/[slug].astro`
- Create `src/pages/ankauf.astro`
- Create `src/pages/finanzierung.astro`
- Create `src/pages/ueber-uns.astro`
- Create `src/pages/kontakt.astro`
- Create `src/pages/impressum.astro`
- Create `src/pages/datenschutz.astro`
- Create `src/domain/public-routes.test.ts`

**Produces:** Astro-owned HTML for all purchase-relevant routes without JS dependency.

- [ ] Add failing route-contract tests.
- [ ] Implement semantic `PublicLayout.astro` with canonical, skip link, navigation and no unverified business facts.
- [ ] Implement all required Astro pages with server-rendered headings/body/CTAs.
- [ ] Ensure vehicle pages use safe preview states until source authority passes.
- [ ] Re-run CI.

### Task 3: Inventory authority/read-model contract
**Files:**
- Create `src/domain/vehicle.ts`
- Create `src/domain/vehicle.test.ts`
- Create `supabase/migrations/202609030001_inventory_and_leads.sql`

**Produces:** stable `vehicle_id`, slug presentation key, lifecycle `available | reserved | sold | hidden | deleted`, authority/parity fields and database tables for vehicles, sync runs/errors, leads and lead events.

- [ ] Write failing lifecycle/authority tests.
- [ ] Implement typed vehicle contract and publicability guard.
- [ ] Add migration with constraints, indexes and timestamps.
- [ ] Add migration assertions to tests.
- [ ] Re-run CI.

### Task 4: Fail-closed lead API
**Files:**
- Create `src/domain/lead.ts`
- Create `src/domain/lead.test.ts`
- Create `src/pages/api/leads.ts`

**Produces:** validated lead input, durable `lead_id`, attribution capture and explicit 503 when the durable backend is unavailable.

- [ ] Write failing validation/lifecycle/fail-closed tests.
- [ ] Implement input schema without persisting secrets or sensitive logging.
- [ ] Implement Worker endpoint that writes DB first and responds success only after durable insert.
- [ ] Treat email notification as secondary, never as source of truth.
- [ ] Re-run CI.

### Task 5: SEO and redirect foundation
**Files:**
- Modify `src/pages/sitemap.xml.ts`
- Create `src/pages/robots.txt.ts`
- Create `src/domain/seo.test.ts`
- Create `src/lib/redirects.ts`

**Produces:** canonical target domain abstraction, robots/sitemap contract, noindex protection for unverified preview inventory, explicit legacy redirect map.

- [ ] Write failing canonical/robots/sitemap tests.
- [ ] Implement indexability rules from source authority.
- [ ] Implement redirects without changing production DNS.
- [ ] Re-run CI.

### Task 6: Consent and attribution contract
**Files:**
- Create `src/domain/attribution.ts`
- Create `src/domain/attribution.test.ts`
- Create `src/components/islands/ConsentManager.tsx`

**Produces:** UTM/GCLID/WBRAID/GBRAID capture and consent-gated hooks for GA4/Ads/optional analytics.

- [ ] Write failing consent/attribution tests.
- [ ] Implement first-party attribution persistence with expiry and validation.
- [ ] Implement a small React island that does not load non-essential tags before consent.
- [ ] Re-run CI.

### Task 7: Deployment readiness and independent verification
**Files:**
- Modify `.github/workflows/ci.yml`
- Modify `wrangler.jsonc`
- Create `docs/runbooks/GO_LIVE_P0.md`
- Create `docs/runbooks/ROLLBACK.md`

**Produces:** CI on feature branches/PRs, Cloudflare Worker build readiness, P0 checklist and rollback procedure.

- [ ] Run `npm ci`, `npm run check`, `npm run test:run`, `npm run build` in GitHub Actions.
- [ ] Add preview-safe Worker configuration with no secrets in Git.
- [ ] Document source/parity, lead, SEO, consent, backup/restore, rollback, security/a11y/perf and independent-readback gates.
- [ ] Require green CI before PR is considered mergeable.
- [ ] Do not perform production cutover without scope-specific owner approval.
