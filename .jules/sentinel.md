## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2026-06-27 - Escaping HTML in JSON-LD injection
**Vulnerability:** XSS vulnerability through unescaped JSON.stringify output injected directly via Astro's set:html into script tags.
**Learning:** Injecting stringified JSON directly into Astro's set:html poses an XSS risk. To prevent script block termination, < and > characters must be escaped.
**Prevention:** Always escape < and > (e.g., to \u003c and \u003e) before passing JSON to set:html.
