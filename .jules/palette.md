## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2024-06-19 - Form Input Accessibility with Supplementary Sliders
**Learning:** The application uses a pattern of combining number inputs with `<input type="range">` sliders for the same value (e.g., in `FinancingCalculatorSection.tsx`). Screen readers read these as duplicate inputs if not properly labelled.
**Action:** Always ensure the primary input is linked to a visual `<label>` via `id` and `htmlFor`, and explicitly add `aria-label` attributes to the supplementary range inputs to differentiate their purpose for screen reader users.
