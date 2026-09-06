# Current Handoff: Automobile Quick / AutoHub

## Start Here
Use `/Users/joelcherinodiaz/AI-Memory-Hub/projects/auto-hub` as the working directory.

## 2026-09-06 — WhatsApp removed (unregistered number)
The dealership's phone number (`+49 2374 912912`) is **not registered as a
WhatsApp Business account**, so every `wa.me/492374912912` link on the site
was a dead end for visitors. Removed WhatsApp everywhere and replaced it with
channels that are actually verified to work:
- `WhatsAppButton` (floating desktop bubble) — deleted, no replacement; the
  sticky call CTA in the header already covers that role.
- `MobileFloatingActionBar` — WhatsApp slot removed, now 3 actions (Anrufen,
  Anfrage, Fahrzeuge).
- `src/components/ui/whatsapp-cta.tsx` → replaced by
  `src/components/ui/inquiry-cta.tsx` (`InquiryCta`): same props/call sites
  (`VehicleInventorySection`, `VehiclesPage`, `VehicleDetailPage`), but opens
  a `mailto:` to `auto-quick@t-online.de` with the vehicle pre-filled instead
  of a `wa.me` link.
- `ContactSection` — WhatsApp card replaced by a "Kontaktformular" card that
  jumps to `#kontaktformular` (added `id="kontaktformular"` +
  `scroll-mt-24` on the form so the sticky header doesn't cover it on
  arrival); intro copy no longer mentions WhatsApp.
- Do not re-add a `wa.me` link before that number (or a new one) is confirmed
  registered with WhatsApp — verify by opening the link, not just by asking.

Also reviewed on request: in-page navigation (`Header`, `Footer`,
`MobileFloatingActionBar`) uses React Router `Link`, and `src/lib/scroll-to-top.tsx`
already handles both cases correctly — plain route change scrolls to top,
and a `location.hash` present scrolls the matching element into view. No fix
needed there; the new `#kontaktformular` anchor exercises that same path.

## Current Correction Pass
On 2026-06-07 the repo was audited against current public sources and corrected for:
- Saturday hours: `09:00-13:00`.
- Contact email: `auto-quick@t-online.de`.
- Review counts: mobile.de `157`, AutoScout24 `48`, combined visible total `205`.
- Homepage rich data: removed self-serving review JSON-LD from the rendered homepage.
- Embedded maps: replaced brittle placeholder `pb` embed URLs with address-query embeds.

Additional Gemini/Codex-reviewed hardening in the same pass:
- Homepage hero uses the existing smaller JPG asset instead of the 2.9 MB PNG.
- Google Maps iframe in `ContactSection` now has `title` and `aria-label`.
- The initial SSR canonical URL now uses the production domain and normalized route path.
- `MobileFloatingActionBar` is mounted globally on mobile routes, but remains hidden on vehicle detail pages because those have their own CTA bar.

## Immediate Safe Next Steps
1. Run `git status --short`.
2. Run `npm run test:run`, `npm run check`, and `npm run build` after any code changes.
3. Keep visible review claims source-linked and avoid adding LocalBusiness `aggregateRating`.
4. Use `docs/ai/SOURCES.md` for current public-source references.

## Do Not Assume
- Do not reuse the old `/Users/joelcherinodiaz/Developer/auto-hub` path unless the user explicitly switches context.
- Do not change contact email, Saturday hours, or review counts without re-checking public sources.
- Do not add Google/LocalBusiness review rich snippets for the dealer's own website.
