## 2024-05-15 - [Initial setup]
**Learning:** Checking the codebase to see how images are loaded. Noticed that the custom Image and WixImage components in src/components/ui/image.tsx default to loading="lazy" based on typical browser behavior if not specified, but the memo says we need explicit eager loading for above-the-fold images.
**Action:** Always check the memory directives. For above the fold hero images, we should explicitly pass loading="eager".
## 2024-05-15 - [LCP Optimization]
**Learning:** The custom `<Image>` component implicitly defaults to `loading="lazy"` via browser defaults unless overridden. This delays rendering for critical above-the-fold assets, negatively impacting LCP (Largest Contentful Paint).
**Action:** Always add `loading="eager"` and `fetchPriority="high"` to hero images and other above-the-fold images to optimize LCP.
## 2026-05-26 - [Scroll Performance Optimization]
**Learning:** Found multiple instances of `window.addEventListener('scroll', ...)` in components like StickyHeader, MobileFloatingActionBar, and VehicleDetailPage that directly triggered React state updates without throttling. This can lead to jank and dropped frames during scrolling as the browser struggles to keep up with the volume of events.
**Action:** Always throttle scroll handlers using `window.requestAnimationFrame` and a `ticking` flag to ensure state updates only occur once per animation frame. Also, pass `{ passive: true }` to the event listener to avoid blocking the compositor thread.
