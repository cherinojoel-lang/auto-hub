## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-05-30 - Prevent XSS in Astro set:html JSON injection
**Vulnerability:** Injecting stringified JSON directly into Astro's `set:html` (e.g., `<script type="application/ld+json" set:html={...} />`) poses an XSS risk because `<script>` tags can be prematurely closed and new ones opened if user input contains HTML.
**Learning:** Astro renders `set:html` verbatim. Unlike assigning to `script.textContent` in React, it does not automatically escape HTML characters.
**Prevention:** Ensure `<` and `>` characters are properly escaped (e.g. to `\u003c` and `\u003e`) using `.replace(/</g, '\\u003c').replace(/>/g, '\\u003e')` before returning the stringified JSON to be used in `set:html`.
