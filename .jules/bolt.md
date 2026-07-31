## 2024-06-24 - Hoist Object.entries in Middleware
**Learning:** Performing `Object.entries()` on constant objects inside request middleware causes unnecessary memory allocation and re-evaluation on every incoming request in this Astro application.
**Action:** Hoist static calculations like `Object.entries(SECURITY_HEADERS)` outside the `onRequest` handler to be evaluated once at server startup.
