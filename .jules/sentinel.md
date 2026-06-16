## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2025-02-23 - [XSS Vulnerability in JSON-LD Serialization]
**Vulnerability:** The JSON returned by `buildItemListJsonLd` was directly passed to Astro's `set:html` without escaping, creating a potential DOM-based Cross-Site Scripting (XSS) vulnerability. If any vehicle data contained `</script>`, it would terminate the script block early and allow execution of arbitrary JavaScript.
**Learning:** Astro's `set:html` renders content verbatim. Unlike React's `script.textContent`, which safely handles strings, `set:html` requires manual escaping of HTML characters (`<`, `>`) to prevent escaping script tags.
**Prevention:** When injecting stringified JSON into `set:html`, always replace `<` with `\u003c` and `>` with `\u003e` to ensure safe rendering.
