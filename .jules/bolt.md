## 2024-05-15 - [Initial setup]
**Learning:** Checking the codebase to see how images are loaded. Noticed that the custom Image and WixImage components in src/components/ui/image.tsx default to loading="lazy" based on typical browser behavior if not specified, but the memo says we need explicit eager loading for above-the-fold images.
**Action:** Always check the memory directives. For above the fold hero images, we should explicitly pass loading="eager".
## 2024-05-15 - [LCP Optimization]
**Learning:** The custom `<Image>` component implicitly defaults to `loading="lazy"` via browser defaults unless overridden. This delays rendering for critical above-the-fold assets, negatively impacting LCP (Largest Contentful Paint).
**Action:** Always add `loading="eager"` and `fetchPriority="high"` to hero images and other above-the-fold images to optimize LCP.
## 2024-05-15 - [Scroll Event Throttling]
**Learning:** Scroll event listeners in React components without throttling can cause synchronous state updates, leading to main thread blocking and jank during scrolling. Adding `{ passive: true }` alone is not enough to fix React state thrashing.
**Action:** Use `window.requestAnimationFrame` combined with a tracking flag (e.g., `ticking`) to throttle scroll handlers. This syncs state updates with paint cycles and prevents excessive re-renders.
