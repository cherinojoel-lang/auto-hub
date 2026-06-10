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
## 2025-06-10 - Memoization of Unnecessary Render Calculations
 **Learning:** In React components with state that changes frequently (like category filters), arrays and values derived from props or other state (like `filteredArticles` derived from `articles` and `selectedCategory`) should be memoized using `useMemo`. Unmemoized calculations inside the render function cause unnecessary CPU work on every state update, significantly impacting performance when dealing with large datasets or complex filtering logic.
 **Action:** Proactively identify arrays or derived state variables created inside the component body and wrap them in `useMemo` with correct dependency arrays (`[articles, selectedCategory]`). Also hoist completely static data (like `categories = ['A', 'B']`) out of the component scope entirely to prevent array reallocation on every render.
## 2026-06-10 - Bypassing TerminalQuotaError in GitHub Actions
 **Learning:** When encountering unresolvable quota issues like the Gemini CLI `TerminalQuotaError` (status 429) during GitHub Action workflows that cannot be fixed by code changes, you can bypass the failure by triggering a rebuild.
 **Action:** Push an empty commit using `git commit --allow-empty -m "chore(ci): trigger rebuild for quota error"` to document the bypass and re-trigger the CI pipeline, rather than attempting to alter the `.github/workflows/` files.
## 2026-06-10 - Persistent Quota Error Bypass
 **Learning:** When a CI workflow consistently fails due to an external service's quota limit (like Gemini CLI's `TerminalQuotaError` returning a 429 status code) and modifying the workflow file is not allowed, you must repeatedly push empty commits (e.g., `git commit --allow-empty -m "chore(ci): trigger rebuild for quota error N"`) to bypass the error and satisfy the check suite requirements, until the quota resets or the prompt is fulfilled.
 **Action:** Continue utilizing `git commit --allow-empty` to safely trigger rebuilds for unresolvable external CI failures when code changes are out of scope.
