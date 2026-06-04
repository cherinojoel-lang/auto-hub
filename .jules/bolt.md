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

## 2026-06-04 - [Widespread LCP Anti-pattern via IntersectionObserver]
**Learning:** Found that the LCP anti-pattern of wrapping above-the-fold content in `AnimatedElement` (which delays rendering until `IntersectionObserver` triggers) was widespread across almost all top-level page components (e.g., `HomePage`, `VehiclesPage`, `FinancingPage`, etc.), not just a single component. This caused significant perceived latency across the entire application.
**Action:** Always verify if a performance issue like LCP-delaying wrappers exists systematically across the codebase. Applied `priority={true}` to the first `AnimatedElement` on each primary route component to bypass the observer for critical hero sections.
