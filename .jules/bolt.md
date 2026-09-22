## 2024-05-15 - [Initial setup]
**Learning:** Checking the codebase to see how images are loaded. Noticed that the custom Image and WixImage components in src/components/ui/image.tsx default to loading="lazy" based on typical browser behavior if not specified, but the memo says we need explicit eager loading for above-the-fold images.
**Action:** Always check the memory directives. For above the fold hero images, we should explicitly pass loading="eager".

## 2024-05-15 - [LCP Optimization]
**Learning:** The custom `<Image>` component implicitly defaults to `loading="lazy"` via browser defaults unless overridden. This delays rendering for critical above-the-fold assets, negatively impacting LCP (Largest Contentful Paint).
**Action:** Always add `loading="eager"` and `fetchPriority="high"` to hero images and other above-the-fold images to optimize LCP.

## 2026-05-27 - [Remove Artificial Latency]
**Learning:** Components sometimes use `await new Promise(resolve => setTimeout(resolve, 300))` to simulate API loading times. While intended for UX, this blocks LCP and significantly impacts perceived performance when loading static local data.
**Action:** Always verify that 'simulated latency' or artificial delays are completely removed when switching to local static data to ensure immediate rendering.

## 2024-05-15 - [IntersectionObserver Memory Leaks]
**Learning:** We are frequently setting staggered timeouts inside `IntersectionObserver` callbacks to animate elements as they enter the viewport (e.g., `setTimeout(() => setIsVisible(true), delay)`). If the component unmounts before these timers fire, the timer keeps running in the background, consuming memory, and then attempts to update state on an unmounted component, which although handled in modern React, is inefficient.
**Action:** Always store the timeout ID returned by `setTimeout` inside an `IntersectionObserver` callback (or any callback within `useEffect`) and clear it inside the `useEffect` cleanup function using `clearTimeout(timeoutId)` to prevent dangling timers and memory leaks.

## 2024-05-15 - [Bypassing IntersectionObserver for LCP]
**Learning:** The `AnimatedElement` component utilizes an `IntersectionObserver` to trigger fade-in animations. Wrapping above-the-fold content within it creates an anti-pattern delaying initial render, directly impacting LCP metrics.
**Action:** Always modify localized wrapper definitions to accept a `priority` prop. Set this prop to `true` for hero content, enabling an early return that completely bypasses the observer and initializes the component as visible immediately.

## 2024-05-15 - [deriveFeatures Performance Optimization]
**Learning:** The `deriveFeatures` utility function in `vehicleFeatures.ts` was executing expensive regular expressions (`pattern.test`) on string allocations repeatedly across every single vehicle card render loop without caching, drastically increasing block time.
**Action:** Wrap purely derived, stable object derivations with a `WeakMap`. Using `WeakMap<Vehicle, string[]>` successfully achieved a massive caching speedup with an O(1) lookup returning the features list without any associated garbage collection memory leak.

## 2024-05-15 - [Vehicle Card Rerenders / Hook Dependency Isolation]
**Learning:** Several higher-level wrapper hooks or unmemoized static `slice()` operations over derived collections like `topVehicles` trigger heavy waterfall updates of their child components in pure layout pages.
**Action:** Always safely isolate layout iterations utilizing `.filter().slice()` over static global collections by wrapping them in `React.useMemo(() => ..., [])` with stable dependencies to prevent unnecessary VDOM comparison cycles.
## 2024-10-27 - [Optimize .filter(...).slice(0, N) pattern]
**Learning:** O(N) array iterations with `.filter(...).slice(0, N)` traverse the entire array and allocate a new array for all matched elements before slicing, which is highly inefficient for large datasets when only a small number of elements (N) is needed.
**Action:** Replace `.filter(...).slice(0, N)` patterns with a single-pass `for...of` loop that breaks early once `N` elements are collected. This avoids unnecessary full array traversal and excessive memory allocation.
