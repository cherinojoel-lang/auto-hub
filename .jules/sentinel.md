## 2024-05-24 - [Critical Astro CSRF Configuration]
**Vulnerability:** Astro's built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`, making server-rendered endpoints vulnerable to Cross-Site Request Forgery (CSRF).
**Learning:** The `security.checkOrigin` flag controls CSRF protection in Astro. Disabling it leaves the application exposed to CSRF attacks on endpoints that process mutations.
**Prevention:** Ensure `security.checkOrigin` remains set to `true` in `astro.config.mjs` to maintain robust CSRF protection across all server-rendered routes.