## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.

## 2026-10-07 - [Information Leakage in API Endpoints]
**Vulnerability:** API endpoints (`/api/ai/enrich.ts`, `/api/leads.ts`) were exposing raw `error.message` details directly to the client in HTTP error responses.
**Learning:** Exposing internal error messages, stack traces, or exception details can inadvertently leak sensitive system information or underlying infrastructure details to attackers.
**Prevention:** Never expose raw error messages to the client. Always log the detailed error server-side using `console.error` and return generic, safe error strings (e.g., `'ai_inference_failed'` or `'invalid_lead'`).
