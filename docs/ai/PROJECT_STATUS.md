# Project Status: Automobile Quick / AutoHub

Last verified: 2026-09-15

## Current State
- Local canonical path: `/Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub`
- Git branch: `main` (Synchronisiert mit `origin/main`)
- PR Status: PR #659 & PR #662 gemerged
- Live Edge Worker URL: `https://automobile-quick.cherinojoel.workers.dev` (Version `f4d9740f-4028-43bf-afb1-02ec6e3bfbaa`, HTTP/2 200 OK)
- Deployment target: Cloudflare Workers via `wrangler.jsonc` (Worker: `automobile-quick`)
- Account: `cherinojoel@gmail.com` (`043ec899a435f150995d89f402ed7b12`)
- Custom Domains: `automobile-quick.de` & `www.automobile-quick.de` als Trigger registriert
- Zone: `automobile-quick.de` (Status: `pending` DNS delegation at registrar All-Inkl)

## Architecture & Edge Maximization
- **Framework:** Astro 7 SSR mit React 18 & TypeScript (isomorphic React-Router-Catch-all, siehe `docs/ai/PROJECT_CONTEXT.md`)
- **Edge Runtime:** Cloudflare Workers via `@astrojs/cloudflare` 14.x
- **Database:** Cloudflare D1 (`auto-quick-db`, Region EEUR / Frankfurt, 5 Tabellen)
- **Session:** Cloudflare KV (`SESSION`)
- **AI Ingestion:** Cloudflare Workers AI (`@cf/meta/llama-3.1-8b-instruct`)
- **Security:** Cloudflare Turnstile Server Verification (300s Replay-Schutz)
- **Multi-Platform Sync:** Mapper für mobile.de & AutoScout24 Inventory
- **E-Mail-Integrität:** `auto-quick@t-online.de` und Mail-Konfigurationen blieben zu 100% unberührt

## Verification Evidence
- Vitest Suite: 38 Test-Dateien, 181 Tests bestanden (0 Fehler, 0 Timeouts)
- D1 Database: Online in Frankfurt (FRA/EEUR), `table_count = 5`
- Astro Build: erfolgreich, Server + 736 Client-Assets generiert in `dist/`
- Deploy Dry-Run: Alle 4 Bindings validiert (SESSION, DB, AI, ASSETS)
- CI Status: GitHub Actions CI Checks grün (1m 11s)
- `npm audit`: kritische Astro-RCE/XSS-Kette (astro `^6.4.2`→`^7.3.2`) und
  16 weitere High/Moderate-Findings am 2026-09-15 gepatcht; `@astrojs/cloudflare`
  auf `^14.3.1` angehoben, um mit Astro 7 kompatibel zu bleiben (siehe
  `docs/ai/CURRENT_HANDOFF.md`). Verbleibend: 1 Low-Finding (`esbuild`,
  nur Windows-Dev-Server, nicht produktionsrelevant, transitiv über
  Vite/Wrangler ohne eigenen Fix-Pfad).

## Open Tasks for Full Public Release
1. Nameserver-Umschaltung bei Registrar All-Inkl von `ns5/ns6.kasserver.com` auf `johnathan.ns.cloudflare.com` & `norah.ns.cloudflare.com`.
2. Ausführung von `npx wrangler deploy --config dist/server/wrangler.json` nach Zone-Aktivierung.
