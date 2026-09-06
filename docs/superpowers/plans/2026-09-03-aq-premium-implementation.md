# Automobile Quick Premium Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the premium Wix-derived visual system in Astro 6 with durable lead capture, consent-safe attribution and verified preview quality.

**Architecture:** Keep all public, purchase-relevant content server-rendered in Astro on Cloudflare Workers. Use Supabase PostgreSQL as the durable lead/read-model store and React only for interaction islands. Keep inventory fail-closed/noindex until the official source and parity gate are verified.

**Tech Stack:** Astro 6, TypeScript, Tailwind CSS, React islands, Cloudflare Workers, Supabase PostgreSQL, Vitest, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-03-aq-premium-implementation-design.md`

## Global Constraints
- Work only on `feat/aq-p0-foundation-2026-09-03`.
- Do not modify production DNS, Wix, marketplace listings or `main`.
- Do not publish historical inventory as authoritative.
- No checkout, online payment or binding reservation.
- No secrets in Git, Drive or chat.
- Owner-confirmed canonical business identity is required before production publication of address, phone, email or opening hours.

---

### Task 1: Lead-domain contract and database alignment
**Files:**
- Create `src/domain/lead.ts`
- Create `src/domain/lead.test.ts`
- Create `supabase/migrations/202609030002_lead_attribution_and_capture.sql`

**Produces:** validated lead payload contract matching the preview Supabase migration and full sales lifecycle.

- [ ] Add failing tests for required name/contact, accepted intents, attribution normalization and lifecycle values.
- [ ] Confirm test failure in CI.
- [ ] Implement the minimum lead-domain code to pass.
- [ ] Re-run CI.

### Task 2: Durable Worker lead endpoint
**Files:**
- Create `src/pages/api/leads.ts`
- Create `src/lib/supabase-server.ts`

**Produces:** POST endpoint that returns success only after `capture_aq_lead` returns a durable UUID.

- [ ] Add endpoint-helper tests through the lead-domain module.
- [ ] Implement Cloudflare `env` access via `cloudflare:workers`.
- [ ] Call Supabase RPC with server-only `SUPABASE_SECRET_KEY`.
- [ ] Return 503 when backend config is unavailable and never emit false success.
- [ ] Re-run CI.

### Task 3: Premium shared shell
**Files:**
- Modify `src/layouts/PublicLayout.astro`
- Modify `src/styles/global.css`
- Modify `src/tailwind.config.mjs`

**Produces:** sticky premium header, accessible mobile navigation, footer, shared CTA/card primitives and responsive/a11y behavior.

- [ ] Preserve semantic landmarks and skip link.
- [ ] Implement mobile navigation without requiring a heavy client bundle.
- [ ] Keep touch targets >= 48px and visible focus states.
- [ ] Re-run type check/build.

### Task 4: Premium homepage
**Files:**
- Modify `src/pages/index.astro`

**Produces:** image-led premium hero, trust/value strip, featured inventory, ankauf/financing paths and conversion-oriented layout.

- [ ] Use existing project imagery only.
- [ ] Avoid unverified numeric trust claims.
- [ ] Keep preview inventory visibly non-authoritative.
- [ ] Re-run build.

### Task 5: Inventory and VDP conversion UX
**Files:**
- Modify `src/pages/fahrzeuge/index.astro`
- Modify `src/pages/fahrzeuge/[slug].astro`

**Produces:** premium inventory cards and high-conversion VDP with mobile sticky CTA.

- [ ] Keep vehicle pages `noindex` until source/parity approval.
- [ ] Keep price/facts/gallery in initial HTML.
- [ ] Add clear inquiry and financing paths, no checkout/reservation.
- [ ] Re-run build.

### Task 6: Working contact lead form
**Files:**
- Create `src/components/islands/LeadForm.tsx`
- Modify `src/pages/kontakt.astro`

**Produces:** accessible form that posts to `/api/leads`, captures attribution and shows durable lead id on success.

- [ ] Separate contact/privacy acknowledgement from optional marketing consent.
- [ ] Capture vehicle id and landing/referrer attribution.
- [ ] Handle validation, network, 503 and success states explicitly.
- [ ] Re-run tests/build.

### Task 7: Consent-safe attribution foundation
**Files:**
- Create `src/domain/attribution.ts`
- Create `src/domain/attribution.test.ts`
- Create `src/components/islands/ConsentManager.tsx`
- Modify `src/layouts/PublicLayout.astro`

**Produces:** first-party attribution persistence and consent UI without pre-consent non-essential tags.

- [ ] Write failing attribution tests.
- [ ] Implement bounded UTM/GCLID/WBRAID/GBRAID persistence.
- [ ] Add consent UI with reject/accept/preferences semantics.
- [ ] Do not activate third-party tags until IDs and consent policy are verified.
- [ ] Re-run CI.

### Task 8: Configuration and verification hardening
**Files:**
- Modify `wrangler.jsonc`
- Modify `.github/workflows/ci.yml`
- Modify `docs/runbooks/GO_LIVE_P0.md`

**Produces:** documented server secrets, clean CI and explicit remaining production gates.

- [ ] Remove unrelated public analytics variables from Worker config unless explicitly required.
- [ ] Keep secret names documented but values absent.
- [ ] Verify security/performance Supabase advisors after schema change.
- [ ] Require check/test/build + security workflows before review.
- [ ] Leave production cutover blocked until source, lead delivery, SEO, consent, backup/restore, rollback and independent readback gates are green.
