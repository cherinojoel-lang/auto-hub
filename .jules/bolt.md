## 2024-05-28 - IntersectionObserver on Above-the-Fold Content Delays LCP
**Learning:** The `AnimatedElement` component utilizes an `IntersectionObserver` to trigger fade-in animations. Wrapping above-the-fold content within it creates an anti-pattern delaying initial render and degrading LCP.
**Action:** To optimize LCP without breaking existing layout or animation functionality, use the `priority={true}` prop to bypass the observer instead of removing the wrapper entirely.
