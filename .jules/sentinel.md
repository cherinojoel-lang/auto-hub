## 2026-05-26 - [Disabled CSRF Protection]
**Vulnerability:** The Astro configuration `astro.config.mjs` explicitly disabled CSRF protection by setting `security.checkOrigin: false`. This would expose server-rendered endpoints to Cross-Site Request Forgery (CSRF) vulnerabilities.
**Learning:** `checkOrigin` should never be set to false in Astro projects with server endpoints, as it is the framework's primary defense against CSRF attacks, and a key misconfiguration found in this project.
**Prevention:** Always maintain `security.checkOrigin: true` within `astro.config.mjs` unless intentionally working with a fully static site that has zero mutations, which is not the case for an application with form submissions.

## 2026-05-26 - [PII Data Exposure in Logs]
**Vulnerability:** The contact form submission handler in `src/components/ContactSection.tsx` logged the full `formData` object containing the user's name, email, phone number, and message directly to `console.log`.
**Learning:** This exposes sensitive Personally Identifiable Information (PII) to anyone able to view browser console logs or error monitoring tools hooked up to the application's logging pipeline.
**Prevention:** Avoid logging complete objects or forms potentially containing PII. When logs are necessary for debugging or tracing form state, only log non-sensitive states (e.g. `console.log('Form submitted successfully.')`) or explicitly sanitize/redact sensitive fields prior to logging.