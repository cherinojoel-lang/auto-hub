## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-05-18 - [XSS via JSON-LD injection in Astro set:html]
**Vulnerability:** Stringified JSON (JSON-LD) injected directly into the DOM using Astro's `set:html` attribute on a `<script>` tag was vulnerable to XSS if the JSON contained unescaped `<` or `>` characters (e.g., user-provided fields like vehicle titles containing `</script><script>alert('XSS')</script>`).
**Learning:** Astro's `set:html` renders its input verbatim as raw HTML, meaning standard JSON stringification does not provide sufficient XSS protection since a closing `</script>` tag inside a JSON string literal will terminate the script block and allow execution of trailing HTML. This differs from assigning to `script.textContent` in the browser, which is safe.
**Prevention:** When injecting stringified JSON directly into Astro components using `set:html`, always sanitize the output by escaping HTML tags (e.g., `JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')`).
