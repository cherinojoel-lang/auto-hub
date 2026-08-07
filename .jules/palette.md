## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2024-06-05 - Supplementary Range Inputs Accessibility
**Learning:** In forms where multiple inputs share a single visual label (e.g., a number input paired with a supplementary range slider for the same value), only one input can receive the `id` for the `<label htmlFor="...">`. The secondary input becomes inaccessible to screen readers and keyboard users if left alone.
**Action:** Always provide an explicit `aria-label` to the supplementary input (e.g., `aria-label="Kaufpreis anpassen"`) and add clear keyboard focus styling (`focus-visible:ring-2` etc.) so users tabbing through the form can identify and interact with it.
