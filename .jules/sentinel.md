## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.

## 2026-09-23 - [Missing Turnstile in CSP]
**Vulnerability:** The `Content-Security-Policy` header in `src/middleware.ts` lacked `https://challenges.cloudflare.com` for `script-src` and `frame-src`.
**Learning:** Cloudflare Turnstile requires its script to be loaded, and often utilizes iframes to execute the captcha. Strict CSP headers missing these exceptions will block execution. Since contact forms enforce Turnstile validation, a blocked Turnstile makes forms permanently fail.
**Prevention:** Always verify CSP configuration includes third-party script and iframe domains used for anti-spam/security services when reviewing security headers.
