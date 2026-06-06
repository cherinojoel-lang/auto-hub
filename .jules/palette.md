## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2024-06-06 - Form Input Accessibility
**Learning:** Some custom UI sections (e.g., FinancingCalculatorSection) fail to explicitly link `<label>` elements to their corresponding `<input>` and `<select>` elements using `htmlFor` and `id` pairs. Additionally, supplementary inputs (like range sliders) that share a visual label with a main number input lack an accessible name for screen reader users.
**Action:** Always ensure every form input has a unique `id` and a corresponding `<label htmlFor="...">`. For supplementary inputs that share a visual label, explicitly define an `aria-label` to provide an accessible name for assistive technologies.
