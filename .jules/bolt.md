## 2024-05-15 - [Initial setup]
**Learning:** Checking the codebase to see how images are loaded. Noticed that the custom Image and WixImage components in src/components/ui/image.tsx default to loading="lazy" based on typical browser behavior if not specified, but the memo says we need explicit eager loading for above-the-fold images.
**Action:** Always check the memory directives. For above the fold hero images, we should explicitly pass loading="eager".
## 2024-05-15 - [LCP Optimization]
**Learning:** The custom `<Image>` component implicitly defaults to `loading="lazy"` via browser defaults unless overridden. This delays rendering for critical above-the-fold assets, negatively impacting LCP (Largest Contentful Paint).
**Action:** Always add `loading="eager"` and `fetchPriority="high"` to hero images and other above-the-fold images to optimize LCP.
## 2024-05-15 - [LCP Optimization on Vehicle Detail and Listing]
**Learning:** For pages with many images like VehiclesPage, it's effective to selectively apply `loading="eager"` and `fetchPriority="high"` only to the first few above-the-fold images (e.g. index <= 2) and `loading="lazy"` to the rest.
**Action:** Identify dynamic lists and conditionalize the loading properties to balance above-the-fold eager loading with below-the-fold lazy loading.
