## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-05-18 - [XSS Risk with Astro set:html and JSON-LD]
**Vulnerability:** Injecting stringified JSON directly into Astro's `set:html` (e.g., `<script type="application/ld+json" set:html={...} />`) posed a Cross-Site Scripting (XSS) risk because user input in JSON values could terminate the script block via `</script>`.
**Learning:** Unlike assigning stringified JSON to `script.textContent` in React, Astro's `set:html` renders the content verbatim. Without escaping HTML characters in the stringified JSON, the script block is vulnerable to termination and subsequent XSS injection.
**Prevention:** To prevent script block termination when injecting JSON into a `<script>` tag via `set:html`, ensure `<` and `>` characters are properly escaped (e.g. to `\u003c` and `\u003e`) before injection.
