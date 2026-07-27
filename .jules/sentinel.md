## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.

## 2025-02-28 - [Missing Input Length Limits (DoS Risk)]
**Vulnerability:** User input fields (inputs and textareas) lacked `maxLength` constraints.
**Learning:** Without input length limits, attackers could potentially submit massive payloads to the application causing client-side buffer issues or unexpected Denial of Service (DoS).
**Prevention:** Always include `maxLength` attributes on HTML `input` and `textarea` fields to prevent client-side Denial of Service (DoS) risks and buffer issues. For fields with large limits, pair this with a visual character counter, and ensure accessibility by linking them with `aria-describedby` and using `aria-live="polite"` on the counter element.
