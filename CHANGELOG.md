# Changelog

## [Unreleased] - 2026-05-28 to 2026-06-04

### 🚀 Features & Enhancements
- feat: final best practice hardening & trust sourcing
- chore(main): release 1.0.0
- fix(ux): replace silent error in vehicle loading with visible error state
- fix: safely parse BASE_NAME for react router basename

### ⚡ Performance (Bolt)
- Bolt: optimize multi-reference operations with concurrent `Promise.all`
- Bolt: LCP Optimization for AnimatedElement by bypassing IntersectionObserver for above-the-fold content
- perf: fix memory leaks by clearing setTimeout references in IntersectionObserver callbacks

### 🛡️ Security (Sentinel)
- Sentinel: add `maxLength` to form inputs to prevent DoS risks and large payloads

### 🎨 Accessibility & UI (Palette)
- Palette: Improve mobile menu accessibility, add keyboard support, and ARIA controls
- Palette: Link form labels to inputs for a11y
- Palette: Enhance accessibility and focus states for toggle buttons
- fix: accessibility issues in the financing calculator form

### 🧪 Testing
- test: add comprehensive tests for `cn` utility function
- test: add tests for `generateBreadcrumbSchema`

### 🧹 Code Health & CI
- refactor: extract `AnimatedElement` to reduce code duplication and bundle size
- ci: resolve various GitHub Actions suite failures (Trivy version, ESLint config, Gemini CLI trust)
- ci: enhance security scanning workflows (Semgrep, njsscan, Bandit, CodeQL)
- fix: use jiti@2 for typescript config loading and reinstall for eslint v9 support
- docs: update PROJECT_STATUS.md to reflect successful API publish

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
