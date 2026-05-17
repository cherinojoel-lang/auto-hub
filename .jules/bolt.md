## 2026-05-17 - Format Price Refactoring
**Learning:** The formatPrice function (using Intl.NumberFormat) is duplicated across HomePage.tsx, VehiclesPage.tsx, and VehicleDetailPage.tsx. It is recreated on every render cycle which causes overhead and affects performance.
**Action:** Refactor formatPrice into src/lib/utils.ts, memoize the formatter, and reuse it.
