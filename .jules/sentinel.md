## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.
## 2026-10-05 - Prevented AI Inference Information Leakage
**Vulnerability:** The AI enrichment endpoint directly surfaced raw errors and detailed Cloudflare `ai.run` failure messages (via `error.message`) in 500 error responses sent to the client (CWE-209).
**Learning:** Detailed error payloads in generic API catch blocks can unintentionally expose infrastructure, bindings, or internal dependencies (such as AI model paths) when external services fail.
**Prevention:** Always log detailed operational errors server-side using `console.error` (or a structured logger) and respond with sanitized, generic error codes (like `ai_inference_failed`) to external consumers.
