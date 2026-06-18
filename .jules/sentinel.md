## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2024-06-14 - Fix JSON-LD XSS Vulnerability
**Vulnerability:** JSON-LD payload injected into Astro `<script set:html={...} />` tags was not escaping HTML characters.
**Learning:** While React automatically escapes characters when setting `textContent`, Astro's `set:html` is a direct, verbatim injection. Injecting stringified JSON directly exposes the block to `<script>` breakout attacks.
**Prevention:** Always manually sanitize JSON payloads passed to `set:html` by replacing `<` with `\u003c` and `>` with `\u003e`.
