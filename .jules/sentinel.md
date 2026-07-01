## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2024-05-24 - Prevent XSS in JSON-LD script blocks
**Vulnerability:** Injecting stringified JSON directly into Astro's `set:html` (e.g., `<script type="application/ld+json" set:html={...} />`) poses a DOM-based XSS risk if the JSON contains unescaped `<` and `>` characters (e.g. `</script>`).
**Learning:** Astro's `set:html` renders verbatim. Unlike standard React where assigning to `script.textContent` handles escaping, `set:html` does not automatically escape characters, allowing script injection if malicious strings are present in the JSON.
**Prevention:** Always manually escape `<` and `>` characters (to `\u003c` and `\u003e`) when stringifying JSON for injection via `set:html`.
