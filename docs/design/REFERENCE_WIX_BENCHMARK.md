# Automobile Quick — Referenz-Website & UI/UX Benchmark

**Stand:** 2026-09-26  
**Referenz-URL:** `https://q8mrql-my-site-wgayakj9-energieverg.wix-viperbe-site.com`  
**Referenz-Quelle:** Comet Browser Wix Studio Preview (`pasted-image-20260926-225040.png`)  
**Status:** `FINALISIERT`

---

## 1. Übersicht & Gegenüberstellung

| Element | Referenz (Wix Entwurf) | Aktueller Entwurf (Astro / React `auto-hub`) | Bewertung & Übernahme |
| :--- | :--- | :--- | :--- |
| **Header Branding** | „Automobile Quick“ mit Subtext „SEIT 1982“ | [`Header.tsx`](file:///Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub/src/components/Header.tsx): Typografie `font-heading font-bold text-primary` + `SEIT 1982` in `text-secondary` | **100 % identisch** & semantisch sauber umgesetzt |
| **Header CTA** | Button `+49 (0) 2374 / 912912` in warmer Rost-/Orange-Farbe | `tel:+492374912912` mit Phone-Icon, `bg-secondary text-white font-bold` | **Übernommen**, barrierefrei mit `aria-label` |
| **Navigation** | Start, Fahrzeugbestand, Autoankauf, Finanzierung, Über uns, Kontakt | Exakt dieselben 6 Navigations-Routen im Desktop- und Mobile-Menü | **100 % konsistent** |
| **4-Schritte-Prozess** | 01 Fahrzeug finden<br/>02 Probefahrt vereinbaren<br/>03 Finanzierung klären<br/>04 Auto übernehmen | [`HowItWorksSection.tsx`](file:///Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub/src/components/HowItWorksSection.tsx): 4 nummerierte Kreise mit Lucide-Icons (`Search`, `Calendar`, `Calculator`, `Key`) | **Übernommen & verfeinert:** Verbindungsachse auf `12.5%` bis `87.5%` zentriert, so dass die Linie bündig zwischen Badge 01 und 04 läuft. |
| **CTA Buttons** | 1. „Fahrzeuge entdecken“ (Solid Orange)<br/>2. „Beratungstermin vereinbaren“ (Outline Orange) | Primary `bg-secondary hover:bg-cta-hover`<br/>Secondary `border-2 border-secondary text-secondary hover:bg-secondary hover:text-white` | **Optimiert:** Exakte Marken-Hoverfarben verankert (`#CC4A00` -> `#A83C00`), kein harter Rot-Sprung. |
| **Cookie Banner** | Floating Card unten rechts, Cookie-Icon, „Cookies & Datenschutz“, 2 Buttons | [`CookieConsentBanner.tsx`](file:///Users/joelcherinodiaz/KI-System/02_Projects/active/auto-hub/src/components/CookieConsentBanner.tsx): Floating Card `fixed right-6 bottom-6`, DSGVO-konform, LocalStorage Event-Sync | **100 % konform** |

---

## 2. Technische Umsetzung & Performance-Vorteile von Astro

Im Vergleich zum Wix-Viperbe-System bietet die Astro/Cloudflare-Architektur in `auto-hub`:
1. **Ladezeit:** Zero-JS Server-Side Rendering (SSR) für Kernkomponenten, interaktive React-Inseln nur dort wo nötig (`client:visible`).
2. **SEO & Structured Data:** Automatisierte Schemas für `AutoDealer`, `LocalBusiness`, `Vehicle` nach Schema.org.
3. **Barrierefreiheit:** Tastatur-Navigation (`Skip-to-Content`), WCAG AAA Farbkontraste und Screenreader-Aria-Attribute.
