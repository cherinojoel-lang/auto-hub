# AGENTS.md – Automobile Quick

## Rolle
Du arbeitest als Code-Agent für den Automobile-Quick-Webentwurf.

## Projektziel
Präsentationsfähige Lead-Website für Automobile Quick in Iserlohn-Letmathe.

## Harte Regeln
- Nicht publishen.
- Keine Domain verbinden.
- Kein Checkout.
- Keine Online-Zahlung.
- Keine verbindliche Online-Reservierung.
- Kein Login.
- Kein Shop.
- Keine neuen Apps.
- Keine produktiven API-Zugriffe.
- Kein Scraper als finale Architektur.
- Keine fremden Logos, Bilder oder Rechtstexte.
- Keine großflächige Neugenerierung.
- Nur minimal notwendige Änderungen.

## Priorität
1. /fahrzeugbestand muss stabil laden.
2. 17 Fahrzeugkarten müssen sichtbar sein.
3. Header muss Automobile Quick zeigen.
4. Navigation muss korrekt sein.
5. Keine Reinhardt-/AutoHub-Reste.
6. Keine Shop-/Checkout-/Login-Elemente.
7. Lokaler Preview- oder Wix-Preview-Test muss nachvollziehbar sein.

## Design-Tokens
--color-primary: #1A2B4C
--color-accent: #E8421A
--color-success: #27AE60
--color-warning: #F39C12
--color-neutral-100: #F8F9FA
--color-neutral-900: #1A1A1A
--font-base: Source Sans 3, system-ui, sans-serif

## Mobile UX
- Touch Targets mindestens 48x48.
- Fahrzeugkarten mobil 1-spaltig.
- Desktop Fahrzeugkarten 3- oder 4-spaltig.
- Fahrzeugdetailseite mobil mit Sticky Bottom CTA:
  - Anrufen
  - Besichtigung anfragen

## Build-Hinweis
Dieses Wix/Astro-Projekt kann lokal an @wix/editor-elements-definitions oder Wix CLI scheitern.
## Verbotene Buttons
- Kaufen
- Jetzt kaufen
- Checkout
- Jetzt bezahlen
- Reservieren
- Verbindlich reservieren

## Build-Hinweis
Dieses Wix/Astro-Projekt kann lokal an @wix/editor-elements-definitions oder wix CLI scheitern.
Wenn npm install/build wegen Wix-internen Paketen fehlschlägt:
- nicht weiter mit --force eskalieren
- stattdessen statische Codeprüfung, Dateisuche und minimalen Patch durchführen
- Build-Fehler sauber dokumentieren

## Erwartete Ausgabe nach jeder Änderung
1. Geänderte Dateien
2. Fehlerursache
3. Build-/Install-Ergebnis
4. /fahrzeugbestand lädt: ja/nein oder nicht lokal prüfbar
5. 17 Fahrzeuge sichtbar: ja/nein oder nicht lokal prüfbar
6. Restfehler


## STRICT GUARDRAILS (SCMS v3.0)
- Keine Umsetzung bei unklarem Auftrag.
- Bei Plan-/Architektur-/Audit-Aufträgen: nur Plan/Audit, keine Mutation.
- Keine erfundenen Zahlen, Preise, Bewertungen oder Claims.
- Mock-Daten müssen als MOCK_DATA markiert werden.
- Visuelle Aussagen nur nach Screenshot/Browser/Playwright/DevTools-Verifikation.
- Performance-/SEO-/A11y-Aussagen nur mit Messwerten.
- Plan-Tasks erst DONE, wenn Verification-Gate bestanden ist.
- Keine 100%-Aussage ohne Belege.
- Keine Ordner verschieben ohne Diff/Backup.
- Keine Skills/MCPs installieren ohne SKILL.md-/Config-Audit.
