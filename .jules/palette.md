## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
## 2026-10-07 - Dynamic form feedback and loading states
**Learning:** React form success messages appearing dynamically without `role="status"` and `aria-live="polite"` are missed by screen readers. Submit buttons during loading should also have `aria-busy={true}` to indicate ongoing processes to assistive tech.
**Action:** Always verify that dynamic non-interrupting status messages use `role="status"` + `aria-live="polite"`, and use `aria-busy` on async submit buttons.
