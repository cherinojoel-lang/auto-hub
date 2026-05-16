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

<<<<<<< HEAD
=======
## Wichtig
Lokaler npm build kann wegen Wix-internen Paketen fehlschlagen. Wenn das passiert, dokumentiere es und führe trotzdem statische Codeprüfung + minimalen Patch aus.

>>>>>>> main
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
<<<<<<< HEAD
10. Suche und entferne sichtbare Reste von Reinhardt, reinhardtautomobile, AutoHub, autohubs.
=======
10. Suche und entferne sichtbare Reste von:
   - Reinhardt
   - reinhardtautomobile
   - AutoHub
   - autohubs

## Fahrzeugdaten
Nutze 17 statische Fahrzeuge von Automobile Quick:
- BMW X1 ssDrive 18 i Advantage
- Opel Mokka 1.4 Turbo 4x4 Innovation
- Opel Mokka X 1.4 Turbo Edition 4x4
- Citroën C3 1.2 Aircross
- Opel Mokka 1.4 Turbo Innovation
- Opel Crossland 1.2 Innovation
- Opel Astra K 1.0 Active
- Kia Soul 1.6 GDI Dream Team
- Ford Fiesta 1.0 Trend EcoBoost
- Opel Mokka 1.2 GS-Line
- Opel Corsa F 1.2 Elegance
- Opel Corsa E 1.2 Selektion 3-Türig
- Opel Corsa F 1.2 Elegance 1.Hand
- Opel Corsa F 1.2 Automatik Elegance
- Fiat 500 1.0 GSE Dolce Vita Mild Hybrid
- Opel Corsa F e Edition
- Fiat 500 1.0 GSE Hybrid
>>>>>>> main

## Ausgabe
- geänderte Dateien
- Fehlerursache
- /fahrzeugbestand lädt: ja/nein/nicht lokal prüfbar
- 17 Fahrzeuge sichtbar: ja/nein/nicht lokal prüfbar
- Reinhardt/AutoHub entfernt: ja/nein
- Shop/Login/Checkout entfernt: ja/nein
- Build-/Install-Ergebnis
- Restfehler
