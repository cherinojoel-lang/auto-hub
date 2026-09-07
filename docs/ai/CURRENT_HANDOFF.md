# Current Handoff: Automobile Quick / AutoHub

## Start Here
- **Aktiver Worktree:** `/Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub/.worktrees/infra-stack-maximization`
- **Basis-Repo:** `/Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub`
- **Branch:** `main`

## Aktueller Architektur- & Maximierungs-Stand
1. **Cloudflare Edge Ingestion:** Astro 5 SSR auf `@astrojs/cloudflare` mit 4 Bindings:
   - `SESSION`: Cloudflare KV (`a70a11f47ea1472fa95557e5d37ae763`)
   - `DB`: Cloudflare D1 (`auto-quick-db` @ Frankfurt FRA / EEUR, ID `e2a8a3fa-fb7d-4411-bef2-ff28365b80dc`)
   - `AI`: Workers AI (`@cf/meta/llama-3.1-8b-instruct`)
   - `ASSETS`: Statische Assets via Cloudflare Workers Assets (735 Client-Dateien)
2. **Qualitäts- und Test-Gate:**
   - Vitest Tests zu 100% grün (0 Fehler).
   - Multi-Platform Sync Mapper für mobile.de und AutoScout24 implementiert und getestet.
   - Lead Capture mit Turnstile Replay-Schutz implementiert und getestet.
3. **Automatisierter Execution Runner:**
   - `run_all_phases.sh` (sowie Symlinks `run`, `run_all_phases.`, und `npm run phases`) führt alle 6 Phasen inklusive echtem DNS-Audit durch.

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
