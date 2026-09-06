# Automobile Quick — Authoritative Preproduction & Cutover Manifest

**Status:** preproduction candidate only  
**Working branch:** `feat/aq-p0-foundation-2026-09-03`  
**Pull request:** `#635`  
**Production deployment:** forbidden until explicit owner command `PRODUCTION_GO`

This document is the current cutover source of truth. Historical preview-worker names,
old vehicle counts and old gallery counts are intentionally retired.

## 1. Verified inventory baseline

- Active/available vehicles: **31**
- Official active vehicles: **31**
- Active matched: **31**
- Active unmatched: **0**
- Historical sold/delisted records preserved: **16**
- Total preserved records: **47**
- Gallery assets in the verified project baseline: **649 WebP images**

Active-source parity and historical preservation are different claims. Historical sold
vehicles are not counted as currently available marketplace inventory.

## 2. Runtime

- Astro: **6.4.x**
- TypeScript + React islands/current React application surface
- Cloudflare adapter: `@astrojs/cloudflare`
- Wrangler: **4.95.x**
- Node in CI: **22**
- Build: `npm run build`
- Worker artifact: `dist/server/wrangler.json`

Required verification before promotion:

```bash
npm ci --legacy-peer-deps
npm run check
npm run test:run
npm run lint:scan
npm run build
```

## 3. Single Cloudflare source of truth

Canonical Worker:

```text
automobile-quick
```

Preview implementation:

```text
VERSION / ALIAS ON CANONICAL WORKER
alias: owner-review
```

Preview upload command used by CI:

```bash
npx wrangler versions upload --config dist/server/wrangler.json --preview-alias owner-review
```

This uploads a Worker **version only**. It must not promote production traffic.

There must be no permanent Automobile Quick production architecture based on:

- a separate `automobile-quick-preview` Worker;
- an Automobile Quick Cloudflare Pages runtime;
- multiple independently maintained deploy truths.

## 4. Worker bindings / secrets

Required secret names:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

KV binding:

```text
SESSION -> 4aaf6d82144f414aa070c03e06df8f8e
```

Secrets must never be committed to Git.

## 5. Production host contract

Canonical public host:

```text
https://www.automobile-quick.de
```

Apex host:

```text
https://automobile-quick.de
```

The apex domain must permanently redirect to the equivalent `www` path. Canonicals,
sitemap entries and public structured data must use the canonical `www` origin.

Preview URLs must remain `noindex,nofollow` and must never be submitted for indexing.

## 6. Public route contract

| Route | Expected production behavior |
| --- | --- |
| `/` | Home, 200 |
| `/fahrzeugbestand` | Active inventory, 200 |
| `/fahrzeugdetail/:id` | Vehicle detail / defined sold-state behavior |
| `/autoankauf` | Trade-in, 200 |
| `/finanzierung` | Financing, 200 |
| `/ueber-uns` | About, 200 |
| `/kontakt` | Contact, 200 |
| `/impressum` | Legal notice, 200 |
| `/datenschutz` | Privacy, 200 |
| `/robots.txt` | Environment-appropriate robots policy |
| `/sitemap.xml` | Canonical indexable routes only |
| `/api/leads` | Server-side lead ingestion; fail closed |
| `/fahrzeuge` | Permanent redirect to `/fahrzeugbestand` |
| `/ankauf` | Permanent redirect to `/autoankauf` |

Legacy URLs must map to their closest relevant destination; do not mass-redirect all
legacy URLs to the homepage.

## 7. Lead safety contract

A successful lead response is valid only after:

1. payload validation;
2. server-side Turnstile validation where required;
3. durable Supabase write with lead ID;
4. vehicle/source/consent context persisted.

Preview must fail closed when the safe preview lead backend is intentionally unavailable.
No optimistic or fake success response is allowed.

## 8. Production cutover gate

Before `PRODUCTION_GO`, record the exact candidate with:

```bash
git rev-parse HEAD
```

The exact reviewed SHA — not an arbitrary local folder — is the production candidate.
Production is NO-GO unless all of the following have fresh evidence for that SHA:

- CI typecheck, tests and build pass;
- lint/security checks have no load-bearing failure;
- owner-review Worker version is reachable;
- mobile and desktop visual smoke tests pass;
- inventory count and vehicle/image integrity pass;
- preview noindex is verified from the real response;
- production canonical/indexability config is verified;
- lead flow/fail-closed behavior is verified;
- DNS and mail records are backed up;
- rollback path is recorded;
- HSB-Boden resources are unchanged;
- explicit owner command `PRODUCTION_GO` is present.

## 9. DNS / mail preservation

Before any production DNS change, export the existing zone and preserve mail records,
including applicable MX, SPF, DKIM and DMARC records. Website cutover must not be used
as an excuse to rewrite mail configuration.

## 10. Rollback

Application rollback must use a previously known-good Worker version. DNS fallback must
use the pre-cutover DNS export only if Worker rollback is insufficient.

After rollback verify:

- canonical website responds;
- inventory routes respond;
- lead endpoint is in its expected safe state;
- mail DNS remains unchanged;
- no HSB-Boden route or Worker was modified.

## 11. Protected external system

The following are outside Automobile Quick deployment scope and must remain unchanged:

```text
hsb-boden.de
www.hsb-boden.de
Worker: hsb-boden
HSB DNS / routes / domains
```

Any attempted mutation of those resources is a hard stop.
