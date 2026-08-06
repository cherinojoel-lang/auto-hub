# Changelog

## [Unreleased] - 2026-05-22 to 2026-08-06

### 🚀 Features & Enhancements
- Update Semgrep workflow for code quality analysis
- real per-vehicle equipment + honest transmission on detail page
- add getAllFeatures + honest getTransmission helpers
- add explicit profile links and universal agent standard
- Add toast notification for unhandled error in VehicleDetailPage
- Premium Vehicle Cards — Feature-Chips, Icon-Specs, WhatsApp CTA
- improve premium vehicle cards
- echte 204 Kundenbewertungen + Magazin-Hero
- EnVKV-Pflichtangaben, ODR-Link, Security-Header + Design-Polish
- style(ui): Premium Automotive Visual System — Surface-Tokens, Trust-Bar, Cards, Sektionsrhythmus
- AutoHub Excellence Plan v1.0 — WhatsApp CTA, Lightbox, Sticky CTA, Filter-UX, Maps, SEO, Error-Handling
- Add ESLint JavaScript linter workflow
- Add OSSAR code scanning workflow
- SOTA vehicle filter domain + Cloudflare migration
- DSGVO cookie consent banner + extended privacy policy
- SEO- und Branding-Korrekturen
- Korrektur der Bildgalerie-Begrenzung
- Fahrzeugbilder, Galerien & mobile Ansichten finalisieren
- Mobile Fahrzeugdetail- & Bestandsoptimierung
- Globale Struktur- & Inhaltskorrekturen
- Mobile Fahrzeugdetailseite optimieren
- Mobile Fahrzeugdetailansicht reparieren
- Website-Optimierung für Automobile Quick
- implement maximum supra-regional seo and new vehicle highlights [SEO-FINAL]
- implement world-class demo with portal sync and premium ux [DEMO-FINAL]
- Blog-Struktur & 3 SEO-Artikel
- Finanzierungs-Sektion & Rechner
- Sticky Header & FAB
- SEO & Schema.org Markup
- How it works Section
- WhatsApp Button & Contact Section
- Social-Proof-Sektion
- Fahrzeugbestand erstellen
- Create Hero Section
- Aktualisiere Website mit finalen Projektdaten
- Fehler auf der Webseite beheben

### ⚡ Performance (Bolt)
- resolve top 3 performance bottlenecks
- use Promise.all for concurrent reference updates
- throttle scroll event listeners with requestAnimationFrame
- Perf + A11y: framer-motion raus (-120kB), aria-label-Fixes, Hero-preconnect
- code-split Router routes, reduce initial bundle from 623kB
- ⚡ Bolt: Remove artificial network latency for static data
- ⚡ Bolt: Refactor frontend filtering to backend data source query in BlogDetailPage

### 🛡️ Security (Sentinel)
- chore(test): upgrade Vitest security baseline
- chore(security): upgrade Astro Cloudflare stack
- fix(prod): apply SSR security headers and repair scanners
- Add DevSkim security linter workflow
- Add Trivy workflow for Docker image & filesystem security scanning
- Fix CSRF vulnerability by enabling checkOrigin
- fix github actions vulnerabilities (permissions and script injection)
- fix: enable checkOrigin for csrf protection

### 🧪 Testing
- [testing improvement] Add tests for generateFullSitemap
- refactor(domain): extract vehicleFeatures utility + TDD tests
- [ContactSection error handling missing test]
- : add edge cases for useSize hook
- : add LoadingSpinner component tests
- : add unit tests for use-toast reducer
- : add tests for getStructuredDataBreadcrumb
- fix: resolve failing seo test and forbidden audit terms
- : add error handling coverage for ContactSection
- : add error test for HomePage vehicle loading
- [testing improvement] Add tests for generateSitemap
- : add tests for generateBusinessSchema in seo-config.ts
- Add tests for cn utility function
- add tests for updateMetaTags
- fix(integrity): align inventory with latest mobile.de status (18 items) [FINAL-SYNC]

### 🐛 Fixes
- escape HTML chars in JSON-LD to prevent XSS
- align canonical domain with official site
- harden autohub mobile conversion and canonicals
- trust workspace in headless environment
- LCP eager-loading + imageCount guard + Singular/Plural Foto(s)
- switch Cloudflare deploy path to Workers
- disable GitHub Pages Jekyll build
- resolve infinite loops and server timeouts blocking Vibe Editor
- 🎨 Palette: [UX improvement] Fix nested button accessibility in vehicle cards
- resolve uncommitted modifications and prepare for release
- resolve 13 typescript errors in router and seo-config
- resolve @wix/editor-elements-definitions 404 + premium design pass
- resolve PR merge conflicts for gallery preview blockers
- render full vehicle galleries and finalize preview blockers
- add explicit .tsx extension to AppRouter import in Astro page
- resolve phase6b homepage audit failures
- unblock Wix Vibe build and restore Automobile Quick phase A
- Resolve merge conflicts by keeping our fixed state
- resolve build errors and restore Phase A data
- add git patch series checks for sendemail-validate hook
- implement sendemail-validate checks
- Update sendemail-validate to enforce patch criteria
- 🔒 Fix use of window.location.href for redirection
- 🔒 Fix insecure email regex validation with zod
- Fixing blocking errors

### 🧹 Chores & Code Health
- switch autohub review masterprompt to gemini
- trigger review after secret update
- Add setup.sh and update README.md with installation instructions
- update dependencies to fix vulnerabilities
- review fix-vibe-build-and-phase-a-data branch
- inform user about github environment limitations
- 🧹 [code health] Remove redundant type reference in env.d.ts
- Information regarding PR merging
- use Vehicles interface instead of any type for getStructuredDataProduct
- replace 'any' with 'Vehicle' type
- extract side-effects from useToast reducer
- 🧹 [Code Health] Remove console.log from ContactSection.tsx
- remove any type in VehicleDetailPage.tsx


## [Unreleased] - 2026-05-15 to 2026-05-21

### 🚀 Features & Enhancements
- feat: notify on Jules PRs (`ec4d4e2`)
- feat: add local vehicle images and generated vehicle data (`c2300b2`)
- chore(merge): consolidate non-conflicting remote PR branches into single unified branch (`b5b8789`)
- fix: Make VehiclesPage robust with 17 static vehicles and no broken references (`78719a1`)
- fix(links-phones): update slugs, phone numbers and heading in Header, Footer and pages (`5b65308`)
- fix: resolve PR blockers regarding phone numbers and merge conflicts (`d2039a1`)
- Refactor: Extract duplicated AnimatedElement to shared UI component (`8de2e4b`)

### ⚡ Performance (Bolt)
- perf: Add eager loading to above-the-fold images (`6005230`)
- Bolt: Optimize LCP on Vehicles and VehicleDetailPage (`9c86853`)
- Bolt: [performance improvement] optimize filter array looping and mock API fix (`abd2ce7`)
- Bolt: Optimize LCP and offscreen image loading (`eafa938`)
- perf: add LCP hints and lazy loading to images (`2f2a50e`)
- perf(image): default to lazy loading for images (`b278f96`)
- perf: remove artificial timeout in VehiclesPage (`b5205fe`)
- Remove artificial API latency delay in VehiclePage (`5603e62`)
- Optimize redundant array filtering in VehiclesPage (`4e4dcd4`)
- perf: optimize similar vehicle filtering (`94466c7`)
- Bolt: Cache Intl.NumberFormat and extract formatPrice utility (`236881e`)
- Optimize intermediate array allocation in static star rating (`b307152`)

### 🛡️ Security (Sentinel)
- Sentinel: [CRITICAL] Fix Astro CSRF vulnerability (`07be6a7`)
- Sentinel: [CRITICAL/HIGH] Fix CSRF and reverse tabnabbing vulnerabilities (`bed06af`)
- Sentinel: [MEDIUM] Fix reverse tabnabbing vulnerability in window.open (`10e126d`)
- fix: add noopener noreferrer to window.open (`2263d84`)
- Fix potential Open Redirect in MemberProvider (`cc61cb9`)

### 🎨 Accessibility & UI (Palette)
- feat: Improve accessibility of mobile menu button (`7917f60`)
- Palette: Accessible and localized mobile menu button (`4894a9b`)
- Palette: Improve mobile menu accessibility and localization (`53ce1d7`)
- Palette: Improve mobile menu accessibility (`c7dd26a`)
- Palette: [a11y improvement for mobile menu] (`78d59a2`)

### 🧪 Testing
- test(VehiclesPage): properly test error path (`d44ae86`)
- Add error path test for static vehicles loading (`17c0455`)
- Add tests for useSize hook (`a9eba21`)
- Add tests for ScrollToTop component (`b8fde73`)
- Add error path test for VehicleDetailPage (`0a032d3`)
- Add error path test for HomePage (`a63d676`)
- Add tests for getStructuredDataProduct (`34ddba1`)
- Add tests for getStructuredDataOrganization in seo.ts (`6566f01`)
- Add tests for cn utility function (`9c36372`)
- Add testing improvement for HomePage loadVehicles error handling (`124f2a1`)
- Add error handling test for VehiclesPage loadVehicles (`008ee6a`)
- Add tests for updateMetaTags and vehicle data (`ede30f1`)
- Add tests for utils cn function (`fbe0a76`)
- test: add tests for utils cn function (`9abb604`)

### 🧹 Code Health
- Remove unused console.error in production code (`d4cce25`, `b6df4b3`, `6f1f4e0`)
- [code health] Use explicit Vehicle type instead of 'any' (`864ee40`)
- Use explicit Vehicle type instead of any in Array.prototype methods (`8e0e05b`)
- refactor: Use specific type for vehicle parameter in seo.ts (`221f7f5`)
- Code Health: Remove unused lucide-react imports in HomePage (`799a31b`)
