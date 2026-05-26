## 2024-05-15 - [Initial setup]
**Learning:** Checking the codebase to see how images are loaded. Noticed that the custom Image and WixImage components in src/components/ui/image.tsx default to loading="lazy" based on typical browser behavior if not specified, but the memo says we need explicit eager loading for above-the-fold images.
**Action:** Always check the memory directives. For above the fold hero images, we should explicitly pass loading="eager".
## 2024-05-15 - [LCP Optimization]
**Learning:** The custom `<Image>` component implicitly defaults to `loading="lazy"` via browser defaults unless overridden. This delays rendering for critical above-the-fold assets, negatively impacting LCP (Largest Contentful Paint).
**Action:** Always add `loading="eager"` and `fetchPriority="high"` to hero images and other above-the-fold images to optimize LCP.
## 2026-05-26 - [Database Level Filtering vs Client Side]
**Learning:** Overfetching data using `getAll` and relying on client-side array filtering (`.find()` or `.filter()`) was an anti-pattern creating a bottleneck, especially for single item lookups where fetching 50 items and picking one could fail entirely if the target wasn't in the first chunk.
**Action:** Implemented a `getByField` query using Wix's `items.query().eq()` method in `BaseCrudService` to handle filtering on the server. Always leverage server-side querying over client-side array manipulation for collections.
