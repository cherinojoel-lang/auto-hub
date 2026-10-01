## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.

## 2026-09-24 - [CSP Blocking Turnstile CAPTCHA]
**Vulnerability:** The Content Security Policy (CSP) lacked directives to allow Cloudflare Turnstile, blocking CAPTCHA scripts and iframes.
**Learning:** Security mechanisms like Turnstile rely on external domains (`https://challenges.cloudflare.com`). An overly restrictive CSP can unintentionally break these security controls, leading to broken form submissions and failure of spam protection.
**Prevention:** When adding or updating external security scripts (like CAPTCHAs), always ensure the corresponding domains are explicitly whitelisted in the CSP's `script-src` and `frame-src` directives.
