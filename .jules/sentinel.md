## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2026-06-13 - [XSS vulnerability in set:html via JSON Stringification]
**Vulnerability:** Direct injection of `JSON.stringify()` output into an Astro `set:html` attribute within a `<script>` tag creates a severe XSS risk if the JSON payload contains unescaped `</script>` or HTML element markers.
**Learning:** While `JSON.stringify()` produces valid JSON, it does not escape HTML characters by default. Browsers parsing a `<script>` tag look for the literal sequence `</script>` to close the tag, potentially executing injected script payloads mid-parse if they exist inside stringified strings.
**Prevention:** When injecting JSON-LD or similar payloads into the DOM as text via server-side frameworks (like Astro's `set:html`), always sanitize the string output using `.replace(/</g, '\u003c').replace(/>/g, '\u003e')` to encode dangerous characters as safe unicode sequences.
