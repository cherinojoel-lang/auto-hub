# Design Refinement Notes — Premium Visual System Pass

> Current contact, opening-hour, review, and schema facts supersede this historical note. Use `docs/ai/PROJECT_STATUS.md` and `docs/ai/SOURCES.md` for the 2026-06-07 truth.

**Branch:** feat/premium-design-refinement  
**Date:** 2026-06-01  
**Phase:** 3–8 (Token Pass, Homepage, Cards, VDP, Footer, Wix cleanup)

---

## Changed Files

### `src/tailwind.config.mjs`
- **Added** three new surface tokens to `colors`:
  - `surface: '#F8F7F4'` (warm off-white base)
  - `surface-elevated: '#FFFFFF'` (card/box white)
  - `surface-muted: '#F0EDE8'` (warm section background)

### `src/components/MobileFloatingActionBar.tsx`
- **Removed** inline `backgroundColor: '#FFFFFF'` → Tailwind class `bg-white`
- **Removed** inline `borderTop: '1px solid #D8DEE8'` → Tailwind classes `border-t border-border-line`

### `src/components/pages/HomePage.tsx`
- **Trust-Bar:** `bg-white border-b border-gray-200` → `bg-primary text-white border-b border-white/10`
- **Trust-Bar text:** `text-primary` / `text-gray-600` → `text-white` / `text-white/70`
- **Trust-Bar stat:** `42` (number + "Jahre" label) → `Seit 1982` (merged into prominent stat)
- **Featured Vehicles section:** `bg-white` → `bg-surface`
- **Vehicle card links:** `bg-white rounded-md border hover:border-secondary/70` → `bg-surface-elevated shadow-sm rounded-lg hover:shadow-md`
- **Vehicle card price:** `text-primary` → `text-secondary`
- **About section:** `bg-gray-50` → `bg-surface-muted`
- **Trade-In Teaser section:** `bg-white` → `bg-surface`
- **Financing Teaser section:** `bg-gray-50` → `bg-surface`

### `src/components/HowItWorksSection.tsx`
- **Section background:** `bg-neutral-100` → `bg-surface-muted`

### `src/components/VehicleInventorySection.tsx`
- **Section background:** `bg-background` → `bg-surface`
- **Card link:** `bg-white rounded-md border border-border-line hover:border-secondary/70` → `bg-surface-elevated shadow-sm rounded-lg hover:shadow-md border border-border-line`

### `src/components/pages/VehicleDetailPage.tsx`
- **Desktop price box:** `bg-card-bg rounded-lg border border-border-line` → `bg-surface-elevated shadow-md rounded-xl border border-border-line`

### `src/components/Footer.tsx`
- **Saturday hours:** `Sa: 09:00 - 13:00 Uhr` → `Sa: 10:00 - 16:00 Uhr`

### `src/components/pages/ContactPage.tsx`
- **Saturday hours:** `Sa: 10:00 - 14:00 Uhr` → `Sa: 10:00 - 16:00 Uhr`

### `astro.config.mjs`
- **Removed** `@wix/data` from `rollupOptions.external` (was `['@wix/data']` → `[]`)
- **Removed** `@wix/data` from `ssr.external` (was `['@wix/data']` → `[]`)
- Confirmed: no source file imports `@wix/data`

---

## Test Results

| Check | Result |
|-------|--------|
| `npm run check` | 0 errors, 0 warnings, 10 hints (pre-existing) |
| `npm run test:run` | 20 test files, 110 tests — all passed |
| `npm run build` | Build complete, no errors |

---

## Design Improvements Summary

| Area | Before | After |
|------|--------|-------|
| Trust-Bar | White on light background | Dark navy premium bar, white text |
| Experience stat | "42 Jahre Erfahrung" | "Seit 1982 Jahre Erfahrung" |
| Section rhythm | Alternating plain white/gray-50 | Warm surface tokens create depth |
| Vehicle cards | Flat white with border hover | Shadow-sm with hover:shadow-md |
| Price hierarchy (cards) | `text-primary` | `text-secondary` (brand orange) |
| VDP price box | Flat card-bg | Elevated white + shadow-md + xl radius |
| Footer Saturday | 09:00–13:00 | 10:00–16:00 |
| ContactPage Saturday | 10:00–14:00 | 10:00–16:00 |
| Wix relics | `@wix/data` in externals | Removed (confirmed unused) |
