# Current Handoff: Automobile Quick / AutoHub

## Start Here
- **Basis-Repo:** `/Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub`
- **Branch:** `main` (Synchronisiert mit `origin/main`)
- **Live Edge Deployment:** `https://automobile-quick.cherinojoel.workers.dev` (Aktiv, HTTP/2 200 OK)

## Aktueller Architektur- & Maximierungs-Stand
1. **Cloudflare Edge Ingestion:** Astro 5 SSR auf `@astrojs/cloudflare` mit 4 Bindings:
   - `SESSION`: Cloudflare KV (`a70a11f47ea1472fa95557e5d37ae763`)
   - `DB`: Cloudflare D1 (`auto-quick-db` @ Frankfurt FRA / EEUR, ID `e2a8a3fa-fb7d-4411-bef2-ff28365b80dc`)
   - `AI`: Workers AI (`@cf/meta/llama-3.1-8b-instruct`)
   - `ASSETS`: Statische Assets via Cloudflare Workers Assets (735 Client-Dateien)
2. **Qualitäts- und Test-Gate:**
   - Vitest Tests: 35 Test-Dateien, 174/174 Tests bestanden (0 Fehler).
   - Multi-Platform Sync Mapper für mobile.de und AutoScout24 implementiert und getestet.
   - Lead Capture mit Turnstile Replay-Schutz implementiert und getestet.
3. **Automatisierter Execution Runner:**
   - `run_all_phases.sh` (sowie Symlinks `run`, `run_all_phases.`, und `npm run phases`) führt alle 6 Phasen inklusive echtem DNS-Audit durch.


## 2026-09-15 — Sicherheits-Patch, Superpowers-Abgleich

**Verifikation (`npm run check`, `npm run test:run`, `npm run build`,
`npm run deploy:dry-run`, `npm audit`) vollständig durchgeführt:**
- `npm audit` fand 24 Schwachstellen (1 kritisch, 17 hoch, 4 moderat, 2
  niedrig), u.a. eine kritische Astro-Kette (RCE über AVIF-Bildoptimierung,
  Auth-Bypass, mehrere XSS) plus SSRF/DoS/CRLF-Findings in esbuild,
  react-router, undici, sharp, js-yaml u.a.
- Fix: `astro` `^6.4.2` → `^7.3.2`, `@astrojs/cloudflare` `^13.6.0` →
  `^14.3.1` (peer-kompatibel zu Astro 7; die alte Version war bereits vorher
  mit dem installierten Astro 6.4.8 peer-invalid). `npm audit fix`
  übernahm den Rest ohne weitere `package.json`-Änderungen.
- Alle vier Verifikationsschritte grün nach dem Bump (38 Testdateien/181
  Tests, sauberer Build, Tailwind-CSS-Output geprüft, Deploy-Dry-Run mit
  allen 4 Bindings). `@astrojs/tailwind` meldet weiterhin ein
  peer-Metadaten-Mismatch (`^3.0.0 || ^4.0.0 || ^5.0.0`) gegen Astro 7 —
  bereits vor diesem Patch gegen Astro 6 vorhanden, funktional unauffällig
  (Tailwind-Output im Build verifiziert), nicht produktionsblockierend.
  Verbleibend: 1 Low-Finding (`esbuild`, nur Windows-Dev-Server, transitiv
  über Vite/Wrangler ohne eigenen Fix-Pfad).
- `docs/superpowers/plans/2026-09-03-aq-p0-foundation.md` und
  `.../2026-09-03-aq-premium-implementation.md` als SUPERSEDED/HISTORICAL
  markiert: beide beschreiben eine Astro-Datei-Routing-Architektur bzw.
  Supabase-only-Lead-Speicherung, die seither durch den isomorphen
  AppRouter-Catch-all (`src/pages/[...slug].astro` +
  `src/components/AppRouterIsomorphic.tsx`) und D1-primäre Lead-Speicherung
  ersetzt wurde. `docs/ai/PROJECT_CONTEXT.md` und `PROJECT_STATUS.md` auf
  diesen Stand aktualisiert.
- Keine funktionalen Code-Änderungen an Business-Logik, Kontaktdaten oder
  Schema — nur Dependency-Sicherheitspatch und Doku-Abgleich.
- Offen/unverändert: die beiden DNS/Registrar-Schritte unter "Open Tasks
  for Full Public Release" in `PROJECT_STATUS.md` bleiben Owner-Aktionen
  außerhalb agentischer Ausführung; `docs/runbooks/GO_LIVE_P0.md` bleibt
  NO-GO.

## 2026-09-06 — E-Mail-Integrität & WhatsApp-Entfernung
Die Telefonnummer (`+49 2374 912912`) ist kein registrierter WhatsApp-Business-Account. Unregistrierte WhatsApp-Links wurden entfernt und durch direkte E-Mail-Anfragen an `auto-quick@t-online.de` ersetzt:
- `InquiryCta` (`src/components/ui/inquiry-cta.tsx`): Öffnet direkt ein `mailto:` an `auto-quick@t-online.de` mit vorausgefülltem Fahrzeug.
- `ContactSection`: Kontaktformular-Sprungmarke `#kontaktformular` mit Sticky-Header-Offset `scroll-mt-24`.
- E-Mail-Adresse `auto-quick@t-online.de` bleibt dauerhaft als primärer Kontakt unberührt.

## Verifizierte Public Business Data
- Firma: Automobile Quick (Inh. seit 1982 in Iserlohn-Letmathe)
- Adresse: Hagener Str. 126a, 58642 Iserlohn-Letmathe
- Telefon: `+49 (0)2374 912912`
- E-Mail: `auto-quick@t-online.de`
- Öffnungszeiten: Mo–Fr `09:00-18:00`, Sa `09:00-13:00`
- Bewertungen: mobile.de `157`, AutoScout24 `48` (205 Kundenbewertungen sichtbar)

## Sofortiger Ausführungsbefehl
```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub && ./run_all_phases.sh
```
