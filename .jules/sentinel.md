## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2024-05-18 - [XSS via JSON-LD injection in Astro]
**Vulnerability:** Stringified JSON was being injected verbatim into a `<script type="application/ld+json">` tag using Astro's `set:html` without properly escaping HTML characters (`<`, `>`).
**Learning:** Even if data is valid JSON, injecting it into an HTML context (like a script tag) via `set:html` is unsafe because attackers can include `</script>` sequences within string fields to break out of the script tag and execute arbitrary code. Unlike React's standard script tags where you can assign stringified JSON safely, `set:html` renders verbatim.
**Prevention:** Always escape `<` to `\u003c` and `>` to `\u003e` when assigning JSON to HTML via verbatim injection tools like `set:html` to prevent script tag breakouts.
