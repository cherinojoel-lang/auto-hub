## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2024-05-18 - [Fix XSS vulnerability in JSON-LD injection]
**Vulnerability:** Stringified JSON was injected verbatim into the DOM using Astro's `set:html` attribute (`<script type="application/ld+json" set:html={itemListJsonLd} />`), introducing an XSS risk if the JSON contained unescaped HTML characters (`<` or `>`).
**Learning:** While `JSON.stringify` safely quotes strings for JSON parsing, it does not escape HTML characters by default. When rendering the resulting string in an HTML context (like Astro's `set:html`), these characters can terminate the `<script>` block and allow arbitrary script execution.
**Prevention:** Always escape `<` to `\u003c` and `>` to `\u003e` (using string `.replace()`) before passing JSON strings into raw HTML injection directives like `set:html`. Note that this is NOT necessary when assigning directly to DOM properties like `script.textContent` in React or standard DOM manipulation.
