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

## 2024-06-13 - [Optimize Array Filtering]
**Learning:** Chaining multiple `.filter()` calls on an array (e.g., `array.filter(a).filter(b).filter(c)`) results in multiple passes over the array and the allocation of an intermediate array for each filter operation. This increases memory usage and garbage collection overhead, especially on large datasets.
**Action:** Always combine multiple chained filter predicates into a single `.filter()` call using logical AND (`&&`) operators. This ensures a single pass over the array, avoids intermediate allocations, and leverages short-circuit evaluation.

## 2024-06-13 - [Gemini CLI Quota Error]
**Learning:** During the automated code review process (`gemini /code-review`), a `TerminalQuotaError` might occur with an HTTP 429 status code indicating that the daily quota on the Gemini model has been exhausted. This is a transient, third-party API limit, not an issue with the application code itself.
**Action:** When a CI failure is explicitly confirmed to be a `TerminalQuotaError` from the Gemini API and out-of-scope for codebase modification, resolve it by pushing an empty commit with a descriptive message like `chore: bypass CI failure` to re-trigger the workflow and allow the PR to proceed.
