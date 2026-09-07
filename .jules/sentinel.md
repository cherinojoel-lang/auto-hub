## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.
## 2024-05-24 - Missing Timeout on External API Calls
**Vulnerability:** External fetch calls to Supabase in `src/lib/supabase-server.ts` were missing a timeout.
**Learning:** External services like Supabase can hang or experience latency. Without a timeout configured on `fetch()`, the worker could exhaust resources by waiting indefinitely, leading to a Denial of Service (DoS). The standard `fetch` API in JavaScript/Workers does not have a default timeout, requiring explicit usage of `AbortController`.
**Prevention:** Always attach an `AbortController` signal to server-side `fetch` calls and abort it after a reasonable timeframe (e.g. 8000ms), catching the error and failing securely.
