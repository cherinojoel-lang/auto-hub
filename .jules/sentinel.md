## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2024-06-28 - JSON-LD Injection XSS via Astro set:html
**Vulnerability:** Stringified JSON was being injected directly into a `<script type="application/ld+json">` tag using Astro's `set:html` without escaping HTML control characters (`<`, `>`). This allows attackers to prematurely close the `<script>` tag and inject malicious code if the JSON contains user-controlled data.
**Learning:** Astro's `set:html` renders content exactly as provided without any auto-escaping, unlike typical React/JSX interpolation. While JSON is safe when assigned to `script.textContent` in the DOM, it is vulnerable when injected as raw HTML during SSR.
**Prevention:** Always escape `<` to `\u003c` and `>` to `\u003e` before injecting stringified JSON into HTML templates using `set:html` or similar raw HTML injection mechanisms.
