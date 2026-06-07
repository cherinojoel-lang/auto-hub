# AutoHub Cloud-Finalisierung Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** AutoHub / Automobile Quick final über GitHub, CI, optionalen Gemini/Jamy-AI-Pro-Designreview, Cloudflare-Worker-Deployment und Live-Smoke-Test abschließen.

**Architecture:** Bestehendes Astro/React/Tailwind/Cloudflare-Projekt bleibt unverändert; keine neue Designrunde im Code ohne Befund. Gemini/Jamy mit AI-Pro-Modellzugriff wird als externer Review-/Design-Operator genutzt, während Codex GitHub, CI, Merge, Deploy-Verifikation und Memory-Sync übernimmt.

**Tech Stack:** Astro, React, TypeScript, Tailwind, Cloudflare Workers/Wrangler, GitHub PRs #238/#242, npm verification gates, optional Gemini/Jamy AI Pro Review.

---

## Aktueller Stand

- Repo: `/Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub`
- GitHub PR `#238` — `fix: harden autohub mobile conversion and canonicals` — merged.
- GitHub PR `#242` — `fix: align canonical domain with official site` — merged.
- Current `main`: `0a14bf0`
- Cloudflare Worker: `https://automobile-quick.cherinojoel.workers.dev`
- Current Worker version after final deploy: `1da10777-f70e-4684-869b-911eb29cd5fb`
- Enthaltene Commits:
  - `1010926` — Kontakt-/Review-Fakten bereinigt
  - `e73a3f7` — Fahrzeugdetail Kontaktlinks korrigiert
  - `5041ed7` — Mobile Conversion + Canonicals gehärtet
- Follow-up merge:
  - `0a14bf0` — Canonical/Sitemap/Robots/OG/JSON-LD auf erreichbare offizielle Domain `https://www.automobile-quick.de` ausgerichtet.
- Harte Checks: `CI Checks`, `CodeQL`, `DevSkim`, `ESLint`, `OSSAR`, `Trivy`, Vercel erfolgreich.
- Offener Sonderpunkt: offizieller GitHub-`Gemini Review` Check schlug wegen API-Quota/Tooling (`429`) fehl, nicht wegen Website-Code. Manuelle Gemini/Jamy-Pro-Prüfung darf diesen automatischen Quota-Fehler ersetzen.
- Lokale Besonderheit: `.hermes/` enthält einen vorherigen Plan und ist aktuell untracked. Dieser neue Plan liegt bewusst unter `docs/superpowers/plans/`.

## Scope

### In Scope

- Gemini/Jamy-Masterprompt für finalen Design-/Conversion-/SEO-Review.
- Codex-Schritte für GitHub-Sync, PR-Status, Merge, Deploy-Prüfung, Live-Smoke-Test und Memory-Sync.
- Klare Entscheidungspunkte: wann Cloud Review nötig ist, wann gemerged wird, wann Production als final gilt.

### Out of Scope

- Keine neuen Website-Codeänderungen ohne konkreten Befund.
- Keine neue große Designrichtung.
- Keine Fake-Bewertungen.
- Keine LocalBusiness/AutoDealer `review`, `aggregateRating` oder `reviewCount` JSON-LD.
- Kein direkter Push auf `main`.
- Kein DNS-/Production-Eingriff ohne explizite Freigabe.

## File Structure

- `docs/superpowers/plans/2026-06-07-autohub-cloud-masterprompt-finalisierung.md`
  - Dieser Plan und Masterprompt.
- `docs/ai/CURRENT_HANDOFF.md`
  - Nur ändern, wenn nach Merge/Deploy neue finale Fakten entstehen.
- `docs/ai/PROJECT_STATUS.md`
  - Nur ändern, wenn finaler GitHub-/Production-Status dokumentiert werden soll.
- Keine Website-Datei ist in diesem Plan automatisch zu ändern.

---

## Masterprompt für Gemini/Jamy AI Pro

Den folgenden Prompt in Gemini/Jamy einfügen. Nutze dort das beste verfügbare Gemini-AI-Pro-/Advanced-Modell für visuelle, SEO-, Conversion- und Deployment-Analyse. Wenn mehrere Modelle verfügbar sind, nutze das stärkste Reasoning-/Code-Review-Modell für die Repo-Prüfung und ein starkes multimodales Modell für Screenshots/Designbewertung.

```text
Du arbeitest als leitender Design-, Conversion-, SEO-, Cloudflare-Workers- und Delivery-Reviewer für das Projekt AutoHub / Automobile Quick.

Modell-/Arbeitsmodus:
- Nutze das beste verfügbare Gemini/Jamy AI-Pro-/Advanced-Modell.
- Falls Modellrouting möglich ist: starkes Reasoning-/Code-Modell für Repo/SEO/Schema/CI, multimodales Modell für Screenshots und visuelle UX.
- Arbeite audit-first. Keine Codeänderung ohne konkreten Befund mit Datei/Zeile oder reproduzierbarer Live-Beobachtung.
- Wenn du keine konkreten Verbesserungen findest: nichts ändern, nur Review-Ergebnis liefern.

WICHTIG:
- Dies ist ein REVIEW- und FINALISIERUNGS-Auftrag, keine freie Neugestaltung.
- Keine unbelegten Claims.
- Keine Fake-Bewertungen.
- Keine LocalBusiness/AutoDealer review/aggregateRating/reviewCount JSON-LD.
- Keine Kontakt-, Öffnungszeiten- oder Bewertungsdaten ändern, außer du kannst eine aktuelle öffentliche Quelle konkret benennen.
- Keine Blog-Routen löschen.
- Keine großen Refactorings.
- Keine Arbeit außerhalb des angegebenen Repos.
- Kein DNS-/Domain-Cutover und keine Cloudflare-Route-Änderung ohne ausdrückliche User-Freigabe.
- Cloudflare Workers ist der Zielruntime-Stack. Keine Vercel-/Pages-Migration vorschlagen.

Repo:
`/Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub`

Aktueller GitHub-Stand:
- `main` ist synchron mit GitHub.
- PR #238 ist gemerged:
  `https://github.com/cherinojoel-lang/auto-hub/pull/238`
- PR #242 ist gemerged:
  `https://github.com/cherinojoel-lang/auto-hub/pull/242`
- Aktueller Main-Commit:
  `0a14bf0`
- Enthaltene Kernänderungen:
  - `1010926` — Kontakt-/Review-Fakten bereinigt
  - `e73a3f7` — Fahrzeugdetail Kontaktlinks korrigiert
  - `5041ed7` — Mobile Conversion + Canonicals gehärtet
  - `0a14bf0` — Canonical/Sitemap/Robots/OG/JSON-LD auf offizielle erreichbare Domain `https://www.automobile-quick.de` ausgerichtet
- Harte Checks sind grün: CI, CodeQL, DevSkim, ESLint, OSSAR, Trivy, Vercel.
- Der automatische GitHub-`Gemini Review` Check ist nur wegen API-Quota/Tooling (`429`) fehlgeschlagen, nicht wegen Codebefund.
- Cloudflare Worker ist deployed:
  `https://automobile-quick.cherinojoel.workers.dev`
- Final verifizierte Worker-Version:
  `1da10777-f70e-4684-869b-911eb29cd5fb`
- Offizielle bestehende Domain mit Altbestand:
  `https://www.automobile-quick.de`
- Wichtig: `www.automobile-quick.de` zeigt aktuell noch den alten nginx/Bestandsauftritt. Der neue Worker ist live auf der Worker-URL. DNS-/Route-Cutover ist ein separater Business-/Domain-Schritt.

Pflichtkontext lesen:
1. `AGENTS.md`
2. `docs/ai/PROJECT_STATUS.md`
3. `docs/ai/CURRENT_HANDOFF.md`
4. `docs/ai/SOURCES.md`
5. `docs/ai/AUTOHUB_MASTER_PROMPT_2026-06-07.md`
6. `docs/superpowers/plans/2026-06-07-autohub-cloud-masterprompt-finalisierung.md`

Verifizierte Fakten, die NICHT ohne neue öffentliche Quelle geändert werden dürfen:
- Firma: Automobile Quick
- Adresse: Hagener Str. 126a, 58642 Iserlohn-Letmathe
- Telefon: +49 (0)2374 912912
- WhatsApp: 492374912912
- E-Mail: auto-quick@t-online.de
- Öffnungszeiten: Mo-Fr 09:00-18:00, Sa 09:00-13:00
- Positionierung: seit 1982 in Iserlohn-Letmathe
- Bewertungen sichtbar nur als echte externe Profile mobile.de + AutoScout24; keine Review-Rich-Snippets auf LocalBusiness/AutoDealer.
- SEO-Basisdomain für Canonical/Sitemap/Robots/OG/JSON-LD: `https://www.automobile-quick.de`
- Nicht verwenden als Canonical: `https://automobilequick.de` ohne Bindestrich, weil diese Domain aktuell nicht auflöst.

Review-Ziel:
Prüfe, ob die Worker-Version aus Design-, SEO-, Conversion-, Kontakt- und Deployment-Sicht final reif für Domain-Cutover ist. Wenn du keine konkreten Probleme findest, ändere nichts und bestätige nur den Befund mit Verification.

Design-/UX-Prüfung:
- Erste Ansicht: Ist klar, was Automobile Quick anbietet?
- Sind Fahrzeugbestand, Kontakt, Anruf/WhatsApp und Vertrauen sofort erreichbar?
- Wirkt die Seite wie ein echtes Autohaus, nicht wie generische Agentur-Deko?
- Mobile: keine Überlappungen, keine zu kleinen Tap-Ziele, keine doppelte Sticky-Bar auf Fahrzeugdetailseiten.
- Fahrzeugkarten und Detailseiten: Preis, technische Kerndaten, Kontaktwege und Anfrage klar sichtbar.

SEO-Prüfung:
- Jede Hauptseite genau eine H1.
- Eindeutige Titles/Descriptions.
- Canonicals zeigen auf die echte Route, nicht pauschal auf `/`.
- LocalBusiness/AutoDealer-Schema ohne review/aggregateRating/reviewCount.
- Vehicle/Product/Offer-Schema nur mit echten Fahrzeugdaten.
- Sitemap/robots/Blog-Routen bleiben vorhanden.

Conversion-Prüfung:
- CTAs priorisieren: Fahrzeugbestand, Probefahrt/Anfrage, Anrufen, WhatsApp, Kontakt.
- Mobile Floating Action Bar ist sinnvoll und stört nicht.
- Fahrzeugdetailseite hat keine doppelte generische mobile Leiste.
- Telefonnummer und WhatsApp sind korrekt: keine Variante `4923749129120`.

Cloudflare-Workers-/Deployment-Prüfung:
- Zielruntime ist Cloudflare Workers via Wrangler.
- Worker-Live-URL prüfen: `https://automobile-quick.cherinojoel.workers.dev`
- Kernseiten prüfen: `/`, `/fahrzeugbestand`, `/kontakt`, `/ueber-uns`, ein `/fahrzeugdetail/...` Pfad.
- Prüfe, ob `robots.txt` und `sitemap.xml` auf `https://www.automobile-quick.de` zeigen.
- Keine Änderung an DNS, Custom Domain, Cloudflare Routes oder Secrets.

Kontakt-/Fakten-Regressionssuche:
Suche nach folgenden verbotenen/veralteten Mustern:
- `4923749129120`
- `info@automobilequick`
- `Sa: 10:00`
- `10:00 - 16:00`
- `seit 1962`
- `ReviewsSchema`
- `aggregateRating` oder `reviewCount` im LocalBusiness/AutoDealer JSON-LD-Kontext
- `automobilequick.de` ohne Bindestrich in aktiven SEO-/Schema-/Sitemap-/Robots-Kontexten

Verification, falls du Code änderst:
1. `npm run test:run`
2. `npm run check`
3. `npm run build`
4. `npm run deploy:dry-run`
5. `npm audit --audit-level=low`

Verification, wenn du nichts änderst:
1. `git status --short --branch`
2. `gh run list --branch main --limit 8`
3. Stichproben-Suche nach den verbotenen Mustern oben
4. Live-Smoke-Test gegen `https://automobile-quick.cherinojoel.workers.dev`

Ergebnisformat:
1. Konkrete Findings mit Datei/Zeile oder "keine neuen Findings"
2. Falls Änderungen: geänderte Dateien + Begründung
3. Verification PASS/FAIL mit Befehl und Ergebnis
4. Go-/No-Go-Empfehlung für Domain-Cutover: `ready for cutover`, `fix required`, oder `wait for user decision`
5. Offene Punkte, die echte User-/Business-Entscheidung brauchen, insbesondere Domain-Cutover und Formular-/CRM-Backend
```

---

## Was Codex selbstständig erledigen kann

- [ ] PR #238 Status lesen und harte Checks von optionalen/agentischen Checks trennen.
- [ ] Automatischen Gemini-Review-Fehlerlog als Quota-/Toolingfehler einordnen und dokumentieren.
- [ ] Falls Merge erlaubt ist: PR nach User-Freigabe mergen.
- [ ] Nach Merge lokales `main` per Fast-Forward synchronisieren.
- [ ] Lokale Gates erneut laufen lassen: `npm run test:run`, `npm run check`, `npm run build`, `npm audit --audit-level=low`.
- [ ] Falls Deploy-Script bekannt und sicher: `npm run deploy:dry-run` ausführen.
- [ ] Production-Deployment-Status über GitHub/Cloudflare/Vercel prüfen, ohne DNS zu verändern.
- [ ] Live-Smoke-Test per HTTP und Browser gegen `www.automobile-quick.de` bzw. bekannte Worker-/Preview-URL durchführen.
- [ ] Nach finaler Verifikation `docs/ai/CURRENT_HANDOFF.md`, `docs/ai/PROJECT_STATUS.md` und `ai-state` aktualisieren.
- [ ] Eine knappe Abschlussmeldung mit PASS/FAIL, Commit/PR/Merge-Hash und offenen Punkten liefern.

## Was Gemini/Jamy AI Pro / externer Designreview leisten soll

- [ ] Design-, Trust- und Conversion-Blick ohne Code-Änderungsdrang.
- [ ] Vergleich analog HSB-Boden: echte B2B/B2C-Nützlichkeit, kein generischer Landingpage-Look.
- [ ] Mobile UX qualitativ bewerten.
- [ ] Copy-/CTA-Schwächen benennen, aber nur mit Datei/Zeile und konkreter Verbesserung.
- [ ] SEO-/Schema-Regressionsrisiken prüfen.
- [ ] Cloudflare-Workers-Livepfad, Robots, Sitemap und Canonicals als Cutover-Readiness prüfen.
- [ ] Nur dann Änderungen vorschlagen, wenn ein echter Befund vorliegt.

## Was der User entscheiden muss

- [ ] Ob Gemini/Jamy AI Pro Review vor Domain-Cutover zwingend gewünscht ist.
- [ ] Ob der automatische GitHub-`Gemini Review` Quota-Fehler dauerhaft als nicht-blockierend behandelt oder Workflow-seitig gefixt werden soll.
- [ ] Ob die offizielle Domain `www.automobile-quick.de` auf den Cloudflare Worker umgestellt werden soll.
- [ ] Ob ein finaler Live-Lighthouse-Test als Voraussetzung für "fertig" gelten soll.
- [ ] Ob `.hermes/`-Plandatei aus dem vorigen Plan im Git bleiben, ignoriert oder separat gelöscht werden soll. Keine Löschung ohne explizite Freigabe.

---

## Task 1: Cloud-Review optional vorbereiten

**Files:**
- Use: `docs/superpowers/plans/2026-06-07-autohub-cloud-masterprompt-finalisierung.md`

- [ ] **Step 1: Masterprompt kopieren**

Kopiere den Abschnitt `Masterprompt für Gemini/Jamy AI Pro` in Gemini/Jamy.

Expected:
- Gemini/Jamy arbeitet nur als Review-/Finalisierungsinstanz.
- Keine unkontrollierten Codeänderungen.

- [ ] **Step 2: Ergebnis klassifizieren**

Ordne das Gemini/Jamy-Ergebnis in eine der drei Kategorien ein:

```text
ready for cutover
fix required
wait for user decision
```

Expected:
- Nur `fix required` löst neue Codearbeit aus.
- Bei `ready for cutover` geht es zur Domain-/Businessentscheidung.

---

## Task 2: PR #238 final bewerten

**Files:** keine

- [ ] **Step 1: PR-Status prüfen**

Run:

```bash
cd /Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub
gh pr view 238 --json mergeStateStatus,statusCheckRollup,url
```

Expected:
- Harte Checks bleiben erfolgreich.
- `Gemini Review` darf nur dann blockieren, wenn GitHub ihn als required behandelt.

- [ ] **Step 2: Wenn GitHub Merge blockiert, Gemini Review erneut starten**

Run:

```bash
cd /Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub
gh run rerun 27077206934
```

Expected:
- Der alte Quota-Fehler wird neu ausgeführt.
- Wenn erneut Quota-Fehler: als Tooling-Blocker dokumentieren, nicht als Website-Bug behandeln.

---

## Task 3: PR mergen

**Files:** keine

- [ ] **Step 1: Nur nach User-Freigabe mergen**

Run:

```bash
cd /Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub
gh pr merge 238 --squash --delete-branch
```

Expected:
- PR #238 ist gemerged.
- Remote Branch ist gelöscht, falls GitHub es zulässt.
- Kein direkter Push auf `main`.

- [ ] **Step 2: Merge-Ergebnis lesen**

Run:

```bash
cd /Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub
gh pr view 238 --json state,mergedAt,mergeCommit,url
```

Expected:
- `state` ist `MERGED`.
- `mergeCommit` ist vorhanden.

---

## Task 4: Lokales Repo synchronisieren

**Files:** keine

- [ ] **Step 1: Auf main wechseln und ziehen**

Run:

```bash
cd /Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub
git switch main
git pull --ff-only origin main
git status --short --branch
```

Expected:
- `main` ist mit `origin/main` synchron.
- Keine offenen Codeänderungen.

---

## Task 5: Nachmerge-Gates lokal laufen lassen

**Files:** keine

- [ ] **Step 1: Tests**

Run:

```bash
cd /Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub
npm run test:run
```

Expected:
- Alle Tests bestehen.

- [ ] **Step 2: Check**

Run:

```bash
cd /Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub
npm run check
```

Expected:
- 0 Errors.

- [ ] **Step 3: Build**

Run:

```bash
cd /Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub
npm run build
```

Expected:
- Build erfolgreich.

- [ ] **Step 4: Deploy Dry Run**

Run:

```bash
cd /Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub
npm run deploy:dry-run
```

Expected:
- Dry-run ohne Fehler.

- [ ] **Step 5: Audit**

Run:

```bash
cd /Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub
npm audit --audit-level=low
```

Expected:
- `found 0 vulnerabilities`.

---

## Task 6: Live-/Production-Status prüfen

**Files:** keine

- [ ] **Step 1: GitHub Actions main prüfen**

Run:

```bash
cd /Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub
gh run list --branch main --limit 10
```

Expected:
- Neue Runs nach Merge sind erfolgreich oder Deployment ist über separaten Anbieter nachvollziehbar.

- [ ] **Step 2: Live HTTP prüfen**

Run:

```bash
curl -I https://www.automobile-quick.de/
curl -I https://www.automobile-quick.de/fahrzeugbestand
curl -I https://www.automobile-quick.de/kontakt
```

Expected:
- HTTP 200 oder erwartete Redirects.
- Kein 404 für Kernseiten.

- [ ] **Step 3: Kritische Live-Inhalte prüfen**

Run:

```bash
curl -s https://www.automobile-quick.de/ | grep -E "hero-bg.jpg|Automobile Quick|auto-quick@t-online.de|02374"
```

Expected:
- Automobile Quick sichtbar.
- Kontaktdaten plausibel.
- Hero JPG oder gerenderter Asset-Pfad sichtbar, falls HTML ihn direkt enthält.

---

## Task 7: Browser-Smoke-Test Desktop/Mobile

**Files:** keine

- [ ] **Step 1: Desktop prüfen**

Öffne:

```text
https://www.automobile-quick.de/
https://www.automobile-quick.de/fahrzeugbestand
https://www.automobile-quick.de/kontakt
```

Expected:
- Keine sichtbaren Layoutbrüche.
- Kontaktwege sichtbar.
- Keine Konsole-Fehler.

- [ ] **Step 2: Mobile prüfen**

Prüfe mobile Breite circa `390px`:

```text
/
/fahrzeugbestand
/kontakt
/fahrzeugdetail/<existierendes-fahrzeug>
```

Expected:
- Mobile Floating Action Bar auf normalen Seiten sichtbar.
- Keine generische Mobile Floating Action Bar auf Fahrzeugdetailseiten.
- Keine überlappenden Buttons oder Texte.

---

## Task 8: Regressionssuche nach verbotenen Mustern

**Files:** keine

- [ ] **Step 1: Repo-Suche**

Run:

```bash
cd /Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub
rg -n "4923749129120|info@automobilequick|Sa: 10:00|10:00 - 16:00|seit 1962|ReviewsSchema" src docs public
```

Expected:
- Keine Treffer, außer bewusst negative Testfälle mit klarer Erwartung.

- [ ] **Step 2: Schema-Kontext prüfen**

Run:

```bash
cd /Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub
rg -n "aggregateRating|reviewCount|review" src/lib src/components src/pages
```

Expected:
- Keine `aggregateRating`/`reviewCount` im LocalBusiness/AutoDealer JSON-LD.
- Sichtbare Review-Daten auf der Seite sind erlaubt, wenn extern belegt.

---

## Task 9: Dokumentation und Memory abschließen

**Files:**
- Modify only if facts changed: `docs/ai/CURRENT_HANDOFF.md`
- Modify only if facts changed: `docs/ai/PROJECT_STATUS.md`

- [ ] **Step 1: Handoff nur bei neuen Fakten aktualisieren**

Wenn PR gemerged und Live-Smoke-Test bestanden:

```text
PR #238 merged, production/live smoke test passed, AutoHub finalization round completed.
```

- [ ] **Step 2: ai-state aktualisieren**

Run:

```bash
ai-state event --tool codex --type step --msg "AutoHub PR #238 merged; final live smoke test completed."
ai-state checkpoint --tool codex --task "AutoHub website finalization and GitHub sync" --status completed
```

Expected:
- Shared Memory zeigt den finalen AutoHub-Abschluss.

---

## Task 10: Abschlussbericht

**Files:** keine

- [ ] **Step 1: Finales Ergebnis berichten**

Format:

```text
1. Cloud-/Designreview: PASS/FAIL/Nicht genutzt
2. GitHub: PR #238 merged oder noch offen
3. Verification: PASS/FAIL je Gate
4. Deployment/Live: PASS/FAIL
5. Neuer Merge-/Commit-Hash
6. Offene Punkte
```

Expected:
- Kein Abschlussclaim ohne frische Verification.

---

## Self-Review

- Spec coverage: Der Plan deckt Cloud-Masterprompt, HSB-Analogik, GitHub-Sync, PR #238, CI-Sonderfall, Merge, lokale Verifikation, Production-/Live-Smoke-Test, Memory-Sync und Abschlussbericht ab.
- Placeholder scan: Keine `TBD`, keine unkonkreten "später implementieren"-Schritte; alle Befehle und erwarteten Ergebnisse sind benannt.
- Type/path consistency: Alle Pfade zeigen auf `/Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub`; HSB-Boden ist nur Vorbild, kein Zielrepo dieses Plans.
