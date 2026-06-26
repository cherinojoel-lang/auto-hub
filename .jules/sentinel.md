## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-06-26 - [XSS via Astro set:html with JSON-LD]
**Vulnerability:** Injecting stringified JSON directly into Astro's `set:html` (`<script type="application/ld+json" set:html={itemListJsonLd} />`) poses a DOM-based Cross-Site Scripting (XSS) risk if the JSON contains unescaped `<` or `>` characters (e.g. from malicious user input in a vehicle title), which can terminate the script block and start a new malicious one.
**Learning:** Astro's `set:html` renders its input verbatim, unlike React's `script.textContent` or standard DOM assignments which safely handle `<` and `>`.
**Prevention:** Always escape `<` to `\u003c` and `>` to `\u003e` when stringifying JSON that will be injected via Astro's `set:html`.
