## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-06-10 - [XSS vulnerability in Astro set:html JSON-LD injection]
**Vulnerability:** Stringified JSON injected directly into Astro templates using `set:html={jsonString}` inside a `<script type="application/ld+json">` tag allows XSS attacks if the JSON contains malicious strings like `</script><script>alert(1)</script>`.
**Learning:** Unlike standard React DOM `script.textContent` assignments which are inherently safe from DOM-based XSS, Astro's `set:html` renders content verbatim, exposing the application to XSS when rendering JSON directly.
**Prevention:** Always sanitize JSON strings before using them in Astro's `set:html`. This can be done by escaping angle brackets via `.replace(/</g, '\\u003c').replace(/>/g, '\\u003e')` to prevent early script termination.
