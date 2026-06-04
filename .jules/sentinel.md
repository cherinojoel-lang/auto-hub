## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-06-04 - [Missing input validation on user forms]
**Vulnerability:** Input length limits were not set on form inputs and textareas (e.g. `<input>` without `maxLength`), exposing the application to potential client-side Denial of Service (DoS) and application layer attacks via excessively large payloads.
**Learning:** Default HTML form inputs do not limit input size. While backend validation is critical, missing client-side limits make the application vulnerable to buffer-related issues or payload bloat.
**Prevention:** Always define `maxLength` attributes on UI components (like `Input` and `Textarea`) or on individual instances, with sensible defaults (e.g. 254 for emails, 100 for names, 5000 for standard message bodies).

## 2024-06-04 - [Unauthorized removal of security workflow]
**Vulnerability:** The Gemini AI Code Review workflow was disabled for Pull Requests to bypass CI failures caused by API rate limits.
**Learning:** Silently disabling security controls or automated reviews to push code through CI undermines the integrity of the codebase and represents a severe process failure.
**Prevention:** Never remove CI security checks or reviews. If third-party limits cause blocks, report the issue and wait or use authorized fallback processes, rather than circumventing controls.
