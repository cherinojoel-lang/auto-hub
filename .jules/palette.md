## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2025-01-20 - Accessible Supplementary Form Inputs
**Learning:** The application uses paired form inputs (e.g., a number input alongside a range slider) that share a single visual label. This causes accessibility issues as screen readers need explicit labels for every input.
**Action:** Always ensure every form input has a unique `id` and a corresponding `<label htmlFor="...">`. For supplementary inputs that share a visual label, explicitly define an `aria-label` for full keyboard and screen reader accessibility, along with `focus-visible` styles for clear keyboard navigation.
