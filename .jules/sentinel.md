## 2024-05-30 - [Tabnabbing Vulnerability in window.open]
**Vulnerability:** Found `window.open` calls opening external links (e.g. Google Maps) with `_blank` target but without `noopener,noreferrer` arguments. This makes the application susceptible to reverse tabnabbing attacks, where the newly opened page can maliciously manipulate the original page.
**Learning:** React components (e.g., `HomePage.tsx`) use `window.open` rather than anchor `<a>` tags for some external interactions, bypassing standard linter checks for `target="_blank"`.
**Prevention:** Always verify `window.open` usages when checking for tabnabbing risks, not just `<a target="_blank">` tags, and consistently append `'noopener,noreferrer'` to all calls navigating to untrusted origins.
