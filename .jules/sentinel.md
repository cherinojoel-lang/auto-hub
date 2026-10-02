## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.

## 2026-10-02 - [XSS Vulnerability in JSON-LD script injection]
**Vulnerability:** Stringified JSON injected directly into script tags for JSON-LD lacked escaping for HTML characters (<, >), creating an XSS vulnerability if user-controlled content contains `</script>`.
**Learning:** Even when injecting JSON-LD into `script.textContent` directly in the DOM (which is safer than SSR injection), escaping HTML characters is a crucial defense-in-depth measure. `JSON.stringify` does not escape HTML characters by default.
**Prevention:** Always append `.replace(/</g, '\u003c').replace(/>/g, '\u003e')` to all instances where `JSON.stringify` output is injected into script tags, regardless of whether it's via `set:html` in SSR or `textContent` in the DOM.
