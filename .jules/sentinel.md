## 2024-05-20 - Enforced Astro Origin Checking (CSRF Protection)
**Vulnerability:** Disabled Origin Checking (CSRF Protection)
**Learning:** The `astro.config.mjs` file explicitly set `security: { checkOrigin: false }`. This disables Astro's built-in Cross-Site Request Forgery (CSRF) protection, which normally blocks requests where the `Origin` or `Referer` headers don't match the application's domain.
**Prevention:** Never disable `checkOrigin` in `astro.config.mjs`. If local development requires it, it should be conditionally disabled based on the environment (`process.env.NODE_ENV !== "production"`), but ideally kept enabled everywhere to catch CSRF issues early.
