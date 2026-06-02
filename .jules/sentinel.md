## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).

## 2024-06-02 - [Missing Input Length Constraints]
**Vulnerability:** Multiple form inputs (`<input>`, `<textarea>`) lacked `maxLength` attributes, leaving the application vulnerable to client-side Denial of Service (DoS) risks and buffer issues via excessively large payloads.
**Learning:** React/HTML forms do not inherently limit input size. Relying solely on server-side validation or backend constraints leaves the client vulnerable to performance degradation or crashes if a malicious user pastes massive strings into form fields.
**Prevention:** Always include sensible `maxLength` attributes on all HTML `input` and `textarea` fields as a first layer of defense in depth.
