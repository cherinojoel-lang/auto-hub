## 2024-05-15 - [Initial setup]
**Learning:** Checking the codebase to see how images are loaded. Noticed that the custom Image and WixImage components in src/components/ui/image.tsx default to loading="lazy" based on typical browser behavior if not specified, but the memo says we need explicit eager loading for above-the-fold images.
**Action:** Always check the memory directives. For above the fold hero images, we should explicitly pass loading="eager".
## 2024-05-15 - [LCP Optimization]
**Learning:** The custom `<Image>` component implicitly defaults to `loading="lazy"` via browser defaults unless overridden. This delays rendering for critical above-the-fold assets, negatively impacting LCP (Largest Contentful Paint).
**Action:** Always add `loading="eager"` and `fetchPriority="high"` to hero images and other above-the-fold images to optimize LCP.
## 2024-05-24 - [LCP Animation Anti-pattern]
**Learning:** The `AnimatedElement` component uses an `IntersectionObserver` to trigger fade-in animations. Wrapping above-the-fold content (such as Largest Contentful Paint images) within it creates an anti-pattern that delays initial rendering and negatively impacts performance.
**Action:** Do not wrap above-the-fold content like main hero images or primary product images in `AnimatedElement` or similar lazy-evaluated animation wrappers. Ensure these critical assets render immediately.
