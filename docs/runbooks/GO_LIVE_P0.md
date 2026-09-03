# Automobile Quick — Hard Go-Live P0 Runbook

Production cutover is **NO-GO** unless every P0 gate below has fresh evidence and a named owner approval.

## P0 gates

### 1. Vehicle authority and parity
- Officially usable authoritative source selected from actual dealer-account evidence.
- Stable `vehicle_id` demonstrated.
- Field completeness >= 98% on a representative import.
- mobile.de and AutoScout24 parity comparison completed where contractually/technically accessible.
- No third independently edited inventory.
- Preview inventory removed/replaced by authoritative read-model data before indexing.

### 2. Lead capture and sales delivery
- Form creates a durable `lead_id` in Supabase before success UI.
- Required lifecycle supported: `new -> contacted -> qualified -> appointment -> test_drive/offer -> sold | lost`.
- Vehicle ID, landing page, channel and campaign/click attribution persist with the lead.
- Form tested with and without optional marketing consent.
- Sales recipient/owner and reaction SLA are documented.
- Telephone and WhatsApp paths, if enabled, are tested end-to-end and not counted as leads merely because a click occurred.

### 3. Abuse protection
- Cloudflare Turnstile widget configured for the approved domain/preview host.
- Every form token validated server-side using Siteverify before lead insertion.
- Turnstile secret stored only as a Worker secret.
- Rate/abuse controls tested for repeated invalid submissions.

### 4. Consent and tracking
- Consent wording/privacy review completed.
- Non-essential GA4/Ads/remarketing tags do not fire before valid consent where required.
- Contact submission works without marketing consent.
- GA4 events, Google Ads enhanced conversions/offline sale feedback, UTMs/GCLID and management reporting are test-validated before production activation.
- Cloudflare analytics configuration is documented in the privacy/consent decision.

### 5. SEO and migration
- Production vehicle pages are indexable only after source/parity approval.
- `robots.txt`, sitemap, canonicals and structured data validated.
- Legacy high-value URLs mapped to 301 destinations.
- 404/410 rules for retired content tested.
- Google Search Console property access and baseline verified.

### 6. Business identity and compliance
- Address, phone, email, opening hours and other master data read from owner-confirmed canonical source.
- Impressum and privacy policy reviewed for the actual production systems/data flows.
- Pkw-EnVKV applicability and required new-car/PHEV data are checked against the authoritative vehicle source.
- No unsupported guarantee, financing or legal-safety claims.

### 7. Security
- No secrets in Git, Drive or chat.
- Supabase secret key remains server-only.
- Repository dependency/security findings reviewed; no open critical/high production-relevant issue accepted without documented risk decision.
- Least-privilege production credentials configured.

### 8. Performance and accessibility
- Mobile p75 target: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.
- Essential text/actions meet WCAG AA contrast target.
- Interactive targets >= 48px where practical for primary mobile actions.
- Keyboard/focus navigation and reduced-motion behavior verified.

### 9. Backup, restore and rollback
- Pre-cutover database backup/snapshot exists.
- Restore test completed against a non-production target.
- Previous production site/version remains restorable.
- DNS/deployment rollback steps tested and timed.

### 10. Independent readback
- A reviewer other than the implementation writer verifies the deployed preview against this runbook.
- Production DNS/deployment receives separate, scope-specific owner approval.

## Current status
The feature branch and preview database are implementation/test surfaces only. They do not constitute production approval. Until every gate above is green, the decision is:

**NO-GO**
