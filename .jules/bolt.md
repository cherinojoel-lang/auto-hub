## 2023-10-25 - [Astro Middleware Optimization]
**Learning:** [In Astro middleware, recalculating static object properties like `Object.entries(SECURITY_HEADERS)` inside the `onRequest` handler forces unnecessary memory allocation on every incoming request, reducing server throughput.]
**Action:** [Hoist static data structures or conversions (like static arrays or entries) outside of request handlers into module-level variables when they don't depend on the request object.]
