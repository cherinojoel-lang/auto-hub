## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.

## 2026-10-23 - [Information Leakage (CWE-209) in API Endpoints]
**Vulnerability:** The AI enrichment API endpoint (`src/pages/api/ai/enrich.ts`) returned raw error details via `error.message` directly to the client in the 500 HTTP response.
**Learning:** Returning detailed error messages (including internal Cloudflare bindings or raw stack traces) allows attackers to glean details about the backend architecture or current system state.
**Prevention:** Catch blocks that respond to client requests should only return generic error identifiers (e.g., `ai_inference_failed`). Log detailed information server-side using `console.error`.
