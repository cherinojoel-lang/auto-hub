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
