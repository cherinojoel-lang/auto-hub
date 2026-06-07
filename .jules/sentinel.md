## 2024-05-31 - Fix XSS Vulnerability in JSON-LD Injection
**Vulnerability:** Cross-Site Scripting (XSS) via unescaped stringified JSON injected into `<script type="application/ld+json">`.
**Learning:** React's `textContent` mitigates this on the client-side, but Astro's `set:html` during Server-Side Rendering (SSR) is vulnerable. The raw HTML injection prematurely terminates the script block if `</script>` is present in user input.
**Prevention:** Ensure `<` and `>` characters are replaced with Unicode escape sequences (`\u003c` and `\u003e`) using `JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')` prior to generating JSON-LD `<script>` elements.
