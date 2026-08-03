## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.

## 2024-05-31 - Range Slider Accessibility in Form Controls
**Learning:** When pairing supplementary range sliders with primary number inputs (e.g., in a calculator), the range slider often lacks an explicit `<label>` as it shares the visual context of the primary input. Without specific configuration, screen readers will announce it generically and keyboard users may struggle to identify focus if default focus outlines are hidden or obscure.
**Action:** Always provide an explicit `aria-label` to these supplementary inputs (e.g., `aria-label="Kaufpreis Schieberegler"`) and ensure they have visible focus states using utility classes like `focus-visible:outline-none focus-visible:ring-2` to allow clear keyboard navigation.
