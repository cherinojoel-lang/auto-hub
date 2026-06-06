# AutoHub Master Prompt: Recherchebasierte Website-Optimierung

Arbeitsverzeichnis:
`/Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub`

Kopiere den folgenden Prompt in Claude Code:

```text
Du arbeitest im Repo `/Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub`.

Ziel:
Optimiere die Automobile-Quick-Webseite wie ein Senior Frontend-/SEO-/Conversion-Engineer. Arbeite analog zum HSB-System: zuerst Faktenlage und Markt prüfen, dann Fehler korrigieren, dann Design/UX/SEO/Lead-Führung verbessern, dann verifizieren. Keine unbelegten Claims, keine Fake-Bewertungen, keine LocalBusiness-Review-Rich-Snippets.

Pflichtkontext zuerst lesen:
1. `AGENTS.md`
2. `docs/ai/PROJECT_STATUS.md`
3. `docs/ai/CURRENT_HANDOFF.md`
4. `docs/ai/SOURCES.md`
5. `docs/ai/AUTOHUB_MASTER_PROMPT_2026-06-07.md`

Aktuell verifizierte Fakten:
- Firma: Automobile Quick
- Adresse: Hagener Str. 126a, 58642 Iserlohn-Letmathe
- Telefon: +49 (0)2374 912912
- E-Mail: auto-quick@t-online.de
- Öffnungszeiten: Mo-Fr 09:00-18:00, Sa 09:00-13:00
- Positionierung: seit 1982 in Iserlohn-Letmathe
- Bewertungen: mobile.de 157, AutoScout24 48, kombiniert 205 öffentlich einsehbare Bewertungen, gewichtete Darstellung 4,98/5
- Keine `aggregateRating`, `review`, `reviewCount` in LocalBusiness/AutoDealer JSON-LD.

Aktuelle Quellen erneut prüfen, bevor du harte Zahlen änderst:
- https://www.automobile-quick.de/kontakt.html
- https://home.mobile.de/AUTOMOBILE-QUICK
- https://www.mobile.de/bewertungen/AUTOMOBILE-QUICK
- https://www.autoscout24.de/haendler/automobile-quick/bewertungen
- https://developers.google.com/search/docs/appearance/structured-data/review-snippet

Aufgaben:
1. Audit
- Prüfe Startseite, Fahrzeugbestand, Fahrzeugdetail, Kontakt, Über-uns, Footer, Schema, Sitemap und Tracking.
- Suche nach veralteten Daten, widersprüchlichen Claims, schwachen CTAs, Textüberläufen, Mobile-Problemen und nicht belegten Aussagen.
- Prüfe, ob Kontaktformular aktuell nur simuliert ist und markiere echte Backend-/CRM-Anbindung als separaten Schritt, falls nicht vorhanden.

2. Markt-/Konkurrenzlogik
- Recherchiere lokale und regionale Autohaus-/Gebrauchtwagen-Konkurrenz in Iserlohn, Letmathe, Hagen, Schwerte, Märkischer Kreis.
- Ziehe Best Practices aus starken Autohaus-Seiten: klare Fahrzeugkarten, sofort sichtbare Kontaktwege, Öffnungszeiten, Route, Bewertungsprofile, Fahrzeugankauf, Finanzierung, Probefahrt, Wunschfahrzeug-Anfrage.
- Keine öffentliche Wettbewerberabwertung und keine fremden Kundendaten übernehmen.

3. Design und UX
- Die erste Ansicht muss sofort nutzbar sein: Fahrzeugbestand, Kontakt/Anruf, Probefahrt/Wunschfahrzeug, Vertrauen.
- Kein generischer Agentur-Look, keine übergroße Landingpage-Rhetorik.
- Mobile-first: Sticky Kontakt/Telefon/WhatsApp nur wenn nicht störend, klare Tap-Ziele, keine überlappenden Texte.
- Fahrzeugkarten scanbar machen: Preis, Erstzulassung, km, Leistung, Kraftstoff, Getriebe, Finanzierungshinweis, CTA.
- Kontaktbereich auf echte Daten, Route und schnelle Anfrage ausrichten.

4. SEO
- Jede wichtige Seite: genau eine H1, eindeutiger Title, Description, Canonical, OG-Daten, interne Links.
- LocalBusiness/AutoDealer-Schema ohne selbstverwaltete Review-Auszeichnung.
- Vehicle/Product/Offer-Schema nur mit echten Fahrzeugdaten.
- Prüfe Sitemap und robots.

5. Conversion
- CTAs priorisieren: `Fahrzeugbestand ansehen`, `Probefahrt anfragen`, `Fahrzeug bewerten lassen`, `Anrufen`, `WhatsApp schreiben`.
- Kontaktformular qualifizieren: Fahrzeuginteresse, Budget, Inzahlungnahme, Finanzierung, Rückrufwunsch, Datenschutz.
- Tracking-Events vorbereiten: `phone_click`, `whatsapp_click`, `email_click`, `vehicle_card_click`, `lead_form_start`, `lead_form_submit`, `route_click`, `review_profile_click`.

6. Umsetzung
- Mache nur scoped Änderungen.
- Verwende bestehende Patterns, React/Tailwind/Astro-Struktur und vorhandene Tokens.
- Keine neuen großen Dependencies ohne Begründung.
- Ergänze Tests für alle harten Daten und riskanten SEO-Regeln.
- Aktualisiere `docs/ai/CURRENT_HANDOFF.md` und `docs/ai/SOURCES.md`, wenn du Quellen oder Entscheidungen änderst.

7. Verification
- `npm run test:run`
- `npm run check`
- `npm run build`
- `npm run deploy:dry-run`
- `npm audit --audit-level=low`
- Prüfe per Suche, dass alte Fehler nicht zurück sind: `info@automobilequick`, `Sa: 10:00`, `Sa: 10:00 - 16:00`, `ReviewsSchema`, `aggregateRating` in Schema-Kontext.

Ergebnisformat:
- Liste zuerst konkrete gefundene Fehler/Risiken mit Datei/Zeile.
- Danach umgesetzte Änderungen.
- Danach Verifikation mit PASS/FAIL.
- Danach offene Punkte, die echte Geschäftsentscheidung brauchen.
```
