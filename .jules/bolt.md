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

## 2024-11-20 - [Redundant array method calls]
**Learning:** Found multiple places applying array operators `.filter` or `.slice` to a constant derived array during component renders without memoization, such as `featuredReviews.slice(0, 6)`.
**Action:** Extract the static, unchanging derivation into a `React.useMemo` to skip array allocation and operation during re-renders.

## 2024-11-20 - [Avoid redundant computation and regex in property check]
**Learning:** `getTransmission(vehicle)` was concatenating a large string (`title` + `description`), fetching an object from an array (`FEATURE_PATTERNS.find`), and executing a Regex (`pattern.test`), entirely repeating work already computed and O(1) cached inside `deriveFeatures()`.
**Action:** Replace duplicated processing by calling the memoized derivation (`deriveFeatures`) and using `.includes('Automatik')`, skipping duplicate allocations and regex processing entirely.
