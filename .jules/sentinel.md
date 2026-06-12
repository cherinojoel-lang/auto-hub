## 2024-05-18 - XSS via JSON-LD in Astro set:html
**Vulnerability:** XSS possible if user-controlled data in JSON-LD contains `<script>` or `</script>` tags, breaking out of the script block.
**Learning:** `Astro`'s `set:html` injects raw strings without any escaping, unlike React. So returning `JSON.stringify` alone directly into a script tag using `set:html` is dangerous.
**Prevention:** Always escape `<` and `>` into `\u003c` and `\u003e` before injecting raw JSON string using `set:html`.
