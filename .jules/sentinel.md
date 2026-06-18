## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2025-02-28 - Cross-Site Scripting (XSS) via JSON-LD in Astro set:html
**Vulnerability:** JSON stringified objects containing `<` and `>` characters were injected directly into Astro's `<script set:html={jsonLd} />` without escaping.
**Learning:** Astro's `set:html` renders content verbatim, unlike React's `script.textContent` which is naturally safe from DOM-based XSS. This allows an attacker to break out of the script tag by supplying a payload like `</script><script>alert(1)</script>` within fields such as vehicle titles or images.
**Prevention:** Always escape `<` to `\u003c` and `>` to `\u003e` when generating JSON for `set:html` injection. Additionally, be cautious of generating massive auto-generated files (like `pnpm-lock.yaml`) during local verification and ensure they are removed before submission.
