# Automobile Quick — DNS Cutover Runbook

> **Ziel-Domain:** `automobilequick.de` / `www.automobilequick.de`  
> **Status:** Bereit für DNS-Umschaltung (Owner-Freigabe erforderlich)

## Schritte zum Go-Live
1. [ ] **Owner-Freigabe erteilen:** Preview auf `https://owner-review-automobile-quick-preview.hsb-boden.workers.dev` abnehmen.
2. [ ] **PR #635 mergen:** `gh pr merge 635 --squash --admin` in `cherinojoel-lang/auto-hub`.
3. [ ] **Custom Domain in Cloudflare binden:**
   ```bash
   npx wrangler custom-domains add automobilequick.de --worker automobile-quick-preview
   npx wrangler custom-domains add www.automobilequick.de --worker automobile-quick-preview
   ```
4. [ ] **DNS CNAME / ALIAS prüfen:**
   - Typ: CNAME / Custom Domain Routing
   - Proxy-Status: Orange Cloud (Proxied)
5. [ ] **SSL / TLS Validierung:** Full (Strict) Zertifikat von Cloudflare Edge.
6. [ ] **Live Smoke-Test:** `curl -sI https://automobilequick.de` (HTTP 200, kein noindex mehr im Root).
