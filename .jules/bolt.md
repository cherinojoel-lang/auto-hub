## 2024-05-27 - Optimize LCP for Animated Elements
**Learning:** Using `IntersectionObserver` on above-the-fold elements creates an anti-pattern by delaying the initial render and negatively impacting Largest Contentful Paint (LCP).
**Action:** When wrapping above-the-fold elements with components relying on `IntersectionObserver` (like `AnimatedElement`), add a mechanism (e.g., a `priority` prop) to bypass the observer and immediately render the element to optimize performance.
