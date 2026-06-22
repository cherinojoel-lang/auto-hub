## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-05-24 - [XSS Vulnerability in Astro set:html JSON-LD Injection]
**Vulnerability:** Injecting stringified JSON directly into Astro's `set:html` (e.g., `<script type="application/ld+json" set:html={...} />`) poses an XSS risk if the JSON contains unescaped HTML characters.
**Learning:** While assigning stringified JSON directly to `script.textContent` in React or standard DOM manipulation is safe, Astro's `set:html` renders verbatim. This allows malicious strings to break out of the script tag and execute arbitrary code.
**Prevention:** Always escape `<` to `\u003c` and `>` to `\u003e` in JSON strings before injecting them via `set:html` to prevent script block termination.
