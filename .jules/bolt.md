## 2024-05-15 - [Initial setup]
**Learning:** Checking the codebase to see how images are loaded. Noticed that the custom Image and WixImage components in src/components/ui/image.tsx default to loading="lazy" based on typical browser behavior if not specified, but the memo says we need explicit eager loading for above-the-fold images.
**Action:** Always check the memory directives. For above the fold hero images, we should explicitly pass loading="eager".
## 2024-05-15 - [LCP Optimization]
**Learning:** The custom `<Image>` component implicitly defaults to `loading="lazy"` via browser defaults unless overridden. This delays rendering for critical above-the-fold assets, negatively impacting LCP (Largest Contentful Paint).
**Action:** Always add `loading="eager"` and `fetchPriority="high"` to hero images and other above-the-fold images to optimize LCP.

## 2026-05-21 - [LCP Optimization on List and Detail Views]
**Learning:** The custom `<Image>` component implicitly defaults to `loading="lazy"` which negatively impacts Largest Contentful Paint (LCP) when used for above-the-fold content, such as main images on detail pages or the first few items in a product list.
**Action:** Always verify if an `<Image>` is rendered above the fold (e.g., hero images, main detail image, first items in a grid/list) and explicitly pass `loading="eager"` and `fetchPriority="high"` to bypass the lazy loading default and optimize LCP.
