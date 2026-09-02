## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2025-01-01 - Form Accessibility with Primary and Supplementary Inputs
**Learning:** When form components have multiple inputs sharing a single visual label (e.g., a number input and a supplementary range slider), assign the `id` and `htmlFor` exclusively to the primary input. To maintain accessibility, provide the supplementary input with an explicit `aria-label` and `focus-visible` styling.
**Action:** Always link the primary input to its visual label with `id` and `htmlFor`, and add `aria-label` along with `focus-visible` classes to any supplementary inputs like range sliders.
