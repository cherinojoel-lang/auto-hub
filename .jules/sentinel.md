## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.

## 2024-08-01 - ['unsafe-eval' in Content Security Policy]
**Vulnerability:** The Content Security Policy in `src/middleware.ts` had `'unsafe-eval'` in its `script-src` directive.
**Learning:** `unsafe-eval` allows arbitrary execution of Javascript via `eval()`, `setTimeout()`, and `setInterval()`. This enables attackers to easily execute code if an XSS vulnerability exists, completely bypassing the CSP. Modern frameworks like React and Astro very rarely require this.
**Prevention:** Always maintain a strict Content Security Policy, and never include `unsafe-eval` or `unsafe-inline` unless it is absolutely necessary and documented.
