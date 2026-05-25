## 2024-05-15 - [Initial setup]
**Learning:** Checking the codebase to see how images are loaded. Noticed that the custom Image and WixImage components in src/components/ui/image.tsx default to loading="lazy" based on typical browser behavior if not specified, but the memo says we need explicit eager loading for above-the-fold images.
**Action:** Always check the memory directives. For above the fold hero images, we should explicitly pass loading="eager".
## 2024-05-15 - [LCP Optimization]
**Learning:** The custom `<Image>` component implicitly defaults to `loading="lazy"` via browser defaults unless overridden. This delays rendering for critical above-the-fold assets, negatively impacting LCP (Largest Contentful Paint).
**Action:** Always add `loading="eager"` and `fetchPriority="high"` to hero images and other above-the-fold images to optimize LCP.
## 2026-05-25 - [AnimatedElement Above-the-fold Render Blocking]
**Learning:** The `AnimatedElement` component utilizes an `IntersectionObserver` to trigger fade-in animations. Wrapping above-the-fold content within it creates an anti-pattern that delays initial render while waiting for JS and hydration.
**Action:** Add and use a `priority={true}` prop on `AnimatedElement` instances for hero sections/LCP content to bypass the observer and render immediately.
