## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-07-03 - [XSS Vulnerability in JSON-LD serialization]
**Vulnerability:** Stringified JSON injected directly into Astro's `set:html` for `<script type="application/ld+json">` lacked escaping for HTML characters (`<`, `>`).
**Learning:** `JSON.stringify` does not escape HTML characters. Injecting it directly via `set:html` allows attackers to terminate the `<script>` block and execute arbitrary JavaScript if user-controlled content (e.g., vehicle titles) contains `</script>`.
**Prevention:** Always escape `<` and `>` (e.g., to `\u003c` and `\u003e`) when serializing JSON intended for raw HTML injection in Astro templates.

## 2024-07-16 - [Missing Input Length Limits (DoS risk)]
**Vulnerability:** Form inputs (`<input>`, `<textarea>`) in `src/components/ContactSection.tsx` and other forms lacked `maxLength` attributes.
**Learning:** Without `maxLength`, clients can paste massive payloads into form fields. This can cause client-side performance issues (browser hangs) and increases the risk of Denial of Service (DoS) or buffer overflows if backend validation is missing or insufficient when parsing large JSON payloads.
**Prevention:** Always include reasonable `maxLength` attributes on all HTML `input` and `textarea` fields to prevent excessively large inputs at the client level. Pair large limits (e.g., 2000 chars) with accessible character counters (`aria-describedby` and `aria-live`).
