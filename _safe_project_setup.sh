#!/usr/bin/env bash
set -eo pipefail

WORK="$HOME/Playground/auto-hub-work"
IMG="$HOME/Desktop/automobile-quick-bilder"
UPLOAD="$IMG/_WIX_UPLOAD_NUR_DIESE_DATEIEN"

echo "=== Repo prüfen ==="
cd "$WORK" || exit 1
pwd
git status --short
git branch --show-current

echo
echo "=== Branch sicherstellen ==="
if git show-ref --verify --quiet refs/heads/fix/presentation-fahrzeugbestand; then
  git switch fix/presentation-fahrzeugbestand
else
  git switch -c fix/presentation-fahrzeugbestand
fi

echo
echo "=== AGENTS.md schreiben ==="
cat > AGENTS.md <<'EOF'
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
Wenn npm install/build wegen Wix-internen Paketen fehlschlägt:
- nicht weiter mit --force eskalieren
- stattdessen statische Codeprüfung, Dateisuche und minimalen Patch durchführen
- Build-Fehler sauber dokumentieren
EOF

mkdir -p prompts docs

cat > prompts/JULES_PRESENTATION_FIX.md <<'EOF'
# Jules Task: Automobile Quick Präsentations-Fix

Lies zuerst AGENTS.md.

## Ziel
/fahrzeugbestand muss stabil laden und 17 Fahrzeugkarten anzeigen.

## Nicht tun
- Nicht publishen.
- Keine Domain verbinden.
- Kein Checkout.
- Kein Shop.
- Kein Login.
- Keine neue App.
- Keine neue komplexe Routerlogik.
- Nicht neu designen.

## Aufgaben
1. Finde die Route /fahrzeugbestand.
2. Finde die Fahrzeugbestand-Komponente.
3. Prüfe, ob sie CMS/API/dynamische Daten erwartet.
4. Falls instabil: lokale statische Datenquelle nutzen.
5. 17 Fahrzeuge sichtbar machen.
6. Details ansehen -> /fahrzeugdetail.
7. Anfragen -> /kontakt.
8. Keine map/filter auf undefined.
9. Bild-Fallback: „Bild folgt“.
10. Suche und entferne sichtbare Reste von Reinhardt, reinhardtautomobile, AutoHub, autohubs.

## Ausgabe
- geänderte Dateien
- Fehlerursache
- /fahrzeugbestand lädt: ja/nein/nicht lokal prüfbar
- 17 Fahrzeuge sichtbar: ja/nein/nicht lokal prüfbar
- Reinhardt/AutoHub entfernt: ja/nein
- Shop/Login/Checkout entfernt: ja/nein
- Build-/Install-Ergebnis
- Restfehler
EOF

echo
echo "=== Bild-Upload-Ordner vorbereiten ==="
mkdir -p "$IMG" "$UPLOAD"
rm -rf "$UPLOAD"
mkdir -p "$UPLOAD"

for folder in "$IMG"/[0-9][0-9]_*; do
  [ -d "$folder" ] || continue
  name="$(basename "$folder")"
  if [ -f "$folder/01_front.jpg" ]; then
    cp "$folder/01_front.jpg" "$UPLOAD/${name}_01_front.jpg"
  fi
done

echo
echo "Upload-Dateien:"
find "$UPLOAD" -type f -name "*.jpg" | sort
echo "Anzahl Upload-Bilder:"
find "$UPLOAD" -type f -name "*.jpg" | wc -l

echo
echo "=== Git commit ==="
cd "$WORK" || exit 1
git add AGENTS.md prompts/JULES_PRESENTATION_FIX.md
if ! git diff --cached --quiet; then
  git commit -m "docs: add agent rules and Jules presentation fix task"
else
  echo "Keine neuen Agent-Dateiänderungen."
fi

echo
echo "=== Push ==="
git push -u origin fix/presentation-fahrzeugbestand

echo
echo "FERTIG."
echo "Jules-Repo: cherinojoel-lang/auto-hub"
echo "Branch: fix/presentation-fahrzeugbestand"
echo "Task: AGENTS.md und prompts/JULES_PRESENTATION_FIX.md lesen."
