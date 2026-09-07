# Automobile Quick — Radikal ehrliches DNS & Go-Live Runbook

> [!IMPORTANT]
> **Ziel-Domain:** `automobile-quick.de` / `www.automobile-quick.de`  
> **Cloudflare Zone-ID:** `f35ed37ff266ee79f9c39a3a5c6ed51a`  
> **Aktiver Account:** `cherinojoel@gmail.com` (`043ec899a435f150995d89f402ed7b12`)  
> **Status:** Zone `pending` (DNS-Delegation bei Registrar All-Inkl ausstehend)

---

## 1. Technischer Ist-Zustand

- **Edge Worker:** 100% gebaut (`dist/server/wrangler.json`) mit 4 Bindings (`SESSION` KV, `DB` D1 `auto-quick-db`, `AI` Workers AI, `ASSETS`).
- **Custom Domain Bindings:** In `wrangler.jsonc` bereits für `automobile-quick.de` und `www.automobile-quick.de` deklariert.
- **Aktive Nameserver beim Provider:** `ns5.kasserver.com`, `ns6.kasserver.com` (All-Inkl / KAS).
- **Ziel-Nameserver bei Cloudflare:** `johnathan.ns.cloudflare.com`, `norah.ns.cloudflare.com`.

---

## 2. Schritte zum Go-Live

1. [ ] **DNS-Spiegelung vorab prüfen:**
   - Alle bestehenden Mail-Records (MX `kasserver.com`, SPF, DKIM) in der Cloudflare-Zone `automobile-quick.de` hinterlegen, damit der E-Mail-Empfang (`auto-quick@t-online.de` bzw. Domain-Postfächer) unterbrechungsfrei weiterläuft.
2. [ ] **Nameserver beim Registrar (All-Inkl KAS) umstellen:**
   - Im All-Inkl Members-/KAS-Bereich die primären/sekundären Nameserver für `automobile-quick.de` ändern auf:
     - `johnathan.ns.cloudflare.com`
     - `norah.ns.cloudflare.com`
3. [ ] **Cloudflare-Aktivierung überwachen:**
   ```bash
   curl -s -X GET "https://api.cloudflare.com/client/v4/zones/f35ed37ff266ee79f9c39a3a5c6ed51a" \
     -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
     -H "X-Auth-Key: $CLOUDFLARE_API_KEY" | grep -o '"status":"[^"]*"'
   ```
   - Erwartung nach TTL-Propagation: `"status":"active"`.
4. [ ] **Worker Live-Deployment ausführen:**
   ```bash
   cd /Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub/.worktrees/infra-stack-maximization
   npx wrangler deploy --config dist/server/wrangler.json
   ```
5. [ ] **Live Smoke-Test & SSL-Validierung:**
   ```bash
   curl -sI https://automobile-quick.de
   curl -sI https://www.automobile-quick.de
   ```
   - HTTP 200, TLS 1.3 via Cloudflare Edge, HSTS aktiv.
