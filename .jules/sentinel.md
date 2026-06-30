## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-06-30 - [XSS via JSON-LD injection in Astro set:html]
**Vulnerability:** Stringified JSON was directly injected into an Astro template using `set:html` without escaping HTML characters, allowing for potential XSS via unsanitized `<script>` block termination.
**Learning:** Unlike React's `script.textContent`, Astro's `set:html` renders verbatim. If the JSON data contains `</script>`, the browser will prematurely terminate the script block and execute subsequent HTML as code.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when using `JSON.stringify()` in combination with Astro's `set:html`.
