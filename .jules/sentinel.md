## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.
## 2025-02-14 - Application-Level DoS via Missing Input Length Limits
**Vulnerability:** The contact form in `ContactSection.tsx` (and likely others) lacked `maxLength` constraints on HTML inputs (`<input>`, `<textarea>`).
**Learning:** React state (`formData`) handles strings of virtually any size, which means without client-side HTML constraints, large payloads can be pasted into the form, potentially causing client-side memory exhaustion (DoS) or overwhelming the backend during form submission. Adding standard server-side validation (e.g. Zod) doesn't stop the client from struggling with rendering megabytes of text in the UI layer before submission.
**Prevention:** Always pair server-side validation with HTML `maxLength` attributes on user-facing inputs to provide an immediate first line of defense against oversized inputs. For long fields (like `textarea`), pair it with a visual counter (`aria-live="polite"`) for good UX.
