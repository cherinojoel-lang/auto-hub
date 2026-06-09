## 2024-05-18 - [Missing CSRF Protection in Astro config]
**Vulnerability:** Built-in CSRF protection was disabled via `security.checkOrigin: false` in `astro.config.mjs`.
**Learning:** For Astro applications, CSRF protection is built-in but can be inadvertently disabled. Without this check, server-rendered endpoints are susceptible to Cross-Site Request Forgery (CSRF) attacks.
**Prevention:** Always ensure `security.checkOrigin: true` in `astro.config.mjs` unless there is a very specific, well-documented reason to bypass it (and alternative protections are in place).
## 2024-06-03 - CI Failure on API Quota
**Vulnerability:** Not a direct vulnerability, but a workflow blocking issue. The CI pipeline fails and blocks deployments if the Gemini API hits a rate limit (429/503), preventing code merges.
**Learning:** External API dependencies in CI, especially free-tier limits, can cause spurious build failures.
**Prevention:** For non-critical external review steps (like `gemini /code-review`), add `continue-on-error: true` to the GitHub Actions step so that the workflow does not hard-fail when quotas are exhausted.
