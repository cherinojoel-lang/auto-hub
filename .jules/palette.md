## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2024-07-30 - Form Label Accessibility
**Learning:** When creating forms with paired inputs (like a number input and a range slider for the same value, as seen in `FinancingCalculatorSection.tsx`), standard labels using `htmlFor` can only target one element by `id`. The supplementary input often lacks context for screen readers.
**Action:** Always ensure every primary form input has a unique `id` and a matching `<label htmlFor="...">`. For any supplementary inputs (like a range slider next to a number input), explicitly provide an `aria-label` to maintain full accessibility.
