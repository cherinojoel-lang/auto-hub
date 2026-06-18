## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-06-11 - [XSS vulnerability in set:html via JSON-LD payload]
**Vulnerability:** A Cross-Site Scripting (XSS) vulnerability was present when injecting user-supplied data within a `<script type="application/ld+json">` tag using Astro's `set:html` directive, because `<` and `>` characters inside JSON values were unescaped. An attacker could inject a malicious payload like `</script><script>alert("xss")</script>` into a vehicle title, effectively breaking out of the script tag and executing arbitrary JavaScript on the page.
**Learning:** `JSON.stringify` does not escape HTML characters by default, and Astro's `set:html` directive renders the string directly into the DOM without additional sanitization. This is distinct from React's `script.textContent` pattern, which safely escapes characters when assigned directly to the DOM property.
**Prevention:** When injecting JSON data into the DOM using Astro's `set:html` (or similar raw HTML injection mechanisms), always manually replace `<` with `\u003c` and `>` with `\u003e` after running `JSON.stringify()` to prevent script block termination attacks.
