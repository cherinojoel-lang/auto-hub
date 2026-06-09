## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2026-06-09 - [XSS vulnerability in structured data injection]
**Vulnerability:** A Cross-Site Scripting (XSS) vulnerability was found when injecting dynamic structured data objects into `<script type="application/ld+json">` tags. The `JSON.stringify()` method doesn't escape HTML tags.
**Learning:** Malicious payloads with `</script><script>alert(1)</script>` inside object properties can prematurely break out of the script block in HTML.
**Prevention:** Always escape `<` and `>` as `\u003c` and `\u003e` when stringifying JSON payloads to be embedded directly into HTML.
