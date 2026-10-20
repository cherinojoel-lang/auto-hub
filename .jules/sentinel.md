## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.
## 2025-02-28 - Information Exposure in AI Enrich API
**Vulnerability:** The `/api/ai/enrich` endpoint was returning raw server errors (e.g., `error.message` or `String(error)`) directly to the client in the `details` field of the JSON response.
**Learning:** This existed because error handling natively dumped the full error stack or message into the HTTP response, which is a classic information leakage vulnerability. This can expose sensitive architectural details or context (like the internal AI binding setup).
**Prevention:** Always sanitize error messages returned to clients. Log full error details server-side using `console.error()` and return a generic user-friendly error message or status code to the client.
