## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2024-05-18 - [Fix XSS vulnerability in structured data]
**Vulnerability:** A Cross-Site Scripting (XSS) vulnerability was found in `src/lib/seo/vehicles-jsonld.ts` where unescaped JSON data was returned and injected into a `<script type="application/ld+json">` tag via Astro's `set:html`. An attacker could embed closing `</script>` tags within the JSON values (e.g., in a vehicle title) to break out of the script block and execute malicious JavaScript.
**Learning:** Even when injecting non-executable JSON data into HTML (like JSON-LD), the browser's HTML parser runs first. If the JSON contains HTML closing tags, it can terminate the script block prematurely. This is a common pattern in Astro when using `set:html` with `JSON.stringify()`.
**Prevention:** Always escape angle brackets (`<` to `\u003c` and `>` to `\u003e`) when serializing JSON that will be injected directly into an HTML document using `set:html` or `dangerouslySetInnerHTML`.
