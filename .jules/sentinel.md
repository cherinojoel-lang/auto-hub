## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.
## 2026-10-11 - Prevent error message leakage in API endpoints
**Vulnerability:** HTTP 500 and 400 error responses in API endpoints (src/pages/api/ai/enrich.ts and src/pages/api/leads.ts) were returning raw error.message strings directly to the client.
**Learning:** Returning detailed error messages to the client can leak sensitive internal state or logic (like Cloudflare binding details).
**Prevention:** Do not expose raw error.message or internal details in client HTTP responses. Instead, log the detailed error server-side using console.error and return a generic, safe error string (e.g., 'ai_inference_failed' or 'invalid_lead').
