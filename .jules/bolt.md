## 2024-05-15 - [Initial setup]
**Learning:** Checking the codebase to see how images are loaded. Noticed that the custom Image and WixImage components in src/components/ui/image.tsx default to loading="lazy" based on typical browser behavior if not specified, but the memo says we need explicit eager loading for above-the-fold images.
**Action:** Always check the memory directives. For above the fold hero images, we should explicitly pass loading="eager".
## 2024-05-15 - [LCP Optimization]
**Learning:** The custom `<Image>` component implicitly defaults to `loading="lazy"` via browser defaults unless overridden. This delays rendering for critical above-the-fold assets, negatively impacting LCP (Largest Contentful Paint).
**Action:** Always add `loading="eager"` and `fetchPriority="high"` to hero images and other above-the-fold images to optimize LCP.
## 2024-05-15 - [Anti-pattern: JS Animations on Above-The-Fold Elements]
**Learning:** Wrapping above-the-fold content (like Hero sections or LCP images) with JS-based animation components (e.g., `AnimatedElement` using `IntersectionObserver`) creates a performance anti-pattern. The elements are rendered initially with `opacity: 0` and are only shown after JS executes and the observer fires. This significantly delays the Largest Contentful Paint (LCP) and First Contentful Paint (FCP).
**Action:** Never use JS-based fade-in/slide-in animations on critical above-the-fold content. Keep LCP elements (like hero images and main headlines) out of `IntersectionObserver` wrappers so they can be painted by the browser immediately.
