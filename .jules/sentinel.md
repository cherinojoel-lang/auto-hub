## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2024-05-18 - [XSS Vulnerability in JSON-LD Injection]
**Vulnerability:** Stringified JSON payload was injected directly into `<script>` tags without escaping.
**Learning:** React's `textContent` and Astro's `set:html` directives bypass standard HTML sanitization. Direct injection of unescaped JSON can lead to severe XSS if user input is included in the payload and contains strings like `</script>`.
**Prevention:** Always append `.replace(/</g, '\\u003c').replace(/>/g, '\\u003e')` to the output of `JSON.stringify` when placing its string directly inside a `<script>` or `<style>` block.
