## 2024-05-15 - [Initial setup]
**Learning:** Checking the codebase to see how images are loaded. Noticed that the custom Image and WixImage components in src/components/ui/image.tsx default to loading="lazy" based on typical browser behavior if not specified, but the memo says we need explicit eager loading for above-the-fold images.
**Action:** Always check the memory directives. For above the fold hero images, we should explicitly pass loading="eager".
## 2024-05-15 - [LCP Optimization]
**Learning:** The custom `<Image>` component implicitly defaults to `loading="lazy"` via browser defaults unless overridden. This delays rendering for critical above-the-fold assets, negatively impacting LCP (Largest Contentful Paint).
**Action:** Always add `loading="eager"` and `fetchPriority="high"` to hero images and other above-the-fold images to optimize LCP.
## 2024-05-23 - [Artificial Latency Removal]
**Learning:** Found artificial `setTimeout` delays used in component `loadVehicle` functions (e.g., `HomePage.tsx`, `VehiclesPage.tsx`) intended to simulate API latency for smooth UX. This unnecessarily blocks the UI from rendering immediate local data.
**Action:** Removed the artificial 300ms delays to allow instant component rendering and strictly improve load times.
