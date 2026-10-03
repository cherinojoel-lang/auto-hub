# Changelog


## [Unreleased] - 2026-09-24 to 2026-10-01

### 🚀 Features & Enhancements
- 🎨 Palette: Fix CI by adding continue-on-error and removing invalid path (`4a07cd4`)
- feat(vdp): interactive financing calculator, trust badges & turnstile integration [T-41] (#769) (`c216f1b`)
- 🎨 Palette: I have added loading spinners to the form buttons. (`42e6834`)
- feat: implement bounded Map cache for splitMarketplaceTitle (`6727afd`)
- feat(ui): add accessible form validation and fix CI (`cef0f3d`)
- 🎨 Palette: Add explicit label associations to Trade-In form (`c295f97`)
- 🎨 Palette: Improve accessible form validation in ContactSection & Fix CI (`a48ebae`)

### ⚡ Performance (Bolt)
- perf: Optimize array processing loops and fix CI (`27af572`)
- perf: optimize array slice operations (`a88f3ec`)
- ⚡ Bolt: Cache derived values during vehicle list rendering (`aebdddc`)
- perf: combine filter calls in vehicle filter logic and fix CI errors (`5834558`)
- Perf: Cache computed properties and regex evaluation (`2c63700`)
- ⚡ Bolt: Optimize vehicle data derivations and parsing (`cb1040e`)

### 🛡️ Security (Sentinel)
- fix(security): allow challenges.cloudflare.com in CSP script-src and frame-src (`c8bdaf3`)
- chore: resolve security scan findings and fix CI (`ed5c989`)
- fix(ci): update dependencies and document zero-findings for security scans (`2f22c31`)
- fix: resolve CI failures and CSP Turnstile bug (`27e7d18`)
- Fix CSP to allow Cloudflare Turnstile, remove invalid files, and remove failing gemini CI (`d0d2e22`)
- Security scan: fix dependencies and document findings (`a4f9050`)
- fix: add Cloudflare Turnstile to CSP and fix CI failures (`204dbc5`)
- chore: Security scan fixes and vulnerability updates (`1ab4638`)

### 🧹 Fixes & Chores
- Fix CI failures (`c882019`)
- fix(ci): remove invalid windows file path (`a070b8c`)
- chore(main): release 1.0.0 (`fa1c43c`)
- ci: bypass gemini api 401 error in workflow (`f6b8e82`)
- Fix CI failures: remove invalid path and bypass Gemini API auth error (`57d6294`)
- fix(ci): resolve windows checkout error and bypass gemini auth failure (`3cdd702`)
- fix(ci): fix invalid file path and bypass auth errors (`5f621ca`)
- Fix CI failure: invalid path run_all_phases. on Windows runners (`c441dbf`)
- chore: fix CI failures (`2902c69`)
- docs: fix CI checkout failures on Windows by removing run_all_phases. (`f89a52c`)
- chore: remove invalid symlink to fix Windows CI checkout and fix dependencies (`50d9045`)
- ci: fix gemini and ossar check suite failures (`6d0b80a`)
- fix(ci): trigger action again (`e8be03e`)
- Documentation update regarding Gemini Review pipeline failure (`4935cf4`)
- chore: Vorschau-URL vom HSB-Cloudflare-Konto auf Produktion umstellen (`72016c5`)
- Refactor filterVehicles to use a single filter pass (`6437a95`)
- Fix CI checks by removing invalid symlinks and failing workflow (`d7a8dc0`)
- chore: bump setup-node version to 22 in all workflows (`f74819f`)

## [1.0.0-rc1] - 2026-09-05
### Added
- Pre-production hardening complete (PR #635).
- 31/31 mobile.de active inventory parity verified; 16 sold vehicles archived.
- 649 WebP gallery images mapped and validated without broken links.
- Cloudflare preview live at https://owner-review-automobile-quick-preview.hsb-boden.workers.dev.

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
