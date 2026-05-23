## 2024-05-15 - [Initial setup]
**Learning:** Checking the codebase to see how images are loaded. Noticed that the custom Image and WixImage components in src/components/ui/image.tsx default to loading="lazy" based on typical browser behavior if not specified, but the memo says we need explicit eager loading for above-the-fold images.
**Action:** Always check the memory directives. For above the fold hero images, we should explicitly pass loading="eager".
## 2024-05-15 - [LCP Optimization]
**Learning:** The custom `<Image>` component implicitly defaults to `loading="lazy"` via browser defaults unless overridden. This delays rendering for critical above-the-fold assets, negatively impacting LCP (Largest Contentful Paint).
**Action:** Always add `loading="eager"` and `fetchPriority="high"` to hero images and other above-the-fold images to optimize LCP.

### Performance Bottlenecks & Fixes

**Consecutive Filters:**
- **Pattern:** Using multiple `.filter()` statements on arrays (e.g. `arr.filter(a).filter(b)`).
- **Issue:** Results in N array traversals, degrading performance on large data sets.
- **Fix:** Consolidate conditions into a single `.filter()` loop, returning early where possible, and extract constants (like `.toLowerCase()` or `parseInt()`) outside the loop to avoid redundant computation.
