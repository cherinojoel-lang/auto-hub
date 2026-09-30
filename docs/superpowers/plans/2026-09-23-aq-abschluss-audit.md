# Automobile Quick – Abschluss-Audit & Live-Reife Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Belegen, dass der Live-Stand (`automobile-quick.cherinojoel.workers.dev`) dem State-Eintrag `automobile_quick_preproduction_20260903` noch entspricht, Drift reparieren und den DNS-Cutover entscheidungsreif machen.

**Architecture:** Nur lesen und messen, Reparaturen im Worktree `.worktrees/aq-audit` (Branch `chore/aq-audit-20260923`). Kein Ultrareview: Das Projekt ist gemergt und mit 167 Tests, Lighthouse 96/100 und 14/14 CI-Checks verifiziert. Den Freilauf bekommt energievergleich-nrw.

**Tech Stack:** Astro + React-SSR-Bridge, Vitest, Cloudflare Worker `automobile-quick` (Konto `043ec899…`), D1-Lead-Capture.

**Spec:** Masterplan `~/KI-System/ObsidianVault/brain/05_reports/2026-09-23-portfolio-autopilot-masterplan.md`.

## Global Constraints

- Kein Push, kein Deploy, kein DNS-Wechsel ohne Freigabe (DNS-Autorität prüfen, bevor etwas behauptet wird).
- `www.hsb-boden.de` darf nicht berührt werden (Isolation war PASS und muss PASS bleiben).
- Kein `npm install`, kein `git add .`.
- Deploy nur über den projektlokalen Skill `deploy-preview`.

## Sammler-Befunde (2026-09-23)

| Befund | Beleg |
|---|---|
| Arbeitsbaum sauber, 1 lokaler Commit nicht gepusht (`0a479bb chore(claude): projektlokale Hooks + deploy-preview-Skill`) | `git rev-list --count origin/main..HEAD` = 1 |
| Offenes Issue #364 „Mission Control Setup“ (seit 2026-06-28) | `gh issue list` |
| Frühere Pläne/Specs vom 2026-09-03 in `docs/superpowers/{plans,specs}` | `ls` |
| `docs/DNS_CUTOVER_CHECKLIST.md` + `LIVE_MIGRATION_MANIFEST.md` vorhanden | `ls docs` |
| Bestand laut State: 31 verfügbar + 16 verkauft, 649 WebP | active_state.json |

## Review Focus

1. **Bestands-Drift gegenüber mobile.de**: Seit dem 05.09. wurden Fahrzeuge verkauft oder neu eingestellt. Die Seite darf kein verkauftes Auto als verfügbar zeigen.
2. **Lead-Formular → D1**: Ein Test-Lead muss ankommen, ohne echte Kundendaten zu erzeugen (Test-Kennzeichnung).
3. **Kaputte Bildpfade nach Bestandsänderung**: 0 × 404.
4. **Mobile LCP im Feld** > 2,5 s wäre eine Regression gegenüber 1,13 s.
5. **Impressum/Datenschutz** mit korrekter Firmierung (Automobile Quick, nicht HSB).

---

### Task 1: Sammler – früheren Stand gegen heute abgleichen

- [ ] **Step 1:** `docs/superpowers/plans/2026-09-03-*.md` lesen und alle nicht abgehakten `- [ ]` auflisten:
```bash
grep -n '^\s*- \[ \]' docs/superpowers/plans/2026-09-03-*.md docs/DNS_CUTOVER_CHECKLIST.md
```
- [ ] **Step 2:** Den Drive-Stand `gdrive:Automobile-Quick/PROJECT_STATE_2026-09-05.md` lesen (MCP `google-workspace-cherinojoel__search` mit Query `PROJECT_STATE_2026-09-05`) und Abweichungen gegen active_state notieren.
- [ ] **Step 3:** Ergebnis in `docs/ai/AUDIT_2026-09-23.md` schreiben (Tabelle: Punkt | Quelle | Status heute | Beleg).

### Task 2: Live-Messung (read-only)

- [ ] **Step 1:** Worker-Version: `mcp__cloudflare-cherinojoel-builds__workers_get_worker` (automobile-quick). Erwartet wird Version `b2a68ecd-…` oder neuer. Notieren.
- [ ] **Step 2:** HTTP-Gesundheit
```bash
for p in / /fahrzeuge /kontakt /impressum /datenschutz /sitemap.xml /robots.txt; do
  printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' https://automobile-quick.cherinojoel.workers.dev$p)" "$p"; done
```
Expected: alle `200`. Ist ein Pfad unbekannt, die echten Routen aus `src/pages` nehmen.
- [ ] **Step 3:** Lighthouse mobil über `mcp__plugin_chrome-devtools-mcp_chrome-devtools__lighthouse_audit` auf `/`. Performance ≥ 90 und CLS 0 sind das Ziel.
- [ ] **Step 4:** Bestandsabgleich: die Fahrzeuganzahl der Live-Seite gegen die aktuelle mobile.de-Händlerseite (Claude-in-Chrome, nur lesen). Differenz notieren.

### Task 3: Lokale Gates

- [ ] **Step 1:**
```bash
git worktree add .worktrees/aq-audit -b chore/aq-audit-20260923 && cd .worktrees/aq-audit
npm test 2>&1 | tail -5; npx astro check 2>&1 | tail -3; npx eslint . 2>&1 | tail -3
```
Expected: 167/167 PASS, 0 Fehler. Jede Abweichung wird mit `superpowers:systematic-debugging` und einem TDD-Fix pro Befund behandelt (Test rot, Fix, grün, Commit `fix(aq): …`).

### Task 4: Drift reparieren (Loop, nur falls Task 2/3 Befunde liefern)

- [ ] **Step 1:** Loop-Kontrakt `docs/ai_state/loops/2026-09-23-aq-drift.md` (Skill `sicherer-loop`):
  - Ziel: Alle Befunde aus `AUDIT_2026-09-23.md` mit Status `drift` sind behoben.
  - Abschluss: `npm test` exit 0; `grep -c '| drift |' docs/ai/AUDIT_2026-09-23.md` == 0; die HTTP-Schleife aus Task 2 liefert nur `200` gegen den Preview-Alias.
  - Limits: 8 Iterationen, 90 Minuten. Nicht-Ziele: Redesign, neue Features, Produktion.
  - Reviewer: `code-reviewer-lite` pro Iteration, `validation-auditor` am Ende.
- [ ] **Step 2:** Bestandsupdate nur über den im Repo dokumentierten Import-Weg (im Runbook `docs/runbooks/` nachsehen). Keine Handänderung an 47 Einträgen.

### Task 5: Owner-Gates

- [ ] In `docs/ai/AUDIT_2026-09-23.md` festhalten und dem Nutzer vorlegen:
  1. Push von `0a479bb` (+ Audit-Branch) → PR.
  2. DNS-Cutover auf die Wunschdomain gemäß `docs/DNS_CUTOVER_CHECKLIST.md`. DNS-Autorität vorher per `dig NS <domain>` belegen.
  3. Issue #364 schließen oder neu zuschneiden.
- [ ] `active_state.json` → `automobile_quick_audit_20260923` schreiben; `validation-auditor` vor jeder Fertig-Meldung.
