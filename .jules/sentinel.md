## 2024-11-23 - Astro CSRF Protection Missing
**Vulnerability:** In Astro frameworks, server-rendered endpoints require built-in CSRF protection, which was explicitly disabled in `astro.config.mjs` via `security: { checkOrigin: false }`. This configuration bypasses necessary cross-origin origin-checks, exposing server endpoints to Cross-Site Request Forgery attacks.
**Learning:** This is a framework-specific misconfiguration. `checkOrigin` can be disabled for easier local development or cross-origin testing but must be `true` for security, especially for production or endpoints accepting state-changing requests.
**Prevention:** `security.checkOrigin` must always be `true` in Astro configurations, and we should verify Astro project configurations to never override this default to `false`.
