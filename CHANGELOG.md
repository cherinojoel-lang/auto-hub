# Changelog

## [Unreleased] - 2026-05-22 to 2026-07-16

### 🚀 Features & Enhancements
- feat: AutoHub Excellence Plan v1.0 — WhatsApp CTA, Lightbox, Sticky CTA, Filter-UX, Maps, SEO, Error-Handling (`4904282`)
- feat: SOTA vehicle filter domain + Cloudflare migration (#178) (`96e3ffc`)
- feat(trust): add explicit profile links and universal agent standard (`57f824d`)
- feat(trust): echte 204 Kundenbewertungen + Magazin-Hero (#198) (`a11f6b1`)
- feat(vehicle): real per-vehicle equipment + honest transmission on detail page (`473689d`)
- feat(vehicle): add getAllFeatures + honest getTransmission helpers (`11d1c07`)
- feat(cards): Premium Vehicle Cards — Feature-Chips, Icon-Specs, WhatsApp CTA (#205) (`18198c0`)
- feat(compliance): DSGVO cookie consent banner + extended privacy policy (`f0dc68b`)
- style(ui): Premium Automotive Visual System — Surface-Tokens, Trust-Bar, Cards, Sektionsrhythmus (#196) (`0c6f60d`)

### ⚡ Performance (Bolt)
- perf: resolve top 3 performance bottlenecks (#302) (`97ba604`)
- perf: use Promise.all for concurrent reference updates (#171) (`bf3c97b`)
- perf: throttle scroll event listeners with requestAnimationFrame (#132) (`48867c9`)
- perf: code-split Router routes, reduce initial bundle from 623kB (`cef125b`)
- Bolt: Remove artificial network latency for static data (#114) (`3513951`)
- Bolt: Refactor frontend filtering to backend data source query in BlogDetailPage (`2b3e2df`)

### 🛡️ Security (Sentinel)
- Sentinel: [HIGH] Fix CSRF vulnerability by enabling checkOrigin (#85) (`2626ac7`)
- fix: escape HTML chars in JSON-LD to prevent XSS (#388) (`9e09f0a`)
- security: fix github actions vulnerabilities (permissions and script injection) (`a2406e9`)
- chore(security): upgrade Astro Cloudflare stack (#201) (`de9b229`)
- fix(prod): apply SSR security headers and repair scanners (#199) (`f7df9a9`)

### 🎨 Accessibility & UI (Palette)
- Palette: [UX improvement] Fix nested button accessibility in vehicle cards (#133) (`d74f90c`)
- Perf + A11y: framer-motion raus (-120kB), aria-label-Fixes, Hero-preconnect (#135) (`f81c4ed`)

### 🧪 Testing
- Add tests for generateFullSitemap (#189) (`3d0ff18`)
- test: add edge cases for useSize hook (#167) (`54db588`)
- test: add LoadingSpinner component tests (#164) (`53a786d`)
- test: add unit tests for use-toast reducer (#163) (`92d6782`)
- test: add tests for getStructuredDataBreadcrumb (#162) (`44e800b`)

### 🧹 Code Health & CI
- Update Semgrep workflow for code quality analysis (#148) (`4c8f6d1`)
- Add ESLint JavaScript linter workflow (#152) (`79ec425`)
- Add DevSkim security linter workflow (#151) (`4371361`)
- Add Trivy workflow for Docker image & filesystem security scanning (#149) (`2978b8f`)
- Add OSSAR code scanning workflow (#150) (`5c376f7`)
- docs: switch autohub review masterprompt to gemini (#243) (`1b2e391`)
- docs: Add setup.sh and update README.md with installation instructions (#136) (`c737465`)

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
