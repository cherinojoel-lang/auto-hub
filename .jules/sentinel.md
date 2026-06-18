## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2024-06-18 - [Fix XSS risk in JSON-LD injection]
**Vulnerability:** XSS risk due to direct injection of stringified JSON into HTML `<script>` tags using Astro's `set:html`.
**Learning:** Even well-formed JSON can act as an XSS vector if it contains strings like `</script><script>alert('XSS')</script>`, which prematurely close the parent `<script>` tag when rendered verbatim into HTML using `set:html` or `dangerouslySetInnerHTML`.
**Prevention:** Always escape `<` to `\u003c` and `>` to `\u003e` before inserting JSON strings into an HTML document context.
