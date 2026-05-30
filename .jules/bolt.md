## 2024-05-15 - [Initial setup]
**Learning:** Checking the codebase to see how images are loaded. Noticed that the custom Image and WixImage components in src/components/ui/image.tsx default to loading="lazy" based on typical browser behavior if not specified, but the memo says we need explicit eager loading for above-the-fold images.
**Action:** Always check the memory directives. For above the fold hero images, we should explicitly pass loading="eager".
## 2024-05-15 - [LCP Optimization]
**Learning:** The custom `<Image>` component implicitly defaults to `loading="lazy"` via browser defaults unless overridden. This delays rendering for critical above-the-fold assets, negatively impacting LCP (Largest Contentful Paint).
**Action:** Always add `loading="eager"` and `fetchPriority="high"` to hero images and other above-the-fold images to optimize LCP.

## 2026-05-27 - [Remove Artificial Latency]
**Learning:** Components sometimes use `await new Promise(resolve => setTimeout(resolve, 300))` to simulate API loading times. While intended for UX, this blocks LCP and significantly impacts perceived performance when loading static local data.
**Action:** Always verify that 'simulated latency' or artificial delays are completely removed when switching to local static data to ensure immediate rendering.
## 2024-05-30 - [React Router Domain Parsing Fix]
**Learning:** When using environment variables like `BASE_NAME` for React Router's `basename`, it's critical to parse the value defensively. A user switching premium domain configurations might inject a full URL (`https://domain.com`) or bare domain string into the `BASE_NAME` variable. React Router strictly requires relative paths starting with `/`.
**Action:** Implemented a `getBasename` parser in `Router.tsx` that ensures any full URLs or bare domain strings injected into `BASE_NAME` are safely stripped down to a relative path (e.g., `/`) to prevent client-side routing from completely breaking.
