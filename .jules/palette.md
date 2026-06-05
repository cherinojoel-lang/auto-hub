## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2024-05-31 - Supplementary Form Inputs Accessibility
**Learning:** For supplementary inputs that share a visual label (such as a range slider next to a number input), it is important to explicitly define an `aria-label` for full keyboard and screen reader accessibility, as they cannot simply use the `htmlFor` of the visual label.
**Action:** Always ensure every form input has a unique `id` and a corresponding `<label htmlFor="...">`. Provide descriptive `aria-label` attributes to any supplementary inputs like connected range sliders.
