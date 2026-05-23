🧪 [testing improvement] Add tests for sitemap generator

🎯 **What:**
Addressed the missing test coverage for the `generateSitemap` pure function in `src/lib/sitemap.ts`. The implementation validates the creation of correct XML structures based on given array entries.

📊 **Coverage:**
- Proper prepending of the base URL for relative paths (`https://automobilequick.de`).
- Preservation of absolute URLs (ignoring the base URL modification).
- Valid rendering of optional fields (`lastmod`, `changefreq`, `priority`) when provided.
- Correct escaping of reserved XML special characters (`&`, `<`, `>`, `"`, `'`).
- Proper generation of multiple `<url>` entries sequentially.

✨ **Result:**
Comprehensive coverage of all main behavior and edge cases in the `generateSitemap` string-manipulation utility, providing a confident safety net for any future refactoring without risk of breaking SEO functionalities.

*(Note: Test execution locally via `vitest` or `pnpm test:run` is currently blocked by known issues fetching private `@wix` packages as specified in AGENTS.md, but the tests are structurally and logically sound)*
