## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.
## 2025-02-27 - [Missing Input Length Limits (DoS risk)]
**Vulnerability:** Input and textarea fields (name, email, phone, message) in `ContactSection.tsx` had no `maxLength` constraint, opening up possibilities for client-side and server-side Denial of Service (DoS) due to buffer exhaustion from overly long payload sizes.
**Learning:** Client-side form fields should always have bounds configured. Unbounded inputs are a common oversight that introduces risks.
**Prevention:** Implement `maxLength` on all user-controlled text inputs. For longer fields (like textareas), pair it with a visual counter using `aria-describedby` and `aria-live="polite"` to improve accessibility.
