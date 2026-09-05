# Automobile Quick Owner Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a polished, non-production Automobile Quick owner preview on Cloudflare without coupling visual approval to unresolved production vehicle, lead, tracking or DNS gates.

**Architecture:** Continue on the existing Astro 6 feature branch. Keep public content SSR/HTML-first, add only small React islands for real interaction, isolate preview runtime configuration from production requirements, and preserve fail-closed lead behavior. Use GitHub as the single code writer and Cloudflare Workers as the preview runtime; production remains untouched.

**Tech Stack:** Astro 6, TypeScript, Tailwind CSS, React islands, Cloudflare Workers/Wrangler, Supabase PostgreSQL, Vitest, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-03-aq-premium-implementation-design.md`

## Global Constraints
- Work only on `feat/aq-p0-foundation-2026-09-03`.
- Do not merge `main` or change production DNS/routes.
- Preview is non-authoritative and `noindex`.
- Do not publish stale ratings, portal counts or unverified business identity.
- No fake lead success; preview lead submission may be disabled/fail-closed.
- No secrets in Git, Drive or chat.
- Keep important touch targets >= 48px.
- Prefer Astro/HTML/CSS over client JS.

---

### Task 1: Preview-mode contract and SEO guard

**Files:**
- Create: `src/domain/preview.ts`
- Create: `src/domain/preview.test.ts`
- Modify: `src/layouts/PublicLayout.astro`
- Modify: `src/pages/api/leads.ts`

**Interfaces:**
- Produces: `isPreviewHost(hostname: string): boolean` and `shouldNoindexPreview(hostname: string): boolean`.
- Preview lead endpoint returns explicit `503 { ok:false, error:'preview_mode' }` when `AQ_PREVIEW_MODE=true`.

- [ ] Write failing tests asserting `*.workers.dev`, `localhost` and explicit preview hostnames are preview contexts while `www.automobile-quick.de` is not.
- [ ] Write failing tests asserting preview mode never returns a successful lead result without durable backend storage.
- [ ] Run CI and record the expected red failure for the new tests.
- [ ] Implement the minimal preview helper and endpoint guard.
- [ ] Add preview robots/noindex handling through the shared layout without changing production canonical behavior.
- [ ] Run check/tests/build and require green.

### Task 2: Shared shell cleanup and customer-facing copy

**Files:**
- Modify: `src/layouts/PublicLayout.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: preview helper from Task 1.
- Produces: clean customer-facing header/footer and compact preview badge.

- [ ] Add a focused rendering/contract test that fails while internal gate/developer copy is present in the public shell.
- [ ] Verify red in CI.
- [ ] Remove the global hero preload from `PublicLayout`; homepage will own its LCP priority.
- [ ] Replace internal footer copy with customer-facing Automobile Quick copy that contains no production/P0 terminology.
- [ ] Replace large warning styling with a compact `Design-Preview · Fahrzeugdaten beispielhaft` badge component/class.
- [ ] Preserve skip link, focus states and >=48px important targets.
- [ ] Run check/tests/build and require green.

### Task 3: Homepage premium copy and LCP ownership

**Files:**
- Modify: `src/pages/index.astro`
- Test: add/update homepage contract test if an existing test harness covers generated copy.

**Interfaces:**
- Produces: owner-ready premium homepage with local H1 and one primary/one secondary CTA.

- [ ] Add a failing copy/contract test for the desired local H1 and absence of developer language such as `Shop-Hürden`.
- [ ] Verify red.
- [ ] Change H1 to a local used-car search intent centred on `Gebrauchtwagen in Iserlohn-Letmathe`.
- [ ] Replace developer phrasing with customer language focused on clear vehicle data and personal advice.
- [ ] Keep featured preview vehicles but reduce the technical disclaimer to the compact preview treatment.
- [ ] Keep hero image priority on this page only; preserve explicit dimensions.
- [ ] Run check/tests/build and require green.

### Task 4: Inventory filter/sort domain

**Files:**
- Create/Modify: `src/lib/domain/vehicleFilter/*`
- Tests: `src/lib/domain/vehicleFilter/__tests__/*`

**Interfaces:**
- Consumes: generated `Vehicle` records.
- Produces: typed query parsing, derived filter options and deterministic sorting without fabricating absent transmission data.

- [ ] Inspect existing vehicle-filter tests/functions and reuse them rather than duplicate.
- [ ] Add failing tests for make, price range, first-registration year, mileage, fuel and sort order.
- [ ] Add a test proving an unavailable field (for example transmission if absent in fixtures) is not fabricated into filter options.
- [ ] Verify red.
- [ ] Implement only missing domain behavior.
- [ ] Run targeted vehicle-filter tests then full tests.

### Task 5: Inventory UX and semantic CTAs

**Files:**
- Modify: `src/pages/fahrzeuge/index.astro`
- Create only if needed: small `src/components/islands/VehicleFilters.tsx`.

**Interfaces:**
- Consumes: Task 4 filter/sort domain.
- Produces: URL/query-state filters and separate `Details` / `Anfragen` actions.

- [ ] Add a failing contract test proving inquiry and detail actions resolve to different URLs/elements.
- [ ] Verify red.
- [ ] Replace nested fake-button spans inside the card link with separate semantic anchors.
- [ ] Add server-readable query parameters for make, price, year, mileage, fuel and sorting; use a small island only when it improves mobile filter ergonomics.
- [ ] Provide reset action and accessible labels.
- [ ] Keep 1/2/3-column responsive card grid and `noindex`.
- [ ] Run check/tests/build and require green.

### Task 6: Vehicle gallery interaction

**Files:**
- Create: `src/components/islands/VehicleGallery.tsx`
- Create: `src/components/islands/VehicleGallery.test.tsx`
- Modify: `src/pages/fahrzeuge/[slug].astro`

**Interfaces:**
- Props: `{ images: { src:string; alt:string }[]; title:string }`.
- Produces: main image selection, image counter, keyboard-accessible thumbnails and lightweight dialog/lightbox behavior.

- [ ] Write failing tests for thumbnail selection, keyboard activation, counter and close behavior.
- [ ] Verify red.
- [ ] Implement the minimal gallery island without carousel dependency.
- [ ] Preserve initial main image and core vehicle facts in SSR HTML.
- [ ] Keep mobile sticky CTA focused on inquiry/appointment; financing remains secondary.
- [ ] Run targeted tests then full check/tests/build.

### Task 7: Asset/image pipeline

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/pages/index.astro`
- Add: `src/assets/hero-bg.jpg` only if binary migration can be performed safely; otherwise keep public asset and document the constraint.

**Interfaces:**
- Produces: no global preload, correct LCP priority and current Astro 6/Cloudflare image configuration.

- [ ] Check current Astro 6 + Cloudflare primary documentation before changing image service.
- [ ] Add a build/contract assertion that non-home pages no longer emit the hero preload.
- [ ] Verify red where applicable.
- [ ] Prefer `cloudflare-binding` or compile-time image processing only if compatible with the actual preview runtime; otherwise retain passthrough with explicit documented reason rather than guessing.
- [ ] Use responsive `Picture`/`Image` only when source asset placement supports Astro processing.
- [ ] Run build and inspect generated markup from CI artifact/log evidence where available.

### Task 8: Legacy configuration and dependency pruning

**Files:**
- Modify: `astro.config.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: smallest dependency/config surface that still passes the current application/test suite.

- [ ] Search actual branch usage for `framer-motion`, `react-router-dom`, Wix SDK packages, Framewire and Radix packages.
- [ ] Write/retain tests that cover any behavior before deleting a used dependency.
- [ ] Remove Wix externalization and dev integrations only when no current source imports depend on them.
- [ ] Remove unused direct dependencies in small groups, running install/check/tests/build between groups.
- [ ] Do not use `npm audit fix --force`.
- [ ] Record remaining audit findings separately from functional success.

### Task 9: Dedicated Cloudflare preview configuration

**Files:**
- Create: `wrangler.preview.jsonc`
- Modify: `astro.config.mjs`
- Modify: `.github/workflows/cloudflare-preview.yml`
- Modify: `src/env.d.ts` / `src/cloudflare-workers.d.ts` if needed.

**Interfaces:**
- Preview Worker name: `automobile-quick-preview`.
- Preview runtime variable: `AQ_PREVIEW_MODE=true`.
- No production routes/custom domains.
- Observability enabled.

- [ ] Add configuration tests/grep assertions proving preview config has no production route and uses the preview worker name.
- [ ] Verify red.
- [ ] Create preview-specific Wrangler config without production-required Supabase/Turnstile secret declarations.
- [ ] Configure Astro build to consume preview config at build time in accordance with current Astro 6 Cloudflare adapter docs.
- [ ] Update workflow to build/deploy the preview worker without touching production configuration.
- [ ] Keep a safe failure when Cloudflare account credentials are genuinely unavailable.
- [ ] Run check/tests/build before deployment.

### Task 10: Cloudflare deployment/readback

**Files:** none unless Task 9 reveals a deployment bug.

**Interfaces:**
- Produces: public `workers.dev` owner-preview URL and deployment evidence.

- [ ] First use a callable Cloudflare connector/MCP if one is actually exposed in this runtime; never claim a direct Cloudflare action otherwise.
- [ ] If no callable Cloudflare namespace exists, use the GitHub Actions/Wrangler fallback and diagnose credential resolution once from fresh evidence.
- [ ] Do not alter production DNS/routes.
- [ ] Capture deployment URL, Worker name, commit SHA and run ID.
- [ ] Confirm HTTP 200 for homepage and representative routes plus `noindex` on preview.

### Task 11: Visual QA and final polish

**Files:** modify only pages/components with observed defects.

**Interfaces:**
- Produces: owner-ready preview verified by actual rendered output.

- [ ] Open the deployed preview with an available browser/web renderer.
- [ ] Check 360, 390, 430, tablet, 1366/1440 and large desktop; include 200% zoom where the browser tool permits.
- [ ] Check home, inventory, one VDP, ankauf, financing, about, contact and 404.
- [ ] Fix only observed visual/accessibility defects using TDD where behavior changes.
- [ ] Re-run check/tests/build and redeploy.
- [ ] Verify final preview URL again.

### Task 12: Material checkpoint and handoff

**Files:**
- Update in-place: canonical Drive `PROJECT_STATE.md` file ID `1WxJ_djIpaZpclwcayFMkEohKj88NQZnd`.

**Interfaces:**
- Produces: verified project hot-state and owner handoff.

- [ ] Read the current Drive state immediately before editing.
- [ ] Update only material facts: current GitHub head, preview Worker/URL, tests, preview status and remaining production blockers.
- [ ] Preserve `PRODUCTION_CUTOVER_STATUS: NO_GO` unless separately approved and all P0 evidence exists.
- [ ] Read back the same file ID and verify the update.
- [ ] Report preview URL, commit, tests, visual QA, known preview limits and remaining production blockers.
